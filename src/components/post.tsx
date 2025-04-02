import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

export default async function Post(params: { id: string }) {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!post) {
    notFound();
  }
  return (
    <div>
      <h1 className="text-5xl font-semibold mb-7">{post.title}</h1>
      <p className="max-w-[700px] mx-auto">{post.body}</p>
    </div>
  );
}
