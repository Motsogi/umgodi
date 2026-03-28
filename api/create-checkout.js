
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { amount, description, orderDetails } = req.body;
  const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY;
  const orderPin = Math.floor(1000 + Math.random() * 9000).toString();
  const orderNum = orderDetails?.orderNum || ('UM' + Date.now().toString().slice(-5));

  try {
    const response = await fetch('https://payments.yoco.com/api/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${YOCO_SECRET_KEY}`,
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100),
        currency: 'ZAR',
        successUrl: `https://umgodi.co.za/?payment=success&order=${orderNum}&pin=${orderPin}`,
        cancelUrl:  'https://umgodi.co.za/?payment=cancel',
        failureUrl: 'https://umgodi.co.za/?payment=failed',
        metadata: { description, orderNum, orderPin },
      }),
    });

    const data = await response.json();

    if (data.redirectUrl) {
      const msg =
        `PAYMENT%20IN%20PROGRESS%0A` +
        `Order%3A%20${orderNum}%0A` +
        `PIN%3A%20${orderPin}%0A` +
        `Amount%3A%20R${amount}%0A%0A` +
        `Share%20PIN%20with%20store%20and%20driver%20after%20payment!`;
      await fetch(`https://api.callmebot.com/whatsapp.php?phone=27686143389&text=${msg}&apikey=3188132`);

      return res.status(200).json({ redirectUrl: data.redirectUrl, orderNum, orderPin });
    } else {
      return res.status(400).json({ error: 'Yoco checkout failed', details: data });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
