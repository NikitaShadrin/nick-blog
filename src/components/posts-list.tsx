import { prisma } from "@/lib/db";
import Link from "next/link";
import React from "react";

export default async function PostsList({
  page = 1,
  displayMode,
}: {
  page?: number;
  displayMode?: string;
}) {
  const pageSize = 5;
  const skip = (page - 1) * pageSize;

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    skip,
    take: pageSize,
  });

  const totalPosts = await prisma.post.count();
  const totalPages = Math.ceil(totalPosts / pageSize);

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-3">
            {displayMode === "archive" ? (
              <>
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
                <p>{new Date(post.createdAt).toLocaleDateString()}</p>
              </>
            ) : (
              <>
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
                <p>{post.body}</p>
              </>
            )}
          </li>
        ))}
      </ul>

      {displayMode !== "archive" && (
        <div className="mt-5">
          {page > 1 && (
            <Link href={`?page=${page - 1}`} className="mr-3">
              Previous
            </Link>
          )}
          {page < totalPages && <Link href={`?page=${page + 1}`}>Next</Link>}
        </div>
      )}
    </div>
  );
}
