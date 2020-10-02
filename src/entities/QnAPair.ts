import mongoose, { Schema } from "mongoose";

export type TQnA = {
  quesiton: {
    imgURL?: string;
    text?: string;
  };
  answer: {
    imgURL?: string;
    text?: string;
  };
};

export interface IQnAPair extends mongoose.Document {
  question: TQnA;
  answer: TQnA;
}

export const QnAPairSchema = new mongoose.Schema({
  question: {
    type: Object,
    required: true,
  },
  answer: {
    type: Object,
    required: true,
  },
  belongsTo: {
    type: Schema.Types.ObjectId,
    ref: "Page",
  },
});

const QnAPair = mongoose.model<IQnAPair>("QnAPair", QnAPairSchema);

export default QnAPair;
