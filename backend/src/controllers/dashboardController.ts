import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getStudentDashboardData = async (req: Request, res: Response) => {
    const { userId } = req.query;

    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    // Fetch profile, progress, and analytics in parallel
    const [profileRes, analyticsRes, progressRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).single(),
        supabase.from('analytics').select('*').eq('user_id', userId).single(),
        supabase.from('progress').select('*').eq('user_id', userId)
    ]);

    res.json({
        profile: profileRes.data,
        analytics: analyticsRes.data,
        progress: progressRes.data,
        // Mocked AI insights for the dashboard
        ai_insights: {
            engagement_trend: '+14%',
            predicted_mastery: '89%',
            suggestion: "Focus on List Comprehensions today."
        }
    });
};

export const getProgress = async (req: Request, res: Response) => {
    const { userId } = req.query;
    const { data, error } = await supabase
        .from('progress')
        .select(`
            *,
            lesson:lessons(*)
        `)
        .eq('user_id', userId);

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};

export const getRecommendations = async (req: Request, res: Response) => {
    const { userId } = req.query;
    const { data, error } = await supabase
        .from('recommendations')
        .select('*')
        .eq('user_id', userId)
        .order('confidence_score', { ascending: false });

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};
