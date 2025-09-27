  import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Brain, ArrowLeft, Trophy, User, BookOpen, MessageCircle, AlertTriangle } from "lucide-react";
import { Suspense } from "react";

function ResultsContent() {
  const [searchParams] = useSearchParams();
  const timeframe = searchParams.get("timeframe") || "";
  const score = Number.parseFloat(searchParams.get("score") || "0");
  const moods = searchParams.get("moods")?.split(",") || [];

  const timeFrameLabels = {
    "1week": "Last Week",
    "2weeks": "Last 2 Weeks",
    "4weeks": "Last 4 Weeks",
    "3months": "Last 3 Months",
  };

  const getDetailedAnalysis = (score) => {
    if (score >= 4.5) {
      return {
        level: "Excellent Mental Health",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: "🌟",
        description: "You're experiencing very positive mental health with high levels of well-being.",
        recommendations: [
          "Continue your current self-care practices",
          "Maintain healthy lifestyle habits",
          "Consider sharing your positive strategies with others",
          "Regular check-ins to maintain this level",
        ],
        needsProfessionalHelp: false,
      };
    }
    if (score >= 3.5) {
      return {
        level: "Good Mental Health",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        icon: "😊",
        description: "You're generally doing well with mostly positive emotions and good coping skills.",
        recommendations: [
          "Keep up your current wellness routine",
          "Practice mindfulness and stress management",
          "Stay connected with supportive relationships",
          "Monitor for any changes in mood patterns",
        ],
        needsProfessionalHelp: false,
      };
    }
    if (score >= 2.5) {
      return {
        level: "Fair Mental Health",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        icon: "😐",
        description: "You're experiencing some emotional ups and downs, which is normal but worth monitoring.",
        recommendations: [
          "Focus on stress reduction techniques",
          "Establish regular sleep and exercise routines",
          "Consider talking to friends, family, or a counselor",
          "Practice self-care activities you enjoy",
        ],
        needsProfessionalHelp: false,
      };
    }
    if (score >= 1.5) {
      return {
        level: "Concerning Mental Health",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        icon: "😟",
        description: "You're experiencing significant emotional challenges that may benefit from additional support.",
        recommendations: [
          "Consider speaking with a mental health professional",
          "Reach out to trusted friends or family members",
          "Practice daily self-care and stress management",
          "Avoid isolation and maintain social connections",
        ],
        needsProfessionalHelp: true,
      };
    }
    return {
      level: "Needs Immediate Attention",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: "🚨",
      description: "You're experiencing significant mental health challenges that require professional support.",
      recommendations: [
        "Seek professional help from a licensed therapist or counselor",
        "Contact your healthcare provider",
        "Reach out to crisis support if needed",
        "Don't face this alone - support is available",
      ],
      needsProfessionalHelp: true,
      urgent: true,
    };
  };

  const analysis = getDetailedAnalysis(score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
    

      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Results Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{analysis.icon}</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Mood Analysis Results</h2>
          <p className="text-lg text-gray-600">Based on your {timeFrameLabels[timeframe]} assessment</p>
        </div>

        {/* Score Card */}
        <Card className={`mb-8 ${analysis.bgColor} ${analysis.borderColor} border-2`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className={`text-2xl ${analysis.color}`}>{analysis.level}</CardTitle>
              <div className={`text-3xl font-bold ${analysis.color}`}>{score.toFixed(1)}/5.0</div>
            </div>
            <CardDescription className="text-lg">{analysis.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-purple-600 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${(score / 5) * 100}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600">
              <strong>Selected emotions:</strong> {moods.join(", ")}
            </div>
          </CardContent>
        </Card>

        {/* Urgent Alert */}
        {analysis.urgent && (
          <Alert className="mb-8 border-red-300 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Important:</strong> If you're having thoughts of self-harm or suicide, please reach out for
              immediate help:
              <div className="mt-2 space-y-1">
                <div>• National Suicide Prevention Lifeline: 988</div>
                <div>• Crisis Text Line: Text HOME to 741741</div>
                <div>• Emergency Services: 911</div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-6 w-6 text-yellow-600 mr-2" />
              Personalized Recommendations
            </CardTitle>
            <CardDescription>Based on your assessment, here are some steps you can take:</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analysis.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Professional Help Section */}
        {analysis.needsProfessionalHelp && (
  <Card className="mb-8 border-l-4 border-blue-500 bg-blue-50/80 hover:bg-blue-50 transition-colors">
    <CardHeader className="pb-3">
      <div className="flex items-start space-x-3">
        <div className="p-2 rounded-full bg-blue-100">
          <MessageCircle className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <CardTitle className="text-lg font-semibold text-blue-900">
            Professional Support Recommended
          </CardTitle>
          <CardDescription className="text-blue-700 mt-1">
            Based on your results, speaking with a mental health professional could help you:
          </CardDescription>
          <ul className="list-disc list-inside text-blue-700 text-sm space-y-1 mt-2 pl-1">
            <li>Develop coping strategies</li>
            <li>Gain personalized insights</li>
            <li>Improve emotional wellbeing</li>
          </ul>
        </div>
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button 
          asChild
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white shadow-sm transition-all hover:shadow-md"
        >
          <Link to="/doctors" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Find a Therapist
          </Link>
        </Button>
        <Button 
  variant="outline"
  className="border-blue-300 text-blue-700 hover:bg-blue-100 px-6 py-3 shadow-sm"
  onClick={() => window.open("https://moodmantra.com/", "_blank", "noopener,noreferrer")}
>
  <div className="flex items-center gap-2">
    <BookOpen className="h-4 w-4" />
    Self-Help Resources
  </div>
</Button>
      </div>
      <p className="text-xs text-blue-500 text-center mt-3">
        Confidential and secure matching with licensed professionals
      </p>
    </CardContent>
  </Card>
)}

        

        {/* Next Steps */}
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">What's Next?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button>
              <Link to="/moodtest">Take Another Assessment</Link>
            </Button>
            {/* <Button variant="outline">
              <Link to="/self-help">Explore Self-Help Resources</Link>
            </Button> */}
             <Button   variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 shadow-sm">
   <Link to="/moodtracker"> Mood Tracker</Link>
   
  
</Button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-4 bg-gray-100 rounded-lg text-sm text-gray-600 text-center">
          <strong>Important Disclaimer:</strong> This assessment is not a substitute for professional medical advice,
          diagnosis, or treatment. Always seek the advice of qualified health providers with any questions you may have
          regarding a medical condition. If you're experiencing a mental health emergency, please contact emergency
          services immediately.
        </div>
      </div>
   
   
    </div>
  );
}

export default function Result() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4 animate-pulse" />
            <p className="text-lg text-gray-600">Loading your results...</p>
          </div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}