
const User = require("../models/user");
module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
};


module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);

            }
            req.flash("success", "welcome to wanderlust");
            res.redirect("/listings");
        });

    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");

    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");


};

module.exports.Login = async (req, res) => {
    req.flash("success", "welcome to wanderlust !you are logged in");
    let redirectUrl = res.locals.redirectUrl || "/listings";
      if (redirectUrl.includes("/reviews/")) {
        const parts = redirectUrl.split("/");
        const listingIdIndex = parts.indexOf("listings") + 1;
        const listingId = parts[listingIdIndex];
        redirectUrl = `/listings/${listingId}`;
    }
    res.redirect(redirectUrl);
};

module.exports.Logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            next(err);

        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");


    });
};
