export const config = { runtime: 'nodejs18.x' };

export default async function handler(req, res) {
  const { order } = req.query || {};

  if (!order) {
    return res.status(400).json({ error: 'Missing order parameter' });
  }

  const KV_URL   = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;

  try {
    if (KV_URL && KV_TOKEN) {
      const kvRes = await fetch(`${KV_URL}/get/order:${order}`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
      });

      if (kvRes.ok) {
        const kvJson = await kvRes.json();
        if (kvJson.result) {
          const data = JSON.parse(kvJson.result);
          return res.status(200).json({ status: data.status || 'pending', order });
        }
      }
    }

    return res.status(200).json({ status: 'pending', order });
  } catch (err) {
    return res.status(200).json({ status: 'pending', order });
  }
}
