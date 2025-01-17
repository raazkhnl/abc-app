import mongoose from "mongoose";

const DocumentationSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please provide a Title of Document"],
    },

    description : {
        type: String,
        required : [true, "Please provide a description for document"],
    },

    file:{
        type: String,
    },

    date:{
        type: Date,
        default: Date.now,
    }
    
})

const Documentation = mongoose.models.Documentation || mongoose.model("Documentation", DocumentationSchema);

export default Documentation