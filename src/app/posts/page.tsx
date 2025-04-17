import PostsList from "@/components/posts-list";
import { Suspense } from "react";

export default async function PostsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = parseInt(searchParams.page || "1", 10);

  return (
    <main className="text-center pt-16 px-5">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Posts</h1>

      <Suspense fallback="Loading...">
        <PostsList page={currentPage} />
      </Suspense>
    </main>
  );
}
