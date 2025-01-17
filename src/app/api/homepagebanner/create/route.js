import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { getUrlFromFile } from "@/helpers/getUrlFromFile";
import HomePageBanner from "@/model/homepagebanner";

connectDB();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image1 = formData.get("image") || null;

    const uploadFolder = "HomePageBanner"
    const image =await getUrlFromFile(image1, uploadFolder)

    const newHomePage = new HomePageBanner({
        image,
    });

    const savedHomePage = await newHomePage.save();
    // console.log(savedHomePage);

    return NextResponse.json({
      message: "HomePageBanner detail added",
      success: "true",
      savedHomePage,
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
