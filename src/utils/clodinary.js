import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (localFilePath) => {
  try {
  //  console.log("\n local file path:", localFilePath);
    if (!localFilePath) {
      console.error("No local file path provided!");
      return null; // Return null if the file path is not valid
    }
    const originalFileName = (localFilePath.split("/")[2]).split('.')[0];
    console.log("\n file name :",originalFileName)
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      public_id: originalFileName,
     
    });
  //  console.log("File is uploaded on cloudinary", response.url);

    // Only call fs.unlinkSync if the file path is valid
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // Delete the file locally after uploading
    }

    return response;
  } catch (error) {
    console.error("Error during file upload:", error);

    // Ensure file deletion even if upload fails, but only if the path is valid
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export { uploadCloudinary };
