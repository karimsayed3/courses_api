import mongoose from "mongoose";
const schema = mongoose.Schema;
//schema
const courseSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    completedPercentage: {
      type: Number,
      required: true,
    },
    author: 
      {
        type: String,
        required: true,
      },
      image: 
      {
        type: String,
        required: true,
      },
      favourite: 
      {
        type: Boolean,
        default:false,
        required: true,
      },
      enroll: 
      {
        type: Boolean,
        default:false,
        required: true,
      },
    category_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
