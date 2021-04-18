import { Document, model, Schema } from "mongoose";

export interface IPageV2 {
  QnAPairs: [
    {
      question: string;
      answer: string;
    }
  ];
}
export interface ITest extends Document {
  ru: {
    name: string;
    mainQusetion: string;
    pages: Array<IPageV2>;
    // emailSender: Boolean;
  };
  lv: {
    name: string;
    mainQusetion: string;
    pages: Array<IPageV2>;
    // emailSender: Boolean;
  };
  en: {
    name: string;
    mainQusetion: string;
    pages: Array<IPageV2>;
    // emailSender: Boolean;
  };

  pages: number;
  type: "TT" | "TP" | "PP";
  active: boolean;
  emailSender: boolean;
}

export const TestSchema = new Schema(
  {
    ru: {
      name: String,
      mainQuesiton: String,
      // emailSender: Boolean,
      finalPageTextHeading: String,
      finalPageTextBody: String,
      pages: [
        {
          QnAPairs: [
            {
              question: String,
              answer: String,
            },
          ],
        },
      ],
    },

    lv: {
      name: String,
      mainQuesiton: String,
      // emailSender: Boolean,
      finalPageTextHeading: String,
      finalPageTextBody: String,
      pages: [
        {
          QnAPairs: [
            {
              question: String,
              answer: String,
            },
          ],
        },
      ],
    },

    en: {
      name: String,
      mainQuesiton: String,
      // emailSender: Boolean,
      finalPageTextHeading: String,
      finalPageTextBody: String,
      pages: [
        {
          QnAPairs: [
            {
              question: String,
              answer: String,
            },
          ],
        },
      ],
    },
    type: String,
    pages: Number,
    active: Boolean,
    emailSender: Boolean,
  },
  { timestamps: true }
);

const Test = model<ITest>("Test", TestSchema);

export default Test;
