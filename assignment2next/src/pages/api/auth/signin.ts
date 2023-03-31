import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

type Data = {
  success: boolean;
  token?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    return loginUser(req, res);
  }

  res.status(200).json({ success: false });
}

async function loginUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { usernameOrEmail, password } = req.body;

  const where = isEmail(usernameOrEmail)
    ? {
        email: usernameOrEmail,
      }
    : { username: usernameOrEmail };

  const user = await prisma.user.findUnique({
    where,
    select: {
      password: true,
    },
  });

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "username or password is incorrect" });
  }

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, message: "username or password is incorrect" });
  }

  const { username, email, permission } =
    (await prisma.user.findUnique({
      where,
      select: {
        username: true,
        email: true,
        permission: true,
      },
    })) ?? {};

  const privateKey = process.env.JWT_SECRET;
  if (!privateKey) {
    return res.status(500).json({ success: false, message: "Something wrong" });
  }

  var token = jwt.sign({ username, email, permission }, privateKey, {
    algorithm: "HS256",
    expiresIn: 5 * 60,
  });

  res.status(200).json({ success: true, token: `Bearer ` + token });
}

function isEmail(email: string) {
  return !!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
