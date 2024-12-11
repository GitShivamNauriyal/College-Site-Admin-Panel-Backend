import prisma from "../DB/db.config.js";
import vine from "@vinejs/vine";

import { NoticeSchema } from "../validation/noticevalidation.js";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const addNotice = async (req, res) => {
    try {
        console.log("Notice Name:", req.body.noticeName);
        console.log("File:", req.file);

        const body = req.body;
        const validator = vine.compile(NoticeSchema);
        const payload = await validator.validate(body);
        const { Name } = payload;

        const file = req.files.file;
        const folderName = Name;

        // Extract description only if it's present in req.body
        const description = req.body.description || null;

        const newFileName = await handlePdfFile(file, folderName);

        // Only add `description` if it exists
        const data = {
            noticeName: Name,
            noticeFile: newFileName,
            folderName: folderName,
            ...(description && { description }), // Conditionally add description if not null or undefined
        };

        const saveToDatabase = await prisma.notice.create({ data });

        res.json({ message: "Notice added successfully" });
    } catch (error) {
        console.error("Error adding notice:", error);
        res.status(500).json({
            error: "An error occurred while adding the notice.",
        });
    }
};

const handlePdfFile = async (file, folderName) => {
    try {
        const fileExt = file.name.split(".").pop();
        const newFileName = `${generateFileName()}.${fileExt}`;

        // Define the upload path
        const uploadPath = path.join(
            process.cwd(),
            `public/Notices/${folderName}`,
            newFileName
        );

        // Create the directory if it doesn't exist
        fs.mkdirSync(path.dirname(uploadPath), { recursive: true });

        // Move the file to the upload path
        await file.mv(uploadPath);

        return newFileName;
    } catch (error) {
        console.error("Error while moving the file:", error);
        throw error;
    }
};

const generateFileName = () => {
    return uuidv4();
};
