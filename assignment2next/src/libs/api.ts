import { ProductInput } from "@/pages/api/product/[pid]";
import type { Product, Translation } from "@prisma/client";

export class API {
  private static domainName = "/api";
  static async login(
    usernameOrEmail: string,
    password: string
  ): Promise<{ success: boolean; token?: string }> {
    const body = JSON.stringify({
      usernameOrEmail,
      password,
    });

    const response = await fetch(this.domainName + "/auth/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    return response.json();
  }

  static async findProducts(token: string): Promise<{
    success: boolean;
    data?: {
      products?:
        | (Product & {
            title: Translation;
          })[]
        | undefined;
    };
  }> {
    const response = await fetch(this.domainName + "/product", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return response.json();
  }

  static async updateProduct(
    token: string,
    id: string,
    input: Partial<ProductInput>
  ): Promise<{
    success: boolean;
  }> {
    const response = await fetch(this.domainName + "/product/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(input)
    });

    return response.json();
  }

  static async deleteProduct(
    token: string,
    id: string,
  ): Promise<{
    success: boolean;
  }> {
    const response = await fetch(this.domainName + "/product/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    return response.json();
  }
}
