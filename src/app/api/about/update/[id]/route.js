import { getUrlFromFile } from "@/helpers/getUrlFromFile";
import connectDB from "@/lib/connectDB";
import About from "@/model/about";
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

  const uploadFolder = "about"
  const image =await getUrlFromFile(image1, uploadFolder)

  try {
    const newAbout = {};
    if (title) {
      newAbout.title = title;
    }
    if (category) {
      newAbout.category = category;
    }
    if (priorityOrder) {
      newAbout.priorityOrder = priorityOrder;
    }
    if (description) {
      newAbout.description = description;
    }
    if (image) {
      newAbout.image = image;
    }

  
    //Find the detail to be updated and update it
    let aboutDetail = await About.findById(params.id);
    if (!aboutDetail) {
      return NextResponse.json(
        {
          message: "Detail Not found",
        },
        {
          status: 400,
        }
      );
    }

    const updatedAbout = await About.findByIdAndUpdate(id, {
        $set:newAbout
    },{new:true});

    return NextResponse.json(
      {
        message: "About Detail updated successfully",
        updatedAbout,
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
