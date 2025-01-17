import connectDB from "@/lib/connectDB";
import Org from "@/model/organizationSetting";
import { NextResponse } from "next/server";
import { getUrlFromFile } from "@/helpers/getUrlFromFile";

connectDB();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const orgname = formData.get("orgname");
    const location = formData.get("location");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const logo1 = formData.get("logo") || null;
    const footerlogo1 = formData.get("footerlogo") || null;
    const instalink = formData.get("instalink");
    const fblink = formData.get("fblink");
    const tiktoklink = formData.get("tiktoklink");

    const uploadFolder = "organizationSetting"
    const logo =await getUrlFromFile(logo1, uploadFolder)
    const footerlogo =await getUrlFromFile(footerlogo1, uploadFolder)

    const newOrg = new Org({
        orgname,
        location,
        phone,
        email,
        logo,
        footerlogo,
        instalink,
        fblink,
        tiktoklink,});

    const savedOrg = await newOrg.save();
    console.log(savedOrg);

    return NextResponse.json({
      message: "Organization detail added",
      success: "true",
      savedOrg,
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
