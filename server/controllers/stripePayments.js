const Payments = require('../models/Payments')
const Orders = require('../models/Orders')
const ShoppingCarts = require('../models/ShoppingCarts')
require('dotenv').config();
// the secret key should be placed in .env file at the same level as index.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// TODO: the errors should be catched and send corresponding statuses
async function successPayment(req, res) {
    const sessionId = req.query.session_id;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status == "paid") {
        const metadata = session.metadata;
        const payment = await Payments.insert(metadata.amount, convertDateTimeToString(new Date()), session.payment_status);
        if (payment) {
            const paymentId = payment['insertId'];
            const order = await Orders.insert(metadata.userId, metadata.orderDateTime, paymentId);
            if (order) {
                for (let product of metadata.products.split(";")) {
                    let productSplitted = product.split(",");
                    let productCode = productSplitted[0];

                    await Orders.insertProductInOrders(order['insertId'], productCode, productSplitted[1], productSplitted[2]);
                    // remove oredred products from cart
                    await ShoppingCarts.remove(metadata.userId, productCode);
                }
            }
        }

        res.redirect('http://localhost:8080/');
    } else {
        res.send("Payment failed.")
    }
}

async function createCheckoutSession(req, res) {
    const lineItems = req.body.lineItems;
    const orderDetails = req.body.orderDetails;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:8080/",
        metadata: orderDetails
    })
    res.json({ url: session.url })
}

async function cancel(req, res) {
    res.send("Payment cancelled.")
}

function convertDateTimeToString(datetime) {
    // Extract date components
    const year = datetime.getFullYear();
    const month = String(datetime.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(datetime.getDate()).padStart(2, '0');
    const hours = String(datetime.getHours()).padStart(2, '0');
    const minutes = String(datetime.getMinutes()).padStart(2, '0');
    const seconds = String(datetime.getSeconds()).padStart(2, '0');

    // Format the date string
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
}

module.exports = {
    successPayment,
    createCheckoutSession,
    cancel
}