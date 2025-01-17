import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { getUrlFromFile } from "@/helpers/getUrlFromFile";
import TestPreparation from "@/model/testPreparation";

connectDB();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const subcategory = formData.get("subcategory");
    const priorityOrder = formData.get("priorityOrder");
    const description = formData.get("description");
    const image1 = formData.get("image") || null;

    const uploadFolder = "TestPreparation";
    const image = await getUrlFromFile(image1, uploadFolder);

    const newTestPreparation = new TestPreparation({
      title,
      subcategory,
      priorityOrder,
      description,
      image,
    });

    const savedTestPreparation = await newTestPreparation.save();
    // console.log(savedTestPreparation);

    return NextResponse.json({
      message: "TestPreparation detail added",
      success: "true",
      savedTestPreparation,
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
