import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RichTextEditor from "../components/RichTextEditor";
import {
  FaEdit,
  FaArrowLeft,
  FaCheck,
  FaSpinner,
  FaTag,
  FaImage,
  FaUpload,
  FaTrash,
} from "react-icons/fa";

const WriteBlog = () => {
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

  const handleImageUpload = async (file) => {
    if (!file) {
      toast.error("Please select an image first");
      return null;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);

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

      console.log("Image upload response:", data); // Debug log

      const imageUrl = data.data?.imageUrl || data.imageUrl || data.url;

      if (!imageUrl) {
        console.error("No image URL in response:", data);
        throw new Error("No image URL received from server");
      }

      console.log("Extracted image URL:", imageUrl); // Debug log

      // Test if the image URL is accessible
      const testImg = new Image();
      testImg.onload = () => {
        console.log("✅ Image URL is accessible:", imageUrl);
      };
      testImg.onerror = () => {
        console.error("❌ Image URL is NOT accessible:", imageUrl);
      };
      testImg.src = imageUrl;

      toast.success("Image uploaded successfully!");
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(error.message || "Failed to upload image. Please try again.");
      return null;
    }
  };

  const handleFeaturedImageUpload = async () => {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }

    setIsUploadingImage(true);

    try {
      const imageUrl = await handleImageUpload(selectedImage);
      if (imageUrl) {
        setFormData((prev) => ({
          ...prev,
          imageUrl: imageUrl,
        }));
      }
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
      await handleFeaturedImageUpload();
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

      // Navigate back to resources page
      navigate("/resources");
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

  const getPlainTextLength = (content) => {
    return content.replace(/<[^>]*>/g, "").length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
            >
              <FaArrowLeft className="text-lg" />
              Back
            </button>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <FaEdit className="text-4xl" />
              <div>
                <h1 className="text-3xl font-bold">Write a Blog Post</h1>
                <p className="text-purple-100 text-lg mt-2">
                  Share your insights, experiences, and knowledge with our
                  community
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="w-full">
          {/* Main Form */}
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Create Your Post
                </h2>
                <p className="text-gray-600 mt-2">
                  Fill in the details below to create your blog post
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                    <p className="text-xs text-gray-600">
                      📷 <strong>Image Upload:</strong> Click the image icon in
                      the toolbar or drag & drop images directly into the editor
                    </p>
                  </div>
                  <div className="h-[95vh]">
                    <RichTextEditor
                      value={formData.content}
                      onChange={(newContent) => {
                        setFormData((prev) => ({
                          ...prev,
                          content: newContent,
                        }));
                      }}
                      placeholder="Write your blog post content here..."
                      onImageUpload={handleImageUpload}
                    />
                  </div>
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
                                handleFeaturedImageUpload();
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
                  <label
                    htmlFor="isAnonymous"
                    className="text-sm text-gray-700"
                  >
                    Submit anonymously
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex items-center gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                    size="lg"
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
                    onClick={() => navigate(-1)}
                    disabled={isSubmitting}
                    size="lg"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteBlog;
