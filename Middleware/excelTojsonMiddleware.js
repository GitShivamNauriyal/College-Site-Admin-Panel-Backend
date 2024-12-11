
const multer = require('multer');
const path = require('path');
import convertExcelToJson from "../Transform/excelTojson.js"
const convertExcelToJson = require('./convertExcel'); // Import the conversion function

// Setup multer for file uploads (stored in /uploads directory)
const upload = multer({ dest: 'Timetable/' });

// Middleware for handling file upload and conversion
const uploadAndConvertMiddleware = (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(400).send('Error uploading file');
        }

        // Check if the file exists
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }
        const PdfFile = req.files.file;

        // Save the file to the server
        const uploadPath = __dirname + '/' + PdfFile.name;
    
        PdfFile.mv(uploadPath, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
        // Get the file path
        const filePath = path.join(__dirname, req.file.path);

        try {
            // Convert the Excel file to JSON
            const jsonData = convertExcelToJson(filePath);
            
            // Attach the JSON data to the request object to use in the route
            req.jsonData = jsonData;

            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            return res.status(500).send('Error converting Excel to JSON');
        }
    });
}

module.exports = uploadAndConvertMiddleware;
