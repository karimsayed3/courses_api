import express from "express";
import { body } from "express-validator";

import { isAuthenticated } from "../middlewares/isAuth";
import {validateRequest} from "../helper/validateRequest";
import {
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
  getAllCourse,
  searchCourse
} from "../controllers/course";


const router = express.Router();

// create
// POST /quiz/
router.post(
  "/",  isAuthenticated,

  createCourse
);

// get
// GET /quiz/:quizId
router.get("/getCourseByCourseId/:courseId",   isAuthenticated,
getCourse);
router.get("/getAllCoursesByCategoryId/:categoryId",  isAuthenticated,
getAllCourse);

router.get("/search/:name",  isAuthenticated,
searchCourse);
//

//update
//PUT /quiz
router.put(
  "/:courseId",  isAuthenticated,
  updateCourse
);


//Delete
//DELETE quiz/:quizId
router.delete("/:quizId",  isAuthenticated,
deleteCourse);

export default router;
