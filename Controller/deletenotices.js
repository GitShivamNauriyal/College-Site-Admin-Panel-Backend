import prisma from "../DB/db.config.js";
import fs from "fs";
import path from "path";

export const deleteNotice = async (req, res) => {
    try {
        const { fileName } = req.params;

        // Step 1: Find the notice in the database by `noticeFile`
        const notice = await prisma.notice.findFirst({
            where: { noticeFile: fileName },
        });

        if (!notice) {
            return res.status(404).json({ message: "Notice not found" });
        }

        // Step 2: Define the path and delete the PDF file from the server
        const filePath = path.join(
            process.cwd(),
            "public/Notices",
            notice.noticeName,
            notice.noticeFile
        );
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        } else {
            console.warn(`File not found at expected location: ${filePath}`);
        }

        // Step 3: Delete the database record
        await prisma.notice.delete({
            where: { id: notice.id },
        });

        return res
            .status(200)
            .json({
                message: "Notice and associated file deleted successfully",
            });
    } catch (error) {
        console.error("Error deleting notice:", error);
        return res.status(500).json({ error: "Failed to delete notice" });
    }
};
