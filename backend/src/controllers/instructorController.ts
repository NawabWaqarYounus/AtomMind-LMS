import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getInstructorDashboard = async (req: Request, res: Response) => {
    try {
        // Mocking advanced analytics for a "Mission Control" feel
        // Fetch real student count
        const { count: studentCount, error: studentError } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .eq('role', 'student');

        if (studentError) console.error("Error fetching student count:", studentError);

        const stats = {
            activeStudents: studentCount || 1248, // Fallback to mock for demo if empty
            completionRate: 84.5,
            engagementScore: 92,
            atRiskCount: 14,
            avgNeuralLatency: '124ms',
            totalComputeTime: '1,420 hrs'
        };

        const engagementData = [
            { time: '00:00', active: 420 },
            { time: '04:00', active: 180 },
            { time: '08:00', active: 650 },
            { time: '12:00', active: 1100 },
            { time: '16:00', active: 950 },
            { time: '20:00', active: 1248 },
        ];

        const topCourses = [
            { name: "Advanced Neural Networks", enrolled: 450, growth: "+12%" },
            { name: "Quantum Computing Basics", enrolled: 320, growth: "+8%" },
            { name: "Ethical AI Design", enrolled: 280, growth: "+15%" }
        ];

        res.json({ stats, engagementData, topCourses });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getRiskAssessment = async (req: Request, res: Response) => {
    try {
        const { data: riskStudents, error } = await supabase
            .from('risk_scores')
            .select(`
                *,
                profiles (full_name, avatar_url)
            `)
            .order('score', { ascending: false });

        if (error) throw error;

        // Mock data if table is empty for demonstration
        const mockRisk = [
            { id: 1, profiles: { full_name: "Sarah Miller" }, risk_level: "high", score: 88, predicted_outcome: "Drop-out risk" },
            { id: 2, profiles: { full_name: "James Wilson" }, risk_level: "high", score: 82, predicted_outcome: "Incomplete project" },
            { id: 3, profiles: { full_name: "Elena Rodriguez" }, risk_level: "medium", score: 45, predicted_outcome: "Decreasing engagement" }
        ];

        res.json(riskStudents?.length ? riskStudents : mockRisk);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
