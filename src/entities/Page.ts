import mongoose, { model /* , Schema, Types */ } from "mongoose";
// import { IQnAPair, TQnA } from "./QnAPair";

export interface IPage extends mongoose.Document {
  QuestionAnswerPairs: [
    {
      question: string;
      answer: string;
      // QnAPair: IQnAPair;
    }
  ];
}

export const PageSchema = new mongoose.Schema({
  QnAPairs: [
    // {
    //   type: Schema.Types.ObjectId,
    //   ref: "QnAPair",
    //   required: true,
    // },
    {
      question: String,
      answer: String,
    },
  ],
  // belongsTo: {
  //   type: Types.ObjectId,
  //   ref: "Test",
  // },
});

const Page = model<IPage>("Page", PageSchema);

export default Page;
