const WA_PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WA_TOKEN    = process.env.WHATSAPP_ACCESS_TOKEN;
const MY_NUMBER   = '27686143389';

// â”€â”€ Meta WhatsApp Template Message sender â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
async function waTemplate(to, templateName, components) {
  const url = `https://graph.facebook.com/v19.0/${WA_PHONE_ID}/messages`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${WA_TOKEN}`,
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: templateName,
        language: { code: 'en' },
        components,
      },
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error('WhatsApp API error:', JSON.stringify(data));
  }
  return data;
}

// â”€â”€ Main handler â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { orderDetails, amount } = req.body;
    const orderNum   = 'UM' + Date.now().toString().slice(-6);
    const customerWA = orderDetails.customerWA || '';
const customerPhone = orderDetails.customerPhone || '';    // Save order to KV
    const KV_URL   = process.env.KV_REST_API_URL;
    const KV_TOKEN = process.env.KV_REST_API_TOKEN;
    if (KV_URL && KV_TOKEN) {
      await fetch(`${KV_URL}/set/order:${orderNum}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'pending',
          amount,
          store:      orderDetails.store,
          items:      orderDetails.items,
          address:    orderDetails.address,
          zone:       orderDetails.zone,
          customerWA,
          customerPhone,        }),
      });
    }

    const approveUrl = `https://umgodi.co.za/api/approve-order/${orderNum}/yes`;
    const declineUrl = `https://umgodi.co.za/api/approve-order/${orderNum}/no`;

    // Send umgodi_order_received template to Mpho
    const components = [{
      type: 'body',
      parameters: [
        { type: 'text', text: orderNum },
        { type: 'text', text: orderDetails.store || 'KMG Lifestyle' },
        { type: 'text', text: orderDetails.items || '' },
        { type: 'text', text: orderDetails.address || '' },
        { type: 'text', text: String(amount) },
       { type: 'text', text: `${customerWA || 'Not provided'} | 📞 ${customerPhone}` },
        { type: 'text', text: approveUrl },
        { type: 'text', text: declineUrl },
      ],
    }];

await waTemplate(MY_NUMBER, 'umgodi_order_received', components);
    return res.status(200).json({ success: true, orderNum });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
