import express from "express";
import { isAuthenticated } from "../middlewares/isAuth";

import { updateEnrollMentCourses ,getEnrollmentCourses} from "../controllers/enroll";

const router = express.Router();

//GET /report/:reportId
router.put("/update/", isAuthenticated, updateEnrollMentCourses);


router.get("/enr/getEnrollmentCourses", isAuthenticated, getEnrollmentCourses);


// router.post("/teacher", isAuthenticated, getReport);

export default router;
