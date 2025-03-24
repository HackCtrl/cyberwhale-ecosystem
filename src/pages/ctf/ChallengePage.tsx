import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Shield, Flag, Clock, Award, Terminal, Lock, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import ChatAssistant from '@/components/layout/ChatAssistant';
import { useToast } from '@/hooks/use-toast';

interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  points: number;
  solvedBy: number;
  flag: string;
  hints: string[];
}

const challengesData: Challenge[] = [
  {
    id: 1,
    title: "Easy Peasy",
    description: "This is a very easy challenge to get you started.",
    category: "Web",
    difficulty: "Easy",
    points: 50,
    solvedBy: 120,
    flag: "flag{welcome_to_cyberwhale}",
    hints: ["Try viewing the page source."]
  },
  {
    id: 2,
    title: "Web Recon",
    description: "Can you find the hidden directory?",
    category: "Web",
    difficulty: "Medium",
    points: 100,
    solvedBy: 80,
    flag: "flag{hidden_directory_found}",
    hints: ["Think about common directory names.", "Use a directory brute-forcer."]
  },
  {
    id: 3,
    title: "Crypto Basics",
    description: "Decrypt the message.",
    category: "Crypto",
    difficulty: "Hard",
    points: 150,
    solvedBy: 50,
    flag: "flag{crypto_is_fun}",
    hints: ["What type of encryption is used?", "Try common decryption methods."]
  }
];

const ChallengePage = () => {
  const { id } = useParams<{ id: string }>();
  const challengeId = parseInt(id || '0', 10);
  const [challenge, setChallenge] = useState<Challenge | undefined>(undefined);
  const [submission, setSubmission] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const foundChallenge = challengesData.find((c) => c.id === challengeId);
    setChallenge(foundChallenge);
  }, [challengeId]);

  const handleSubmit = () => {
    if (challenge && submission === challenge.flag) {
      setIsSolved(true);
      toast({
        title: "Correct!",
        description: "You've successfully captured the flag.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect",
        description: "Try again!",
      });
    }
  };

  if (!challenge) {
    return <div>Challenge not found</div>;
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="flex items-center mb-4">
        <Shield className="mr-2 h-5 w-5 text-cyberblue-500" />
        <h1 className="text-2xl font-semibold text-white">{challenge.title}</h1>
        <Badge className="ml-2">{challenge.category}</Badge>
      </div>

      <Tabs defaultValue="challenge" className="w-full">
        <TabsList>
          <TabsTrigger value="challenge">Challenge</TabsTrigger>
          <TabsTrigger value="hints">Hints</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
        </TabsList>
        <TabsContent value="challenge" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-400">{challenge.description}</p>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Flag className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-500">Points: {challenge.points}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-500">Difficulty: {challenge.difficulty}</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="mr-2 h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-500">Solved: {challenge.solvedBy}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white">Submit Flag</h3>
                <div className="mt-2 flex items-center">
                  <Input
                    type="text"
                    placeholder="flag{your_flag_here}"
                    className="mr-2 bg-cyberdark-700 border-cyberdark-600 text-white"
                    value={submission}
                    onChange={(e) => setSubmission(e.target.value)}
                  />
                  <Button onClick={handleSubmit} disabled={isSolved}>
                    {isSolved ? (
                      <>
                        Solved <CheckCircle2 className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="hints" className="mt-4">
          <Card>
            <CardContent className="p-6">
              {challenge.hints && challenge.hints.length > 0 ? (
                <>
                  {showHint ? (
                    <p className="text-gray-400">{challenge.hints[0]}</p>
                  ) : (
                    <Button variant="outline" onClick={() => setShowHint(true)}>
                      Show Hint
                    </Button>
                  )}
                </>
              ) : (
                <p className="text-gray-400">No hints available for this challenge.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="submissions" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-400">Submissions will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ChatAssistant />
    </div>
  );
};

export default ChallengePage;

import { CheckCircle2 } from 'lucide-react';
