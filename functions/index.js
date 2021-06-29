/* eslint max-len: ["error", { "code": 200 }] */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { response } = require("express");
const stripe = require("stripe")("sk_test_51IG7xkKTxMCJ3SkZil4WUtO0WKOIjXIR5U2iA6ud72PhaM3gKMx8IuMKwhkMPGI28hKWOl8AmD5JuEZIRX5BJV7b00IgVdmJe8");


// API

// - App config

const app = express();

// - Middlewares

app.use(cors({origin: true}));
app.use(express.json());

// - API routes

app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;

    console.log("payment Request recieved Boom!!! for this amount >>>", total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    // ok -Created
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });

  });

// Listen command
exports.api = functions.https.onRequest(app);
