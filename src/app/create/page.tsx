import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import RichTextEditor from "@/components/rich-text-editor";

export default async function Page() {
  const { userId, has } = await auth();

  if (!userId) return <RedirectToSignIn />;
  if (!has({ permission: "org:create:allow" })) {
    return <p>You do not have permission to create a post</p>;
  } else {
    return (
      <main className="text-center pt-16 px-5">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Create a post</h1>
        <RichTextEditor />
      </main>
    );
  }
}
