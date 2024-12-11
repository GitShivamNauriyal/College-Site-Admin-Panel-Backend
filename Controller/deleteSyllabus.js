import prisma from '../DB/db.config.js';
import fs from 'fs';
import path from 'path';

export const deleteSyllabus = async (req, res) => {
    try {
        const { id } = req.params;

        const Syllabus = await prisma.syllabus.findUnique({
            where: { id : id }
        });

        if (!Syllabus) {
            return res.status(404).json({ message: "Syllabus not found" });
        }

        const filePath = path.join(process.cwd(), 'public/Syllabus', timeTable.folderName, timeTable.fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        } else {
            console.warn(`File not found at expected location: ${filePath}`);
        }

        await prisma.timeTable.delete({
            where: { id: timeTable.id },
        });

        return res.status(200).json({ message: "Timetable and associated file deleted successfully" });
    } catch (error) {
        console.error("Error deleting notice:", error);
        return res.status(500).json({ error: "Failed to delete Timetable" });
    }
};
