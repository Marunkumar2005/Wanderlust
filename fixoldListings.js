require('dotenv').config();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

mongoose.connect("mongodb://localhost:27017/wanderLust")
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));

// ... rest of your fixOldListings() function
