import { model, Schema } from "mongoose";
import { TimestampDocument } from "../utility-types";

export interface TeamDocument extends TimestampDocument {
  name: string;
  description?: string;
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, unique: true },
    description: String,
  },
  { timestamps: true }
);

export const TeamModel = model<TeamDocument>("Team", teamSchema);
