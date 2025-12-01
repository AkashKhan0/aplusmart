import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (base64File, folder = "products") => {
  try {
    const uploadResult = await cloudinary.uploader.upload(base64File, {
      folder,
      resource_type: "image",
    });

    return uploadResult.secure_url;

  } catch (err) {
    console.error("REAL CLOUDINARY ERROR:", err);
    throw err;   // so we see exact cause
  }
};
