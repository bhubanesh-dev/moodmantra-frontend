import React, { useState, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Button } from "./ui/button";
import { useAuth } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RichTextEditor from "./RichTextEditor";
import {
  FaEdit,
  FaTimes,
  FaCheck,
  FaSpinner,
  FaTag,
  FaImage,
  FaFileAlt,
  FaUser,
  FaCalendarAlt,
  FaEye,
  FaEyeSlash,
  FaUpload,
  FaTrash,
} from "react-icons/fa";

const BlogSubmission = ({ isOpen, onClose, onSubmitSuccess }) => {
  const { token, userData, backendUrl } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    tags: "",
    imageUrl: "",
    isAnonymous: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const categories = [
    { id: "mental-health", name: "Mental Health" },
    { id: "wellness", name: "Wellness" },
    { id: "relationships", name: "Relationships" },
    { id: "parenting", name: "Parenting" },
    { id: "stress-management", name: "Stress Management" },
    { id: "self-care", name: "Self Care" },
    { id: "therapy", name: "Therapy" },
    { id: "personal-story", name: "Personal Story" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }

    setIsUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await fetch(`${backendUrl}/api/upload/image`, {
        method: "POST",
        headers: {
          token: token,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload image");
      }

      setFormData((prev) => ({
        ...prev,
        imageUrl: data.data.imageUrl,
      }));

      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(error.message || "Failed to upload image. Please try again.");
    } finally {
      setIsUploadingImage(false);
    }
  };


  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const event = { target: { files: [file] } };
      handleImageSelect(event);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please log in to submit a blog post");
      navigate("/login?type=login");
      return;
    }

    // Validation
    if (!formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }
    if (!formData.content.trim()) {
      toast.error("Please enter content");
      return;
    }

    // If image is selected but not uploaded, upload it first
    if (selectedImage && !formData.imageUrl) {
      await handleImageUpload();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${backendUrl}/api/blog-posts/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit blog post");
      }

      toast.success(
        data.message ||
          "Blog post submitted successfully! It will be reviewed by our team."
      );

      // Reset form
      setFormData({
        title: "",
        category: "",
        content: "",
        tags: "",
        imageUrl: "",
        isAnonymous: false,
      });
      setSelectedImage(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      onClose();
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error("Error submitting blog post:", error);

      // Provide more specific error messages
      if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("ERR_CONNECTION_REFUSED")
      ) {
        toast.error(
          "Cannot connect to server. Please make sure the backend is running."
        );
      } else {
        toast.error(
          error.message || "Failed to submit blog post. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateExcerpt = (content) => {
    const plainText = content.replace(/<[^>]*>/g, "");
    return plainText.length > 150
      ? plainText.substring(0, 150) + "..."
      : plainText;
  };

  const getPlainTextLength = (content) => {
    return content.replace(/<[^>]*>/g, "").length;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaEdit className="text-2xl" />
                <div>
                  <h2 className="text-2xl font-bold">Write a Blog Post</h2>
                  <p className="text-purple-100">
                    Share your insights with our community
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter your blog post title..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  maxLength={100}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.title.length}/100 characters
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content *
                </label>
                <div className="mb-2">
                  <p className="text-xs text-gray-600 mb-1">
                    💡 <strong>Editor Tips:</strong> Use the toolbar above or
                    keyboard shortcuts (Ctrl+B for bold, Ctrl+I for italic,
                    Ctrl+U for underline)
                  </p>
                </div>
                <RichTextEditor
                  value={formData.content}
                  onChange={(newContent) => {
                    setFormData((prev) => ({
                      ...prev,
                      content: newContent,
                    }));
                  }}
                  onImageUpload={handleImageUpload}
                  placeholder="Write your blog post content here..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  {getPlainTextLength(formData.content)} characters (HTML tags
                  excluded)
                </p>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tags (optional)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="Enter tags separated by commas (e.g., anxiety, mindfulness, tips)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Featured Image (optional)
                </label>
                <div
                  className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-purple-500 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <FaImage className="text-5xl text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 text-center mb-2">
                    Drag and drop an image here, or click to select one
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    Supported formats: JPG, PNG, GIF (Max 5MB)
                  </p>

                  {selectedImage && (
                    <div className="mt-4 w-full">
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center">
                          <FaImage className="text-purple-500 mr-2" />
                          <span className="text-sm text-gray-700 truncate">
                            {selectedImage.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleImageUpload();
                            }}
                            disabled={isUploadingImage || formData.imageUrl}
                            className="px-3 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isUploadingImage ? (
                              <>
                                <FaSpinner className="animate-spin mr-1" />
                                Uploading...
                              </>
                            ) : formData.imageUrl ? (
                              <>
                                <FaCheck className="mr-1" />
                                Uploaded
                              </>
                            ) : (
                              <>
                                <FaUpload className="mr-1" />
                                Upload
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage();
                            }}
                            className="p-1 text-red-500 hover:text-red-600 hover:bg-red-50 rounded"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {imagePreview && (
                    <div className="mt-4 w-full">
                      <div className="relative h-48 overflow-hidden rounded-lg border">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                          Preview
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.imageUrl && !selectedImage && (
                    <div className="mt-4 w-full">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center text-green-700">
                          <FaCheck className="mr-2" />
                          <span className="text-sm">
                            Image uploaded successfully!
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Anonymous Option */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isAnonymous"
                  name="isAnonymous"
                  checked={formData.isAnonymous}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="isAnonymous" className="text-sm text-gray-700">
                  Submit anonymously
                </label>
              </div>

              {/* Preview Toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
                >
                  {showPreview ? (
                    <span className="text-lg">👁️‍🗨️</span>
                  ) : (
                    <span className="text-lg">👁️</span>
                  )}
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </button>
              </div>

              {/* Preview */}
              <AnimatePresence>
                {showPreview && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border border-gray-200 rounded-xl p-4 bg-gray-50"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Preview
                    </h3>
                    <Card>
                      {formData.imageUrl && (
                        <div className="h-48 overflow-hidden rounded-t-2xl">
                          <img
                            src={formData.imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <FaUser className="text-purple-400 text-sm" />
                          <span className="text-sm text-gray-600">
                            {formData.isAnonymous
                              ? "Anonymous"
                              : userData?.name || userData?.username || "User"}
                          </span>
                        </div>
                        <CardTitle className="text-lg mb-3">
                          {formData.title || "Your title will appear here"}
                        </CardTitle>
                        <CardDescription className="mb-4">
                          {formData.content ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: generateExcerpt(
                                  formData.content.replace(/<[^>]*>/g, "")
                                ),
                              }}
                            />
                          ) : (
                            "Your content will appear here..."
                          )}
                        </CardDescription>

                        {/* Full Content Preview */}
                        {formData.content && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">
                              Full Content Preview:
                            </h4>
                            <div
                              className="prose prose-sm max-w-none blog-content"
                              dangerouslySetInnerHTML={{
                                __html: formData.content,
                              }}
                            />
                            <style>{`
                              .blog-content img { max-width: 100%; height: auto; display: block; margin: 1rem auto; border-radius: 0.5rem; }
                              .blog-content iframe, .blog-content video { max-width: 100%; }
                            `}</style>
                          </div>
                        )}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <FaCalendarAlt className="text-purple-400" />
                            <span>{new Date().toLocaleDateString()}</span>
                          </div>
                          {formData.category && (
                            <div className="flex items-center gap-1">
                              <FaTag className="text-purple-400" />
                              <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
                                {
                                  categories.find(
                                    (c) => c.id === formData.category
                                  )?.name
                                }
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <div className="flex items-center gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaCheck className="mr-2" />
                      Submit for Review
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BlogSubmission;
