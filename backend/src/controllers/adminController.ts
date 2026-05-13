import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getAdminDashboard = async (req: Request, res: Response) => {
    try {
        // 1. Fetch Platform Stats
        const { data: platformStats, error: statsError } = await supabase
            .from('platform_stats')
            .select('*')
            .single();

        // 2. Fetch User Counts
        const { count: studentCount } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .eq('role', 'student');

        const { count: instructorCount } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .eq('role', 'instructor');

        // 3. Mock Revenue & Activity Data for Futuristic Visualization
        const revenueData = [
            { month: 'Jan', amount: 45000, users: 1200 },
            { month: 'Feb', amount: 52000, users: 1450 },
            { month: 'Mar', amount: 48000, users: 1380 },
            { month: 'Apr', amount: 61000, users: 1890 },
            { month: 'May', amount: 75000, users: 2400 },
            { month: 'Jun', amount: 89000, users: 3100 },
        ];

        const platformMetrics = {
            totalUsers: (studentCount || 0) + (instructorCount || 0),
            studentCount: studentCount || 0,
            instructorCount: instructorCount || 0,
            avgCompletion: platformStats?.completion_rate || 78.4,
            activeBootcamps: platformStats?.active_bootcamps || 24,
            revenueGrowth: "+24.8%",
            systemUptime: "99.99%",
            aiComputeLoad: "42%"
        };

        const activityFeed = [
            { id: 1, type: 'signup', user: 'Sarah M.', detail: 'Joined as Instructor', time: '2 mins ago' },
            { id: 2, type: 'revenue', user: 'Payment Protocol', detail: 'Received $299.00', time: '15 mins ago' },
            { id: 3, type: 'alert', user: 'System', detail: 'Neural Compute Peak Detected', time: '45 mins ago' }
        ];

        res.json({ 
            platformMetrics, 
            revenueData, 
            activityFeed 
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
