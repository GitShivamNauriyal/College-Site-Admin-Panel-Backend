import { generateUrl } from "../Utils/pdfUrl.js";

export const noticeStructure = (notice) => {
    const details = {
        noticeName: notice.noticeName,
        fileName:notice.noticeFile,
        url: generateUrl(notice.folderName, notice.noticeFile)
    };

    return details;
};
