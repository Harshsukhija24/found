// pages/api/Profile/Resume.js

import cloudinary from "cloudinary";
import formidable from "formidable";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(500).json({ error: "Error parsing form" });
    }

    try {
      const result = await cloudinary.uploader.upload(files.resume.path, {
        folder: "resumes", // Optional: Specify a folder in Cloudinary to upload the file
      });

      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error("Error uploading resume to Cloudinary:", error);
      res.status(500).json({ error: "Error uploading resume to Cloudinary" });
    }
  });
};
