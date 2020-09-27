import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  password: string;
  createdAt: Date;
  accessLevel: number;
}

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  accessLevel: Number,
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
