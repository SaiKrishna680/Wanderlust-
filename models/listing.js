const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:String,
    image:{
        // type:String,
        // default:"https://plus.unsplash.com/premium_photo-1681422570054-9ae5b8b03e46?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnJlZXxlbnwwfHwwfHx8MA%3D%3D",
        // set: (v)=>
        //     v === ""
        //         ? "https://plus.unsplash.com/premium_photo-1681422570054-9ae5b8b03e46?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnJlZXxlbnwwfHwwfHx8MA%3D%3D"
        //         : v,
        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: { $in: listing.reviews }});
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;