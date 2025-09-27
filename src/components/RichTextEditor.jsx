import {
  useEditor,
  EditorContent,
  ReactNodeViewRenderer,
  NodeViewWrapper,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaAlignCenter,
  FaLink,
  FaAlignRight,
  FaAlignJustify,
  FaImage,
  FaTrash,
} from "react-icons/fa";
import PropTypes from "prop-types";
import { useAuth } from "../context/AppContext";
import { toast } from "react-toastify";
import { useState } from "react";

// Toolbar Button
const ToolbarButton = ({ icon: Icon, onClick, isActive, title }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`p-1 rounded-lg transition-colors ${
      isActive
        ? "bg-purple-200 text-purple-700"
        : "hover:bg-gray-200 text-gray-600"
    }`}
  >
    <Icon className="w-4 h-4" />
  </button>
);

ToolbarButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  title: PropTypes.string,
};

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      align: {
        default: "center",
        parseHTML: (el) => el.style.textAlign || "center",
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(({ node, editor, getPos }) => {
      const { token, backendUrl } = useAuth();
      const { src, align } = node.attrs;

      // Delete image
      const deleteImage = async () => {
        try {
          if (!src) return;

          const response = await fetch(`${backendUrl}/api/upload/image`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
            body: JSON.stringify({ imageUrl: src }),
          });

          const data = await response.json();

          if (!response.ok) {
            console.error("Failed to delete image from server:", data.message);
            return;
          }

          console.log("Image deleted from server:", data);
          toast.success("Image deleted from server.");
        } catch (error) {
          console.error("Error deleting image from server:", error);
          toast.error("Opp! image not deleted.");
        } finally {
          editor
            .chain()
            .focus()
            .deleteRange({ from: getPos(), to: getPos() + 1 })
            .run();
        }
      };

      // Change alignment
      const setAlignment = (newAlign) => {
        editor
          .chain()
          .focus()
          .command(({ tr }) => {
            tr.setNodeMarkup(getPos(), undefined, {
              ...node.attrs,
              align: newAlign,
            });
            return true;
          })
          .run();
      };

      return (
        <NodeViewWrapper
          className={`relative my-5 w-full flex flex-col items-${align} group `}
        >
          {/* Alignment toolbar */}
          <div className="absolute bottom-2 right-4 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {["start", "center", "end"].map((a) => (
              <button
                type="button"
                key={a}
                onClick={() => setAlignment(a)}
                className={`p-1 rounded border text-sm text-black  ${
                  align === a
                    ? "bg-slate-200"
                    : "border-gray-300 bg-transparent"
                } transition-colors`}
              >
                {a}
              </button>
            ))}

            <button
              type="button"
              onClick={deleteImage}
              className="p-1 text-white rounded-full bg-red-600 "
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>

          {/* Image */}
          <img src={src} className="max-w-full rounded-md" />

          {/* Delete button */}
        </NodeViewWrapper>
      );
    });
  },
});

const RichTextEditor = ({ value, onChange, onImageUpload }) => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      Underline,
      Link.configure({ openOnClick: false }),
      CustomImage,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  const setLink = () => {
    setShowLinkInput(!showLinkInput); // toggle input box
  };

  const applyLink = () => {
    if (linkUrl.trim() !== "") {
      let url = linkUrl.trim();

      // Prepend https:// if missing
      if (!/^https?:\/\//i.test(url)) {
        url = `https://${url}`;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
    setShowLinkInput(false);
    setLinkUrl("");
  };

  const addImage = async () => {
    // (no change here)
    const file = await new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = () => resolve(input.files[0]);
      input.click();
    });
    if (!file) return;
    const imageUrl = onImageUpload
      ? await onImageUpload(file)
      : URL.createObjectURL(file);
    editor
      .chain()
      .focus()
      .insertContent([
        {
          type: "image",
          attrs: { src: imageUrl, align: "center" },
        },
        {
          type: "paragraph",
        },
      ])
      .run();
  };

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b p-2 flex gap-1 flex-wrap justify-start items-center relative">
        {/* normal buttons */}
        <ToolbarButton
          title="Bold"
          icon={FaBold}
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        />
        <ToolbarButton
          title="Italic"
          icon={FaItalic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        />
        <ToolbarButton
          title="Underline"
          icon={FaUnderline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
        />

        <div className="w-0.5 h-6 bg-slate-600 mx-1 rounded-xl" />

        <div className="flex items-center gap-1">
          <select
            className="p-2 rounded-lg border bg-white text-gray-700"
            value={
              [1, 2, 3, 4, 5, 6].find((level) =>
                editor.isActive("heading", { level })
              ) || ""
            }
            onChange={(e) => {
              const level = parseInt(e.target.value);
              if (level) editor.chain().focus().toggleHeading({ level }).run();
              else editor.chain().focus().setParagraph().run();
            }}
          >
            <option value="">Paragraph</option>
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <option key={level} value={level}>
                Heading {level}
              </option>
            ))}
          </select>
        </div>

        <div className="w-0.5 h-6 bg-slate-600 mx-1 rounded-xl" />

        <ToolbarButton
          title="Bullet List"
          icon={FaListUl}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        />
        <ToolbarButton
          title="Ordered List"
          icon={FaListOl}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        />

        <div className="w-0.5 h-6 bg-slate-600 mx-1 rounded-xl" />

        <ToolbarButton
          title="Insert Link"
          icon={FaLink}
          onClick={setLink}
          isActive={editor.isActive("link")}
        />

        {showLinkInput && (
          <div className="absolute top-full left-0 mt-1 bg-white border p-2 rounded-lg shadow-lg flex items-center gap-2 z-10">
            <input
              type="url"
              placeholder="Enter URL"
              className="border rounded p-1 text-sm w-48"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
            <button
              onClick={applyLink}
              className="bg-purple-600 text-white px-2 py-1 rounded text-sm"
            >
              Apply
            </button>
          </div>
        )}

        <ToolbarButton title="Insert Image" icon={FaImage} onClick={addImage} />

        <div className="w-0.5 h-6 bg-slate-600 mx-1 rounded-xl" />

        <ToolbarButton
          title="Align Left"
          icon={FaAlignLeft}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
        />
        <ToolbarButton
          title="Align Center"
          icon={FaAlignCenter}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
        />
        <ToolbarButton
          title="Align Right"
          icon={FaAlignRight}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
        />
        <ToolbarButton
          title="Justify"
          icon={FaAlignJustify}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          isActive={editor.isActive({ textAlign: "justify" })}
        />
      </div>

      {/* Editor Content */}
      <div className="min-h-[80dvh] max-h-[80dvh] overflow-y-auto">
        <EditorContent
          editor={editor}
          className="p-4 focus:outline-none prose max-w-none h-full"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
