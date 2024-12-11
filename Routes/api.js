import { Router } from "express";
import { verifyJwt } from "../Middleware/authMiddleware.js";
import { addNotice } from "../Controller/addNoticeController.js";
import { Verifyfile } from "../Middleware/fileValidation.js";
import {
    adminLoginController,
    adminRegisterController,
} from "../Controller/adminController.js";
import { reteriveTimeTable } from "../Controller/reteriveTimeTable.js";
import { saveTimeTable } from "../Controller/saveTimeTableController.js";
import { getTimeTableData } from "../Controller/getTimeTableData.js";
import { reteriveNotices } from "../Controller/reteriveNotices.js";
import { downloadPdf } from "../Controller/downloadPdf.js";
import { deleteNotice } from "../Controller/deletenotices.js";
import { reteriveNoticeByDate } from "../Controller/reteriveNotices.js";
import { deleteTimetable } from "../Controller/deleteTimetable.js";
import { addSyllabus } from "../Controller/SyllabusController.js";
import { reteriveSyllabus } from "../Controller/reteriveSyllabus.js";
import { deleteSyllabus } from "../Controller/deleteSyllabus.js";
const router = Router();

router.post("/auth/adminRegister", adminRegisterController);
router.post("/auth/adminlogin", adminLoginController);
router.post("/timeTable/addTimetable", Verifyfile, saveTimeTable);
router.post("/notices/addNotice", Verifyfile, addNotice);
router.get("/notices/getallNotices", reteriveNotices);
router.get("/download/:folderName/:fileName", downloadPdf);
router.get("/timeTable/getallTimetables", reteriveTimeTable);
router.get("/syllabus/allSyllabus", reteriveSyllabus);
router.post("/timeTable/getTimetableData", getTimeTableData);
router.delete("/notices/:filename", deleteNotice);
router.delete("/deleteTimetable/:id", deleteTimetable);
router.delete("/syllabus/delteSyllabus", deleteSyllabus);
router.get("/notices/by-date", reteriveNoticeByDate);
router.post("/Syllabus/addSyllabus", addSyllabus);

export default router;
