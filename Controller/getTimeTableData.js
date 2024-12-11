import prisma from '../DB/db.config.js';
import path from 'path';
import fs from 'fs';
import xlsx from 'xlsx';

// Helper function to read Excel file and return JSON data
const readExcelFile = (filePath) => {
    // Read the Excel file
    const workbook = xlsx.readFile(filePath);

    // Extract data from each sheet
    const data = {};
    workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        data[sheetName] = xlsx.utils.sheet_to_json(worksheet);
    });

    return data;
};

// Function to retrieve time table data from the database and return Excel file data as JSON
export const getTimeTableData = async (req, res) => {
    try {
        // Extract the time table ID from the request body
        const { id } = req.body;

        // Retrieve the time table entry from the database by ID
        const timeTable = await prisma.timeTable.findUnique({
            where: { id: id }
        });

        if (!timeTable) {
            return res.status(404).json({ error: "TimeTable not found." });
        }

        // Construct the file path
        const filePath = path.join(process.cwd(), `public/TimeTable/${timeTable.folderName}/${timeTable.fileName}`);

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "File not found." });
        }

        // Read and parse the Excel file
        const jsonData = readExcelFile(filePath);

        // Respond with the JSON data and file name
        res.status(200).json({
            message: "TimeTable data retrieved successfully",
            fileName: timeTable.fileName,
            data: jsonData
        });
    } catch (error) {
        console.error("Error in getTimeTableData:", error);
        res.status(500).json({ error: "Error retrieving time table data." });
    }
};
