import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { amount, name } = req.body;

  const referenceId = crypto.randomUUID();

  try {
    const lipilaRes = await fetch(
      "https://api.lipila.dev/api/v1/collections/mobile-money",
      {
        method: "POST",
        headers: {
          "accept": "application/json",
          "x-api-key": process.env.LIPILA_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          callbackUrl: "https://YOUR-DOMAIN.vercel.app/api/webhook",
          referenceId,
          amount,
          narration: `Checkout payment by ${name}`,
          accountNumber: "260972643310",
          currency: "ZMW",
          redirectUrl: "https://YOUR-DOMAIN.vercel.app/success.html"
        })
      }
    );

    const lipila = await lipilaRes.json();

    return res.status(200).json({
      referenceId,
      redirectUrl: lipila.cardRedirectionUrl
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Payment failed" });
  }
}
