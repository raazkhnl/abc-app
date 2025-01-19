import connectDB from "@/lib/connectDB";
import Blog from "@/model/blog";
import { NextResponse } from "next/server";
import { uploadToS3 } from "@/helpers/awsS3UploadHelper";
import { deleteFromS3 } from "@/helpers/awsS3DeleteHelper";

connectDB();

export async function PUT(req, { params }) {
  const id = params.id;
  const formData = await req.formData();
  const title = formData.get("title");
  const category = formData.get("category");
  const priorityOrder = formData.get("priorityOrder");
  const description = formData.get("description");
  const image1 = formData.get("image") || null;

  const uploadFolder = "Blogs";
  let image = null;
  if (image1) {
    image = await uploadToS3(image1, uploadFolder);
  }
  let blogDetail = await Blog.findById(params.id);
  //Find the detail to be updated and update it
  if (!blogDetail) {
    return NextResponse.json(
      {
        message: "Detail Not found",
      },
      {
        status: 400,
      }
    );
  }
  
  try {
    const newBlog = {};
    if (title) {
      newBlog.title = title;
    }
    if (category) {
      newBlog.category = category;
    }
    if (priorityOrder) {
      newBlog.priorityOrder = priorityOrder;
    }
    if (description) {
      newBlog.description = description;
    }
    if (image) {
      if (blogDetail.image) {
        try {
          await deleteFromS3(blogDetail.image);
        } catch (s3Error) {
          console.error("Error deleting image from S3:", s3Error);
        }
      }
      newBlog.image = image;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $set: newBlog,
      },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "Blog detail updated successfully",
        updatedBlog,
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
