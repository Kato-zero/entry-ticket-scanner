export default async function handler(req, res) {
  // Lipila usually sends JSON
  const event = req.body;
  console.log("Webhook received:", event);

  if (event.status === "Successful") {
    console.log("Payment successful:", event.referenceId);
    // TODO: save to DB, mark order paid, etc.
  }

  res.status(200).send("ok");
}
