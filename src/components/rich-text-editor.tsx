"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useState, useEffect, useRef } from "react";
import { createPost } from "@/actions/actions";
import DOMPurify from "dompurify";

type RichTextEditorProps = {
  initialContent?: string;
};

const RichTextEditor = ({ initialContent = "" }: RichTextEditorProps) => {
  const setContent = useState(initialContent)[1];
  const isClient = useRef(false);
  const editorContentRef = useRef<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    isClient.current = true;
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
      }),
      Underline,
    ],
    content: isClient.current ? initialContent : "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
      editorContentRef.current = html;
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;

    const sanitizedBody = DOMPurify.sanitize(editorContentRef.current);

    const postData = {
      title,
      body: sanitizedBody,
    };

    await createPost(postData);

    setIsSubmitting(false);
  };

  if (!editor) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-8 rounded shadow-md"
    >
      <div className="mb-4">
        <label htmlFor="title" className="block text-left font-semibold mb-2">
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
        <label htmlFor="body" className="block text-left font-semibold mb-2">
          Content
        </label>
        <div className="richtext-editor">
          {/* Toolbar */}
          <div className="toolbar" style={{ height: "50px" }}>
            {/* Text Style */}
            <div className="toolbar-group">
              <button
                onClick={(event) => {
                  event.preventDefault();
                  editor.chain().focus().toggleBold().run();
                }}
                className={`px-2 w-8 h-8 cursor-pointer ${
                  editor.isActive("bold")
                    ? "text-gray-900 border bg-gray-200 border-gray-600"
                    : ""
                }`}
              >
                B
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  editor.chain().focus().toggleItalic().run();
                }}
                className={`px-2 w-8 h-8 cursor-pointer ${
                  editor.isActive("italic")
                    ? "text-gray-900 border bg-gray-200 border-gray-600"
                    : ""
                }`}
              >
                I
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  editor.chain().focus().toggleUnderline().run();
                }}
                className={`px-2 w-8 h-8 cursor-pointer ${
                  editor.isActive("underline")
                    ? "text-gray-900 border bg-gray-200 border-gray-600"
                    : ""
                }`}
              >
                U
              </button>
            </div>

            <div className="divider" />

            {/* Headings */}
            <div className="toolbar-group">
              <button
                onClick={(event) => {
                  event.preventDefault();
                  editor.chain().focus().toggleHeading({ level: 1 }).run();
                }}
                className={`px-2 w-8 h-8 cursor-pointer ${
                  editor.isActive("heading", { level: 1 })
                    ? "text-gray-900 border bg-gray-200 border-gray-600"
                    : ""
                }`}
              >
                H1
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  editor.chain().focus().toggleHeading({ level: 2 }).run();
                }}
                className={`px-2 w-8 h-8 cursor-pointer ${
                  editor.isActive("heading", { level: 2 })
                    ? "text-gray-900 border bg-gray-200 border-gray-600"
                    : ""
                }`}
              >
                H2
              </button>
            </div>

            <div className="divider" />

            {/* Alignment */}
            <div className="toolbar-group">
              <button
                onClick={(event) => {
                  event.preventDefault();
                  editor.chain().focus().setTextAlign("left").run();
                }}
                className={`px-2 w-8 h-8 cursor-pointer ${
                  editor.isActive({ textAlign: "left" })
                    ? "text-gray-900 border bg-gray-200 border-gray-600"
                    : ""
                }`}
              >
                ←
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  editor.chain().focus().setTextAlign("center").run();
                }}
                className={`px-2 w-8 h-8 cursor-pointer ${
                  editor.isActive({ textAlign: "center" })
                    ? "text-gray-900 border bg-gray-200 border-gray-600"
                    : ""
                }`}
              >
                ↔
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  editor.chain().focus().setTextAlign("right").run();
                }}
                className={`px-2 w-8 h-8 cursor-pointer ${
                  editor.isActive({ textAlign: "right" })
                    ? "text-gray-900 border bg-gray-200 border-gray-600"
                    : ""
                }`}
              >
                →
              </button>
            </div>
          </div>

          {/* Editor Content */}
          <EditorContent editor={editor} className="editor-content" />
        </div>
      </div>
      <button
        type="submit"
        className={`border border-amber-500 text-white py-2 px-4 rounded hover:border-amber-600 ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Post"}
      </button>
    </form>
  );
};

export default RichTextEditor;
