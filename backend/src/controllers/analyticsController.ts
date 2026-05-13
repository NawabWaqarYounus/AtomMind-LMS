import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getUserAnalytics = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error) {
        // Return mock data if none exists for demo
        return res.json({
            user_id: userId,
            dropout_risk: 0.15,
            engagement_score: 0.85,
            weak_topics: ['Asynchronous JS', 'Advanced SQL'],
            predicted_grade: 'A',
            last_prediction_at: new Date()
        });
    }
    res.json(data);
};

export const getAtRiskStudents = async (req: Request, res: Response) => {
    const { data, error } = await supabase
        .from('analytics')
        .select('*, profiles(full_name)')
        .gt('dropout_risk', 0.5)
        .order('dropout_risk', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
};

export const updateRiskScores = async (req: Request, res: Response) => {
    // This would normally be an ML pipeline trigger
    const { userId, risk, engagement } = req.body;
    const { data, error } = await supabase
        .from('analytics')
        .upsert({ user_id: userId, dropout_risk: risk, engagement_score: engagement })
        .select();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};
