const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY;
const WA_PHONE_ID    = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WA_TOKEN       = process.env.WHATSAPP_ACCESS_TOKEN;
const MY_NUMBER      = '27686143389';

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

// â”€â”€ HTML response page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function htmlPage(icon, title, color, orderNum, bodyExtra = '') {
  return `<!DOCTYPE html><html>
  <head><meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body{font-family:sans-serif;text-align:center;padding:40px 20px;background:#faf8f5;margin:0}
    .box{background:#fff;border-radius:20px;padding:32px;max-width:360px;margin:0 auto;box-shadow:0 4px 20px rgba(0,0,0,0.1)}
  </style>
  </head>
  <body><div class="box">
    <div style="font-size:56px">${icon}</div>
    <h2 style="color:${color};margin:12px 0">${title}</h2>
    <div style="font-size:22px;font-weight:900;color:#E8A020;margin:12px 0">${orderNum}</div>
    ${bodyExtra}
  </div></body></html>`;
}

// â”€â”€ Main handler â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default async function handler(req, res) {
  // URL shape: /api/approve-order/UM123456/yes  OR  /api/approve-order/UM123456/no
  const urlParts = (req.url || '').split('?')[0].split('/').filter(Boolean);
  const order  = urlParts[urlParts.length - 2] || '';
  const action = urlParts[urlParts.length - 1] || '';

  // Fallback to query params (?o=UM123456&a=yes)
  const q = req.query || {};
  const finalOrder  = (order.startsWith('UM')               ? order  : q.o) || '';
  const finalAction = (action === 'yes' || action === 'no'  ? action : q.a) || '';

  if (!finalOrder || !finalAction) {
    const debugPath = req.url || '';
    return res.status(200).setHeader('Content-Type', 'text/html').send(
      htmlPage('âš ï¸', 'Invalid Link', '#c0392b', 'â€”',
        `<p style="color:#aaa;font-size:12px">Path: ${debugPath}</p>
         <p style="color:#aaa;font-size:12px">Order: ${finalOrder || 'missing'} | Action: ${finalAction || 'missing'}</p>`)
    );
  }

  const KV_URL   = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;

  try {
    // Fetch order from Vercel KV
    let orderData = {};
    if (KV_URL && KV_TOKEN) {
      try {
        const kvRes = await fetch(`${KV_URL}/get/order:${finalOrder}`, {
          headers: { Authorization: `Bearer ${KV_TOKEN}` },
        });
        if (kvRes.ok) {
          const kvJson = await kvRes.json();
          if (kvJson.result) orderData = JSON.parse(kvJson.result);
        }
      } catch (e) {}
    }

    const amount     = parseFloat(orderData.amount) || 100;
    const customerWA = orderData.customerWA || '';

    // â”€â”€ APPROVED â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (finalAction === 'yes') {
      let paymentUrl = 'https://umgodi.co.za';
      const orderPin = Math.floor(1000 + Math.random() * 9000).toString();

      try {
        const yocoRes = await fetch('https://payments.yoco.com/api/checkouts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${YOCO_SECRET_KEY}`,
          },
          body: JSON.stringify({
            amount: Math.round(amount * 100),
            currency: 'ZAR',
            successUrl: `https://umgodi.co.za/?payment=success&order=${finalOrder}&pin=${orderPin}`,
            cancelUrl:  'https://umgodi.co.za/?payment=cancel',
            failureUrl: 'https://umgodi.co.za/?payment=failed',
          }),
        });
        const yocoData = await yocoRes.json();
        if (yocoData.redirectUrl) paymentUrl = yocoData.redirectUrl;
      } catch (e) {}

      // Update order status in KV
      if (KV_URL && KV_TOKEN) {
        await fetch(`${KV_URL}/set/order:${finalOrder}`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...orderData, status: 'approved' }),
        }).catch(() => {});
      }

      // Notify Mpho
      await wa(MY_NUMBER,
        `âœ… ORDER APPROVED\nRef: ${finalOrder}\nPayment link sent to customer!`
      );

      // Notify customer
      if (customerWA) {
        await new Promise(r => setTimeout(r, 1000));
        await wa(customerWA,
          `ðŸº UMGODI ORDER CONFIRMED!\n\n` +
          `Hi! Your order has been accepted.\n` +
          `Ref: ${finalOrder}\n` +
          `Store: ${orderData.store || 'KMG Lifestyle'}\n` +
          `Amount: R${amount}\n\n` +
          `TAP TO PAY NOW:\n${paymentUrl}\n\n` +
          `After hours, sorted.\numgodi.co.za`
        );
      }

      const bodyExtra = `
        <div style="background:#f0faf0;border-radius:10px;padding:14px;font-size:13px;color:#444;text-align:left;margin:12px 0">
          ðŸª ${orderData.store || 'KMG Lifestyle'}<br>
          ðŸ“¦ ${orderData.items || ''}<br>
          ðŸ“ ${orderData.address || ''}<br>
          ðŸ’° R${amount}<br>
          ðŸ“± Payment link sent to customer!
        </div>
        <p style="color:#666;font-size:13px">Customer WhatsApp has been notified.<br>Close this window.</p>`;

      return res.status(200).setHeader('Content-Type', 'text/html').send(
        htmlPage('âœ…', 'Order Approved!', '#2d7a2d', finalOrder, bodyExtra)
      );

    // â”€â”€ DECLINED â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    } else {
      if (KV_URL && KV_TOKEN) {
        await fetch(`${KV_URL}/set/order:${finalOrder}`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...orderData, status: 'declined' }),
        }).catch(() => {});
      }

      // Notify Mpho
      await wa(MY_NUMBER,
        `âŒ ORDER DECLINED\nRef: ${finalOrder}`
      );

      // Notify customer
      if (customerWA) {
        await new Promise(r => setTimeout(r, 1000));
        await wa(customerWA,
          `UMGODI ORDER UPDATE\n\n` +
          `Sorry, your order ${finalOrder} could not be fulfilled at this time.\n\n` +
          `Please try again later.\numgodi.co.za`
        );
      }

      return res.status(200).setHeader('Content-Type', 'text/html').send(
        htmlPage('âŒ', 'Order Declined', '#c0392b', finalOrder,
          `<p style="color:#666;font-size:13px">Customer has been notified via WhatsApp.<br>Close this window.</p>`)
      );
    }

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
