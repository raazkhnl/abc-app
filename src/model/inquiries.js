import mongoose from "mongoose";

const InquiriesSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide a fullname"],
    },

    phone : {
        type: String,
        required : [true, "Please provide a phone number"],
    },

    email:{
        type: String,
        required: [true, "Please provide a valid email"],
    },

    destination:{
        type : String,
        required: [true, "Please provide a destination"],
    },

    date:{
        type: Date,
        default: Date.now,
    }
    
})

const Inquiries = mongoose.models.Inquiries || mongoose.model("Inquiries", InquiriesSchema);

export default Inquiries