import { Schema, model, Document, Types } from "mongoose";

export interface IActivity extends Document {
  user: Types.ObjectId;
  type: "productive" | "distraction";
  category: string;
  title: string;
  description: string;
  tags?: string[];
  startTime: string;
  endTime: string;  
  timeSpent: number;
}

const activitySchema = new Schema<IActivity>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["productive", "distraction"],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    startTime: {
      type: String,
      required: true,
      match: /^([0-1]\d|2[0-3]):([0-5]\d)$/
    },
    endTime: {
      type: String,
      required: true,
      match: /^([0-1]\d|2[0-3]):([0-5]\d)$/
    },
    timeSpent: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

export default model<IActivity>("Activity", activitySchema);