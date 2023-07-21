import mongoose from "mongoose";
const schema = mongoose.Schema;
//schema
const enrollMentSchema = new schema(
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
      userId:
      {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      courseId:{
        type: mongoose.Types.ObjectId,
        required: true,
      }
  },
  { timestamps: true }
);

const Enroll = mongoose.model("Enroll", enrollMentSchema);

export default Enroll;
