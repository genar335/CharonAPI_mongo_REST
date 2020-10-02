import mongoose, { model, Schema, Types } from "mongoose";
import { TQnA } from "./QnAPair";

export interface IPage extends mongoose.Document {
  QuestionAnswerPairs: [
    {
      QnAPair: TQnA;
      //   ref: string;
    }
  ];
}

export const PageSchema = new mongoose.Schema({
  QuestionAnswerPairs: [
    {
      type: Schema.Types.ObjectId,
      ref: "QnAPair",
      required: true,
    },
  ],
  belongsTo: {
    type: Types.ObjectId,
    ref: "Test",
  },
});

const Page = model<IPage>("Page", PageSchema);

export default Page;
