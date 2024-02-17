import express from "express";
import Stripe from "stripe";

const app = express();
const port = 3000;
const PUBLISHABLE_KEY = "pk_test_51OkjWJSDcRpVOB6SfuXA0Qesh0q8vsRL2zXV0ytTs6ITzPQl9pglX8LqnQCqPSBeb7Yww95fP5860zom3ELv40ZY00c9MzD9O2";
const SECRET_KEY = "sk_test_51OkjWJSDcRpVOB6SBiiXkiBifWqU05H2RU4zaWRDq9R4kpn4qEtenocIJL6s9nEmUd7jgA1uXaPqpwo4yfBbmkDJ00sHt4ikIu";

const stripe = new Stripe(SECRET_KEY, {
  apiVersion: "2020-08-27",
});
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try{
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 111,
      currency: "inr",
      payment_method_types: ["card"],
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({clientSecret: clientSecret})
  } catch(e){
    console.log(e.message);
    res.json({error: e.message});
  }
});
