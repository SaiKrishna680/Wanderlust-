if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();   
}
// console.log(process.env.SECRET);


const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
const path = require("path");
const methodOverriding = require("method-override");
const ejsMate = require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
// const {listingSchema,reviewSchema} = require("./schema.js");
// const Review = require("./models/review.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const dburl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error(err);
    });
    
// async function main() {
//     await mongoose.connect(MONGO_URL);
// }

async function main() {
    await mongoose.connect(dburl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverriding("_method")); // For PUT and DELETE requests
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
    mongoUrl: dburl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter: 25 * 3600,
});

store.on("error",()=>{
    console.error("ERROR in MONGO SESSION STORE",err);
})

const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days expiry time  // 1 hour expiry time  // 1 minute expiry time  // 1 second expiry time  // 1 millisecond expiry time   // 30 days * 24 hours/day * 60 minutes/hour * 60 seconds/minute = 86,4 
        maxAge: 1000 * 60 * 60 * 24 * 7,// 7 days expiry time  // 1 hour expiry time  // 1 minute expiry time  // 1 second expiry time  // 1 millisecond expiry time   // 30 days * 24 hours/day * 60 minutes/hour * 60 seconds/minute = 86,40
        httpOnly: true, // To prevent client-side JavaScript from accessing the cookie
    },
};

// app.get("/", (req, res) => {
//     res.send("Hello, Wanderlust!");
// });

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success"); 
    // console.log(res.locals.success);
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;  // to access the current user in the templates  // req.user is the user object stored in the session upon successful login
    
    next();
});

// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         email:"student@gmail.com",
//         username:"delta-student",
//     });

//     let registeredUser = await User.register(fakeUser,"helloworld");
//     res.send(registeredUser);
// });

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

// app.get("/testListing",async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new villa",
//         description: "By the Beach.",
//         price: 1200,
//         location: "Calanguta goa",
//         country: "India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("Successful testing!");
// })

app.all("*",(req,res,next) => {
    next(new ExpressError(404,"Page Not Found!"));
});

// Middelware

app.use((err,req,res,next) => {
    let {statusCode=500, message="Something went wrong!"} = err;
    res.status(statusCode).render("error.ejs",{message});
    // res.status(statusCode).send(message);
});

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
})