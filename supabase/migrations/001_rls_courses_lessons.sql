-- =====================================================
-- Migration: Enable RLS & Policies for Courses & Lessons
-- Run this in: Supabase Dashboard > SQL Editor
-- Project: qyfaeyyrdwpfsfewwckx
-- =====================================================

-- 1. COURSES TABLE - Enable RLS + Policies
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Courses are viewable by everyone" ON public.courses;
CREATE POLICY "Courses are viewable by everyone"
  ON public.courses FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Instructors can insert courses" ON public.courses;
CREATE POLICY "Instructors can insert courses"
  ON public.courses FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Instructors can update own courses" ON public.courses;
CREATE POLICY "Instructors can update own courses"
  ON public.courses FOR UPDATE
  USING (auth.uid() = instructor_id);

DROP POLICY IF EXISTS "Instructors can delete own courses" ON public.courses;
CREATE POLICY "Instructors can delete own courses"
  ON public.courses FOR DELETE
  USING (auth.uid() = instructor_id);

-- 2. LESSONS TABLE - Enable RLS + Policies
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lessons are viewable by everyone" ON public.lessons;
CREATE POLICY "Lessons are viewable by everyone"
  ON public.lessons FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Instructors can insert lessons" ON public.lessons;
CREATE POLICY "Instructors can insert lessons"
  ON public.lessons FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Instructors can update lessons" ON public.lessons;
CREATE POLICY "Instructors can update lessons"
  ON public.lessons FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.courses
      WHERE courses.id = lessons.course_id
      AND courses.instructor_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Instructors can delete lessons" ON public.lessons;
CREATE POLICY "Instructors can delete lessons"
  ON public.lessons FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.courses
      WHERE courses.id = lessons.course_id
      AND courses.instructor_id = auth.uid()
    )
  );

-- 3. Verify policies were applied
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE tablename IN ('courses', 'lessons')
ORDER BY tablename, policyname;
