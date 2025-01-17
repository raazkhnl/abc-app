import connectDB from "@/lib/connectDB";
import Org from "@/model/organizationSetting";
import { NextResponse } from "next/server";
import { getUrlFromFile } from "@/helpers/getUrlFromFile";

connectDB();

export async function PUT(req, { params }) {
  const id = params.id;
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
  try {
    const newOrg = {};
    if (orgname) {
      newOrg.orgname = orgname;
    }
    if (location) {
      newOrg.location = location;
    }
    if (phone) {
      newOrg.phone = phone;
    }
    if (email) {
        newOrg.email = email;
      }
      if (logo) {
        newOrg.logo = logo;
      }
      if (footerlogo) {
        newOrg.footerlogo = footerlogo;
      }
      if (instalink) {
        newOrg.instalink = instalink;
      }
      if (fblink) {
        newOrg.fblink = fblink;
      }
      if (tiktoklink) {
        newOrg.tiktoklink = tiktoklink;
      }
    //Find the detail to be updated and update it
    let orgDetail = await Org.findById(params.id);
    if (!orgDetail) {
      return NextResponse.json(
        {
          message: "Detail Not found",
        },
        {
          status: 400,
        }
      );
    }

    const updatedOrg = await Org.findByIdAndUpdate(id, {
        $set:newOrg
    },{new:true});

    return NextResponse.json(
      {
        message: "Organization detail updated successfully",
        updatedOrg,
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
