import { generateUrlSyllabus } from "../Utils/pdfUrl.js";

export const timeTableStructure = (Timetable) => {
    const details = {
        courseName:Timetable.courseName,
        semesterNumber:Timetable.semesterNumber,
        noticeName:Timetable.folderName,
        url: generateUrlSyllabus(Timetable.folderName, Timetable.fileName)
    };

    return details;
};
