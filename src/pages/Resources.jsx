import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
// import BlogSubmission from "../components/BlogSubmission";
import TestConnection from "../components/TestConnection";
import { useAuth } from "../context/AppContext";
import axios from "axios";
import {
  FaSearch,
  FaFilter,
  FaTh,
  FaList,
  FaHeart,
  FaComment,
  FaCalendarAlt,
  FaUser,
  FaTag,
  FaArrowLeft,
  FaArrowRight,
  FaBookmark,
  FaShare,
  FaEdit,
  FaPlus,
  FaSpinner,
} from "react-icons/fa";

const Resources = () => {
  const { token, userData, backendUrl } = useAuth();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [showBlogSubmission, setShowBlogSubmission] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog posts from backend
  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch approved blog posts
      const { data } = await axios.get(`${backendUrl}/api/blog-posts/approved`);

      if (data.success) {
        const posts = data.data.posts.map((post) => ({
          id: post.slug, // Use slug instead of _id for navigation
          title: post.title,
          author: post.author,
          excerpt:
            post.excerpt ||
            post.content.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
          category: post.category
            .replace("-", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          date: new Date(post.publishedAt || post.submittedAt)
            .toISOString()
            .split("T")[0],
          likes: post.likes || 0,
          comments: post.comments || 0,
          featured: post.isFeatured || false,
          image:
            post.imageUrl ||
            "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
          tags: post.tags || [],
          views: post.views || 0,
        }));

        setBlogPosts(posts);

        // Set featured posts
        const featured = posts.filter((post) => post.featured);
        setFeaturedPosts(featured);
      } else {
        setError("Failed to fetch blog posts");
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      setError("Failed to load blog posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch blog posts on component mount
  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Auto-advance carousel for featured posts
  useEffect(() => {
    if (featuredPosts.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [featuredPosts.length]);

  // Refresh posts after successful submission
  const handleBlogSubmissionSuccess = () => {
    fetchBlogPosts();
  };

  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" ||
      post.category.toLowerCase().replace(" ", "-") ===
        selectedCategory.toLowerCase().replace(" ", "-");

    // Search through title, excerpt, author, and tags
    const searchTerm = searchQuery.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.author.toLowerCase().includes(searchTerm) ||
      (post.tags &&
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm)));

    return matchesCategory && matchesSearch;
  });

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "mental-health", name: "Mental Health" },
    { id: "wellness", name: "Wellness" },
    { id: "relationships", name: "Relationships" },
    { id: "parenting", name: "Parenting" },
    { id: "stress-management", name: "Stress Management" },
    { id: "self-care", name: "Self Care" },
    { id: "therapy", name: "Therapy" },
    { id: "personal-story", name: "Personal Story" },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <FaSpinner className="animate-spin text-4xl text-purple-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading blog posts...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button
              onClick={fetchBlogPosts}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      {/* Header Section */}
      <section className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
              Mental Health Resources
            </h1>
            <p className="text-lg text-purple-600 max-w-2xl mx-auto mb-8">
              Discover expert insights, practical tips, and evidence-based
              strategies for better mental health and well-being.
            </p>

            {/* Write Blog Post Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button
                onClick={() => navigate("/write-blog")}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
              >
                <FaEdit className="mr-2" />
                Write a Blog Post
              </Button>
              <p className="text-sm text-purple-500 mt-2">
                Share your insights and help others on their mental health
                journey
              </p>
            </motion.div>

            {/* Test Connection Component */}
          </motion.div>

          {/* Featured Posts Carousel */}
          {featuredPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold text-purple-800 mb-6">
                Featured Posts
              </h2>
              <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg">
                <div className="relative h-80 md:h-96">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex"
                    >
                      <div className="flex-1 relative">
                        <img
                          src={featuredPosts[currentSlide].image}
                          alt={featuredPosts[currentSlide].title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      </div>
                      <div className="flex-1 flex items-center p-8 md:p-12">
                        <div className="text-white">
                          <div className="inline-block bg-purple-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-4">
                            {featuredPosts[currentSlide].category}
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            {featuredPosts[currentSlide].title}
                          </h3>
                          <p className="text-gray-200 mb-6 line-clamp-3">
                            {featuredPosts[currentSlide].excerpt}
                          </p>
                          <div className="flex items-center gap-6 text-sm text-gray-300 mb-6">
                            <div className="flex items-center gap-2">
                              <FaUser className="text-purple-300" />
                              <span>{featuredPosts[currentSlide].author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaCalendarAlt className="text-purple-300" />
                              <span>
                                {formatDate(featuredPosts[currentSlide].date)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Button variant="glass" size="sm">
                              Read More
                            </Button>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <FaHeart className="text-red-400" />
                                {featuredPosts[currentSlide].likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <FaComment className="text-blue-400" />
                                {featuredPosts[currentSlide].comments}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Carousel Navigation */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {featuredPosts.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Arrow Navigation */}
                  <button
                    onClick={() =>
                      setCurrentSlide(
                        (prev) =>
                          (prev - 1 + featuredPosts.length) %
                          featuredPosts.length
                      )
                    }
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-all duration-300"
                  >
                    <FaArrowLeft />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentSlide(
                        (prev) => (prev + 1) % featuredPosts.length
                      )
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-all duration-300"
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="text"
                  placeholder="Search articles, authors, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-purple-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex bg-purple-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-white text-purple-600 shadow-sm"
                      : "text-purple-500 hover:text-purple-600"
                  }`}
                >
                  <FaTh />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-white text-purple-600 shadow-sm"
                      : "text-purple-500 hover:text-purple-600"
                  }`}
                >
                  <FaList />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Blog Posts Grid/List */}
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {blogPosts.length === 0
                    ? "No Blog Posts Yet"
                    : "No Posts Found"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {blogPosts.length === 0
                    ? "Be the first to share your insights with our community!"
                    : "Try adjusting your search or filter criteria."}
                </p>
                {blogPosts.length === 0 && (
                  <Button
                    onClick={() => navigate("/write-blog")}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <FaPlus className="mr-2" />
                    Write the First Post
                  </Button>
                )}
              </div>
            </motion.div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    {viewMode === "list" ? (
                      <>
                        <div className="flex gap-4 p-6">
                          <div className="relative w-32 h-24 overflow-hidden rounded-lg flex-shrink-0">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <FaUser className="text-purple-400 text-sm" />
                              <span className="text-sm text-gray-600">
                                {post.author}
                              </span>
                              <span className="text-sm text-gray-400">•</span>
                              <span className="text-sm text-gray-600">
                                {formatDate(post.date)}
                              </span>
                            </div>
                            <CardTitle
                              className="text-lg mb-2 line-clamp-2 cursor-pointer hover:text-purple-600 transition-colors"
                              onClick={() => navigate(`/blog/${post.id}`)}
                            >
                              {post.title}
                            </CardTitle>
                            <CardDescription className="mb-3 line-clamp-2">
                              {post.excerpt}
                            </CardDescription>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <FaHeart className="text-red-400" />
                                  {post.likes}
                                </span>
                                <span className="flex items-center gap-1">
                                  <FaComment className="text-blue-400" />
                                  {post.comments}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => navigate(`/blog/${post.id}`)}
                                >
                                  Read More
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <FaBookmark />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <FaShare />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="relative h-48 overflow-hidden rounded-t-2xl">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="text-sm font-medium text-purple-600 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <FaUser className="text-purple-400 text-sm" />
                            <span className="text-sm text-gray-600">
                              {post.author}
                            </span>
                          </div>
                          <CardTitle
                            className="text-lg mb-3 line-clamp-2 cursor-pointer hover:text-purple-600 transition-colors"
                            onClick={() => navigate(`/blog/${post.id}`)}
                          >
                            {post.title}
                          </CardTitle>

                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <FaCalendarAlt className="text-purple-400" />
                              <span>{formatDate(post.date)}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <FaHeart className="text-red-400" />
                                {post.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <FaComment className="text-blue-400" />
                                {post.comments}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => navigate(`/blog/${post.id}`)}
                            >
                              Read More
                            </Button>
                            <Button variant="ghost" size="sm">
                              <FaBookmark />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <FaShare />
                            </Button>
                          </div>
                        </CardContent>
                      </>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Submission Modal - Removed, now using dedicated page */}
    </div>
  );
};

export default Resources;
