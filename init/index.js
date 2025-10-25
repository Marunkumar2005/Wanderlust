const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://localhost:27017/wanderLust"


main().then(() => {
    console.log("connected to db");

})
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);

}
const initDB = async (req, res) => {
    await Listing.deleteMany({});
    //adding the owner field to each object in the data.js
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "68e1d5f6974ca7ac8ea7ce81" , geometry: {
      type: "Point",
      coordinates: [77.5946, 12.9716], // default coords (Bangalore)
    },}));

    await Listing.insertMany(initData.data);
    console.log("data was initialized");

}
//calling initDb
initDB();
