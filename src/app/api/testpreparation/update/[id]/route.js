import { getUrlFromFile } from "@/helpers/getUrlFromFile";
import connectDB from "@/lib/connectDB";
import TestPreparation from "@/model/testPreparation";
import { NextResponse } from "next/server";

connectDB();

export async function PUT(req, { params }) {
  const id = params.id;
  const formData = await req.formData();
  const title = formData.get("title");
  const subcategory = formData.get("subcategory");
  const priorityOrder = formData.get("priorityOrder");
  const description = formData.get("description");
  const image1 = formData.get("image") || null;

  const uploadFolder = "TestPreparation"
  const image =await getUrlFromFile(image1, uploadFolder)

  try {
    const newTestPreparation = {};
    if (title) {
      newTesPreparation.title = title;
    }
    if (subcategory) {
      newTesPreparation.subcategory = subcategory;
    }
    if (priorityOrder) {
      newTesPreparation.priorityOrder = priorityOrder;
    }
    if (description) {
      newTesPreparation.description = description;
    }
    if (image) {
      newTesPreparation.image = image;
    }
  
    //Find the detail to be updated and update it
    let testPreparationDetail = await TestPreparation.findById(params.id);
    if (!testPreparationDetail) {
      return NextResponse.json(
        {
          message: "Detail Not found",
        },
        {
          status: 400,
        }
      );
    }

    const updatedTestPreparation = await TestPreparation.findByIdAndUpdate(id, {
        $set:newTestPreparation
    },{new:true});

    return NextResponse.json(
      {
        message: "TestPreparation detail updated successfully",
        updatedTestPreparation,
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
