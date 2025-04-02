"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/");
  }

  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  await prisma.post.create({
    data: {
      title,
      body,
    },
  });

  revalidatePath("/posts");
}
