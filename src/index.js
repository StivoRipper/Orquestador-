const express = require('express');
const axios = require("axios");
const bodyParser = require('body-parser');
const morgan = require ('morgan');
const path = require('path');
const paymentRoutes = require ("./routes/payment.routes.js")
const stripe = require('stripe')('sk_test_51O6QsWJGdC53RqzMKrr5WmubTo6oAGEk05LQN2PgQRZCne8XDI1FpeWbhApsHkEG2MgCHRpEuvPxPpaPUmlnakrX00mgHBPWpo'); // Add your Secret Key Here

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(paymentRoutes);
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve('src/public')))

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server is running...'));
