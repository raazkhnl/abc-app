import mongoose from "mongoose";

const OrgSchema = new mongoose.Schema({
    orgname:{
        type: String,
        required: [true, "Please provide a org name"],
    },

    location:{
        type: String,
        required: [true, "Please provide an address"],
    },

    phone:{
        type: String,
        required: [true, "Please provide an phone no"],
    },

    email : {
        type: String,
        required : [true, "Please provide a fullname"],
        unique : true,
    },

    logo:{
        type: String,
    },

    footerlogo:{
        type: String,
    },

    instalink : {
        type: String,
    },

    fblink : {
        type: String,
    },

    tiktoklink : {
        type: String,
    },

    ytlink : {
        type: String,
    },

    date:{
        type: Date,
        default: Date.now,
    }
})

const Org = mongoose.models.Org || mongoose.model("Org", OrgSchema);

export default Org