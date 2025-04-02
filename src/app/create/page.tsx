import { createPost } from "@/actions/actions";
import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId, has } = await auth();

  if (!userId) return <RedirectToSignIn />;
  if (!has({ permission: "org:create:allow" })) {
    return <p>You do not have permission to create a post</p>;
  } else {
    return (
      <main className="text-center pt-16 px-5">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Create a post</h1>

        <form
          action={createPost}
          className="max-w-2xl mx-auto p-8 rounded shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-left font-semibold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter the title"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="body"
              className="block text-left font-semibold mb-2"
            >
              Content
            </label>
            <textarea
              name="body"
              id="body"
              className="w-full p-2 border border-gray-300 rounded h-64"
              placeholder="Write your post here..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="border border-amber-500 text-white py-2 px-4 rounded hover:border-amber-600"
          >
            Post
          </button>
        </form>
      </main>
    );
  }
}
