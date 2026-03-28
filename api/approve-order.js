
const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY;
const WA_NUM = '27686143389';
const WA_KEY = '3188132';

function wa(phone, text) {
  return fetch(`https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${text}&apikey=${WA_KEY}`);
}

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

export default async function handler(req, res) {
  // Pull order + action from URL path segments via vercel.json rewrite
  // URL shape: /api/approve-order/UM123456/yes  OR  /api/approve-order/UM123456/no
  const urlParts = (req.url || '').split('?')[0].split('/').filter(Boolean);
  const order  = urlParts[urlParts.length - 2] || '';
  const action = urlParts[urlParts.length - 1] || '';

  // Also accept query params as fallback (?o=UM123456&a=yes)
  const q = req.query || {};
  const finalOrder  = (order.startsWith('UM')              ? order  : q.o) || '';
  const finalAction = (action === 'yes' || action === 'no' ? action : q.a) || '';

  if (!finalOrder || !finalAction) {
    const debugPath = req.url || '';
    return res.status(200).setHeader('Content-Type', 'text/html').send(
      htmlPage('⚠️', 'Invalid Link', '#c0392b', '—',
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
          // Vercel KV REST returns { result: "stringified JSON" }
          if (kvJson.result) orderData = JSON.parse(kvJson.result);
        }
      } catch (e) {}
    }

    const amount     = parseFloat(orderData.amount) || 100;
    const customerWA = orderData.customerWA || '';

    // ── APPROVED ──────────────────────────────────────────────────────────
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

      // Notify Mphonyana
      const msgMe = `ORDER%20APPROVED%0ARef%3A%20${finalOrder}%0APayment%20link%20sent%20to%20customer!`;
      await wa(WA_NUM, msgMe);

      // Notify customer
      if (customerWA) {
        const msgCustomer =
          `UMGODI%20ORDER%20CONFIRMED!%0A%0A` +
          `Hi!%20Your%20order%20has%20been%20accepted.%0A` +
          `Ref%3A%20${finalOrder}%0A` +
          `Store%3A%20${encodeURIComponent(orderData.store || 'KMG Lifestyle')}%0A` +
          `Amount%3A%20R${amount}%0A%0A` +
          `TAP%20TO%20PAY%20NOW%3A%0A${encodeURIComponent(paymentUrl)}%0A%0A` +
          `After%20hours%2C%20sorted.%0Aumgodi.co.za`;
        await new Promise(r => setTimeout(r, 1000));
        await wa(customerWA, msgCustomer);
      }

      const bodyExtra = `
        <div style="background:#f0faf0;border-radius:10px;padding:14px;font-size:13px;color:#444;text-align:left;margin:12px 0">
          🏪 ${orderData.store || 'KMG Lifestyle'}<br>
          📦 ${orderData.items || ''}<br>
          📍 ${orderData.address || ''}<br>
          💰 R${amount}<br>
          📱 Payment link sent to customer!
        </div>
        <p style="color:#666;font-size:13px">Customer WhatsApp has been notified.<br>Close this window.</p>`;

      return res.status(200).setHeader('Content-Type', 'text/html').send(
        htmlPage('✅', 'Order Approved!', '#2d7a2d', finalOrder, bodyExtra)
      );

    // ── DECLINED ─────────────────────────────────────────────────────────
    } else {
      if (KV_URL && KV_TOKEN) {
        await fetch(`${KV_URL}/set/order:${finalOrder}`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...orderData, status: 'declined' }),
        }).catch(() => {});
      }

      const msgMe = `ORDER%20DECLINED%0ARef%3A%20${finalOrder}`;
      await wa(WA_NUM, msgMe);

      if (customerWA) {
        const msgCustomer =
          `UMGODI%20ORDER%20UPDATE%0A%0A` +
          `Sorry%2C%20your%20order%20${finalOrder}%20could%20not%20be%20fulfilled%20at%20this%20time.%0A%0A` +
          `Please%20try%20again%20later.%0Aumgodi.co.za`;
        await new Promise(r => setTimeout(r, 1000));
        await wa(customerWA, msgCustomer);
      }

      return res.status(200).setHeader('Content-Type', 'text/html').send(
        htmlPage('❌', 'Order Declined', '#c0392b', finalOrder,
          `<p style="color:#666;font-size:13px">Customer has been notified via WhatsApp.<br>Close this window.</p>`)
      );
    }

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
