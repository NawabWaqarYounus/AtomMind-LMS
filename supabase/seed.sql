-- Seed Data for AtomMind LMS

-- Note: In a real Supabase environment, you would typically sign up via the UI.
-- This script provides sample data for courses, analytics, and profiles to make the dashboard look full.

-- 1. Create Mock Instructors and Students in Profiles
-- (Using fixed UUIDs for demo purposes)

INSERT INTO public.profiles (id, full_name, role, skill_level, xp, streak)
VALUES 
('d1e1b1e1-1111-1111-1111-111111111111', 'Dr. Sarah Chen', 'instructor', 'advanced', 25000, 45),
('d2e2b2e2-2222-2222-2222-222222222222', 'Prof. James Wilson', 'instructor', 'advanced', 18000, 30),
('d3e3b3e3-3333-3333-3333-333333333333', 'Alex Johnson', 'student', 'beginner', 12450, 14),
('d4e4b4e4-4444-4444-4444-444444444444', 'Ahmed Khan', 'student', 'intermediate', 8500, 5),
('d5e5b5e5-5555-5555-5555-555555555555', 'Fatima Zahra', 'student', 'beginner', 3200, 2),
('d6e6b6e6-6666-6666-6666-666666666666', 'Platform Admin', 'admin', 'advanced', 0, 0)
ON CONFLICT (id) DO NOTHING;

-- 2. Create Sample Courses
INSERT INTO public.courses (id, title, description, instructor_id, category, difficulty, is_published)
VALUES 
('c1c1c1c1-1111-1111-1111-111111111111', 'Python Basics', 'Master the fundamentals of Python programming from scratch.', 'd1e1b1e1-1111-1111-1111-111111111111', 'Programming', 'Beginner', true),
('c2c2c2c2-2222-2222-2222-222222222222', 'Data Analysis with Pandas', 'Learn how to manipulate and analyze data using the Pandas library.', 'd1e1b1e1-1111-1111-1111-111111111111', 'Data Science', 'Intermediate', true),
('c3c3c3c3-3333-3333-3333-333333333333', 'Machine Learning Foundations', 'Understanding the core concepts of ML and neural networks.', 'd2e2b2e2-2222-2222-2222-222222222222', 'AI', 'Advanced', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Create Sample Lessons
INSERT INTO public.lessons (course_id, title, content, "order", duration)
VALUES 
('c1c1c1c1-1111-1111-1111-111111111111', 'Introduction to Python', 'Welcome to Python! In this lesson we cover...', 1, 10),
('c1c1c1c1-1111-1111-1111-111111111111', 'Variables and Data Types', 'Learn about integers, strings, and floats.', 2, 15),
('c1c1c1c1-1111-1111-1111-111111111111', 'Control Flow: Loops', 'Everything you need to know about for and while loops.', 3, 20);

-- 4. Create Sample Risk Scores
INSERT INTO public.risk_scores (user_id, risk_level, score, predicted_outcome)
VALUES 
('d4e4b4e4-4444-4444-4444-444444444444', 'high', 82, 'Likely to drop out without intervention'),
('d5e5b5e5-5555-5555-5555-555555555555', 'medium', 45, 'Falling behind in React modules'),
('d3e3b3e3-3333-3333-3333-333333333333', 'low', 5, 'On track for distinction')
ON CONFLICT DO NOTHING;

-- 5. Create Sample Analytics
INSERT INTO public.analytics (metric_name, metric_value, category)
VALUES 
('Daily Active Users', 850, 'engagement'),
('Average Session Time', 42, 'engagement'),
('Course Completion Rate', 78, 'retention');

-- 6. Platform Stats
INSERT INTO public.platform_stats (total_learners, active_bootcamps, completion_rate)
VALUES (12540, 48, 92.5)
ON CONFLICT DO NOTHING;

-- 7. Testimonials
INSERT INTO public.testimonials (name, role, company, content, avatar_url)
VALUES 
('Sarah Jenkins', 'Data Scientist', 'Google', 'AtomLearn AI completely transformed how I approach learning. The adaptive roadmap is a game changer!', 'https://i.pravatar.cc/150?u=sarah'),
('Michael Chen', 'Full Stack Dev', 'Meta', 'The AI tutor feels like having a senior engineer sitting right next to you. Incredible UX.', 'https://i.pravatar.cc/150?u=michael'),
('Priya Sharma', 'Student', 'Stanford', 'I finished my Python bootcamp 2 weeks early thanks to the personalized recommendations.', 'https://i.pravatar.cc/150?u=priya')
ON CONFLICT DO NOTHING;
