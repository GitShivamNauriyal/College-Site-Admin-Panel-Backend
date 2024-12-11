import prisma from '../DB/db.config.js';
import { syllabusStructure } from '../Transform/syllabusStructure.js';
export const reteriveSyllabus = async (req, res) => {
    try {
        // Retrieve data from the database
        const Syllabus = await prisma.syllabus.findMany({
            orderBy:{
                createdAt:'desc',
            }
        });
        const detailTransform = Syllabus.map((item) => syllabusStructure(item));
         
        res.status(200).json({
            data: detailTransform
        });
    } catch (error) {
        console.error("Error retrieving time tables:", error);
        // Send an error response if data retrieval fails
        res.status(500).json({
            error: "Failed to retrieve time tables"
        });
    }
};

