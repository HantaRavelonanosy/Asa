import { model, Schema } from "mongoose";
import { Document, PopulatedDoc } from "../utility-types";
import { randomBytes } from "crypto";
import { UserDocument } from "./user";

const SESSION_DURATION = 3600; // 1h

export interface UserSessionDocument extends Document {
  user: PopulatedDoc<UserDocument>;
  token: string;
  expiresAt: Date;

  /** refresh session expiration date */
  refresh: () => Promise<void>;
}

const userSessionSchema = new Schema<UserSessionDocument>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // only one session at a time per user
  },
  token: {
    type: String,
    required: true,
    unique: true,
    default: () => randomBytes(42).toString("base64"),
  },
  expiresAt: {
    type: Date,
    required: true,
    expires: 0, // delete session 0 seconds after `expiresAt`
    default: () => new Date(Date.now() + SESSION_DURATION * 1000), // set expiration in the future
  },
});

userSessionSchema.methods = {
  async refresh() {
    this.expiresAt = new Date(Date.now() + SESSION_DURATION * 1000);
    await this.save();
  },
};

export const UserSessionModel = model<UserSessionDocument>(
  "UserSession",
  userSessionSchema
);
