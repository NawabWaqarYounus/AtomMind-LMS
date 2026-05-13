# AtomMind LMS - The Adaptive Neural Learning Platform

AtomMind LMS is a premium, AI-driven learning management system engineered for high-performance education. Built with Next.js 15, TypeScript, and Supabase, it leverages real-time cognitive mapping to create personalized learning paths that evolve with every user interaction. Developed for the BU Hackathon.

## 🚀 Key Features

- **Adaptive Neural Roadmap**: Dynamic learning paths that adjust in real-time based on cognitive performance and knowledge gaps.
- **Mind Sync Protocol**: A proprietary adaptive flow that analyzes response patterns to accelerate learning velocity.
- **AI Tutor Interface**: A context-aware learning companion that provides instant analogies, debugging help, and personalized quizzes.
- **Intelligence Analytics**: Deep-dive performance tracking using Recharts to visualize proficiency, engagement, and retention.
- **Professional Course Management**: Comprehensive tools for instructors and admins to manage multimedia courses and recorded video content.
- **Premium Glassmorphic UI**: A cutting-edge design system built with Tailwind CSS and Framer Motion for a fluid, state-of-the-art experience.

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Next.js Server Actions & Node.js/Express.
- **Database**: PostgreSQL (Supabase) with Row-Level Security (RLS).
- **Authentication**: Supabase Auth (SSR) with Role-Based Access Control.
- **Visuals**: Recharts for complex data analytics.

## 📦 Getting Started

### Prerequisites

- Node.js 20+
- Supabase Project (Database + Auth)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/NawabWaqarYounus/AtomMind-LMS
   ```

2. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   # Create .env.local with your Supabase URL and Anon Key
   npm run dev
   ```

3. **Backend Setup (Optional Extensions)**:
   ```bash
   cd backend
   npm install
   # Create .env with backend-specific credentials
   npm run dev
   ```

## 📐 Project Structure

- `frontend/`: Primary Next.js 15 application and design system.
- `backend/`: Supplementary API services.
- `supabase/`: Database schemas, migrations, and seed data.

## 📄 License

MIT © 2026 AtomMind LMS. All rights reserved.
