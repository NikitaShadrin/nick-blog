import Post from "@/components/post";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { deletePostAction } from "@/actions/actions";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { has } = await auth();

  const canDelete = has({ permission: "org:create:allow" });

  return (
    <main className="px-7 pt-24 text-center">
      <Suspense fallback="Loading...">
        <Post id={id} />
      </Suspense>
      {canDelete && (
        <form action={deletePostAction} method="post" className="mt-4">
          <input type="hidden" name="id" value={id} />
          <button
            type="submit"
            className="px-4 py-2 border border-red-700 rounded"
          >
            Delete Post
          </button>
        </form>
      )}
    </main>
  );
}
