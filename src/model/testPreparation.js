import mongoose from "mongoose";

const TestPreparationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
    },

    subcategory: {
        type: String,
        required: [true, "Please provide a subcategory"],

    },

    priorityOrder: {
        type: String,
        required: [true, "Please provide a priorityOrder"],
    },

    description: {
        type: String,
        required: [true, "Please provide a description"],
    },

    image: {
        type: String,
    },

    date: {
        type: Date,
        default: Date.now,
    }

})

const TestPreparation = mongoose.models.TestPreparation || mongoose.model("TestPreparation", TestPreparationSchema);

export default TestPreparation