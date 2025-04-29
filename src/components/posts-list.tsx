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
          <li key={post.id} className="mb-5 border-b border-gray-600 pb-3">
            {displayMode === "archive" ? (
              <>
                <Link href={`/posts/${post.id}`} className="text-lg font-bold">
                  {post.title}
                </Link>
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </>
            ) : (
              <>
                <Link href={`/posts/${post.id}`} className="text-lg font-bold">
                  {post.title}
                </Link>
                <div
                  className="mt-4 text-gray-200 line-clamp-2 relative"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    WebkitLineClamp: 2,
                  }}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: post.body,
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-zinc-800 to-transparent"
                    style={{ pointerEvents: "none" }}
                  />
                </div>
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
