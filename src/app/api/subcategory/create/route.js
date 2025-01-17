import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { getUrlFromFile } from "@/helpers/getUrlFromFile";
import SubCategory from "@/model/subCategory";

connectDB();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const category = formData.get("category");
    const subcategoryName = formData.get("subcategoryName");
    const image1 = formData.get("image") || null;

    const uploadFolder = "SubCategory";
    const image = await getUrlFromFile(image1, uploadFolder);

    const newSubCategory = new SubCategory({
      category,
      subcategoryName,
      image,
    });

    const savedSubCategory = await newSubCategory.save();
    // console.log(savedSubCategory);

    return NextResponse.json({
      message: "SubCategory detail added",
      success: "true",
      savedSubCategory,
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
