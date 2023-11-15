require('dotenv').config();
// the secret key should be placed in .env file at the same level as index.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function successPayment(req, res) {
    const sessionId = req.query.session_id;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status == "paid") {
        res.send("Payment successful.")
    } else {
        res.send("Payment failed.")
    }
}

async function createCheckoutSession(req, res) {
    const products = req.body;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: products,
        mode: "payment",
        success_url: "http://localhost:8080/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:8080/"
    })

    res.json({ url: session.url })
}

async function cancel(req, res) {
    res.send("Payment cancelled.")
}

module.exports = {
    successPayment,
    createCheckoutSession,
    cancel
}