import Post from "@/components/post";
import { Suspense } from "react";

export default async function page({ params }: { params: { id: string } }) {
  return (
    <main className="px-7 pt-24 text-center">
      <Suspense fallback="Loading...">
        <Post id={params.id} />
      </Suspense>
    </main>
  );
}
