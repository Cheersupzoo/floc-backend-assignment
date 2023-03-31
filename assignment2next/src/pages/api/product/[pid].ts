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

export type ProductInput = {
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

    if (!tokenPayload.permission.includes("WRITE")) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Permission!" });
    }

    if (req.method === "PUT") {
      return updateProduct(req, res);
    }
    if (req.method === "DELETE") {
      return deleteProduct(req, res);
    }
  } catch (error) {
    return error;
  }

  res.status(400).json({ success: false });
}

async function updateProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { imageUrl, titleEN, titleTH, description, price } =
    req.body as Partial<ProductInput>;
  const { pid } = req.query;
  if (!pid) {
    return res
      .status(400)
      .json({ success: false, message: "Missing product id" });
  }
  const product = await clientDB.product.update({
    where: {
      id: pid as string,
    },
    data: {
      imageUrl: imageUrl,
      title: {
        update: {
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


async function deleteProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { pid } = req.query;
    if (!pid) {
      return res
        .status(400)
        .json({ success: false, message: "Missing product id" });
    }
    const product = await clientDB.product.delete({
      where: {
        id: pid as string,
      },
      include: {
        title: true,
      },
    });
  
    res.status(200).json({
      success: true,
    });
  }
  