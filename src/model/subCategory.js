import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
    category:{
        type: String,
        required: [true, "Please provide a category"],
    },

    subcategoryName : {
        type: String,
        required : [true, "Please provide a subcategory nme"],
    },

    image:{
        type: String,
    },

    date:{
        type: Date,
        default: Date.now,
    }
    
})

const SubCategory = mongoose.models.SubCategory || mongoose.model("SubCategory", SubCategorySchema);

export default SubCategory