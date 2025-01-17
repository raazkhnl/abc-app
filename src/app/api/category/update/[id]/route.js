import { getUrlFromFile } from "@/helpers/getUrlFromFile";
import connectDB from "@/lib/connectDB";
import Category from "@/model/category";
import { NextResponse } from "next/server";

connectDB();

export async function PUT(req, { params }) {
  const id = params.id;
  const formData = await req.formData();
  const name = formData.get("name");

  try {
    const newCategory = {};
    if (name) {
      newCategory.name = name;
    }

  
    //Find the detail to be updated and update it
    let categoryDetail = await Category.findById(params.id);
    if (!categoryDetail) {
      return NextResponse.json(
        {
          message: "Detail Not found",
        },
        {
          status: 400,
        }
      );
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, {
        $set:newCategory
    },{new:true});

    return NextResponse.json(
      {
        message: "Category updated successfully",
        updatedCategory,
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
