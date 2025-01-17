import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { getUrlFromFile } from "@/helpers/getUrlFromFile";
import Documentation from "@/model/documentation";

connectDB();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const file1 = formData.get("file") || null;

    const uploadFolder = "documentation"
    const file =await getUrlFromFile(file1, uploadFolder)

    const newDocument = new Documentation({
        title,
        description,
        image,
        file,
    });

    const savedDocument = await newDocument.save();
    // console.log(savedDocument);

    return NextResponse.json({
      message: "Document detail added",
      success: "true",
      savedDocument,
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
