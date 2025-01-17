import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a Title"],
  },

  category: {
    type: String,
    required: [true, "Please provide a Category"],
  },

  priorityOrder: {
    type: number,
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

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;
