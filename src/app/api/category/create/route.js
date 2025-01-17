import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
// import { getUrlFromFile } from "@/helpers/getUrlFromFile";
import Category from "@/model/category";

connectDB();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");

    const newCategory = new Category({
        name,
    });

    const savedCategory = await newCategory.save();
    // console.log(savedCategory);

    return NextResponse.json({
      message: "Category added",
      success: "true",
      savedCategory,
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
