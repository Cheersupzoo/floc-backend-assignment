import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Product, Translation } from "@prisma/client";
import { tokenVerify } from "@/libs/tokenVerify";
import { clientDB } from "@/libs/db";

type Data = {
  success: boolean;
  message?: string;
  data?: {
    products?: (Product & {
      title: Translation;
    })[];
    product?: Product & {
      title: Translation;
    };
  };
};

type ProductInput = {
  imageUrl: string;
  titleTH: string;
  titleEN: string;
  description: string;
  price: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const tokenPayload = tokenVerify(req, res);

    if (req.method === "GET") {
      return findProducts(req, res);
    }
    if (!tokenPayload.permission.includes("WRITE")) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Permission!" });
    }

    if (req.method === "POST") {
      return createProduct(req, res);
    }
  } catch (error) {
    return error;
  }

  res.status(400).json({ success: false });
}

async function findProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  const products = await clientDB.product.findMany({
    include: { title: true },
  });
  res.status(200).json({
    success: true,
    data: {
      products,
    },
  });
}

async function createProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { imageUrl, titleEN, titleTH, description, price } =
    req.body as ProductInput;
  const product = await clientDB.product.create({
    data: {
      imageUrl: imageUrl,
      title: {
        create: {
          contentEN: titleEN,
          contentTH: titleTH,
        },
      },
      description,
      price,
    },
    include: {
      title: true,
    },
  });
  res.status(200).json({
    success: true,
    data: {
      product,
    },
  });
}
