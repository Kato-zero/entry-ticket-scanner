export default async function handler(req, res) {
  console.log("Webhook received:", req.body);
  res.status(200).json({ received: true });
}
