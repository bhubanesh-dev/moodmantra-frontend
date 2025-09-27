import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { Baby, ArrowLeft, BookOpen, ChevronRight } from "lucide-react";

const questions = [
  {
    id: 1,
    text: "Does the child seem happy or enjoy activities?",
    category: "mood",
  },
  {
    id: 2,
    text: "Does the child have trouble sleeping or seem tired?",
    category: "sleep",
    reverse: true,
  },
  {
    id: 3,
    text: "Does the child get upset or angry easily?",
    category: "behavior",
    reverse: true,
  },
  {
    id: 4,
    text: "Does the child interact well with friends or family?",
    category: "social",
  },
  {
    id: 5,
    text: "Does the child seem worried or anxious about things?",
    category: "anxiety",
    reverse: true,
  },
  {
    id: 6,
    text: "Does the child show interest in learning new things?",
    category: "engagement",
  },
  {
    id: 7,
    text: "Does the child complain of frequent headaches or stomachaches?",
    category: "physical",
    reverse: true,
  },
  {
    id: 8,
    text: "Does the child follow instructions and complete tasks?",
    category: "behavior",
  },
  {
    id: 9,
    text: "Does the child have difficulty focusing on activities?",
    category: "attention",
    reverse: true,
  },
  {
    id: 10,
    text: "Does the child participate in physical activities or play?",
    category: "physical",
  },
];

const options = [
  { value: "0", label: "Never", score: 0 },
  { value: "1", label: "Rarely", score: 1 },
  { value: "2", label: "Sometimes", score: 2 },
  { value: "3", label: "Often", score: 3 },
];

const reverseOptions = [
  { value: "0", label: "Always", score: 0 },
  { value: "1", label: "Often", score: 1 },
  { value: "2", label: "Sometimes", score: 2 },
  { value: "3", label: "Rarely", score: 3 },
];

export default function Child() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Reset selected option when question changes
    setSelectedOption(null);
  }, [currentQuestion]);

  const handleAnswer = (questionId, score) => {
    const newAnswers = { ...answers, [questionId]: score };
    setAnswers(newAnswers);
    setSelectedOption(score.toString());

    // Auto-progress after a short delay for better UX
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
        level: "Significant Concerns",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        description:
          "Noticeable mood or behavior issues. We recommend consulting a child therapist.",
        recommendations: [
          "Schedule an appointment with a child psychologist or therapist",
          "Speak with your child's pediatrician",
          "Create a consistent daily routine for your child",
          "Practice patience and provide extra emotional support",
          "Consider family therapy if family dynamics are involved",
        ],
        needsProfessionalHelp: true,
      };
    } else if (score <= 10) {
      return {
        level: "Moderate Concerns",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        description:
          "Some challenges present. Try self-help strategies like a consistent routine and reassess in 2 weeks. If unchanged, seek therapy.",
        recommendations: [
          "Establish consistent bedtime and daily routines",
          "Increase one-on-one quality time with your child",
          "Practice positive reinforcement and praise",
          "Monitor screen time and ensure physical activity",
          "Consider talking to school counselors or teachers",
        ],
        needsProfessionalHelp: false,
      };
    } else {
      return {
        level: "Good Adjustment",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        description:
          "Positive mood and behavior! Maintain with supportive activities or check-ins.",
        recommendations: [
          "Continue your current positive parenting practices",
          "Maintain regular family activities and bonding time",
          "Encourage your child's interests and hobbies",
          "Keep open communication with your child",
          "Regular check-ins to maintain this positive state",
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <Card
            className={`${analysis.bgColor} border-2 ${analysis.borderColor} shadow-lg`}
          >
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Baby className={`h-8 w-8 ${analysis.color}`} />
              </div>
              <CardTitle className={`text-3xl ${analysis.color} mb-2`}>
                Child Assessment Results
              </CardTitle>
              <CardDescription className="text-lg text-gray-700">
                Your child's score: {score}/15
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Well-being Level
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    {scorePercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className={`h-3 rounded-full transition-all duration-1000 ${analysis.color.replace(
                      "text",
                      "bg"
                    )}`}
                    style={{ width: `${scorePercentage}%` }}
                  ></div>
                </div>
                <div
                  className={`text-center px-4 py-3 rounded-lg ${analysis.bgColor} mb-4`}
                >
                  <h3
                    className={`text-xl font-semibold ${analysis.color} mb-1`}
                  >
                    {analysis.level}
                  </h3>
                  <p className="text-gray-700">{analysis.description}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <ChevronRight className={`h-5 w-5 mr-2 ${analysis.color}`} />
                  Recommended Actions
                </h3>
                <ul className="space-y-3">
                  {analysis.recommendations.map((rec, index) => (
                    <li
                      key={index}
                      className="flex items-start bg-white p-3 rounded-lg shadow-sm"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${analysis.color.replace(
                          "text",
                          "bg"
                        )}`}
                      ></div>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {analysis.needsProfessionalHelp && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Professional Support Recommended
                  </h4>
                  <p className="text-blue-700 mb-4">
                    Based on your responses, consulting with a child therapist
                    could be beneficial for your child's well-being.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                    <Link
                      to="/professionals?type=child"
                      className="flex items-center"
                    >
                      Find a Child Therapist{" "}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1">
                  <Link
                    to="/child"
                    className="flex items-center justify-center"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Retake Assessment
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    window.open(
                      "https://moodmantra.com/",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Self-Help Resources
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
              <strong>Disclaimer:</strong> This assessment is not a diagnostic
              tool nor a substitute for professional medical advice. Please
              consult a qualified child psychologist or pediatrician for proper
              evaluation and treatment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-200" />
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">
              {questions[currentQuestion].text}
            </CardTitle>
            <CardDescription className="text-gray-600">
              For parents: Answer based on your child's behavior over the last
              month (ages 6-12)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedOption}
              onValueChange={(value) =>
                handleAnswer(
                  questions[currentQuestion].id,
                  Number.parseInt(value)
                )
              }
              className="space-y-3"
            >
              {(questions[currentQuestion].reverse
                ? reverseOptions
                : options
              ).map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer
                    ${
                      selectedOption === option.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }
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
