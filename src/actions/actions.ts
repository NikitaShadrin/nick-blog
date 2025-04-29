"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(data: { title: string; body: string }) {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/");
  }

  const { title, body } = data;

  await prisma.post.create({
    data: {
      title,
      body,
    },
  });

  revalidatePath("/posts");
}

export async function deletePost(postId: string) {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/");
  }

  try {
    await prisma.post.delete({
      where: { id: Number(postId) },
    });
    revalidatePath("/posts");
  } catch (error) {
    console.error("Failed to delete post:", error);
    throw new Error("Could not delete the post");
  }
}

export async function deletePostAction(formData: FormData) {
  const id = formData.get("id") as string;
  await deletePost(id);
}
