import mongoose, { Schema } from "mongoose";


export interface IQnAPair extends mongoose.Document {
  question: string;
  answer: string;
}

export const QnAPairSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  belongsTo: {
    type: Schema.Types.ObjectId,
    ref: "Page",
  },
});

const QnAPair = mongoose.model<IQnAPair>("QnAPair", QnAPairSchema);

export default QnAPair;
