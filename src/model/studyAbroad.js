import mongoose from "mongoose";
import SubCategory from "./subCategory";

const StudyAbroadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },

  subCategory: {
    type: String,
    required: [true, "Please provide a SubCategory"],
  },

  description: {
    type: String,
    required: [true, "Please provide a description"],
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const StudyAbroad =
  mongoose.models.StudyAbroad ||
  mongoose.model("StudyAbroad", StudyAbroadSchema);

export default StudyAbroad;
