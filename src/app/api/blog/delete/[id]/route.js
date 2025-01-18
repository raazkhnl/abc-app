// app/api/blog/[id]/route.js
import { deleteFromS3 } from "@/helpers/awsS3DeleteHelper";
import connectDB from "@/lib/connectDB";
import Blog from "@/model/blog";
import { NextResponse } from "next/server";

connectDB();

export async function DELETE(req, { params }) {
  try {
    let blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json({
        message: "Blog not found to be deleted"
      }, { status: 404 });
    }

    if (blog.image) {
      try {
        await deleteFromS3(blog.image);
      } catch (s3Error) {
        console.error("Error deleting image from S3:", s3Error);
      }
    }

    blog = await Blog.findByIdAndDelete(params.id);
    
    return NextResponse.json({
      message: "Blog and associated image have been deleted",
      success: true
    }, { status: 200 });

  } catch (error) {
    console.error("Error in blog deletion:", error);
    return NextResponse.json({
      message: error.message
    }, { status: 500 });
  }
}