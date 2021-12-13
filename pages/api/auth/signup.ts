import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../models/user";
import { getCollection, insertOne } from "../../../utils/mongo";
import { hashPassword } from "../../../utils/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const body = req.body;
    const users = await getCollection(
      "user",
      { email: body.email },
      { _id: -1 }
    );

    if (users.length !== 0) {
      throw new Error(`Already exits an account with ${body.email}`);
    }

    const hashedPass = await hashPassword(body.password);
    const user: User = {
      email: body.email,
      googleUser: false,
      name: "",
      picture: undefined,
      password: hashedPass,
    };
    const insertResult = await insertOne("user", user);

    res.status(200).json({ message: "User created" });
  }
};

export default handler;
