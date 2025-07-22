
-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  timezone TEXT,
  experience_level TEXT DEFAULT 'beginner',
  total_sessions INTEGER DEFAULT 0,
  completed_sessions INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.00,
  rating_count INTEGER DEFAULT 0,
  level_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_skills table (many-to-many relationship)
CREATE TABLE public.user_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  skill_type TEXT CHECK (skill_type IN ('offered', 'wanted')) NOT NULL,
  proficiency_level TEXT DEFAULT 'beginner',
  years_experience INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, skill_id, skill_type)
);

-- Create swap_requests table
CREATE TABLE public.swap_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  offered_skill_id UUID REFERENCES public.skills(id),
  requested_skill_id UUID REFERENCES public.skills(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'cancelled', 'completed')),
  message TEXT,
  proposed_duration INTEGER, -- in minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sessions table
CREATE TABLE public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  swap_request_id UUID REFERENCES public.swap_requests(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  duration INTEGER, -- in minutes
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  meeting_link TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ratings table
CREATE TABLE public.ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE,
  rater_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  rated_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  badge_color TEXT,
  points_required INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_achievements table
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  data JSONB,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.swap_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for skills (public read)
CREATE POLICY "Anyone can view skills" ON public.skills FOR SELECT USING (true);

-- RLS Policies for user_skills
CREATE POLICY "Users can view all user skills" ON public.user_skills FOR SELECT USING (true);
CREATE POLICY "Users can manage own skills" ON public.user_skills FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for swap_requests
CREATE POLICY "Users can view relevant swap requests" ON public.swap_requests FOR SELECT 
USING (auth.uid() = requester_id OR auth.uid() = recipient_id);
CREATE POLICY "Users can create swap requests" ON public.swap_requests FOR INSERT 
WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Users can update relevant swap requests" ON public.swap_requests FOR UPDATE 
USING (auth.uid() = requester_id OR auth.uid() = recipient_id);

-- RLS Policies for sessions
CREATE POLICY "Users can view relevant sessions" ON public.sessions FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.swap_requests sr 
  WHERE sr.id = swap_request_id 
  AND (sr.requester_id = auth.uid() OR sr.recipient_id = auth.uid())
));
CREATE POLICY "Users can manage relevant sessions" ON public.sessions FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.swap_requests sr 
  WHERE sr.id = swap_request_id 
  AND (sr.requester_id = auth.uid() OR sr.recipient_id = auth.uid())
));

-- RLS Policies for ratings
CREATE POLICY "Users can view public ratings" ON public.ratings FOR SELECT USING (is_public = true);
CREATE POLICY "Users can view own ratings" ON public.ratings FOR SELECT USING (auth.uid() = rater_id OR auth.uid() = rated_id);
CREATE POLICY "Users can create ratings" ON public.ratings FOR INSERT WITH CHECK (auth.uid() = rater_id);

-- RLS Policies for achievements (public read)
CREATE POLICY "Anyone can view achievements" ON public.achievements FOR SELECT USING (true);

-- RLS Policies for user_achievements
CREATE POLICY "Users can view all user achievements" ON public.user_achievements FOR SELECT USING (true);
CREATE POLICY "Users can manage own achievements" ON public.user_achievements FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Insert some sample skills
INSERT INTO public.skills (name, category, description) VALUES
('React', 'Programming', 'Frontend JavaScript library'),
('Python', 'Programming', 'General-purpose programming language'),
('JavaScript', 'Programming', 'Programming language for web development'),
('Node.js', 'Programming', 'JavaScript runtime for backend development'),
('Guitar', 'Music', 'String musical instrument'),
('Piano', 'Music', 'Keyboard musical instrument'),
('Spanish', 'Languages', 'Spanish language'),
('French', 'Languages', 'French language'),
('Photography', 'Arts', 'Art of taking photographs'),
('Cooking', 'Life Skills', 'Culinary arts and food preparation'),
('Yoga', 'Fitness', 'Physical and mental practice'),
('Marketing', 'Business', 'Promoting products or services');

-- Insert sample achievements
INSERT INTO public.achievements (name, description, icon, badge_color, points_required) VALUES
('First Swap', 'Complete your first skill swap session', '🎯', 'blue', 0),
('5 Star Mentor', 'Receive a 5-star rating', '⭐', 'gold', 0),
('Session Master', 'Complete 10 sessions', '🏆', 'purple', 100),
('Skill Explorer', 'Learn 5 different skills', '🔍', 'green', 50),
('Top Rated', 'Maintain 4.5+ rating with 10+ reviews', '👑', 'gold', 200),
('Consistent Learner', 'Complete sessions 7 days in a row', '📚', 'orange', 75);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
