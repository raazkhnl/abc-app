import { getUrlFromFile } from "@/helpers/getUrlFromFile";
import connectDB from "@/lib/connectDB";
import Gallery from "@/model/gallery";
import { NextResponse } from "next/server";

connectDB();

export async function PUT(req, { params }) {
  const id = params.id;
  const formData = await req.formData();
  const title = formData.get("title");
  const image1 = formData.get("image") || null;

  const uploadFolder = "Gallery"
  const image =await getUrlFromFile(image1, uploadFolder)

  try {
    const newGallery = {};
    if (title) {
      newGallery.title = title;
    }
    if (image) {
      newGallery.image = image;
    }
  
    //Find the detail to be updated and update it
    let galleryDetail = await Gallery.findById(params.id);
    if (!galleryDetail) {
      return NextResponse.json(
        {
          message: "Detail Not found",
        },
        {
          status: 400,
        }
      );
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(id, {
        $set:newGallery
    },{new:true});

    return NextResponse.json(
      {
        message: "Gallery detail updated successfully",
        updatedGallery,
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
