import { generateUrl } from "../Utils/pdfUrl.js";

export const syllabusStructure = (syllabus) => {
    const details = {
        Name:syllabus.Name,
        fileName:syllabus.fileName,
        semesterNumber:syllabus.semesterNumber,
        url: generateUrl(syllabus.folderName, syllabus.fileName)
    };

    return details;
};
