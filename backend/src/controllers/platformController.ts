import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getPlatformStats = async (req: Request, res: Response) => {
    // Attempt to get from DB, or return mock if empty
    const { data, error } = await supabase
        .from('platform_stats')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

    if (error || !data) {
        return res.json({
            total_learners: 12540,
            active_bootcamps: 48,
            completion_rate: 92.5
        });
    }

    res.json(data);
};
