const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const paymentRoutes = require("./routes/payment.routes.js");
const stripe = require("stripe")(
  "sk_test_51O6QsWJGdC53RqzMKrr5WmubTo6oAGEk05LQN2PgQRZCne8XDI1FpeWbhApsHkEG2MgCHRpEuvPxPpaPUmlnakrX00mgHBPWpo"
); // Add your Secret Key Here

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(paymentRoutes);
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve("src/public")));

app.post("/stripe-checkout", async (req, res) => {
  const lineItems = req.body.items.map((item) => {
    const unitAmount = parseInt(item.price.replace(/[^0-9.-]+/g, "") * 100);
    console.log("item-price", item.price);
    console.log("unitAmount:", unitAmount);
    return {
      price_data: {
        currency: "MXN",
        product_data: {
          name: item.title,
          images: [item.productImg],
        },
        unit_amount: unitAmount,
      },
      quantity: item.quantity,
    };
  });
  console.log("lineItems:", lineItems);

  // crear checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "http://localhost:4000/succes",
    cancel_url: "http://localhost:4000/cancel.html",
    line_items: lineItems,
    //preguntar direccion en Stripe checkout page
    billing_address_collection: "required",
  });
  res.json(session.url);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Server is running..."));
