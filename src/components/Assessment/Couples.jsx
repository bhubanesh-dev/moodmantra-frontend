 import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { Heart, ArrowLeft, BookOpen, ChevronRight } from "lucide-react";

 const questions = [
  {
    id: 1,
    text: "How often do you and your partner communicate openly about your feelings?",
    category: "communication",
  },
  {
    id: 2,
    text: "Do you feel you can trust your partner with personal matters?",
    category: "trust",
  },
  {
    id: 3,
    text: "How easily do you resolve conflicts with your partner?",
    category: "conflict",
  },
  {
    id: 4,
    text: "Do you feel satisfied with the support you receive from your partner?",
    category: "support",
  },
  {
    id: 5,
    text: "How often do arguments lead to better understanding?",
    category: "conflict",
  },
  {
    id: 6,
    text: "Do you and your partner share common goals for the future?",
    category: "alignment",
  },
  {
    id: 7,
    text: "How often do you feel emotionally disconnected from your partner?",
    category: "emotional intimacy",
    reverse: true,
  },
  {
    id: 8,
    text: "Do you feel appreciated and valued in the relationship?",
    category: "appreciation",
  },
  {
    id: 9,
    text: "How often do you engage in activities or hobbies together?",
    category: "shared experiences",
  },
  {
    id: 10,
    text: "Do you feel your partner respects your personal boundaries?",
    category: "respect",
  },
];

const options = [
  { value: "0", label: "Never / Not at all", score: 0 },
  { value: "1", label: "Rarely / Somewhat", score: 1 },
  { value: "2", label: "Sometimes / Mostly", score: 2 },
  { value: "3", label: "Often / Completely", score: 3 },
];

export default function Couples() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setSelectedOption(null);
  }, [currentQuestion]);

  const handleAnswer = (questionId, score) => {
    const newAnswers = { ...answers, [questionId]: score };
    setAnswers(newAnswers);
    setSelectedOption(score.toString());
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }, 300);
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, score) => sum + score, 0);
  };

  const getResultAnalysis = (score) => {
    if (score <= 5) {
      return {
        level: "Low Satisfaction",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        description: "Significant challenges in communication, trust, or conflict resolution. We recommend seeking professional couples therapy.",
        recommendations: [
          "Schedule couples therapy sessions",
          "Practice active listening exercises",
          "Set aside dedicated time for meaningful conversations",
          "Work on building trust through small, consistent actions",
          "Learn healthy conflict resolution techniques",
        ],
        needsProfessionalHelp: true,
      };
    } else if (score <= 10) {
      return {
        level: "Moderate Satisfaction",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        description: "Some issues may exist. Try self-help strategies like active listening exercises and revisit in 2 weeks. If unchanged, consider therapy.",
        recommendations: [
          "Practice daily check-ins with your partner",
          "Try couples communication exercises",
          "Read relationship self-help books together",
          "Plan regular date nights and quality time",
          "Consider couples workshops or online resources",
        ],
        needsProfessionalHelp: false,
      };
    } else {
      return {
        level: "High Satisfaction",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        description: "Strong foundation! Maintain it with occasional check-ins or self-help tools.",
        recommendations: [
          "Continue your current positive relationship practices",
          "Regular relationship check-ins to maintain connection",
          "Explore new activities together to keep growing",
          "Practice gratitude and appreciation exercises",
          "Consider being mentors to other couples",
        ],
        needsProfessionalHelp: false,
      };
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const score = calculateScore();
    const analysis = getResultAnalysis(score);
    const scorePercentage = Math.round((score / 15) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <Card className={`${analysis.bgColor} border-2 ${analysis.borderColor} shadow-lg`}>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Heart className={`h-8 w-8 ${analysis.color}`} />
              </div>
              <CardTitle className={`text-3xl ${analysis.color} mb-2`}>Relationship Health Results</CardTitle>
              <CardDescription className="text-lg text-gray-700">
                Your relationship score: {score}/15
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Relationship Strength</span>
                  <span className="text-sm font-medium text-gray-600">{scorePercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className={`h-3 rounded-full transition-all duration-1000 ${analysis.color.replace('text', 'bg')}`}
                    style={{ width: `${scorePercentage}%` }}
                  ></div>
                </div>
                <div className={`text-center px-4 py-3 rounded-lg ${analysis.bgColor} mb-4`}>
                  <h3 className={`text-xl font-semibold ${analysis.color} mb-1`}>{analysis.level}</h3>
                  <p className="text-gray-700">{analysis.description}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <ChevronRight className={`h-5 w-5 mr-2 ${analysis.color}`} />
                  Relationship Growth Tips
                </h3>
                <ul className="space-y-3">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                      <div className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${analysis.color.replace('text', 'bg')}`}></div>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {analysis.needsProfessionalHelp && (
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-8">
                  <h4 className="font-semibold text-pink-800 mb-2">Professional Support Recommended</h4>
                  <p className="text-pink-700 mb-4">
                    Based on your responses, couples therapy could help strengthen your relationship.
                  </p>
                  <Button className="bg-pink-600 hover:bg-pink-700 w-full sm:w-auto">
                    <Link to="/professionals?type=couples" className="flex items-center">
                      Find a Couples Therapist <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1">
                  <Link to="/couples" className="flex items-center justify-center">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Retake Assessment
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => window.open("https://moodmantra.com/", "_blank", "noopener,noreferrer")}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Couples Resources
                </Button>
                <Button variant="outline" className="flex-1">
                  <Link to="/" className="flex items-center justify-center">
                    Back to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 p-4 bg-white rounded-lg shadow-sm text-sm text-gray-600 border border-gray-200">
            <p className="text-center">
              <strong>Disclaimer:</strong> This assessment is not a diagnostic tool nor a substitute for professional relationship counseling. 
              Please consult a qualified couples therapist for comprehensive support.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-200" />
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">
              {questions[currentQuestion].text}
            </CardTitle>
            <CardDescription className="text-gray-600">
              Based on your relationship over the last month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedOption}
              onValueChange={(value) => handleAnswer(questions[currentQuestion].id, Number.parseInt(value))}
              className="space-y-3"
            >
              {options.map((option) => (
                <div 
                  key={option.value} 
                  className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer
                    ${selectedOption === option.value ? 
                      'border-pink-500 bg-pink-50' : 
                      'border-gray-200 hover:bg-gray-50 hover:border-gray-300'}
                  `}
                >
                  <RadioGroupItem 
                    value={option.value} 
                    id={`q${questions[currentQuestion].id}-${option.value}`} 
                    className="h-5 w-5"
                  />
                  <Label 
                    htmlFor={`q${questions[currentQuestion].id}-${option.value}`} 
                    className="flex-1 cursor-pointer text-gray-700"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={prevQuestion} 
                disabled={currentQuestion === 0}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <div className="text-sm text-gray-500">
                Select an option to continue
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}