import { getUrlFromFile } from "@/helpers/getUrlFromFile";
import connectDB from "@/lib/connectDB";
import HomePageBanner from "@/model/homepagebanner";
import { NextResponse } from "next/server";

connectDB();

export async function PUT(req, { params }) {
  const id = params.id;
  const formData = await req.formData();
  const image1 = formData.get("image") || null;

  const uploadFolder = "HomePageBanner"
  const image =await getUrlFromFile(image1, uploadFolder)

  try {
    const newHomePage = {};
    if (image) {
      newHomePage.image = image;
    }
  
    //Find the detail to be updated and update it
    let homePageBannerDetail = await HomePageBanner.findById(params.id);
    if (!homePageBannerDetail) {
      return NextResponse.json(
        {
          message: "Detail Not found",
        },
        {
          status: 400,
        }
      );
    }

    const updatedHomePage = await HomePageBanner.findByIdAndUpdate(id, {
        $set:newHomePage
    },{new:true});

    return NextResponse.json(
      {
        message: "homepagebanner updated successfully",
        updatedHomePage,
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
