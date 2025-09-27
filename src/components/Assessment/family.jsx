 import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { Users, ArrowLeft, BookOpen, ChevronRight } from "lucide-react";

 const questions = [
  // Original questions
  {
    id: 1,
    text: "Do family members share responsibilities fairly?",
    category: "responsibilities",
  },
  {
    id: 2,
    text: "Do you feel emotionally supported by your family?",
    category: "support",
  },
  {
    id: 3,
    text: "Are there frequent disagreements about family roles (e.g., parenting, decision-making)?",
    category: "roles",
    reverse: true,
  },
  {
    id: 4,
    text: "Do family members listen to each other during discussions?",
    category: "communication",
  },
  {
    id: 5,
    text: "Do you feel your family works together to solve problems?",
    category: "teamwork",
  },
  // New questions
  {
    id: 6,
    text: "Does your family have meaningful traditions or rituals you enjoy?",
    category: "bonding",
  },
  {
    id: 7,
    text: "Do conflicts in your family typically get resolved in a healthy way?",
    category: "conflict resolution",
  },
  {
    id: 8,
    text: "Do you feel pressured to conform to family expectations?",
    category: "individuality",
    reverse: true,
  },
  {
    id: 9,
    text: "Do family members respect each other's privacy and personal space?",
    category: "boundaries",
  },
  {
    id: 10,
    text: "Does your family adapt well to changes or stressful situations?",
    category: "resilience",
  }
];

const options = [
  { value: "0", label: "Never / Not at all", score: 0 },
  { value: "1", label: "Rarely / Somewhat", score: 1 },
  { value: "2", label: "Sometimes / Mostly", score: 2 },
  { value: "3", label: "Often / Completely", score: 3 },
];

const reverseOptions = [
  { value: "0", label: "Always", score: 0 },
  { value: "1", label: "Often", score: 1 },
  { value: "2", label: "Sometimes", score: 2 },
  { value: "3", label: "Rarely", score: 3 },
];

export default function Family() {
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
        level: "Low Harmony",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        description: "Significant issues with roles or support. We recommend professional family therapy.",
        recommendations: [
          "Schedule family therapy sessions",
          "Hold regular family meetings to discuss issues",
          "Establish clear family roles and responsibilities",
          "Practice active listening during family discussions",
          "Work on conflict resolution skills as a family unit",
        ],
        needsProfessionalHelp: true,
      };
    } else if (score <= 10) {
      return {
        level: "Moderate Harmony",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        description: "Some challenges exist. Try self-help activities like family meetings and reassess in 2 weeks.",
        recommendations: [
          "Hold weekly family meetings to improve communication",
          "Create a family charter with shared values and goals",
          "Practice family bonding activities together",
          "Establish fair chore and responsibility systems",
          "Work on listening skills and empathy within the family",
        ],
        needsProfessionalHelp: false,
      };
    } else {
      return {
        level: "High Harmony",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        description: "Strong family dynamics! Maintain with regular check-ins or self-help resources.",
        recommendations: [
          "Continue your positive family practices",
          "Regular family check-ins to maintain connection",
          "Celebrate family achievements and milestones",
          "Model healthy communication for other families",
          "Consider volunteering together as a family",
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <Card className={`${analysis.bgColor} border-2 ${analysis.borderColor} shadow-lg`}>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Users className={`h-8 w-8 ${analysis.color}`} />
              </div>
              <CardTitle className={`text-3xl ${analysis.color} mb-2`}>Family Dynamics Results</CardTitle>
              <CardDescription className="text-lg text-gray-700">
                Your family's score: {score}/15
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Family Harmony Level</span>
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
                  Family Strengthening Tips
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
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                  <h4 className="font-semibold text-blue-800 mb-2">Family Therapy Recommended</h4>
                  <p className="text-blue-700 mb-4">
                    Based on your responses, family therapy could help improve your family dynamics.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                    <Link to="/professionals?type=family" className="flex items-center">
                      Find a Family Therapist <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1">
                  <Link to="/family" className="flex items-center justify-center">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Retake Assessment
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => window.open("https://moodmantra.com/", "_blank", "noopener,noreferrer")}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Family Resources
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
              <strong>Disclaimer:</strong> This assessment is not a diagnostic tool nor a substitute for professional family counseling. 
              Please consult a qualified family therapist for comprehensive support.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
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
              Based on your family interactions over the last month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedOption}
              onValueChange={(value) => handleAnswer(questions[currentQuestion].id, Number.parseInt(value))}
              className="space-y-3"
            >
              {(questions[currentQuestion].reverse ? reverseOptions : options).map((option) => (
                <div 
                  key={option.value} 
                  className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer
                    ${selectedOption === option.value ? 
                      'border-green-500 bg-green-50' : 
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