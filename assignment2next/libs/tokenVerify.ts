import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export type TokenPayload = {
  username: string;
  email: string;
  permission: ("READ" | "WRITE")[];
};

export function tokenVerify(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    throw res
      .status(400)
      .json({ success: false, message: "Missing authorization token!" });
  }
  const privateKey = process.env.JWT_SECRET;
  if (!privateKey) {
    throw res.status(500).json({ success: false, message: "Something wrong" });
  }

  try {
    const tokenPayload = jwt.verify(token, privateKey) as TokenPayload;

    return tokenPayload;
  } catch (error) {
    throw res
      .status(400)
      .json({ success: false, message: "Invalid authorization token!" });
  }
}
