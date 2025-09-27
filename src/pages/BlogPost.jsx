import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  Heart,
  Share2,
  MessageCircle,
  Calendar,
  User,
  Tag,
  Eye,
  ArrowLeft,
  CheckCircle,
  BookOpen,
  Clock,
  Copy,
} from "lucide-react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { backendUrl, token, userData } = useContext(AppContext);

  const [blogPost, setBlogPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${backendUrl}/api/blog-posts/${slug}`
        );

        if (data.success) {
          setBlogPost(data.data);
          setLikesCount(data.data.likes || 0);
          fetchRelatedPosts(data.data.category, data.data._id);
          fetchComments();
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        toast.error("Failed to load blog post");
        navigate("/resources");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogPost();
    }
  }, [slug, backendUrl, navigate]);

  // Fetch comments
  const fetchComments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/blog-posts/${slug}/comments`
      );
      if (data.success) {
        setComments(data.data.comments);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchRelatedPosts = async (category, currentPostId) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/blog-posts/approved?category=${category}&limit=3`
      );

      if (data.success) {
        const filtered = data.data.posts
          .filter((post) => post._id !== currentPostId)
          .slice(0, 3);
        setRelatedPosts(filtered);
      }
    } catch (error) {
      console.error("Error fetching related posts:", error);
    }
  };

  const handleLike = async () => {
    if (!token) {
      toast.error("Please log in to like this post");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/blog-posts/${slug}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setLiked(true);
        setLikesCount(data.data.likes);
        toast.success("Post liked successfully!");
      }
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Failed to like post");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please log in to comment");
      return;
    }

    if (!newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    setSubmittingComment(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/blog-posts/${slug}/comments`,
        {
          content: newComment.trim(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Comment submitted successfully!");
        setNewComment("");
        fetchComments(); // Refresh comments
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error(error.response?.data?.message || "Failed to submit comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blogPost?.title || "Check out this blog post";
    const text = blogPost?.excerpt || "Interesting read on mental health";

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(
          `${title} ${url}`
        )}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
        setShowShareMenu(false);
        return;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
    setShowShareMenu(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(" ").length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-purple-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Blog post not found</p>
          <button
            onClick={() => navigate("/resources")}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Back to Resources
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate("/resources")}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Resources
        </button>
      </div>

      <div className="w-full px-4 pb-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              {blogPost.category
                .replace("-", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </span>
            {blogPost.isFeatured && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                Featured
              </span>
            )}
          </div>

          {/* Title with Admin Approved Badge */}
          <div className="flex items-start gap-3 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight flex-1">
              {blogPost.title}
            </h1>
            <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              <CheckCircle size={16} />
              Admin Approved
            </div>
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span className="font-medium">{blogPost.author}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>
                {formatDate(blogPost.publishedAt || blogPost.submittedAt)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{calculateReadingTime(blogPost.content)} min read</span>
            </div>

            <div className="flex items-center gap-2">
              <Eye size={16} />
              <span>{blogPost.views || 0} views</span>
            </div>
          </div>

          {/* Featured Image */}
          {blogPost.imageUrl && (
            <div className="mb-6">
              <img
                src={blogPost.imageUrl}
                alt={blogPost.title}
                className="w-full h-64 md:h-80 object-cover rounded-xl"
              />
            </div>
          )}

          {/* Tags */}
          {blogPost.tags && blogPost.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Tag size={16} className="text-gray-500" />
              {blogPost.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              disabled={liked}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                liked
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600"
              }`}
            >
              <Heart size={16} className={liked ? "fill-current" : ""} />
              <span>
                {likesCount} {likesCount === 1 ? "Like" : "Likes"}
              </span>
            </button>

            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Share2 size={16} />
              Share
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("comments-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <MessageCircle size={16} />
              <span>
                {comments.length}{" "}
                {comments.length === 1 ? "Comment" : "Comments"}
              </span>
            </button>
          </div>

          {/* Share Menu */}
          {showShareMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-gray-50 rounded-lg"
            >
              <p className="text-sm text-gray-600 mb-3">Share this post:</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleShare("facebook")}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaFacebook size={16} />
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                >
                  <FaTwitter size={16} />
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  <FaLinkedin size={16} />
                </button>
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <FaWhatsapp size={16} />
                </button>
                <button
                  onClick={() => handleShare("telegram")}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <FaTelegram size={16} />
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Copy size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="prose prose-lg max-w-none">
            <div
              className="blog-content text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: blogPost.content,
              }}
            />
          </div>
          <style>{`
            .blog-content img {
              max-width: 100%;
              height: auto;
              display: block;
              margin: 1rem auto;
              border-radius: 0.5rem;
            }
            .blog-content figure { margin: 1rem 0; }
            .blog-content iframe, .blog-content video { max-width: 100%; }
          `}</style>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          id="comments-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MessageCircle size={24} />
            Comments ({comments.length})
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows="4"
              disabled={submittingComment}
            />
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                disabled={submittingComment || !newComment.trim()}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submittingComment ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No comments yet. Be the first to comment!
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <User size={20} className="text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">
                          {comment.author}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen size={24} />
              Related Posts
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                    )}
                    <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                      <Calendar size={12} />
                      <span>
                        {formatDate(post.publishedAt || post.submittedAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
