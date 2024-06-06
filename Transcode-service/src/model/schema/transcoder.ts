import mongoose, {  Model, Schema } from "mongoose";
import "dotenv/config";
import { Status, Transcoder } from "../../entities/transcoder";



const transcoderSchema: Schema<Transcoder> = new mongoose.Schema(
  {
    fileName: {
      type: String,
    },
    generatedName: {
      type: String,
    },
    status: {
        type: String,
        enum: [Status.transcoding, Status.completed, Status.subtitle, Status.completed, Status.error, Status.finishing],
        default: Status.transcoding
    },
    videoUrl: {
        type: String
    },
    subtitleUrl: {
        type: String,
    },
    instructorId: {
        type:String,
        required: true
    }

  },
  {
    timestamps: true,
  }
);


const TranscoderModel: Model<Transcoder> = mongoose.model("Transcoder", transcoderSchema);
export default TranscoderModel;