const WA_PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WA_TOKEN    = process.env.WHATSAPP_ACCESS_TOKEN;
const MY_NUMBER   = '27686143389';

// â”€â”€ Meta WhatsApp Business API sender â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
async function wa(to, text) {
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
      type: 'text',
      text: { body: text },
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

    // Save order to KV
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
        }),
      });
    }

    const approveUrl = `https://umgodi.co.za/api/approve-order/${orderNum}/yes`;
    const declineUrl = `https://umgodi.co.za/api/approve-order/${orderNum}/no`;

    // Message 1 â€” order details
    const msg1 =
      `ðŸ›’ NEW UMGODI ORDER\n` +
      `Ref: ${orderNum}\n` +
      `Store: ${orderDetails.store}\n` +
      `Items: ${orderDetails.items}\n` +
      `Address: ${orderDetails.address}\n` +
      `Zone: ${orderDetails.zone}\n` +
      `Amount: R${amount}\n` +
      `Customer WA: ${customerWA || 'Not provided'}`;

    // Message 2 â€” approve link
    const msg2 = `âœ… APPROVE ${orderNum}\n${approveUrl}`;

    // Message 3 â€” decline link
    const msg3 = `âŒ DECLINE ${orderNum}\n${declineUrl}`;

    // Fire all 3 without awaiting â€” avoids Vercel function timeout
    wa(MY_NUMBER, msg1).catch(() => {});
    wa(MY_NUMBER, msg2).catch(() => {});
    wa(MY_NUMBER, msg3).catch(() => {});

    return res.status(200).json({ success: true, orderNum });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
