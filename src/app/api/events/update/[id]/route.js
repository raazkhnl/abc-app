import { getUrlFromFile } from "@/helpers/getUrlFromFile";
import connectDB from "@/lib/connectDB";
import Event from "@/model/event";
import { NextResponse } from "next/server";

connectDB();

export async function PUT(req, { params }) {
  const id = params.id;
  const formData = await req.formData();
  const title = formData.get("title");
  const category = formData.get("category");
  const priorityOrder = formData.get("priorityOrder");
  const description = formData.get("description");
  const image1 = formData.get("image") || null;

  const uploadFolder = "Event"
  const image =await getUrlFromFile(image1, uploadFolder)

  try {
    const newEvent = {};
    if (title) {
      newEvent.title = title;
    }
    if (category) {
      newEvent.category = category;
    }
    if (priorityOrder) {
      newEvent.priorityOrder = priorityOrder;
    }
    if (description) {
      newEvent.description = description;
    }
    if (image) {
      newEvent.image = image;
    }
  
    //Find the detail to be updated and update it
    let eventDetail = await Event.findById(params.id);
    if (!eventDetail) {
      return NextResponse.json(
        {
          message: "Detail Not found",
        },
        {
          status: 400,
        }
      );
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, {
        $set:newEvent
    },{new:true});

    return NextResponse.json(
      {
        message: "Event detail updated successfully",
        updatedEvent,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}
