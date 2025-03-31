
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Trophy, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Flag,
  Users,
  ShieldAlert,
  Lightbulb,
  Download
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import ChatAssistant from '@/components/layout/ChatAssistant';
import { useAuth } from '@/lib/auth';
import { toast } from '@/hooks/use-toast';
import { mockChallenges } from '@/data/challenges';
import { downloadChallengeFile } from '@/utils/challengeFiles';

// Your ChallengePage component implementation here
const ChallengePage = () => {
  // Use React router hooks
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Get auth state
  const { user } = useAuth();
  
  // Component state
  const [flagInput, setFlagInput] = useState('');
  const [notes, setNotes] = useState('');
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [challenge, setChallenge] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  
  // Load challenge data
  useEffect(() => {
    // Simulate loading challenge from API
    setTimeout(() => {
      if (id) {
        const foundChallenge = mockChallenges.find(c => c.id.toString() === id);
        if (foundChallenge) {
          setChallenge(foundChallenge);
          // If the challenge has a time limit, set up the timer
          if (foundChallenge.timeLimit) {
            setTimeRemaining(foundChallenge.timeLimit * 60); // Convert to seconds
          }
        } else {
          // Challenge not found
          toast({
            title: "Challenge not found",
            description: "The challenge you're looking for doesn't exist.",
            variant: "destructive",
          });
          navigate('/ctf');
        }
      }
      setIsLoading(false);
    }, 500);
  }, [id, navigate]);
  
  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (timeRemaining !== null && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev !== null && prev > 0) {
            return prev - 1;
          }
          return 0;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeRemaining]);
  
  // Format time remaining
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle flag submission
  const handleSubmitFlag = () => {
    if (!flagInput.trim()) {
      toast({
        title: "Flag is required",
        description: "Please enter a flag before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate flag
    if (challenge && challenge.flag === flagInput.trim()) {
      // Correct flag
      toast({
        title: "Correct flag!",
        description: `Congratulations! You've solved the ${challenge.title} challenge.`,
        variant: "default",
      });
      setSubmitted(true);
    } else {
      // Incorrect flag
      toast({
        title: "Incorrect flag",
        description: "The submitted flag is not correct. Try again!",
        variant: "destructive",
      });
    }
  };
  
  // Handle showing hint
  const handleShowHint = () => {
    setShowHint(true);
    toast({
      title: "Hint revealed",
      description: "You've revealed a hint for this challenge.",
      variant: "default",
    });
  };
  
  // Handle file download
  const handleDownloadFile = (fileName: string) => {
    if (id) {
      const success = downloadChallengeFile(id, fileName);
      if (success) {
        toast({
          title: "File download initiated",
          description: `Downloading ${fileName}...`,
          variant: "default",
        });
      } else {
        toast({
          title: "Download failed",
          description: "Unable to download the requested file.",
          variant: "destructive",
        });
      }
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-64 bg-gray-700 rounded mb-4"></div>
            <div className="h-6 w-32 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!challenge) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Challenge not found</h1>
          <p className="mb-4">The challenge you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/ctf">Back to Challenges</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Back button */}
      <div className="mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link to="/ctf" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Challenges
          </Link>
        </Button>
      </div>
      
      {/* Challenge header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">{challenge.title}</h1>
            <div className="flex items-center space-x-4 mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {challenge.category}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                {challenge.difficulty}
              </span>
              <span className="inline-flex items-center">
                <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                <span className="text-sm">{challenge.points} pts</span>
              </span>
            </div>
          </div>
          
          {timeRemaining !== null && (
            <div className="mt-4 md:mt-0 flex items-center bg-red-900/20 px-4 py-2 rounded-md">
              <Clock className="h-5 w-5 mr-2 text-red-500" />
              <span className="text-lg font-mono">{formatTime(timeRemaining)}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Challenge content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Challenge details */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-300 whitespace-pre-line mb-6">{challenge.description}</p>
            
            {/* Available files */}
            {challenge.files && challenge.files.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Files</h3>
                <div className="space-y-2">
                  {challenge.files.map((file: string, index: number) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="flex items-center w-full justify-start"
                      onClick={() => handleDownloadFile(file)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {file}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Hints */}
            {challenge.hint && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Hint</h3>
                {showHint ? (
                  <div className="bg-yellow-900/20 p-4 rounded-md">
                    <p className="text-yellow-300">{challenge.hint}</p>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    className="flex items-center"
                    onClick={handleShowHint}
                  >
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Reveal Hint
                  </Button>
                )}
              </div>
            )}
            
            {/* Flag submission */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Submit Flag</h3>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <Input
                  placeholder="Enter flag (e.g., CW{...})"
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  disabled={submitted}
                  className="flex-grow"
                />
                <Button 
                  onClick={handleSubmitFlag} 
                  disabled={submitted}
                  className={submitted ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {submitted ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Solved!
                    </>
                  ) : (
                    <>
                      <Flag className="h-4 w-4 mr-2" />
                      Submit Flag
                    </>
                  )}
                </Button>
              </div>
              {submitted && (
                <div className="mt-4 p-4 bg-green-900/20 rounded-md">
                  <p className="text-green-400 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Congratulations! You've solved this challenge.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right column - Notes and info */}
        <div className="lg:col-span-1">
          {/* Challenge stats */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Challenge Info</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-3 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Solves</p>
                  <p className="font-medium">{challenge.solves || 0} teams</p>
                </div>
              </div>
              <div className="flex items-center">
                <ShieldAlert className="h-5 w-5 mr-3 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Technique</p>
                  <p className="font-medium">{challenge.technique || "Various"}</p>
                </div>
              </div>
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-3 text-red-400" />
                <div>
                  <p className="text-sm text-gray-400">Difficulty</p>
                  <p className="font-medium">{challenge.difficulty}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Personal notes */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Your Notes</h2>
            <Textarea
              placeholder="Take notes on your progress here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[200px]"
            />
            <p className="text-xs text-gray-400 mt-2">
              Notes are saved locally and are only visible to you.
            </p>
          </div>
        </div>
      </div>
      
      {/* AI Assistant */}
      <div className="mt-8">
        <ChatAssistant context={`challenge-${challenge.id}`} />
      </div>
    </div>
  );
};

export default ChallengePage;
