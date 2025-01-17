import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide a fullname"],
    },

    description : {
        type: String,
        required : [true, "Please provide a description"],
    },

    image:{
        type: String,
    },

    date:{
        type: Date,
        default: Date.now,
    }
    
})

const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);

export default Testimonial