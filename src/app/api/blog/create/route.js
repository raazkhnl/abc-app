import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import Blog from "@/model/blog";
import { uploadToS3 } from "@/helpers/awsS3UploadHelper";

connectDB();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const category = formData.get("category");
    const priorityOrder = formData.get("priorityOrder");
    const description = formData.get("description");
    const image1 = formData.get("image") || null;

    const uploadFolder = "Blogs"
    let image = null;
    if (image1) {
      image = await uploadToS3(image1, uploadFolder);
    }
    const newBlog = new Blog({
      title,
      category,
      priorityOrder,
      description,
      image
    });

    const savedBlog = await newBlog.save();
    // console.log(savedBlog);

    return NextResponse.json({
      message: "Blog detail added",
      success: "true",
      savedBlog,
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
