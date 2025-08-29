import { Schema, model, Document, Types } from "mongoose";

export interface ITarget extends Document {
  user: Types.ObjectId;
  title: string;
  description: string;
  sourceType: "youtube" | "cource" | "others";
  sourceLink?: string;
  progress: number;
  targetDone: Date; 
  isPinned: boolean;
}

const targetSchema = new Schema<ITarget>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
    sourceType: {
      type: String,
      enum: ["youtube", "course", "others"],
      required: true,
    },
    sourceLink: {
      type: String,
      validate: {
        validator: function (v: string) {
          if (!v) return true;
          return /^(https?:\/\/[^\s]+)$/.test(v);
        },
        message: "Invalid URL format",
      },
    },
    progress: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 0,
    },
    targetDone: {
      type: Date,
      required: true,
    },
    isPinned: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export default model<ITarget>("Target", targetSchema);