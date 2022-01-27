import { model, Schema } from "mongoose";
import { TimestampDocument, PopulatedDoc } from "../utility-types";
import { generatePasswordHash, checkPasswordHash } from "../../util/password";
import { TeamDocument } from "./team";
import { UserRole } from "../../graphql/resolver-types";

export interface UserDocument extends TimestampDocument {
  username: string;

  isDisabled: boolean;
  team?: PopulatedDoc<TeamDocument>;
  role: UserRole;

  lastLogIn?: Date;

  _passwordHash?: string;
  /** Set password hash */
  setPassword: (password: string | null) => void;
  /** Check provided password against hash */
  checkPassword: (password: string) => boolean;
  /** Virtual write only property to set password */
  password: string | null;
}

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    isDisabled: { type: Boolean, default: false, index: true },
    team: { type: Schema.Types.ObjectId, ref: "Team", index: true },
    role: { type: String, default: "UNKNOWN", required: true },
    lastLogIn: Date,
    _passwordHash: String,
  },
  { timestamps: true }
);

userSchema.methods = {
  setPassword(password: string | null) {
    if (!password) {
      // unset password
      this._passwordHash = undefined;
    } else {
      this._passwordHash = generatePasswordHash(password);
    }
  },
  checkPassword(password: string) {
    if (!password || !this._passwordHash) {
      return false;
    }
    return checkPasswordHash(password, this._passwordHash as string);
  },
};

userSchema
  .virtual("password")
  .set(function (this: UserDocument, password: string | null) {
    this.setPassword(password);
  })
  .get(() => null);

export const UserModel = model<UserDocument>("User", userSchema);
