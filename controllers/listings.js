const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// INDEX - show all listings
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
};

// NEW - render form to create new listing
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};

// CREATE - create a new listing
module.exports.createListing = async (req, res, next) => {
    try {
        let response = await geocodingClient
            .forwardGeocode({
                query: req.body.listing.location,
                limit: 1,
            })
            .send();

        const url = req.file.path;
        const filename = req.file.filename;

        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url, filename };
        newListing.geometry = {
            type: "Point",
            coordinates: response.body.features[0].geometry.coordinates,
        };

        await newListing.save();
        req.flash("success", "New listing created!");
        res.redirect("/listings");
    } catch (e) {
        next(e);
    }
};

// SHOW - show details for one listing
module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" }
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect("/listings");
    }

    res.render("listings/show", { listing });
};

// EDIT - render form to edit listing
module.exports.rederEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url.replace("/upload", "/upload/h_150,w_300");
    res.render("listings/edit", { listing, originalImageUrl });
};

// UPDATE - update a listing
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (req.file) {
        const url = req.file.path;
        const filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
};

// DELETE - delete a listing
module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
};
