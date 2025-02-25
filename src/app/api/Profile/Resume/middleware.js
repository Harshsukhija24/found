import multer from "multer";

// Configure Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadMiddleware = upload.single("resume");

const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};
export { uploadMiddleware, runMiddleware };
