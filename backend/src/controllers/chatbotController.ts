import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export const handleChat = async (req: Request, res: Response) => {
    const { userId, message, sessionId } = req.body;

    if (!userId || !message) {
        return res.status(400).json({ error: 'User ID and message are required' });
    }

    try {
        // 1. Save user message to history (Non-blocking or catch error)
        supabase.from('chatbot_history').insert({
            user_id: userId,
            session_id: sessionId || 'default',
            role: 'user',
            content: message
        }).then(({ error }) => {
            if (error) console.error("DATABASE ERROR (User Message):", error.message);
        });

        // 2. Real AI Logic via GROQ (Llama 3.3 70B)
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `You are AtomLearn AI, a premium and futuristic AI learning assistant. 
                    You help students with coding, system design, and AI concepts. 
                    Your tone is intelligent, encouraging, and slightly futuristic.
                    Always format your responses with clean Markdown. 
                    When explaining code, provide efficient and modern examples.`
                },
                {
                    role: 'user',
                    content: message
                }
            ],
            model: 'llama-3.3-70b-versatile',
        });

        const aiResponse = chatCompletion.choices[0]?.message?.content || "I apologize, my neural link is experiencing latency. Could you repeat that?";

        // 3. Save AI response to history (Non-blocking)
        supabase.from('chatbot_history').insert({
            user_id: userId,
            session_id: sessionId || 'default',
            role: 'assistant',
            content: aiResponse
        }).then(({ error }) => {
            if (error) console.error("DATABASE ERROR (AI Response):", error.message);
        });

        res.json({ response: aiResponse });

    } catch (error: any) {
        console.error("GROQ API ERROR:", error);
        res.status(500).json({ 
            error: "Cognitive processing failed.", 
            details: error.message 
        });
    }
};

export const getChatHistory = async (req: Request, res: Response) => {
    const { userId, sessionId } = req.query;

    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    const query = supabase.from('chatbot_history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

    if (sessionId) {
        query.eq('session_id', sessionId);
    }

    const { data, error } = await query;

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};
