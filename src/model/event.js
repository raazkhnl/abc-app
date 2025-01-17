import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
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
    
})

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event