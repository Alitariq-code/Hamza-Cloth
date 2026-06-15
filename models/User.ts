import { Schema, model, models, type Model } from "mongoose";

export interface UserDoc {
  email: string;
  passwordHash: string;
  name: string;
  role: "admin";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDoc>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true },
    name: { type: String, default: "Admin" },
    role: { type: String, enum: ["admin"], default: "admin" },
  },
  { timestamps: true },
);

const User: Model<UserDoc> =
  (models.User as Model<UserDoc>) || model<UserDoc>("User", UserSchema);

export default User;
