import Post from "@/components/post";
import { Suspense } from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main className="px-7 pt-24 text-center">
      <Suspense fallback="Loading...">
        <Post id={id} />
      </Suspense>
    </main>
  );
}
