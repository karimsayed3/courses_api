import Course from "../models/course";
import { RequestHandler } from "express";
import ProjectError from "../helper/error";
import { ReturnResponse } from "../utils/interfaces";
import Favourite from "../models/favourite";

const UpdateFavourite: RequestHandler = async (req, res, next) => {
  try {
    const course_id = req.body._id;
    const course = await Course.findById(course_id);

    if (!course) {
      const err = new ProjectError("Quiz not found!");
      err.statusCode = 404;
      throw err;
    }

    course.favourite = !course.favourite;

    await course.save();

    
    const kk =await Favourite.find({courseId:course._id});
    

    if(kk.length === 0){

        const enroll = new Favourite({name : course.name, completedPercentage : course.completedPercentage,author:course.author , image: course.image ,
            favourite :course.favourite, enroll : true,  category_id:course.category_id , userId : req.userId,courseId:course._id
        });
        
    
        await enroll.save();

        const resp: ReturnResponse = {
            status: "success",
            message: "Course updated successfully",
            data: enroll,
          };
          res.status(200).send(resp);
    }
    else{

        kk[0].favourite = !kk[0].favourite;

        await   kk[0].save();

        const resp: ReturnResponse = {
            status: "success",
            message: "Course updated successfully",
            data: kk[0],
          };
          res.status(200).send(resp);
    }
  } catch (error) {
    next(error);
  }
};

const getFavourite : RequestHandler  = async (req,res ,next) =>{
  try{
    await Favourite.find({userId : req.userId,favourite:true}).then((dataa)=>{
      const resp: ReturnResponse = {
        status: "success",
        message: "Get not published successfully",
        data: dataa,
      };
      res.status(200).send(resp);
    });


  }catch(error){
    next(error);
  }

}

export { UpdateFavourite ,getFavourite };
