export const config = { runtime: 'nodejs18.x' };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { orderDetails, amount } = req.body;
    const orderNum = 'UM' + Date.now().toString().slice(-6);
    const customerWA = orderDetails.customerWA || '';

    // Store order in Vercel KV
    const KV_URL = process.env.KV_REST_API_URL;
    const KV_TOKEN = process.env.KV_REST_API_TOKEN;

    if (KV_URL && KV_TOKEN) {
      await fetch(`${KV_URL}/set/order:${orderNum}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'pending',
          amount,
          store: orderDetails.store,
          items: orderDetails.items,
          address: orderDetails.address,
          zone: orderDetails.zone,
          customerWA,
        }),
      });

      // Expire order data after 24 hours
      await fetch(`${KV_URL}/expire/order:${orderNum}/86400`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
      });
    }

    // Short clean URLs — WhatsApp won't mangle these
    const approveUrl = `https://umgodi.co.za/api/approve-order/${orderNum}/yes`;
    const declineUrl = `https://umgodi.co.za/api/approve-order/${orderNum}/no`;

    const WA = (num, text) =>
      `https://api.callmebot.com/whatsapp.php?phone=${num}&text=${text}&apikey=3188132`;

    // Message 1 — Order details
    const msg1 =
      `NEW%20UMGODI%20ORDER%0A` +
      `Ref%3A%20${orderNum}%0A` +
      `Store%3A%20${encodeURIComponent(orderDetails.store)}%0A` +
      `Items%3A%20${encodeURIComponent(orderDetails.items)}%0A` +
      `Address%3A%20${encodeURIComponent(orderDetails.address)}%0A` +
      `Zone%3A%20${encodeURIComponent(orderDetails.zone)}%0A` +
      `Amount%3A%20R${amount}%0A` +
      `Customer%20WA%3A%20${customerWA || 'Not%20provided'}`;

    // Message 2 — Approve (own message so link is clean and tappable)
    const msg2 = `APPROVE%20${orderNum}%0A${encodeURIComponent(approveUrl)}`;

    // Message 3 — Decline (own message so link is clean and tappable)
    const msg3 = `DECLINE%20${orderNum}%0A${encodeURIComponent(declineUrl)}`;

    await fetch(WA('27686143389', msg1));
    await new Promise(r => setTimeout(r, 1500));
    await fetch(WA('27686143389', msg2));
    await new Promise(r => setTimeout(r, 1500));
    await fetch(WA('27686143389', msg3));

    return res.status(200).json({ success: true, orderNum });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
