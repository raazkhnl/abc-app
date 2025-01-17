import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { getUrlFromFile } from "@/helpers/getUrlFromFile";
import About from "@/model/about";

connectDB();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const category = formData.get("category");
    const priorityOrder = formData.get("priorityOrder");
    const description = formData.get("description");
    const image1 = formData.get("image") || null;

    const uploadFolder = "About"
    const image =await getUrlFromFile(image1, uploadFolder)

    const newAbout = new About({
        title,
        category,
        priorityOrder,
        description,
        image,
    });

    const savedAbout = await newAbout.save();
    console.log(savedAbout);

    return NextResponse.json({
      message: "About detail added",
      success: "true",
      savedAbout,
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
