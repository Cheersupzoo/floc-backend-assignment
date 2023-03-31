import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { genSalt, hash } from "bcrypt";

const prisma = new PrismaClient();

type Data = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    return createUser(req, res);
  }

  res.status(200).json({ success: false });
}

async function createUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { username, email, password } = req.body;

  const salt = await genSalt(10);
  const hashPassword = await hash(password, salt);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashPassword,
      permission: ["READ"],
    },
  });
  console.log(user);

  res.status(200).json({ success: true });
}
