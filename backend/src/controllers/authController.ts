import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) return res.status(401).json({ error: error.message });
    res.json(data);
};

export const signup = async (req: Request, res: Response) => {
    const { email, password, full_name, role } = req.body;
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name,
                role: role || 'student',
            },
        },
    });

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};

export const getProfile = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) return res.status(404).json({ error: error.message });
    res.json(data);
};

export const demoLogin = async (req: Request, res: Response) => {
    const { role } = req.body;
    
    const demoUsers = {
        student: { id: 'd3e3b3e3-3333-3333-3333-333333333333', full_name: 'Alex Johnson', role: 'student' },
        instructor: { id: 'd1e1b1e1-1111-1111-1111-111111111111', full_name: 'Dr. Sarah Chen', role: 'instructor' },
        admin: { id: 'admin-uuid', full_name: 'Platform Admin', role: 'admin' }
    };

    const user = demoUsers[role as keyof typeof demoUsers] || demoUsers.student;
    res.json({ user, session: { access_token: 'demo-token' } });
};
