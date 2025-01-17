import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide a category name"],
    },
    
})

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category