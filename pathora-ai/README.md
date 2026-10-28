# PATHORA AI — Career & Skills Navigator

PATHORA AI is a polished, responsive React + Vite web app for career planning, resume review, interview preparation, learning resources, and employee upskilling.

## Features
- Student career roadmap builder with domain-based guidance
- Employee Growth / Chaos Round for promotion and upskilling plans
- Resume analyzer with ATS-friendly review and text upload support
- Interview practice module with rule-based evaluation
- Resource library and saved roadmaps tracked in localStorage
- Responsive dashboard and theme toggle
- Demo data for both student and employee scenarios

## Stack
- React 18
- Vite
- Lucide icons
- CSS modules replaced with a custom responsive stylesheet

## Setup
1. Open a terminal in this folder.
2. Run:
   npm install
3. Start development mode:
   npm run dev -- --host 0.0.0.0
4. Open the local address shown by Vite in the browser.

## Production build
npm run build

## Local demo notes
- PDF upload is intentionally handled with a fallback prompt because this offline browser demo does not include a PDF extraction library.
- All generated plans and progress persist in the browser via localStorage.

## Feature checklist
- Dashboard and navigation: complete
- Student roadmap form and generation: complete
- Chaos Round employee path: complete
- Resume analyzer: complete
- Interview practice: complete
- Learning resources: complete
- Progress tracking and saved plans: complete
- Local persistence: complete
- Responsive layout: complete
- Demo scenarios: complete

## Basic test instructions
1. Run `npm install`.
2. Start the app with `npm run dev -- --host 0.0.0.0`.
3. Test navigation across dashboard, student, chaos, resume, interview, resources, roadmaps, and settings.
4. Generate a student roadmap and save it.
5. Generate an employee growth plan and verify different roles produce differentiated outputs.
6. Paste resume text and run analysis.
7. Start an interview session and evaluate one response.
8. Refresh the page to confirm localStorage persistence remains active.

## Notes
This version uses rule-based logic to simulate AI-style recommendations without requiring API keys or external services.
