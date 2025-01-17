import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please provide a title"],
    },

    image:{
        type: String,
    },

    date:{
        type: Date,
        default: Date.now,
    }
    
})

const Gallery = mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);

export default Gallery