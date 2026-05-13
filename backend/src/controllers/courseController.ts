import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getCourses = async (req: Request, res: Response) => {
    const { data, error } = await supabase
        .from('courses')
        .select('*, profiles(full_name)')
        .eq('is_published', true);

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
};

export const getCourseById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('courses')
        .select('*, lessons(*)')
        .eq('id', id)
        .single();

    if (error) return res.status(404).json({ error: error.message });
    res.json(data);
};

export const createCourse = async (req: Request, res: Response) => {
    const { title, description, instructor_id, category, difficulty } = req.body;
    const { data, error } = await supabase
        .from('courses')
        .insert([{ title, description, instructor_id, category, difficulty }])
        .select()
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};
