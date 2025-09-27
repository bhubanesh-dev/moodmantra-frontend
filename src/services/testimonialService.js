const API_ROOT = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
const API_BASE_URL = `${API_ROOT}/api`;

// Get approved testimonials (public)
export const getApprovedTestimonials = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/testimonials/approved`);
    if (!response.ok) {
      throw new Error("Failed to fetch testimonials");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
};

// Create testimonial (requires authentication)
export const createTestimonial = async (testimonialData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/testimonials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify(testimonialData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to create testimonial");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating testimonial:", error);
    throw error;
  }
};

// Get user's testimonial (requires authentication)
export const getUserTestimonial = async (userId, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/testimonials/user/${userId}`,
      {
        method: "GET",
        headers: {
          token,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null; // No testimonial found
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch user testimonial");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user testimonial:", error);
    throw error;
  }
};

// Update testimonial (requires authentication)
export const updateTestimonial = async (
  testimonialId,
  testimonialData,
  token
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/testimonials/${testimonialId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify(testimonialData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update testimonial");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating testimonial:", error);
    throw error;
  }
};

// Delete testimonial (requires authentication)
export const deleteTestimonial = async (testimonialId, userId, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/testimonials/${testimonialId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete testimonial");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    throw error;
  }
};
