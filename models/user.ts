import mongoose from "mongoose";
export interface IUser {
  _id?: string;
  email: string;
  name: string;
  picture: string | undefined;
  password?: string | undefined;
  googleUser: boolean;
}

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  picture: String,
  password: String,
  googleUser: Boolean,
});

userSchema.set("toJSON", {
  transform: (document, returnedDocument) => {
    returnedDocument.id = returnedDocument._id.toString();
    delete returnedDocument._id;
    delete returnedDocument.__v;
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);

