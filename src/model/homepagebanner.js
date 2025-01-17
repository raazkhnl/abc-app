import mongoose from "mongoose";

const HomePageBannerSchema = new mongoose.Schema({
    image:{
        type: String
    },

    date:{
        type: Date,
        default: Date.now,
    }
    
})

const HomePageBanner = mongoose.models.HomePageBanner || mongoose.model("HomePageBanner", HomePageBannerSchema);

export default HomePageBanner