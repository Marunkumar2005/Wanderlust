const Listing=require("../models/listing");
const Review=require("../models/review");


module.exports.createReview=async (req, res) => {

    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    newReview.author = req.user._id;
    

    await newReview.save();
    await listing.save();
    req.flash("success", "new Review created!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.showReview=async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate({
    path: "reviews",
    populate: { path: "author" },
  });

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  res.render("reviews/show", { listing });
};

module.exports.destroyReview=async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", " Review deleted successfully!");
    res.redirect(`/listings/${id}`);


};
