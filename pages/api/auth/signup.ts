import { NextApiRequest, NextApiResponse } from "next";
// import { User } from "../../../models/user";
// import { getCollection, insertOne } from "../../../utils/mongo";
import { hashPassword } from "../../../utils/utils";
import { IUser, User } from "../../../models/user";
import mongoose from "mongoose";
import { connectToMongo } from "../../../utils/mongo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const body = req.body;

    //const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_DB}/store-${process.env.STORE_ENVIRONMENT}?retryWrites=true&w=majority`;
    //console.log("connection to: ", url);
    // await mongoose.connect(url);
    await connectToMongo();
    const returnedUser = await User.findOne({ email: body.email });

    if (returnedUser) {
      throw new Error(`Already exits an account with ${body.email}`);
    }

    const hashedPass = await hashPassword(body.password);

    const user = new User({
      email: body.email,
      googleUser: false,
      name: "",
      picture: undefined,
      password: hashedPass,
    });
    // const insertResult = await insertOne("user", user);
    const createdUser = await user.save();
    mongoose.connection.close();

    res.status(200).json({ message: "User created", createdUser });
  }
};

export default handler;
