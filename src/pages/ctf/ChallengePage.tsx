
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
