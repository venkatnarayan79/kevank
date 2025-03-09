import express from "express";
import { connect, Schema, model } from "mongoose";
import cors from "cors";
import pkg from 'body-parser';
const { json } = pkg;

const app = express();
const port = 5001;
//const mongoose = require("mongoose");

// Middleware
app.use(cors());
app.use(json());

// Use Heroku Config Var or fallback to local MongoDB
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/myLocalDB";

// MongoDB connection
//connect("mongodb://localhost:27017/rentalApp", { useNewUrlParser: true, useUnifiedTopology: true })
//  .then(() => console.log("Connected to MongoDB"))
//  .catch((err) => console.log(err));

connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


// Schema for rental details
const rentalSchema = new Schema({
  item: String,
  startDate: Date,
  endDate: Date,
  zipCode: String,
  name: String,
  email: String,
  message: String,
});

// Define Listing Schema
const listingSchema = new Schema({
    name: String,
    email: String,
    productName: String,
    description: String,
    image: String, // Store image as a URL or base64 string
    rentalPrice: Number,
    zipCode: String,
  });

const Rental = model("Rental", rentalSchema);
const Listing = model("Listing", listingSchema);

// API route to handle rental data submission
app.post("/submit-rental", (req, res) => {
  const rentalData = new Rental(req.body);

  rentalData.save()
    .then(() => res.json({ message: "Rental request saved successfully" }))
    .catch((err) => res.status(500).json({ message: "Error saving rental request", error: err }));
});

// API Route to Save Listing
app.post("/api/listings", async (req, res) => {
    try {
      const newListing = new Listing(req.body);
      await newListing.save();
      res.status(201).json({ message: "Listing created successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Error saving listing" });
    }
  });
  
  // API Route to Get All Listings
  app.get("/api/listings", async (req, res) => {
    try {
      const listings = await Listing.find();
      res.json(listings);
    } catch (error) {
      res.status(500).json({ error: "Error fetching listings" });
    }
  });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
