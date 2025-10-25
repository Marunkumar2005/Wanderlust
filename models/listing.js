const { number, required } = require('joi');
const mongoose = require('mongoose');
const { type } = require('os');
const review = require('./review');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title:
  {
    type: String,
    required: true,
  }
  ,
  description: String,
  image: {
    url:String,
    filename:String,
  },

  // image: {
  //   filename: {
  //     type: String,
  //     default: "boyimage.jpg",
  //   },
  //   url: {
  //     type: String,
  //     default: "https://example.com/default-image.jpg", // Optional
  //   }
  // },
  price: Number,
  location: String,
  country: String,
  reviews:
    [{
      type: Schema.Types.ObjectId,
      ref: "review",
    }
    ],
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",

  },

 geometry: {
  type: {
    type: String,
    enum: ['Point'], // 'geometry.type' must be 'Point'
    required: true,
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true,
  },
},

});


//for deleting the review in listing database
listingSchema.post("finOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
})

const Listing = mongoose.model("listing", listingSchema);
module.exports = Listing;


