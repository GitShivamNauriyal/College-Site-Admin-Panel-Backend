import prisma from '../DB/db.config.js';
import { timeTableStructure } from '../Transform/timeTableStructure.js';
export const reteriveTimeTable = async (req, res) => {
    try {
        // Retrieve data from the database
        const timeTables = await prisma.timeTable.findMany({
            orderBy:{
                createdAt:'desc',
            }
        });
        const detailTransform = timeTables.map((item) => timeTableStructure(item));
         
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

