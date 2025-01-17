import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a Title"],
  },

  category: {
    type: String,
    required: [true, "Please provide a Category"],
  },

  priorityOrder: {
    type: String,
    required: [true, "Please provide a priority order"],
  },

  image: {
    type: String,
  },

  description: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const About = mongoose.models.About || mongoose.model("About", AboutSchema);

export default About;
