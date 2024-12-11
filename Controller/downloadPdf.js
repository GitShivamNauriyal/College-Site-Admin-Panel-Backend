import path from 'path';
import fs from 'fs';

export const downloadPdf = (req, res) => {
    const { folderName, fileName } = req.params; // `folderName` and `fileName` from URL params

    // Construct the file path
    const filePath = path.join(process.cwd(), 'public', 'Notices', folderName, fileName);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
        // Set headers to prompt download
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                res.status(500).json({ error: "Failed to download file" });
            }
        });
    } else {
        res.status(404).json({ error: "File not found" });
    }
};
