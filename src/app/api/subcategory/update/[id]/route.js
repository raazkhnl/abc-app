import { getUrlFromFile } from "@/helpers/getUrlFromFile";
import connectDB from "@/lib/connectDB";
import SubCategory from "@/model/subCategory";
import { NextResponse } from "next/server";

connectDB();

export async function PUT(req, { params }) {
  const id = params.id;
  const formData = await req.formData();
  const category = formData.get("category");
  const subcategoryName = formData.get("subcategoryName");
  const image1 = formData.get("image") || null;

  const uploadFolder = "SubCategory"
  const image =await getUrlFromFile(image1, uploadFolder)

  try {
    const newSubCategory = {};
    if (category) {
      newSubCategory.category = category;
    }
    if (subcategoryName) {
      newSubCategory.subcategoryName = subcategoryName;
    }
    if (image) {
      newSubCategory.image = image;
    }
  
    //Find the detail to be updated and update it
    let subCategoryDetail = await SubCategory.findById(params.id);
    if (!subCategoryDetail) {
      return NextResponse.json(
        {
          message: "Detail Not found",
        },
        {
          status: 400,
        }
      );
    }

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(id, {
        $set:newSubCategory
    },{new:true});

    return NextResponse.json(
      {
        message: "SubCategory detail updated successfully",
        updatedSubCategory,
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
