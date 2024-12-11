import { fileType } from "../Utils/fileTypeValidate.js";

export const Verifyfile = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ status: 400, message: "File is required" });
  }

  const file = req.files.file;
 let message = fileType(file?.mimetype);
 

  if (message !== true) {
    return res.status(400).json({
      message: message,
    });
  }

  next();
};
