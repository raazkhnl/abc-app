import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import _ from "lodash";

export const getUrlFromFile = async(file, upload) =>{
        if(!file){
            return null
        }
        else{
            const buffer = Buffer.from(await file.arrayBuffer());
            const relativeUploadDir = `/files/${upload}/${new Date(Date.now())
                .toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })
                .replace(/\//g, "-")}`;
                const uploadDir = join(process.cwd(), "public", relativeUploadDir);
                try {
                    await stat(uploadDir);
                } catch (e) {
                    if (e.code === "ENOENT") {
                        // This is for checking the directory is exist (ENOENT : Error No Entry)
                        await mkdir(uploadDir, { recursive: true });
                    } else {
                        console.error(
                            "Error while trying to create directory when uploading a file\n",
                            e
                        );
                    }
                }
                const uniqueSuffix = `${Date.now()}-${Math.round(
                    Math.random() * 1e9
                )}`;
                const filename = `${file.name.replace(
                    /\.[^/.]+$/,
                    ""
                )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
                await writeFile(`${uploadDir}/${filename}`, buffer);
                const fileUrl = `${relativeUploadDir}/${filename}`;
          
                return fileUrl;    
        } 
}