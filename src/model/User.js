import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: [true, "Please provide a fullname"],
    },

    email : {
        type: String,
        required : [true, "Please provide a fullname"],
        unique : true,
    },

    isAdmin : {
        type: Boolean,
        default: true,
    },

    password:{
        type: String,
        required : [true, "Please provide a password"],
    },

    date:{
        type: Date,
        default: Date.now,
    }


})

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User