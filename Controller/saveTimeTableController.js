import prisma from '../DB/db.config.js';
import path from 'path';
import fs from 'fs';
import { TimeTableSchema } from '../validation/timetableValidation.js';
import { v4 as uuidv4 } from 'uuid';
import vine from '@vinejs/vine';
// Helper function to save the Excel file
const handleExcelFile = async (file, folderName) => {
    // Get the file extension
    const fileExt = file.name.split(".").pop();
    const newFileName = `${generateFileName()}.${fileExt}`;

    // Define the upload path
    const uploadPath = path.join(process.cwd(), `public/TimeTable/${folderName}`, newFileName);

    // Create the directory if it doesn't exist
    fs.mkdirSync(path.dirname(uploadPath), { recursive: true });

    // Move the file to the upload path
    file.mv(uploadPath, (error) => {
        if (error) {
            console.error("Error while moving the file:", error);
            throw error;
        }
    });

    // Return the new file name
    return newFileName;
};

// Function to generate a unique file name
const generateFileName = () => {
    return uuidv4();
};

// Main function to handle the request
export const saveTimeTable = async (req, res) => {
    try {
        
        const body = req.body;
		const validator = vine.compile(TimeTableSchema);
		const payload = await validator.validate(body);
        // Get the uploaded file and other data from the request body
       const PdfFile = req.files.file;
        const { Name, semesterNumber, courseName } = payload;
        //  console.log(payload);
        // Save the file using the handleExcelFile helper function
        const savedFileName = await handleExcelFile(PdfFile, fileName);
        // Save file information to the database using Prisma
        const saveToDatabase = await prisma.timeTable.create({
            data: {
                courseName: courseName,
                fileName: savedFileName,
                folderName:Name,
                semesterNumber: semesterNumber
            }
        });

        // Send the response with the file info
        res.status(200).json({
            message: "File uploaded and saved successfully"
        });
    } catch (error) {
        // Handle errors
        console.error("Error in saveTimeTable:", error);
        res.status(500).json({ error: "Error uploading or saving the file" });
    }
};



