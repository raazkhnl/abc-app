import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { getUrlFromFile } from "@/helpers/getUrlFromFile";
import Gallery from "@/model/gallery";

connectDB();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const image1 = formData.get("image") || null;

    const uploadFolder = "Gallery";
    const image = await getUrlFromFile(image1, uploadFolder);

    const newGallery = new Gallery({
      title,
      image,
    });

    const savedGallery = await newGallery.save();
    // console.log(savedGallery);

    return NextResponse.json({
      message: "Gallery detail added",
      success: "true",
      savedGallery,
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
