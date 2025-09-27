export const moods = [
  {
    id: "ecstatic",
    name: "Ecstatic",
    emoji: "😄",
    color: "green-500",
    description: "Extremely happy and excited, feeling on top of the world",
    value: 5,
    category: "positive",
    intensity: "high",
  },
  {
    id: "joyful",
    name: "Joyful",
    emoji: "😊",
    color: "green-400",
    description: "Happy and energetic, feeling great about life",
    value: 5,
    category: "positive",
    intensity: "medium",
  },
  {
    id: "content",
    name: "Content",
    emoji: "😌",
    color: "blue-500",
    description: "Peaceful and satisfied, feeling at ease with yourself",
    value: 4,
    category: "positive",
    intensity: "medium",
  },
  {
    id: "calm",
    name: "Calm",
    emoji: "😐",
    color: "blue-400",
    description: "Relaxed and centered, feeling balanced and stable",
    value: 4,
    category: "neutral",
    intensity: "low",
  },
  {
    id: "neutral",
    name: "Neutral",
    emoji: "😑",
    color: "gray-500",
    description: "Neither particularly good nor bad, just okay",
    value: 3,
    category: "neutral",
    intensity: "low",
  },
  {
    id: "confused",
    name: "Confused",
    emoji: "😕",
    color: "yellow-500",
    description: "Uncertain and puzzled, not sure how to feel",
    value: 2,
    category: "negative",
    intensity: "low",
  },
  {
    id: "tired",
    name: "Tired",
    emoji: "😴",
    color: "yellow-600",
    description: "Drained and low energy, needing rest and recovery",
    value: 2,
    category: "negative",
    intensity: "medium",
  },
  {
    id: "worried",
    name: "Worried",
    emoji: "😟",
    color: "orange-500",
    description: "Concerned and anxious about something specific",
    value: 2,
    category: "negative",
    intensity: "medium",
  },
  {
    id: "anxious",
    name: "Anxious",
    emoji: "😰",
    color: "orange-600",
    description: "Worried and restless, feeling uneasy or nervous",
    value: 1,
    category: "negative",
    intensity: "high",
  },
  {
    id: "sad",
    name: "Sad",
    emoji: "😢",
    color: "blue-600",
    description: "Down and melancholic, feeling low or blue",
    value: 1,
    category: "negative",
    intensity: "medium",
  },
  {
    id: "angry",
    name: "Angry",
    emoji: "😠",
    color: "red-500",
    description: "Frustrated and irritated, feeling upset or mad",
    value: 1,
    category: "negative",
    intensity: "high",
  },
  {
    id: "devastated",
    name: "Devastated",
    emoji: "😭",
    color: "red-600",
    description: "Extremely upset and distressed, feeling overwhelmed",
    value: 1,
    category: "negative",
    intensity: "very-high",
  },
];

// Helper functions for mood analysis
export const getMoodCategory = (moodId) => {
  const mood = moods.find((m) => m.id === moodId);
  return mood ? mood.category : "neutral";
};

export const getMoodIntensity = (moodId) => {
  const mood = moods.find((m) => m.id === moodId);
  return mood ? mood.intensity : "low";
};

export const getMoodValue = (moodId) => {
  const mood = moods.find((m) => m.id === moodId);
  return mood ? mood.value : 3;
};

export const getMoodColor = (moodId) => {
  const mood = moods.find((m) => m.id === moodId);
  return mood ? mood.color : "gray-500";
};

export const getMoodEmoji = (moodId) => {
  const mood = moods.find((m) => m.id === moodId);
  return mood ? mood.emoji : "😐";
};

export const getMoodName = (moodId) => {
  const mood = moods.find((m) => m.id === moodId);
  return mood ? mood.name : "Unknown";
};

export const getMoodDescription = (moodId) => {
  const mood = moods.find((m) => m.id === moodId);
  return mood ? mood.description : "No description available";
};

// Mood analysis helpers
export const analyzeMoodPattern = (selectedMoods) => {
  if (!selectedMoods || selectedMoods.length === 0) {
    return {
      averageValue: 3,
      dominantCategory: "neutral",
      intensity: "low",
      primaryEmotion: "neutral",
    };
  }

  const moodValues = selectedMoods.map((moodId) => getMoodValue(moodId));
  const averageValue =
    moodValues.reduce((sum, val) => sum + val, 0) / moodValues.length;

  const categories = selectedMoods.map((moodId) => getMoodCategory(moodId));
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const dominantCategory = Object.keys(categoryCounts).reduce((a, b) =>
    categoryCounts[a] > categoryCounts[b] ? a : b
  );

  const intensities = selectedMoods.map((moodId) => getMoodIntensity(moodId));
  const intensityCounts = intensities.reduce((acc, intensity) => {
    acc[intensity] = (acc[intensity] || 0) + 1;
    return acc;
  }, {});

  const dominantIntensity = Object.keys(intensityCounts).reduce((a, b) =>
    intensityCounts[a] > intensityCounts[b] ? a : b
  );

  const primaryEmotion = selectedMoods[0] || "neutral";

  return {
    averageValue,
    dominantCategory,
    intensity: dominantIntensity,
    primaryEmotion,
    moodCount: selectedMoods.length,
  };
};
