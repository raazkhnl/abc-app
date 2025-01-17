import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { getUrlFromFile } from "@/helpers/getUrlFromFile";
import Event from "@/model/event";

connectDB();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const category = formData.get("category");
    const priorityOrder = formData.get("priorityOrder");
    const description = formData.get("description");
    const image1 = formData.get("image") || null;

    const uploadFolder = "Event";
    const image = await getUrlFromFile(image1, uploadFolder);

    const newEvent = new Event({
      title,
      category,
      priorityOrder,
      description,
      image,
    });

    const savedEvent = await newEvent.save();
    // console.log(savedEvent);

    return NextResponse.json({
      message: "Event detail added",
      success: "true",
      savedEvent,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
