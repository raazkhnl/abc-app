import { getUrlFromFile } from "@/helpers/getUrlFromFile";
import connectDB from "@/lib/connectDB";
import Blog from "@/model/blog";
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

  const uploadFolder = "testimonials"
  const image =await getUrlFromFile(image1, uploadFolder)

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
      newBlog.image = image;
    }
  
    //Find the detail to be updated and update it
    let blogDetail = await Blog.findById(params.id);
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

    const updatedBlog = await Blog.findByIdAndUpdate(id, {
        $set:newBlog
    },{new:true});

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
