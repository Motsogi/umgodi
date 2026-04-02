const WA_PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WA_TOKEN    = process.env.WHATSAPP_ACCESS_TOKEN;
const MY_NUMBER   = '27686143389';

async function waTemplate(to, templateName, components) {
  const url = `https://graph.facebook.com/v19.0/${WA_PHONE_ID}/messages`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${WA_TOKEN}` },
    body: JSON.stringify({
      messaging_product: 'whatsapp', to, type: 'template',
      template: { name: templateName, language: { code: 'en' }, components },
    }),
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const { orderNum, amount } = req.body;
  if (!orderNum) return res.status(400).json({ error: 'Missing orderNum' });

  const KV_URL   = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;

  // Update order status to paid in KV
  if (KV_URL && KV_TOKEN) {
    try {
      const kvRes = await fetch(`${KV_URL}/get/order:${orderNum}`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
      });
      if (kvRes.ok) {
        const kvJson = await kvRes.json();
        if (kvJson.result) {
          const orderData = JSON.parse(kvJson.result);
          await fetch(`${KV_URL}/set/order:${orderNum}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...orderData, status: 'paid' }),
          });
        }
      }
    } catch(e) {}
  }

  // Notify Mpho via WhatsApp
  await waTemplate(MY_NUMBER, 'umgodi_order_received', [{
    type: 'body',
    parameters: [
      { type: 'text', text: orderNum },
      { type: 'text', text: 'PAID' },
      { type: 'text', text: '' },
      { type: 'text', text: '' },
      { type: 'text', text: String(amount) },
      { type: 'text', text: '' },
      { type: 'text', text: '✅ PAYMENT RECEIVED - Ready to dispatch!' },
      { type: 'text', text: '' },
    ],
  }]);

  return res.status(200).json({ success: true });
}
