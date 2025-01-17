import mongoose from "mongoose";

const ContactUsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide a fullname"],
    },

    phone : {
        type: String,
    },

    email:{
        type: String,
        required: [true, "Please provide a valid email"],
    },

    description:{
        type : String,
    },

    date:{
        type: Date,
        default: Date.now,
    }
    
})

const ContactUs = mongoose.models.ContactUs || mongoose.model("ContactUs", ContactUsSchema);

export default ContactUs