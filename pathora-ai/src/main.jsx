import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Circle,
  Compass,
  Download,
  FileText,
  Filter,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  Moon,
  Printer,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  TimerReset,
  Trophy,
  UserRound,
  X,
} from 'lucide-react';
import './style.css';

const STORAGE_KEY = 'pathora-ai-career-navigator-v1';

const DOMAIN_DEFINITIONS = [
  {
    name: 'Web Development',
    icon: '?',
    roles: ['Frontend Developer', 'Full-Stack Developer', 'UI Engineer'],
    coreSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'APIs', 'Git'],
    roadmap: [
      { title: 'Foundation', skills: ['HTML', 'CSS', 'JavaScript'], project: 'Build a mini landing page with responsive layout and clean interaction states.' },
      { title: 'Intermediate', skills: ['React', 'State management', 'APIs'], project: 'Create a small dashboard app with reusable cards and data fetching.' },
      { title: 'Advanced', skills: ['Performance', 'Accessibility', 'Deployment'], project: 'Launch a portfolio-ready app with testing, optimization, and production workflow.' },
    ],
    resources: [
      { title: 'MDN Web Docs', type: 'Documentation', level: 'Beginner', category: 'Frontend', url: 'https://developer.mozilla.org/en-US/docs/Web' },
      { title: 'React Docs', type: 'Tutorial', level: 'Intermediate', category: 'Frontend', url: 'https://react.dev/' },
      { title: 'Vite Guide', type: 'Tooling', level: 'Beginner', category: 'Frontend', url: 'https://vitejs.dev/guide/' },
    ],
  },
  {
    name: 'Data Analytics',
    icon: '?',
    roles: ['Data Analyst', 'BI Analyst', 'Product Analyst'],
    coreSkills: ['Excel', 'SQL', 'Python', 'Statistics', 'Tableau', 'Dashboarding'],
    roadmap: [
      { title: 'Foundation', skills: ['Excel', 'SQL', 'Statistics'], project: 'Analyze a sales dataset and summarize trends with charts and recommendations.' },
      { title: 'Intermediate', skills: ['Python', 'Pandas', 'Power BI'], project: 'Build a KPI dashboard with cleaning, grouping, and visual storytelling.' },
      { title: 'Advanced', skills: ['Forecasting', 'ETL', 'A/B testing'], project: 'Create a business insight package and communicate findings to stakeholders.' },
    ],
    resources: [
      { title: 'SQLBolt', type: 'Course', level: 'Beginner', category: 'Data', url: 'https://sqlbolt.com/' },
      { title: 'Kaggle Learn', type: 'Course', level: 'Beginner', category: 'Data', url: 'https://www.kaggle.com/learn' },
      { title: 'Power BI Learning', type: 'Tutorial', level: 'Intermediate', category: 'Data', url: 'https://learn.microsoft.com/en-us/training/paths/get-started-power-bi/' },
    ],
  },
  {
    name: 'Artificial Intelligence',
    icon: '?',
    roles: ['AI Developer', 'AI Analyst', 'Prompt Engineer'],
    coreSkills: ['Python', 'Prompt Design', 'LLM workflows', 'Data prep', 'Evaluation', 'Model reasoning'],
    roadmap: [
      { title: 'Foundation', skills: ['Python', 'Data prep', 'Prompt design'], project: 'Build an AI-powered assistant for a small business workflow.' },
      { title: 'Intermediate', skills: ['LLM workflows', 'Retrieval', 'Evaluation'], project: 'Create a task automation assistant with grounded responses and guardrails.' },
      { title: 'Advanced', skills: ['Fine-tuning', 'Systems design', 'Responsible AI'], project: 'Prototype a human-in-the-loop AI feature with evaluation, monitoring, and safety checks.' },
    ],
    resources: [
      { title: 'Google AI Learn', type: 'Course', level: 'Beginner', category: 'AI', url: 'https://ai.google/' },
      { title: 'OpenAI Cookbook', type: 'Guide', level: 'Intermediate', category: 'AI', url: 'https://cookbook.openai.com/' },
      { title: 'Hugging Face Course', type: 'Course', level: 'Intermediate', category: 'AI', url: 'https://huggingface.co/learn' },
    ],
  },
  {
    name: 'Machine Learning',
    icon: '?',
    roles: ['ML Engineer', 'Data Scientist', 'Model Specialist'],
    coreSkills: ['Python', 'Statistics', 'Scikit-learn', 'Feature engineering', 'Model evaluation', 'MLOps'],
    roadmap: [
      { title: 'Foundation', skills: ['Python', 'Statistics', 'Linear algebra'], project: 'Train a churn prediction model on a public dataset.' },
      { title: 'Intermediate', skills: ['Scikit-learn', 'Feature engineering', 'Model tuning'], project: 'Compare multiple ML models and write a business summary of the results.' },
      { title: 'Advanced', skills: ['Model deployment', 'Monitoring', 'MLOps'], project: 'Build and deploy a model API with evaluation metrics and retraining checkpoints.' },
    ],
    resources: [
      { title: 'Scikit-learn Docs', type: 'Documentation', level: 'Beginner', category: 'ML', url: 'https://scikit-learn.org/stable/' },
      { title: 'Coursera ML Specialization', type: 'Course', level: 'Intermediate', category: 'ML', url: 'https://www.coursera.org/specializations/machine-learning-introduction' },
      { title: 'Kaggle Courses', type: 'Course', level: 'Beginner', category: 'ML', url: 'https://www.kaggle.com/learn' },
    ],
  },
  {
    name: 'Cybersecurity',
    icon: '?',
    roles: ['Security Analyst', 'SOC Analyst', 'Pentester'],
    coreSkills: ['Networking', 'Linux', 'Security fundamentals', 'Python', 'SIEM', 'Incident response'],
    roadmap: [
      { title: 'Foundation', skills: ['Networking', 'Linux', 'Security basics'], project: 'Map a home lab network and capture logs for common attacks.' },
      { title: 'Intermediate', skills: ['SIEM', 'Threat hunting', 'Python'], project: 'Create a log analysis workflow using event data and alerting rules.' },
      { title: 'Advanced', skills: ['Incident response', 'Forensics', 'Hardening'], project: 'Document a mock cyber incident and build a response runbook.' },
    ],
    resources: [
      { title: 'Cisco Networking Academy', type: 'Course', level: 'Beginner', category: 'Security', url: 'https://www.netacad.com/' },
      { title: 'Microsoft Security Learning', type: 'Guide', level: 'Intermediate', category: 'Security', url: 'https://learn.microsoft.com/en-us/training/browse/?products=security' },
      { title: 'OWASP', type: 'Resource', level: 'Beginner', category: 'Security', url: 'https://owasp.org/' },
    ],
  },
  {
    name: 'Cloud Computing',
    icon: '?',
    roles: ['Cloud Engineer', 'DevOps Engineer', 'Platform Engineer'],
    coreSkills: ['Linux', 'Networking', 'AWS', 'Docker', 'CI/CD', 'Infrastructure'],
    roadmap: [
      { title: 'Foundation', skills: ['Linux', 'Networking', 'Cloud basics'], project: 'Launch a small app on a free cloud instance and document build steps.' },
      { title: 'Intermediate', skills: ['Docker', 'CI/CD', 'Monitoring'], project: 'Deploy a multi-container app with automated builds and observability.' },
      { title: 'Advanced', skills: ['Terraform', 'Security', 'Scale design'], project: 'Design and document a resilient cloud architecture for a production workload.' },
    ],
    resources: [
      { title: 'AWS Skill Builder', type: 'Course', level: 'Beginner', category: 'Cloud', url: 'https://skillbuilder.aws/' },
      { title: 'Microsoft Learn Cloud', type: 'Course', level: 'Intermediate', category: 'Cloud', url: 'https://learn.microsoft.com/en-us/training/browse/?products=azure' },
      { title: 'Docker Docs', type: 'Documentation', level: 'Beginner', category: 'Cloud', url: 'https://docs.docker.com/' },
    ],
  },
  {
    name: 'UI/UX Design',
    icon: '?',
    roles: ['UI Designer', 'UX Researcher', 'Product Designer'],
    coreSkills: ['Design thinking', 'Figma', 'Wireframes', 'User research', 'Prototype testing', 'Accessibility'],
    roadmap: [
      { title: 'Foundation', skills: ['Color theory', 'Typography', 'Wireframes'], project: 'Redesign a basic app flow with clearer hierarchy and interactions.' },
      { title: 'Intermediate', skills: ['Figma', 'Prototypes', 'User testing'], project: 'Build a mobile app prototype and test it with a short user study.' },
      { title: 'Advanced', skills: ['Design systems', 'Accessibility', 'Research synthesis'], project: 'Create a polished design system and present a complete product case study.' },
    ],
    resources: [
      { title: 'Figma Learn', type: 'Course', level: 'Beginner', category: 'Design', url: 'https://www.figma.com/learn/' },
      { title: 'Google UX Design', type: 'Course', level: 'Beginner', category: 'Design', url: 'https://www.coursera.org/professional-certificates/google-ux-design' },
      { title: 'NN/g UX Research', type: 'Resource', level: 'Intermediate', category: 'Design', url: 'https://www.nngroup.com/articles/' },
    ],
  },
  {
    name: 'Digital Marketing',
    icon: '?',
    roles: ['Digital Marketing Executive', 'Growth Marketer', 'SEO Specialist'],
    coreSkills: ['SEO', 'Content marketing', 'Google Analytics', 'Social media', 'Campaign strategy', 'Brand positioning'],
    roadmap: [
      { title: 'Foundation', skills: ['SEO', 'Content strategy', 'Analytics'], project: 'Audit a small brand website and propose quick growth opportunities.' },
      { title: 'Intermediate', skills: ['Campaign planning', 'Paid ads', 'Email funnels'], project: 'Create a lead generation campaign with goals, content, and measurement.' },
      { title: 'Advanced', skills: ['Performance marketing', 'Lifecycle', 'Conversion optimization'], project: 'Build a full funnel strategy and present KPIs for business growth.' },
    ],
    resources: [
      { title: 'Google Skillshop', type: 'Course', level: 'Beginner', category: 'Marketing', url: 'https://skillshop.exceedlms.com/' },
      { title: 'HubSpot Academy', type: 'Course', level: 'Beginner', category: 'Marketing', url: 'https://academy.hubspot.com/' },
      { title: 'Google Analytics Academy', type: 'Course', level: 'Intermediate', category: 'Marketing', url: 'https://analytics.google.com/analytics/academy/' },
    ],
  },
  {
    name: 'Business Analysis',
    icon: '?',
    roles: ['Business Analyst', 'Process Analyst', 'Product Analyst'],
    coreSkills: ['Requirements gathering', 'Process mapping', 'SQL', 'Stakeholder communication', 'Problem solving', 'Documentation'],
    roadmap: [
      { title: 'Foundation', skills: ['Requirements', 'Process mapping', 'Business context'], project: 'Document a workflow improvement idea for a current process.' },
      { title: 'Intermediate', skills: ['Data analysis', 'Gap analysis', 'UAT'], project: 'Create a business requirements pack and test plan for a feature change.' },
      { title: 'Advanced', skills: ['Strategy', 'Stakeholder influence', 'Decision support'], project: 'Present a business case with metrics, risks, and a rollout plan.' },
    ],
    resources: [
      { title: 'IIBA Resources', type: 'Guide', level: 'Beginner', category: 'Business', url: 'https://www.iiba.org/' },
      { title: 'Coursera BA Courses', type: 'Course', level: 'Intermediate', category: 'Business', url: 'https://www.coursera.org/search?query=business%20analysis' },
      { title: 'Microsoft Learn Power Platform', type: 'Guide', level: 'Beginner', category: 'Business', url: 'https://learn.microsoft.com/en-us/training/browse/?products=power-platform' },
    ],
  },
  {
    name: 'Human Resources',
    icon: '?',
    roles: ['HR Executive', 'HR Generalist', 'HR Manager'],
    coreSkills: ['Talent management', 'Employee relations', 'Recruitment', 'Policy design', 'HR analytics', 'Communication'],
    roadmap: [
      { title: 'Foundation', skills: ['Recruitment', 'Policy basics', 'Communication'], project: 'Design a hiring workflow and onboarding checklist for a sample team.' },
      { title: 'Intermediate', skills: ['Employee engagement', 'Performance reviews', 'Data reporting'], project: 'Build a simple HR dashboard and analyze attrition risk factors.' },
      { title: 'Advanced', skills: ['Leadership', 'Strategic planning', 'Change management'], project: 'Develop an HR strategy for a growing team with retention and culture metrics.' },
    ],
    resources: [
      { title: 'SHRM Learning', type: 'Course', level: 'Beginner', category: 'HR', url: 'https://www.shrm.org/learning' },
      { title: 'CIPD Learning', type: 'Course', level: 'Intermediate', category: 'HR', url: 'https://www.cipd.org/uk/learning/' },
      { title: 'LinkedIn Learning HR', type: 'Course', level: 'Beginner', category: 'HR', url: 'https://www.linkedin.com/learning/' },
    ],
  },
  {
    name: 'Finance',
    icon: '?',
    roles: ['Accountant', 'Financial Analyst', 'Finance Manager'],
    coreSkills: ['Accounting', 'Excel', 'Financial modeling', 'Budgeting', 'Valuation', 'Reporting'],
    roadmap: [
      { title: 'Foundation', skills: ['Accounting basics', 'Excel', 'Financial statements'], project: 'Prepare a small company financial summary from a mock dataset.' },
      { title: 'Intermediate', skills: ['Budgeting', 'Forecasting', 'Variance analysis'], project: 'Create a budget plan for a team and identify risk points.' },
      { title: 'Advanced', skills: ['Modeling', 'Investment analysis', 'Decision support'], project: 'Build a scenario-based investment or expansion recommendation using financial metrics.' },
    ],
    resources: [
      { title: 'Corporate Finance Institute', type: 'Course', level: 'Beginner', category: 'Finance', url: 'https://corporatefinanceinstitute.com/' },
      { title: 'CFA Institute', type: 'Resource', level: 'Intermediate', category: 'Finance', url: 'https://www.cfainstitute.org/' },
      { title: 'Investopedia Academy', type: 'Course', level: 'Beginner', category: 'Finance', url: 'https://www.investopedia.com/academy/' },
    ],
  },
  {
    name: 'Government Exam Preparation',
    icon: '?',
    roles: ['Administrative Officer', 'Civil Services Candidate', 'Public Sector Analyst'],
    coreSkills: ['General awareness', 'Reasoning', 'English', 'Current affairs', 'Time management', 'Mock tests'],
    roadmap: [
      { title: 'Foundation', skills: ['Current affairs', 'Basic reasoning', 'Reading practice'], project: 'Create a weekly revision tracker and test your speed on short practice sets.' },
      { title: 'Intermediate', skills: ['GS papers', 'Essay structure', 'Mock tests'], project: 'Draft answer outlines and evaluate your weak topics using a mock-paper review.' },
      { title: 'Advanced', skills: ['Revision strategy', 'Interview prep', 'Case-based practice'], project: 'Simulate final-stage essays and interview scenarios with feedback and improvement logs.' },
    ],
    resources: [
      { title: 'UPSC Official', type: 'Resource', level: 'Beginner', category: 'Government', url: 'https://upsc.gov.in/' },
      { title: 'Vision IAS', type: 'Course', level: 'Intermediate', category: 'Government', url: 'https://visionias.in/' },
      { title: 'NCERT', type: 'Resource', level: 'Beginner', category: 'Government', url: 'https://ncert.nic.in/' },
    ],
  },
];

const DOMAIN_LOOKUP = Object.fromEntries(DOMAIN_DEFINITIONS.map((domain) => [domain.name, domain]));

const DEMO_STUDENT = {
  name: 'Aarav',
  education: 'B.Tech',
  course: 'Computer Science',
  careerGoal: 'Data Analyst',
  domain: 'Data Analytics',
  currentSkills: 'Excel, Power BI basics, basic SQL',
  experienceLevel: 'Beginner',
  interests: 'Dashboarding, storytelling, business metrics',
  learningTime: '2 hours/day',
  learningStyle: 'Project-based',
};

const DEMO_EMPLOYEE = {
  currentJobTitle: 'HR Executive',
  domain: 'Human Resources',
  yearsExperience: '2',
  currentSkills: 'Recruitment, onboarding, employee communication, HR policies',
  skillsToImprove: 'Talent analytics, performance management, leadership, compensation planning',
  targetJobTitle: 'HR Manager',
  direction: 'Promotion',
  studyTime: '5 hours/week',
  learningFormat: 'Hybrid',
};

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'student', label: 'Student Career Navigator', icon: GraduationCap },
  { key: 'chaos', label: 'Employee Growth / Chaos Round', icon: Target },
  { key: 'resume', label: 'Resume Analyzer', icon: FileText },
  { key: 'interview', label: 'Interview Practice', icon: MessageSquareText },
  { key: 'resources', label: 'Learning Resources', icon: BookOpen },
  { key: 'roadmaps', label: 'My Roadmaps', icon: Compass },
  { key: 'settings', label: 'Settings', icon: Bell },
];

const LEARNING_RESOURCES = [
  { title: 'SQLBolt', skillCategory: 'SQL', level: 'Beginner', type: 'Interactive Practice', domain: 'Data Analytics', url: 'https://sqlbolt.com/' },
  { title: 'Kaggle Learn', skillCategory: 'Data Science', level: 'Beginner', type: 'Course', domain: 'Data Analytics', url: 'https://www.kaggle.com/learn' },
  { title: 'React Docs', skillCategory: 'Frontend', level: 'Intermediate', type: 'Documentation', domain: 'Web Development', url: 'https://react.dev/' },
  { title: 'MDN Web Docs', skillCategory: 'Frontend', level: 'Beginner', type: 'Documentation', domain: 'Web Development', url: 'https://developer.mozilla.org/' },
  { title: 'Google AI', skillCategory: 'AI', level: 'Beginner', type: 'Guide', domain: 'Artificial Intelligence', url: 'https://ai.google/' },
  { title: 'Hugging Face Course', skillCategory: 'ML/AI', level: 'Intermediate', type: 'Course', domain: 'Machine Learning', url: 'https://huggingface.co/learn' },
  { title: 'OWASP Top 10', skillCategory: 'Security', level: 'Beginner', type: 'Resource', domain: 'Cybersecurity', url: 'https://owasp.org/Top10/' },
  { title: 'AWS Skill Builder', skillCategory: 'Cloud', level: 'Beginner', type: 'Course', domain: 'Cloud Computing', url: 'https://skillbuilder.aws/' },
  { title: 'Figma Learn', skillCategory: 'Design', level: 'Beginner', type: 'Course', domain: 'UI/UX Design', url: 'https://www.figma.com/learn/' },
  { title: 'Google Skillshop', skillCategory: 'Marketing', level: 'Beginner', type: 'Course', domain: 'Digital Marketing', url: 'https://skillshop.exceedlms.com/' },
  { title: 'IIBA', skillCategory: 'Business Analysis', level: 'Beginner', type: 'Guide', domain: 'Business Analysis', url: 'https://www.iiba.org/' },
  { title: 'SHRM Learning', skillCategory: 'Human Resources', level: 'Intermediate', type: 'Course', domain: 'Human Resources', url: 'https://www.shrm.org/learning' },
  { title: 'CFI', skillCategory: 'Finance', level: 'Beginner', type: 'Course', domain: 'Finance', url: 'https://corporatefinanceinstitute.com/' },
  { title: 'NCERT', skillCategory: 'General Knowledge', level: 'Beginner', type: 'Resource', domain: 'Government Exam Preparation', url: 'https://ncert.nic.in/' },
];

const INTERVIEW_BANK = {
  'Data Analyst': [
    { category: 'Technical', question: 'Walk me through how you would analyze a sales dataset to identify which customer segment to target next.' },
    { category: 'Behavioral', question: 'Describe a time you had to explain a data finding to a non-technical stakeholder.' },
    { category: 'HR', question: 'Why do you want to work in analytics, and how do you prioritize competing deadlines?' },
  ],
  'Cybersecurity Analyst': [
    { category: 'Technical', question: 'How would you investigate an unusual spike in failed login attempts across a company network?' },
    { category: 'Behavioral', question: 'Tell me about a time you had to stay calm and act quickly during a high-pressure issue.' },
    { category: 'HR', question: 'How have you handled communication across teams when work priorities were changing rapidly?' },
  ],
  'Frontend Developer': [
    { category: 'Technical', question: 'How would you optimize a slow web app with large lists and repeated re-renders?' },
    { category: 'Behavioral', question: 'Describe a time you worked with a teammate to fix a design or implementation conflict.' },
    { category: 'HR', question: 'What motivates you to work in product teams, and how do you handle feedback?' },
  ],
  'HR Manager': [
    { category: 'Technical', question: 'How would you analyze employee attrition data to identify risk patterns and propose interventions?' },
    { category: 'Behavioral', question: 'Tell me about a time you managed a difficult employee conversation and reached a constructive outcome.' },
    { category: 'HR', question: 'How do you balance employee needs with broader business goals in a fast-growing organization?' },
  ],
  'Senior Data Analyst': [
    { category: 'Technical', question: 'How would you design a KPI dashboard that helps leadership prioritize actions across multiple business units?' },
    { category: 'Behavioral', question: 'Describe a data project where you had to align different stakeholders around a decision.' },
    { category: 'HR', question: 'What does strong leadership look like for you in a data team, and how do you support your peers?' },
  ],
};

const defaultRoadmapTasks = [
  'Set your career objective',
  'Master the core fundamentals',
  'Practice with a portfolio project',
  'Review progress and gaps',
  'Prepare for interviews',
  'Build your application story',
];

const roleSkillMap = {
  'Data Analyst': ['SQL', 'Excel', 'Statistics', 'Dashboarding', 'Business storytelling'],
  'Senior Data Analyst': ['SQL', 'Python', 'Dashboarding', 'Stakeholder communication', 'Forecasting'],
  'HR Manager': ['Talent planning', 'People analytics', 'Leadership', 'Employee relations', 'Strategic communication'],
  'HR Executive': ['Recruitment', 'Policy knowledge', 'Employee communication', 'Onboarding', 'HR systems'],
  'Sales Manager': ['Pipeline management', 'Negotiation', 'Team leadership', 'CRM', 'Forecasting'],
  'Cloud Engineer': ['AWS', 'Linux', 'Docker', 'Networking', 'Security'],
  'Automation Tester': ['Test automation', 'Selenium', 'API testing', 'CI/CD', 'Bug reporting'],
  'Senior Developer': ['System design', 'Architecture', 'Testing', 'Code review', 'Performance'],
  'Financial Analyst': ['Financial modeling', 'Excel', 'Forecasting', 'Business cases', 'Reporting'],
  'Digital Marketing Manager': ['SEO', 'Analytics', 'Campaign strategy', 'Content planning', 'ROAS'],
  'Operations Manager': ['Process improvement', 'Vendor management', 'Metrics', 'Team leadership', 'Risk control'],
  'Business Analyst': ['Requirements', 'Stakeholder alignment', 'Data analysis', 'Process mapping', 'UAT'],
};

const skillPriority = { Critical: '#ff9b8b', High: '#fbbf24', Medium: '#67e8f9' };

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getInitialData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function toSkillList(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildStudentPlan(form) {
  const profile = DOMAIN_LOOKUP[form.domain] || DOMAIN_DEFINITIONS[0];
  const skillList = toSkillList(form.currentSkills);
  const targetSkills = [...profile.coreSkills].slice(0, 4);
  const missing = targetSkills.filter((skill) => !skillList.some((entry) => entry.toLowerCase().includes(skill.toLowerCase().split(' ')[0]) || skill.toLowerCase().includes(entry.toLowerCase().split(' ')[0])));

  return {
    id: createId(),
    name: `${form.careerGoal || 'Career'} roadmap`,
    type: 'Student',
    createdAt: new Date().toISOString(),
    role: form.careerGoal,
    domain: form.domain,
    profile: {
      name: form.name || 'Explorer',
      education: form.education || 'Current study track',
      course: form.course || 'Current course',
      experience: form.experienceLevel,
      learningTime: form.learningTime,
      learningStyle: form.learningStyle,
    },
    summary: `${form.name || 'You'} is aiming for ${form.careerGoal} in ${form.domain}. The plan prioritizes job-ready skills, portfolio practice, and consistent weekly execution.`,
    stages: [
      {
        title: 'Beginner Stage',
        focus: 'Build the foundation',
        skills: profile.roadmap[0].skills,
        weeklyMilestones: ['Complete 1 fundamentals checklist', 'Practice 3 short exercises', 'Document one learning note'],
        project: profile.roadmap[0].project,
      },
      {
        title: 'Intermediate Stage',
        focus: 'Apply the skill with real work',
        skills: profile.roadmap[1].skills,
        weeklyMilestones: ['Finish one guided project', 'Track progress in a portfolio page', 'Review feedback from peers or mentors'],
        project: profile.roadmap[1].project,
      },
      {
        title: 'Advanced Stage',
        focus: 'Prepare for the role',
        skills: profile.roadmap[2].skills,
        weeklyMilestones: ['Create a polished portfolio case study', 'Run mock interviews', 'Refine resume for role fit'],
        project: profile.roadmap[2].project,
      },
    ],
    skillsToLearn: [...profile.coreSkills],
    missingSkills: missing.length ? missing : ['None flagged at this point; focus on polishing your portfolio and interview stories.'],
    weeklyPlan: [
      'Day 1-2: Study the core concept and review examples.',
      'Day 3: Complete a short practice task or challenge.',
      'Day 4: Build a small output that demonstrates learning.',
      'Day 5: Review your notes and improve the clarity of your portfolio work.',
      'Weekend: Reflect on your progress, complete one mock interview or quiz, and plan next week.',
    ],
    projects: [profile.roadmap[0].project, profile.roadmap[1].project, profile.roadmap[2].project],
    portfolioTips: ['Share a clean GitHub or project page.', 'Add before/after screenshots and a problem summary.', 'Write one measurable outcome for each project.'],
    interviewPrep: ['Prepare 3 STAR stories.', 'Practice explaining your projects clearly.', 'Review common technical and HR questions for your target role.'],
    resources: profile.resources,
    progression: ['Intern / learner', 'Junior role', 'Associate / specialist', 'Target role'],
    estimatedTimeline: form.experienceLevel === 'Beginner' ? '6-9 months' : form.experienceLevel === 'Intermediate' ? '3-5 months' : '2-3 months',
  };
}

function buildEmployeePlan(form) {
  const target = form.targetJobTitle || 'Next Role';
  const currentSkillList = toSkillList(form.currentSkills);
  const missing = toSkillList(form.skillsToImprove);
  const roleSkills = roleSkillMap[target] || roleSkillMap['Business Analyst'] || ['Leadership', 'Communication', 'Execution'];
  const domainSkills = DOMAIN_LOOKUP[form.domain]?.coreSkills || ['Domain fundamentals', 'Workflow design', 'Metrics'];

  const gap = roleSkills.filter((item) => !currentSkillList.some((skill) => skill.toLowerCase().includes(item.split(' ')[0].toLowerCase()) || item.toLowerCase().includes(skill.split(' ')[0].toLowerCase())));

  const roadmap = [
    { title: 'Month 1', focus: 'Solve skill gaps', tasks: ['Audit your current responsibilities and identify the top 3 missing skills.', 'Complete a structured learning sprint for the most important skill gap.', 'Document one measurable learning artifact or case study.'] },
    { title: 'Month 2', focus: 'Apply on the job', tasks: ['Lead a small project or process improvement with monthly deliverables.', 'Practice communicating with stakeholders using clear updates and outcomes.', 'Create one work sample that can be referenced in promotion discussions.'] },
    { title: 'Month 3', focus: 'Prepare for promotion', tasks: ['Run a mock presentation of your achievements and future contribution.', 'Build evidence of leadership, ownership, and measurable impact.', 'Align your portfolio and promotion story with the target role.'] },
  ];

  const workProjects = [
    `Own a process improvement project tied to ${form.domain.toLowerCase()}.`,
    `Deliver one measurable business or team outcome using clear KPIs.`,
    `Create a short case study summarizing the project, your contribution, and the results.`,
  ];

  const recommendedTools = form.domain === 'Human Resources'
    ? ['Workday', 'BambooHR', 'Excel', 'LinkedIn Talent Solutions']
    : form.domain === 'Data Analytics'
      ? ['SQL', 'Power BI', 'Excel', 'Python']
      : form.domain === 'Cloud Computing'
        ? ['AWS', 'Docker', 'GitHub Actions', 'Terraform']
        : form.domain === 'Cybersecurity'
          ? ['SIEM', 'Wireshark', 'Linux', 'Threat intel tools']
          : ['Excel', 'Notion', 'Presentation tools', 'Project dashboards'];

  const certifications = form.domain === 'Human Resources'
    ? ['SHRM-CP/SHRM-SCP', 'CIPD Level 5']
    : form.domain === 'Data Analytics'
      ? ['Google Data Analytics', 'Microsoft PL-300']
      : form.domain === 'Cloud Computing'
        ? ['AWS Certified Cloud Practitioner', 'Azure Fundamentals']
        : form.domain === 'Cybersecurity'
          ? ['CompTIA Security+', 'Certified Ethical Hacker (foundation)']
          : form.domain === 'Finance'
            ? ['Financial Modeling Certification', 'CPA path when relevant']
            : ['Role-specific professional certification', 'Portfolio-backed skill challenge'];

  return {
    id: createId(),
    name: `${form.currentJobTitle} to ${target}`,
    type: 'Employee',
    createdAt: new Date().toISOString(),
    currentRole: form.currentJobTitle,
    targetRole: target,
    direction: form.direction,
    domain: form.domain,
    summary: `This growth plan helps ${form.currentJobTitle} move toward ${target} in ${form.domain} with a practical skill gap plan and measurable workplace deliverables.`,
    comparison: {
      current: form.currentJobTitle,
      target: target,
      currentSkills: currentSkillList,
      missingSkills: gap.length ? gap : ['Leadership', 'Communication', 'Targeted domain depth'],
    },
    skillGap: [
      { name: 'Critical', items: gap.slice(0, 2).length ? gap.slice(0, 2) : ['Leadership narrative', 'Role-specific execution depth'] },
      { name: 'High', items: missing.slice(0, 2).length ? missing.slice(0, 2) : ['Stakeholder communication', 'Strong documentation'] },
      { name: 'Medium', items: domainSkills.slice(0, 2) },
    ],
    roadmap,
    weekByWeek: [
      'Week 1: Define the target role and skill gap priority list.',
      'Week 2: Learn one core skill deeply and practice on a live work example.',
      'Week 3: Apply the skill to a real deliverable and capture measurable results.',
      'Week 4: Share outcomes with stakeholders and ask for feedback.',
      'Week 5: Build leadership/storytelling evidence for promotion readiness.',
      'Week 6: Finalize your case for promotion or lateral move.',
    ],
    projects: workProjects,
    tools: recommendedTools,
    certifications,
    leadership: ['Proactively communicate updates', 'Share progress with stakeholders', 'Manage one outcome end-to-end'],
    evidence: ['Project case study', 'Before/after metrics', 'Manager endorsement', 'Updated resume and LinkedIn profile'],
    promotionChecklist: ['Clear gap reduction', 'Consistent examples of ownership', 'Stakeholder trust', 'Visible measurable output', 'Alignment with target role'],
    milestones: ['Complete training sprint', 'Lead one initiative', 'Present results', 'Advance to interview or promotion discussion'],
    alternativePaths: [`${form.domain} Specialist`, 'Cross-functional Lead', 'Managerial path', 'Lateral role with broader scope'],
    timeline: `${Math.max(3, Math.min(12, Number(form.yearsExperience || 2) + 2))} months estimated`,
    disclaimer: 'Career timelines and promotion outcomes are estimates, not guarantees. Progress depends on skill execution, performance, organization level, and business conditions.',
  };
}

function analyzeResumeKeywords(text) {
  const lower = text.toLowerCase();
  return {
    hasEmail: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text),
    hasPhone: /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?){2}\d{4}/.test(text),
    hasSummary: /summary|profile|about me|objective/i.test(lower),
    hasEducation: /education|degree|b\.tech|bachelor|master|university/i.test(lower),
    hasExperience: /experience|worked at|professional experience|role/i.test(lower),
    hasProjects: /project|portfolio|case study|client|initiative/i.test(lower),
    hasSkills: /skills|tools|technologies|technical skills/i.test(lower),
  };
}

function analyzeResume(text, targetRole) {
  const roleKey = targetRole || 'Data Analyst';
  const lower = text.toLowerCase();
  const sections = analyzeResumeKeywords(text);
  const missingSections = [];

  if (!sections.hasEmail) missingSections.push('Add a professional email address.');
  if (!sections.hasPhone) missingSections.push('Add a clear phone number and location if relevant.');
  if (!sections.hasSummary) missingSections.push('Add a brief professional summary or about section.');
  if (!sections.hasEducation) missingSections.push('Include education details with degree and year if applicable.');
  if (!sections.hasExperience) missingSections.push('Add recent roles and the outcomes of those roles.');
  if (!sections.hasProjects) missingSections.push('Add a project or portfolio section to show applied work.');
  if (!sections.hasSkills) missingSections.push('Add a dedicated skills section aligned to the target role.');

  const vagueBullets = text
    .split(/\n|\./)
    .filter((line) => /responsible for|worked on|helped with|involved in|assisted with/i.test(line))
    .slice(0, 5);

  const actionVerbs = ['Led', 'Built', 'Optimized', 'Improved', 'Scaled', 'Automated', 'Designed', 'Reduced', 'Implemented', 'Delivered'];
  const metrics = /\b(\d+%|\d+\s*\+|\$\d|increased|reduced|improved|grew|saved|cut|faster|fewer)\b/i.test(text);
  const skillChecklist = roleKey.includes('Data')
    ? ['SQL', 'Excel', 'Dashboarding', 'Statistics', 'Data storytelling', 'Business insight']
    : roleKey.includes('Developer')
      ? ['JavaScript', 'React', 'Testing', 'Git', 'API integration', 'Performance optimization']
      : roleKey.includes('HR')
        ? ['Recruitment', 'Employee relations', 'Policy knowledge', 'Communication', 'Talent planning', 'HR analytics']
        : ['Role-specific execution', 'Problem solving', 'Stakeholder communication', 'Portfolio evidence', 'Domain expertise'];

  const score = Math.min(100, 40 + (sections.hasEmail ? 5 : 0) + (sections.hasPhone ? 3 : 0) + (sections.hasSummary ? 8 : 0) + (sections.hasEducation ? 7 : 0) + (sections.hasExperience ? 12 : 0) + (sections.hasProjects ? 8 : 0) + (sections.hasSkills ? 7 : 0) + (metrics ? 10 : 0));

  return {
    score,
    sections,
    missingSections,
    vagueBullets,
    actionVerbSuggestions: actionVerbs,
    skillChecklist,
    atsTips: [
      'Use standard headings such as Summary, Experience, Education, Skills, and Projects.',
      'Keep bullet points scannable and concise with one action, one result, and one metric.',
      'Avoid tables, text boxes, and columns that ATS systems may not parse correctly.',
      'Match keywords from the job description naturally in your experience and skills sections.',
    ],
    feedback: score >= 85
      ? 'Strong base. Your resume is structured and relevant, and it is close to a role-ready version.'
      : score >= 70
        ? 'Solid draft. The biggest gains will come from adding measurable impact and more role-specific keywords.'
        : 'Your resume needs clearer structure and stronger evidence. Add measurable outcomes and align the skills section to the target role.',
  };
}

function evaluateInterviewAnswer(answer, role, difficulty) {
  const words = answer.trim().split(/\s+/).filter(Boolean).length;
  const roleKeywords = {
    'Data Analyst': ['sql', 'analysis', 'insight', 'dashboard', 'metrics', 'stakeholder'],
    'Cybersecurity Analyst': ['threat', 'log', 'monitoring', 'patch', 'risk', 'incident'],
    'Frontend Developer': ['component', 'user', 'performance', 'accessibility', 'state', 'api'],
    'HR Manager': ['employee', 'culture', 'engagement', 'policy', 'leadership', 'feedback'],
    'Senior Data Analyst': ['dashboard', 'analysis', 'insight', 'stakeholder', 'kpi', 'decision'],
  };

  const keywords = roleKeywords[role] || ['experience', 'result', 'impact', 'team'];
  const matched = keywords.filter((keyword) => answer.toLowerCase().includes(keyword.toLowerCase()));
  let score = 35 + Math.min(words / 3, 35);
  score += matched.length * 8;
  if (/[0-9]+%|\d+\s*(days|weeks|months|people)|increased|reduced|improved|saved|optimized|scaled/i.test(answer)) score += 10;
  if (/(i did|i led|i built|i used|i collaborated|i learned)/i.test(answer)) score += 8;
  score = Math.min(100, Math.round(score));

  const missing = keywords.filter((keyword) => !answer.toLowerCase().includes(keyword.toLowerCase()));
  const feedback = score >= 80
    ? 'Strong answer. You explained the situation well and gave enough evidence of impact; a final pass could tighten the structure and add one key metric.'
    : score >= 60
      ? 'Good answer with a clear structure. Add a specific example, a stronger result, and a few targeted keywords from the role.'
      : 'This answer needs more detail. Make it more concrete by adding the problem, your action, and a measurable outcome.';

  const example = `I started by understanding the problem and gathering the relevant data. Then I used a structured approach to analyze the root cause, took ownership of the key tasks, and collaborated with stakeholders to validate the solution. As a result, we improved the outcome in measurable ways and learned a process that we can repeat going forward.`;

  return { score, feedback, missingConcepts: missing.slice(0, 3), example };
}

function App() {
  const initialData = useMemo(() => getInitialData(), []);
  const defaultStudent = useMemo(() => ({ ...DEMO_STUDENT }), []);
  const [activeView, setActiveView] = useState(initialData?.activeView || 'dashboard');
  const [darkMode, setDarkMode] = useState(initialData?.darkMode ?? true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [studentForm, setStudentForm] = useState(initialData?.studentForm || defaultStudent);
  const [employeeForm, setEmployeeForm] = useState(initialData?.employeeForm || DEMO_EMPLOYEE);
  const [studentPlan, setStudentPlan] = useState(initialData?.studentPlan || null);
  const [employeePlan, setEmployeePlan] = useState(initialData?.employeePlan || null);
  const [savedPlans, setSavedPlans] = useState(initialData?.savedPlans || []);
  const [roadmapProgress, setRoadmapProgress] = useState(initialData?.roadmapProgress || { tasks: [], milestoneIndex: 0 });
  const [resumeText, setResumeText] = useState(initialData?.resumeText || '');
  const [resumeFileName, setResumeFileName] = useState(initialData?.resumeFileName || '');
  const [resumeFeedback, setResumeFeedback] = useState(initialData?.resumeFeedback || null);
  const [resumeStatus, setResumeStatus] = useState(initialData?.resumeStatus || 'Paste your resume text below or upload a .txt file. PDF uploads require manual copy/paste in this offline demo.');
  const [resourcesSearch, setResourcesSearch] = useState('');
  const [resourceFilter, setResourceFilter] = useState('All');
  const [interviewRole, setInterviewRole] = useState(initialData?.interviewRole || 'Data Analyst');
  const [interviewDifficulty, setInterviewDifficulty] = useState(initialData?.interviewDifficulty || 'Medium');
  const [interviewCategory, setInterviewCategory] = useState(initialData?.interviewCategory || 'Technical');
  const [interviewQuestions, setInterviewQuestions] = useState(initialData?.interviewQuestions || []);
  const [questionIndex, setQuestionIndex] = useState(initialData?.questionIndex || 0);
  const [interviewAnswer, setInterviewAnswer] = useState(initialData?.interviewAnswer || '');
  const [interviewResult, setInterviewResult] = useState(initialData?.interviewResult || null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const payload = {
      activeView,
      darkMode,
      studentForm,
      employeeForm,
      studentPlan,
      employeePlan,
      savedPlans,
      roadmapProgress,
      resumeText,
      resumeFileName,
      resumeFeedback,
      resumeStatus,
      interviewRole,
      interviewDifficulty,
      interviewCategory,
      interviewQuestions,
      questionIndex,
      interviewAnswer,
      interviewResult,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [activeView, darkMode, studentForm, employeeForm, studentPlan, employeePlan, savedPlans, roadmapProgress, resumeText, resumeFileName, resumeFeedback, resumeStatus, interviewRole, interviewDifficulty, interviewCategory, interviewQuestions, questionIndex, interviewAnswer, interviewResult]);

  useEffect(() => {
    if (!toast) return;
    const handle = window.setTimeout(() => setToast(''), 2200);
    return () => window.clearTimeout(handle);
  }, [toast]);

  const filteredResources = useMemo(() => {
    const query = resourcesSearch.toLowerCase();
    return LEARNING_RESOURCES.filter((resource) => {
      const matchesFilter = resourceFilter === 'All' || resource.domain === resourceFilter;
      const matchesQuery = !query || [resource.title, resource.skillCategory, resource.domain, resource.type].join(' ').toLowerCase().includes(query);
      return matchesFilter && matchesQuery;
    });
  }, [resourcesSearch, resourceFilter]);

  const currentDomain = DOMAIN_LOOKUP[studentForm.domain] || DOMAIN_LOOKUP['Web Development'];

  const completedTasks = roadmapProgress.tasks.length || 0;
  const roadmapProgressPercent = studentPlan ? Math.min(100, Math.round((completedTasks / Math.max(1, defaultRoadmapTasks.length)) * 100)) : 0;

  const savePlan = (plan) => {
    const next = [plan, ...savedPlans.filter((item) => item.id !== plan.id)].slice(0, 6);
    setSavedPlans(next);
    setToast('Plan saved locally');
  };

  const loadDemoStudent = () => {
    setStudentForm({ ...DEMO_STUDENT });
    setActiveView('student');
    setToast('Demo A loaded');
  };

  const loadDemoEmployee = () => {
    setEmployeeForm({ ...DEMO_EMPLOYEE });
    setActiveView('chaos');
    setToast('Demo B loaded');
  };

  const generateStudent = () => {
    const plan = buildStudentPlan(studentForm);
    setStudentPlan(plan);
    setActiveView('roadmaps');
    setToast('Roadmap generated');
  };

  const generateEmployee = () => {
    const plan = buildEmployeePlan(employeeForm);
    setEmployeePlan(plan);
    setActiveView('chaos');
    setToast('Growth plan generated');
  };

  const toggleTask = (task) => {
    setRoadmapProgress((prev) => {
      const exists = prev.tasks.includes(task);
      return { ...prev, tasks: exists ? prev.tasks.filter((item) => item !== task) : [...prev.tasks, task] };
    });
  };

  const resetProgress = () => {
    if (window.confirm('Reset all current roadmap progress?')) {
      setRoadmapProgress({ tasks: [], milestoneIndex: 0 });
      setToast('Progress reset');
    }
  };

  const startInterviewSession = () => {
    const roleQuestions = (INTERVIEW_BANK[interviewRole] || INTERVIEW_BANK['Data Analyst'])
      .filter((item) => item.category === interviewCategory)
      .slice(0, 5);

    const ready = roleQuestions.length ? roleQuestions : [{ category: interviewCategory, question: 'Describe a project that challenged you and how you solved it.' }];
    setInterviewQuestions(ready);
    setQuestionIndex(0);
    setInterviewAnswer('');
    setInterviewResult(null);
    setToast('Interview practice started');
  };

  const assessAnswer = () => {
    if (!interviewAnswer.trim()) {
      setToast('Type an answer before reviewing.');
      return;
    }
    const currentQuestion = interviewQuestions[questionIndex] || { question: 'Tell me about yourself.' };
    const result = evaluateInterviewAnswer(interviewAnswer, interviewRole, interviewDifficulty);
    setInterviewResult({ question: currentQuestion.question, ...result });
  };

  const nextQuestion = () => {
    if (questionIndex < interviewQuestions.length - 1) {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);
      setInterviewAnswer('');
      setInterviewResult(null);
    } else {
      setToast('You have completed the session');
    }
  };

  const handleResumeFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setResumeFileName(file.name);

    if (file.name.toLowerCase().endsWith('.txt')) {
      const text = await file.text();
      setResumeText(text);
      setResumeStatus('TXT file loaded. Review the generated feedback below.');
      const result = analyzeResume(text, studentForm.careerGoal || 'Data Analyst');
      setResumeFeedback(result);
      setToast('Resume file uploaded');
      return;
    }

    setResumeText('');
    setResumeStatus('PDF parsing is not enabled in this offline demo. Please paste the resume text below for the structured evaluation.');
    setResumeFeedback(null);
    setToast('PDF fallback applied');
  };

  const runResumeReview = () => {
    if (!resumeText.trim()) {
      setResumeStatus('Add resume text before running the analysis.');
      setToast('Add resume text');
      return;
    }
    const result = analyzeResume(resumeText, studentForm.careerGoal || 'Data Analyst');
    setResumeFeedback(result);
    setResumeStatus('Resume analysis complete. Review strengths, ATS gaps, and role-specific improvements.');
    setToast('Feedback generated');
  };

  const copyFeedback = async () => {
    const textToCopy = resumeFeedback ? JSON.stringify({
      score: resumeFeedback.score,
      feedback: resumeFeedback.feedback,
      missingSections: resumeFeedback.missingSections,
      atsTips: resumeFeedback.atsTips,
    }, null, 2) : 'No feedback available';

    try {
      await navigator.clipboard.writeText(textToCopy);
      setToast('Feedback copied');
    } catch {
      setToast('Copy not supported; use the export option.');
    }
  };

  const exportReport = () => {
    const content = resumeFeedback ? `PATHORA AI Resume Review\n\nScore: ${resumeFeedback.score}/100\n\n${resumeFeedback.feedback}\n\nMissing sections:\n${resumeFeedback.missingSections.join('\n')}\n\nATS tips:\n${resumeFeedback.atsTips.join('\n')}\n\nSkill checklist:\n${resumeFeedback.skillChecklist.join(', ')}` : 'No report available';
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'pathora-resume-report.txt';
    anchor.click();
    URL.revokeObjectURL(url);
    setToast('Report downloaded');
  };

  const exportPlan = (plan) => {
    const content = JSON.stringify(plan, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${(plan.name || 'career-plan').replace(/\s+/g, '-').toLowerCase()}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setToast('Plan exported');
  };

  const printPlan = () => {
    window.print();
  };

  const domainOptions = DOMAIN_DEFINITIONS.map((domain) => domain.name);

  return (
    <div className={darkMode ? 'app dark' : 'app light'}>
      <aside className={sidebarOpen ? 'sidebar open' : 'sidebar'}>
        <div className='brand-row'>
          <div className='brand-mark'>P</div>
          <div className='brand-text'>PATHORA <span>AI</span></div>
          <button className='nav-close' onClick={() => setSidebarOpen(false)} aria-label='Close menu'>
            <X size={16} />
          </button>
        </div>

        <div className='sidebar-section-title'>WORKSPACE</div>
        <nav className='nav-list'>
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={activeView === key ? 'nav-item active' : 'nav-item'}
              onClick={() => {
                setActiveView(key);
                setSidebarOpen(false);
              }}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className='sidebar-card'>
          <div className='mini-badge'>Chaos Round</div>
          <strong>Career growth sprint</strong>
          <p>Target a better role in less than 60 minutes.</p>
          <button className='secondary-btn' onClick={() => setActiveView('chaos')}>Open sprint <ArrowRight size={14} /></button>
        </div>
      </aside>

      {sidebarOpen && <div className='scrim' onClick={() => setSidebarOpen(false)} />}

      <main className='main-shell'>
        <header className='topbar'>
          <div className='topbar-left'>
            <button className='menu-toggle' onClick={() => setSidebarOpen(true)} aria-label='Open nav'>
              <Menu size={18} />
            </button>
            <div className='crumbs'>Workspace <ChevronRight size={12} /> <span>{activeView}</span></div>
          </div>

          <div className='top-actions'>
            <div className='search-box'>
              <Search size={14} />
              <input placeholder='Search paths or skills' aria-label='Search' value={resourcesSearch} onChange={(e) => setResourcesSearch(e.target.value)} />
            </div>
            <button className='icon-button' onClick={() => setDarkMode((value) => !value)} aria-label='Toggle theme'>
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className='profile-pill'>A</div>
          </div>
        </header>

        <div className='page-content'>
          {toast && <div className='toast'>{toast}</div>}

          {activeView === 'dashboard' && (
            <>
              <section className='hero-panel'>
                <div className='hero-copy'>
                  <div className='eyebrow'>Personal growth engine</div>
                  <h1>Build a career path that feels real.</h1>
                  <p>PATHORA AI helps you identify the right skills, map your next move, and break career growth into practical steps.</p>
                  <div className='hero-actions'>
                    <button className='primary-btn' onClick={() => setActiveView('student')}>Explore student roadmap <ArrowRight size={15} /></button>
                    <button className='ghost-btn' onClick={() => setActiveView('chaos')}>Chaos Round <Target size={15} /></button>
                  </div>
                  <div className='hero-kpis'>
                    <div><strong>6</strong><span>core growth tracks</span></div>
                    <div><strong>12</strong><span>industry domains</span></div>
                    <div><strong>3</strong><span>demo scenarios</span></div>
                  </div>
                </div>

                <div className='hero-visual'>
                  <div className='orbit orbit-one' />
                  <div className='orbit orbit-two' />
                  <div className='core-orbit'>
                    <Sparkles size={24} />
                  </div>
                  <div className='floating-chip chip-one'>Roadmap ready</div>
                  <div className='floating-chip chip-two'>1:1 focus</div>
                  <div className='floating-chip chip-three'>Career direction</div>
                </div>
              </section>

              <section className='dashboard-grid'>
                <div className='info-card summary-card'>
                  <div className='card-header'>
                    <span className='chip'>Career goal</span>
                    <Target size={16} />
                  </div>
                  <h3>{studentPlan?.role || 'Data Analyst'}</h3>
                  <p>{studentPlan?.summary || 'Focus on analytics fundamentals, business storytelling, and portfolio proof.'}</p>
                  <div className='mini-stat-row'>
                    <span>Current level</span>
                    <strong>{studentForm.experienceLevel || 'Beginner'}</strong>
                  </div>
                </div>

                <div className='info-card'>
                  <div className='card-header'>
                    <span className='chip'>Skill readiness</span>
                    <ShieldCheck size={16} />
                  </div>
                  <h3>{Math.max(25, Math.min(92, 56 + (completedTasks * 5)))}%</h3>
                  <div className='progress-track'><span style={{ width: `${Math.max(25, Math.min(92, 56 + (completedTasks * 5)))}%` }} /></div>
                  <p>Strong momentum with plan execution.</p>
                </div>

                <div className='info-card'>
                  <div className='card-header'>
                    <span className='chip'>Weekly plan</span>
                    <BookOpen size={16} />
                  </div>
                  <ul className='plain-list'>
                    {studentPlan?.weeklyPlan?.slice(0, 3).map((item) => <li key={item}>{item}</li>) || ['Build your base skill', 'Create one story-based project', 'Review weekly goals']}
                  </ul>
                </div>
              </section>

              <section className='section-wrap'>
                <div className='section-header'>
                  <div>
                    <div className='eyebrow muted'>Career directions</div>
                    <h2>Recommended paths</h2>
                  </div>
                  <button className='text-link' onClick={() => setActiveView('student')}>Explore all</button>
                </div>

                <div className='card-grid'>
                  {DOMAIN_DEFINITIONS.slice(0, 6).map((domain) => (
                    <button key={domain.name} className='path-card' onClick={() => { setStudentForm((prev) => ({ ...prev, domain: domain.name, careerGoal: domain.roles[0] })); setActiveView('student'); }}>
                      <div className='path-card-top'>
                        <span className='path-icon'>{domain.icon}</span>
                        <ArrowUpRight size={16} />
                      </div>
                      <h3>{domain.name}</h3>
                      <p>{domain.roles[0]}</p>
                      <small>{domain.coreSkills.slice(0, 3).join(' � ')}</small>
                    </button>
                  ))}
                </div>
              </section>

              <section className='section-wrap double-grid'>
                <div className='panel-box'>
                  <div className='section-header compact'>
                    <div>
                      <div className='eyebrow muted'>Quick actions</div>
                      <h3>Launch your next step</h3>
                    </div>
                  </div>
                  <div className='action-stack'>
                    <button className='quick-action' onClick={() => setActiveView('resume')}><FileText size={16}/> Resume Review</button>
                    <button className='quick-action' onClick={() => setActiveView('interview')}><MessageSquareText size={16}/> Interview Practice</button>
                    <button className='quick-action' onClick={() => setActiveView('student')}><Target size={16}/> Career Roadmap</button>
                    <button className='quick-action' onClick={() => setActiveView('chaos')}><Sparkles size={16}/> Chaos Round</button>
                  </div>
                </div>

                <div className='panel-box'>
                  <div className='section-header compact'>
                    <div>
                      <div className='eyebrow muted'>Saved plans</div>
                      <h3>Recent roadmaps</h3>
                    </div>
                  </div>
                  <div className='saved-list'>
                    {savedPlans.length ? savedPlans.slice(0, 3).map((plan) => (
                      <button key={plan.id} className='saved-plan' onClick={() => { if (plan.type === 'Student') setStudentPlan(plan); else setEmployeePlan(plan); setActiveView(plan.type === 'Student' ? 'roadmaps' : 'chaos'); }}>
                        <div>
                          <strong>{plan.name}</strong>
                          <small>{plan.role || plan.targetRole}</small>
                        </div>
                        <span>{plan.type}</span>
                      </button>
                    )) : (
                      <div className='empty-state'>No roadmaps saved yet. Generate one to start tracking progress.</div>
                    )}
                  </div>
                </div>
              </section>
            </>
          )}

          {activeView === 'student' && (
            <>
              <div className='page-head'>
                <div>
                  <div className='eyebrow muted'>Student Career Navigator</div>
                  <h1>Design a realistic <span>path</span> for your next role.</h1>
                </div>
                <div className='demo-buttons'>
                  <button className='ghost-btn' onClick={loadDemoStudent}>Demo A � Data Analyst</button>
                </div>
              </div>

              <div className='form-grid wide-form'>
                <label>
                  Name / nickname
                  <input value={studentForm.name} onChange={(e) => setStudentForm((prev) => ({ ...prev, name: e.target.value }))} placeholder='Aarav' />
                </label>
                <label>
                  Education level
                  <input value={studentForm.education} onChange={(e) => setStudentForm((prev) => ({ ...prev, education: e.target.value }))} placeholder='B.Tech or diploma' />
                </label>
                <label>
                  Current course
                  <input value={studentForm.course} onChange={(e) => setStudentForm((prev) => ({ ...prev, course: e.target.value }))} placeholder='Computer Science' />
                </label>
                <label>
                  Career goal
                  <input value={studentForm.careerGoal} onChange={(e) => setStudentForm((prev) => ({ ...prev, careerGoal: e.target.value }))} placeholder='Data Analyst' />
                </label>
                <label>
                  Preferred domain
                  <select value={studentForm.domain} onChange={(e) => setStudentForm((prev) => ({ ...prev, domain: e.target.value }))}>
                    {domainOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </label>
                <label>
                  Experience level
                  <select value={studentForm.experienceLevel} onChange={(e) => setStudentForm((prev) => ({ ...prev, experienceLevel: e.target.value }))}>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </label>
                <label className='full-span'>
                  Current skills
                  <input value={studentForm.currentSkills} onChange={(e) => setStudentForm((prev) => ({ ...prev, currentSkills: e.target.value }))} placeholder='Excel, Power BI basics, SQL' />
                </label>
                <label className='full-span'>
                  Interests
                  <input value={studentForm.interests} onChange={(e) => setStudentForm((prev) => ({ ...prev, interests: e.target.value }))} placeholder='Dashboarding, writing, research' />
                </label>
                <label>
                  Available learning time
                  <select value={studentForm.learningTime} onChange={(e) => setStudentForm((prev) => ({ ...prev, learningTime: e.target.value }))}>
                    <option>1 hour/day</option>
                    <option>2 hours/day</option>
                    <option>3 hours/day</option>
                    <option>Weekends only</option>
                  </select>
                </label>
                <label>
                  Preferred learning style
                  <select value={studentForm.learningStyle} onChange={(e) => setStudentForm((prev) => ({ ...prev, learningStyle: e.target.value }))}>
                    <option>Project-based</option>
                    <option>Structured course</option>
                    <option>Self-paced notes</option>
                    <option>Mentor-guided</option>
                  </select>
                </label>
              </div>

              <div className='action-row'>
                <button className='primary-btn' onClick={generateStudent}>Generate my roadmap <ArrowRight size={15} /></button>
              </div>

              {studentPlan && (
                <div className='result-panel'>
                  <div className='result-head'>
                    <div>
                      <div className='eyebrow muted'>Roadmap generated</div>
                      <h2>{studentPlan.role}</h2>
                    </div>
                    <div className='meta-badge'>{studentPlan.estimatedTimeline}</div>
                  </div>

                  <p className='lead'>{studentPlan.summary}</p>

                  <div className='stage-grid'>
                    {studentPlan.stages.map((stage) => (
                      <div key={stage.title} className='stage-card'>
                        <div className='stage-header'>
                          <span className='chip'>{stage.title}</span>
                          <strong>{stage.focus}</strong>
                        </div>
                        <ul>
                          {stage.skills.map((skill) => <li key={skill}>{skill}</li>)}
                        </ul>
                        <div className='callout-box'>
                          <strong>Project</strong>
                          <span>{stage.project}</span>
                        </div>
                        <div className='mini-list'>
                          {stage.weeklyMilestones.map((item) => <span key={item}>{item}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className='two-col'>
                    <div className='detail-box'>
                      <h3>Skills to learn in order</h3>
                      <div className='tag-list'>
                        {studentPlan.skillsToLearn.map((skill) => <span key={skill}>{skill}</span>)}
                      </div>
                    </div>
                    <div className='detail-box'>
                      <h3>Weekly milestone plan</h3>
                      <ul>
                        {studentPlan.weeklyPlan.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className='two-col'>
                    <div className='detail-box'>
                      <h3>Portfolio recommendations</h3>
                      <ul>
                        {studentPlan.portfolioTips.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                    <div className='detail-box'>
                      <h3>Interview prep</h3>
                      <ul>
                        {studentPlan.interviewPrep.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className='detail-box'>
                    <h3>Suggested learning resources</h3>
                    <div className='resource-list'>
                      {studentPlan.resources.map((resource) => (
                        <a key={resource.title} href={resource.url} target='_blank' rel='noreferrer'>
                          <span>{resource.title}</span>
                          <small>{resource.level} � {resource.type}</small>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className='action-row'>
                    <button className='primary-btn' onClick={() => savePlan(studentPlan)}>Save plan</button>
                    <button className='ghost-btn' onClick={() => exportPlan(studentPlan)}>Export JSON</button>
                  </div>
                </div>
              )}
            </>
          )}

          {activeView === 'chaos' && (
            <>
              <div className='page-head'>
                <div>
                  <div className='eyebrow muted'>Employee Growth / Chaos Round</div>
                  <h1>Turn your experience into a promotion plan.</h1>
                </div>
                <div className='demo-buttons'>
                  <button className='ghost-btn' onClick={loadDemoEmployee}>Demo B � HR Executive ? HR Manager</button>
                </div>
              </div>

              <div className='alert-banner'>Career timelines and promotion outcomes are estimates, not guarantees.</div>

              <div className='form-grid wide-form'>
                <label>
                  Current job title
                  <input value={employeeForm.currentJobTitle} onChange={(e) => setEmployeeForm((prev) => ({ ...prev, currentJobTitle: e.target.value }))} placeholder='Junior Data Analyst' />
                </label>
                <label>
                  Industry or domain
                  <select value={employeeForm.domain} onChange={(e) => setEmployeeForm((prev) => ({ ...prev, domain: e.target.value }))}>
                    {domainOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </label>
                <label>
                  Years of experience
                  <input value={employeeForm.yearsExperience} onChange={(e) => setEmployeeForm((prev) => ({ ...prev, yearsExperience: e.target.value }))} placeholder='3' />
                </label>
                <label>
                  Target job title / promotion
                  <input value={employeeForm.targetJobTitle} onChange={(e) => setEmployeeForm((prev) => ({ ...prev, targetJobTitle: e.target.value }))} placeholder='Senior Data Analyst' />
                </label>
                <label className='full-span'>
                  Current skills
                  <input value={employeeForm.currentSkills} onChange={(e) => setEmployeeForm((prev) => ({ ...prev, currentSkills: e.target.value }))} placeholder='Excel, SQL, reporting, stakeholder communication' />
                </label>
                <label className='full-span'>
                  Skills to improve
                  <input value={employeeForm.skillsToImprove} onChange={(e) => setEmployeeForm((prev) => ({ ...prev, skillsToImprove: e.target.value }))} placeholder='Dashboarding, forecasting, leadership, data storytelling' />
                </label>
                <label>
                  Preferred direction
                  <select value={employeeForm.direction} onChange={(e) => setEmployeeForm((prev) => ({ ...prev, direction: e.target.value }))}>
                    <option>Promotion</option>
                    <option>Specialization</option>
                    <option>Management</option>
                    <option>Career switch</option>
                  </select>
                </label>
                <label>
                  Available study time per week
                  <select value={employeeForm.studyTime} onChange={(e) => setEmployeeForm((prev) => ({ ...prev, studyTime: e.target.value }))}>
                    <option>3 hours/week</option>
                    <option>5 hours/week</option>
                    <option>8 hours/week</option>
                    <option>10+ hours/week</option>
                  </select>
                </label>
                <label>
                  Preferred learning format
                  <select value={employeeForm.learningFormat} onChange={(e) => setEmployeeForm((prev) => ({ ...prev, learningFormat: e.target.value }))}>
                    <option>Hybrid</option>
                    <option>Course-based</option>
                    <option>Project-based</option>
                    <option>Mentor-led</option>
                  </select>
                </label>
              </div>

              <div className='action-row'>
                <button className='primary-btn' onClick={generateEmployee}>Generate growth plan <ArrowRight size={15} /></button>
              </div>

              {employeePlan && (
                <div className='result-panel'>
                  <div className='result-head'>
                    <div>
                      <div className='eyebrow muted'>Growth plan</div>
                      <h2>{employeePlan.currentRole} ? {employeePlan.targetRole}</h2>
                    </div>
                    <div className='meta-badge'>{employeePlan.timeline}</div>
                  </div>

                  <p className='lead'>{employeePlan.summary}</p>

                  <div className='two-col'>
                    <div className='detail-box'>
                      <h3>Current role vs target role</h3>
                      <ul>
                        <li><strong>Current:</strong> {employeePlan.currentRole}</li>
                        <li><strong>Target:</strong> {employeePlan.targetRole}</li>
                        <li><strong>Direction:</strong> {employeePlan.direction}</li>
                        <li><strong>Domain:</strong> {employeePlan.domain}</li>
                      </ul>
                    </div>
                    <div className='detail-box'>
                      <h3>Existing skills and missing skills</h3>
                      <ul>
                        {employeePlan.comparison.currentSkills.map((skill) => <li key={skill}>{skill}</li>)}
                        {employeePlan.comparison.missingSkills.map((skill) => <li key={skill} className='muted-item'>{skill}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className='detail-box'>
                    <h3>Skill gap analysis with priority</h3>
                    <div className='priority-grid'>
                      {employeePlan.skillGap.map((item) => (
                        <div key={item.name} className='priority-box'>
                          <span className='priority-label'>{item.name}</span>
                          <ul>
                            {item.items.map((skill) => <li key={skill}>{skill}</li>)}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='detail-box'>
                    <h3>Ordered upskilling roadmap</h3>
                    <div className='roadmap-list'>
                      {employeePlan.roadmap.map((step) => (
                        <div key={step.title} className='mini-roadmap'>
                          <strong>{step.title}</strong>
                          <span>{step.focus}</span>
                          <ul>
                            {step.tasks.map((task) => <li key={task}>{task}</li>)}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='detail-box'>
                    <h3>Week-by-week learning plan</h3>
                    <ul>
                      {employeePlan.weekByWeek.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>

                  <div className='two-col'>
                    <div className='detail-box'>
                      <h3>Practical workplace projects and measurable deliverables</h3>
                      <ul>
                        {employeePlan.projects.map((project) => <li key={project}>{project}</li>)}
                      </ul>
                    </div>
                    <div className='detail-box'>
                      <h3>Recommended tools and resources</h3>
                      <div className='tag-list'>
                        {employeePlan.tools.map((tool) => <span key={tool}>{tool}</span>)}
                      </div>
                    </div>
                  </div>

                  <div className='two-col'>
                    <div className='detail-box'>
                      <h3>Certifications to consider</h3>
                      <ul>
                        {employeePlan.certifications.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                    <div className='detail-box'>
                      <h3>Leadership and communication skills</h3>
                      <ul>
                        {employeePlan.leadership.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className='two-col'>
                    <div className='detail-box'>
                      <h3>Portfolio and work-evidence suggestions</h3>
                      <ul>
                        {employeePlan.evidence.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                    <div className='detail-box'>
                      <h3>Promotion-readiness checklist</h3>
                      <ul>
                        {employeePlan.promotionChecklist.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className='two-col'>
                    <div className='detail-box'>
                      <h3>Suggested milestones and progress tracking</h3>
                      <ul>
                        {employeePlan.milestones.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                    <div className='detail-box'>
                      <h3>Alternative career paths</h3>
                      <ul>
                        {employeePlan.alternativePaths.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className='action-row'>
                    <button className='primary-btn' onClick={() => savePlan(employeePlan)}>Save growth plan</button>
                    <button className='ghost-btn' onClick={printPlan}><Printer size={15} /> Print plan</button>
                    <button className='ghost-btn' onClick={() => exportPlan(employeePlan)}><Download size={15} /> Export JSON</button>
                  </div>
                </div>
              )}
            </>
          )}

          {activeView === 'resume' && (
            <>
              <div className='page-head'>
                <div>
                  <div className='eyebrow muted'>Resume Analyzer</div>
                  <h1>Strengthen your resume for role-fit and ATS clarity.</h1>
                </div>
              </div>

              <div className='resume-layout'>
                <div className='panel-box'>
                  <div className='card-header'>
                    <span className='chip'>Resume input</span>
                    <FileText size={16} />
                  </div>
                  <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} placeholder='Paste resume text here...' rows={15} />
                  <div className='upload-row'>
                    <label className='upload-button'>
                      Upload .txt
                      <input type='file' accept='.txt,text/plain' onChange={handleResumeFile} />
                    </label>
                    <label className='upload-button'>
                      Upload PDF
                      <input type='file' accept='.pdf,application/pdf' onChange={handleResumeFile} />
                    </label>
                  </div>
                  {resumeFileName && <div className='file-badge'>{resumeFileName}</div>}
                  <p className='helper-text'>{resumeStatus}</p>
                  <div className='action-row'>
                    <button className='primary-btn' onClick={runResumeReview}>Analyze resume</button>
                    <button className='ghost-btn' onClick={copyFeedback}>Copy feedback</button>
                    <button className='ghost-btn' onClick={exportReport}>Download report</button>
                  </div>
                </div>

                <div className='panel-box'>
                  <div className='card-header'>
                    <span className='chip'>Assessment</span>
                    <Target size={16} />
                  </div>

                  {resumeFeedback ? (
                    <>
                      <div className='score-row'>
                        <div className='score-box'>{resumeFeedback.score}</div>
                        <div>
                          <strong>Resume score</strong>
                          <p>{resumeFeedback.feedback}</p>
                        </div>
                      </div>

                      <div className='detail-box'>
                        <h3>Missing sections</h3>
                        <ul>
                          {resumeFeedback.missingSections.length ? resumeFeedback.missingSections.map((item) => <li key={item}>{item}</li>) : <li>None major issues found.</li>}
                        </ul>
                      </div>

                      <div className='detail-box'>
                        <h3>Action verbs to improve</h3>
                        <div className='tag-list'>
                          {resumeFeedback.actionVerbSuggestions.map((verb) => <span key={verb}>{verb}</span>)}
                        </div>
                      </div>

                      <div className='detail-box'>
                        <h3>ATS-oriented formatting feedback</h3>
                        <ul>
                          {resumeFeedback.atsTips.map((tip) => <li key={tip}>{tip}</li>)}
                        </ul>
                      </div>

                      <div className='detail-box'>
                        <h3>Role-specific skills checklist</h3>
                        <div className='tag-list'>
                          {resumeFeedback.skillChecklist.map((item) => <span key={item}>{item}</span>)}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className='empty-state'>Your resume review will appear here once you paste the text and run the analyzer.</div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeView === 'interview' && (
            <>
              <div className='page-head'>
                <div>
                  <div className='eyebrow muted'>Interview Practice</div>
                  <h1>Prepare for interviews with real role-based questions.</h1>
                </div>
              </div>

              <div className='interview-layout'>
                <div className='panel-box'>
                  <div className='form-grid compact-grid'>
                    <label>
                      Target role
                      <select value={interviewRole} onChange={(e) => setInterviewRole(e.target.value)}>
                        {Object.keys(INTERVIEW_BANK).map((role) => <option key={role}>{role}</option>)}
                      </select>
                    </label>
                    <label>
                      Difficulty
                      <select value={interviewDifficulty} onChange={(e) => setInterviewDifficulty(e.target.value)}>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                      </select>
                    </label>
                    <label>
                      Interview type
                      <select value={interviewCategory} onChange={(e) => setInterviewCategory(e.target.value)}>
                        <option>Technical</option>
                        <option>Behavioral</option>
                        <option>HR</option>
                      </select>
                    </label>
                  </div>

                  <div className='action-row'>
                    <button className='primary-btn' onClick={startInterviewSession}>Start session</button>
                  </div>

                  {interviewQuestions.length > 0 && (
                    <>
                      <div className='question-box'>
                        <div className='question-meta'>
                          <span>{interviewCategory}</span>
                          <strong>{questionIndex + 1}/{interviewQuestions.length}</strong>
                        </div>
                        <h3>{interviewQuestions[questionIndex]?.question}</h3>
                        <textarea value={interviewAnswer} rows={8} onChange={(e) => setInterviewAnswer(e.target.value)} placeholder='Write your answer here...' />
                        <div className='action-row'>
                          <button className='primary-btn' onClick={assessAnswer}>Review answer</button>
                          <button className='ghost-btn' onClick={nextQuestion}>Next question</button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className='panel-box'>
                  <div className='card-header'>
                    <span className='chip'>Evaluator</span>
                    <Sparkles size={16} />
                  </div>

                  {interviewResult ? (
                    <>
                      <div className='score-row'>
                        <div className='score-box'>{interviewResult.score}</div>
                        <div>
                          <strong>Answer score</strong>
                          <p>{interviewResult.feedback}</p>
                        </div>
                      </div>
                      <div className='detail-box'>
                        <h3>Missing concepts</h3>
                        <ul>
                          {interviewResult.missingConcepts.length ? interviewResult.missingConcepts.map((item) => <li key={item}>{item}</li>) : <li>Strong coverage of core concepts.</li>}
                        </ul>
                      </div>
                      <div className='detail-box'>
                        <h3>Example answer</h3>
                        <p>{interviewResult.example}</p>
                      </div>
                    </>
                  ) : (
                    <div className='empty-state'>Choose a role and category, then answer one question at a time. The evaluator will give feedback and a sample answer.</div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeView === 'resources' && (
            <>
              <div className='page-head'>
                <div>
                  <div className='eyebrow muted'>Learning resources</div>
                  <h1>Structured learning by domain and skill level.</h1>
                </div>
              </div>

              <div className='toolbar'>
                <div className='filter-row'>
                  <select value={resourceFilter} onChange={(e) => setResourceFilter(e.target.value)}>
                    <option value='All'>All domains</option>
                    {domainOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                  <div className='search-box small'>
                    <Search size={14} />
                    <input value={resourcesSearch} onChange={(e) => setResourcesSearch(e.target.value)} placeholder='Search resources' />
                  </div>
                </div>
              </div>

              <div className='resource-grid'>
                {filteredResources.length ? filteredResources.map((resource) => (
                  <div key={resource.title} className='resource-card'>
                    <div className='resource-top'>
                      <span>{resource.domain}</span>
                      <Filter size={14} />
                    </div>
                    <h3>{resource.title}</h3>
                    <div className='resource-meta'>
                      <span>{resource.skillCategory}</span>
                      <span>{resource.level}</span>
                      <span>{resource.type}</span>
                    </div>
                    <p>{resource.title} is a trusted learning resource for focused skill growth in {resource.domain.toLowerCase()}.</p>
                    <a href={resource.url} target='_blank' rel='noreferrer'>Open resource <ArrowUpRight size={14} /></a>
                  </div>
                )) : <div className='empty-state'>No resources match the current search or filter.</div>}
              </div>
            </>
          )}

          {activeView === 'roadmaps' && (
            <>
              <div className='page-head'>
                <div>
                  <div className='eyebrow muted'>My Roadmaps</div>
                  <h1>Track your current learning progress.</h1>
                </div>
                <div className='demo-buttons'>
                  <button className='ghost-btn' onClick={resetProgress}><TimerReset size={15} /> Reset progress</button>
                </div>
              </div>

              <div className='roadmap-overview'>
                <div className='panel-box'>
                  <div className='score-row'>
                    <div className='score-box'>{Math.max(0, Math.min(100, roadmapProgressPercent))}%</div>
                    <div>
                      <strong>Learning progress</strong>
                      <p>{completedTasks} of {defaultRoadmapTasks.length} tasks completed</p>
                    </div>
                  </div>
                  <ul className='task-list'>
                    {defaultRoadmapTasks.map((task) => (
                      <li key={task} className={roadmapProgress.tasks.includes(task) ? 'done' : ''}>
                        <button onClick={() => toggleTask(task)}>{roadmapProgress.tasks.includes(task) ? <Check size={14} /> : <Circle size={14} />}</button>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='panel-box'>
                  <div className='section-header compact'>
                    <div>
                      <div className='eyebrow muted'>Saved plans</div>
                      <h3>Reopen earlier maps</h3>
                    </div>
                  </div>
                  <div className='saved-list'>
                    {savedPlans.length ? savedPlans.map((plan) => (
                      <button key={plan.id} className='saved-plan' onClick={() => { if (plan.type === 'Student') setStudentPlan(plan); else setEmployeePlan(plan); setActiveView(plan.type === 'Student' ? 'student' : 'chaos'); }}>
                        <div>
                          <strong>{plan.name}</strong>
                          <small>{plan.role || plan.targetRole}</small>
                        </div>
                        <span>{plan.type}</span>
                      </button>
                    )) : <div className='empty-state'>No saved plans yet. Generate a roadmap to save it here.</div>}
                  </div>
                </div>
              </div>

              {studentPlan && (
                <div className='result-panel'>
                  <div className='result-head'>
                    <div>
                      <div className='eyebrow muted'>Active roadmap</div>
                      <h2>{studentPlan.role}</h2>
                    </div>
                    <div className='meta-badge'>{studentPlan.estimatedTimeline}</div>
                  </div>
                  <div className='two-col'>
                    <div className='detail-box'>
                      <h3>Goal</h3>
                      <p>{studentPlan.summary}</p>
                    </div>
                    <div className='detail-box'>
                      <h3>Next steps</h3>
                      <ul>
                        {studentPlan.interviewPrep.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className='action-row'>
                    <button className='primary-btn' onClick={() => printPlan()}>Print roadmap</button>
                    <button className='ghost-btn' onClick={() => exportPlan(studentPlan)}>Export plan</button>
                  </div>
                </div>
              )}
            </>
          )}

          {activeView === 'settings' && (
            <>
              <div className='page-head'>
                <div>
                  <div className='eyebrow muted'>Settings</div>
                  <h1>Customize your workspace.</h1>
                </div>
              </div>

              <div className='settings-grid'>
                <div className='panel-box'>
                  <div className='card-header'>
                    <span className='chip'>Appearance</span>
                    <Sun size={16} />
                  </div>
                  <div className='toggle-row'>
                    <span>Dark mode</span>
                    <button className='toggle-btn' onClick={() => setDarkMode((value) => !value)}>{darkMode ? 'On' : 'Off'}</button>
                  </div>
                </div>

                <div className='panel-box'>
                  <div className='card-header'>
                    <span className='chip'>Notifications</span>
                    <Bell size={16} />
                  </div>
                  <div className='toggle-row'>
                    <span>Weekly reminders</span>
                    <button className='toggle-btn'>Enabled</button>
                  </div>
                </div>

                <div className='panel-box'>
                  <div className='card-header'>
                    <span className='chip'>Profile</span>
                    <UserRound size={16} />
                  </div>
                  <p>Student workspace � Free explorer plan</p>
                  <button className='ghost-btn' onClick={() => setActiveView('student')}>Edit goals</button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
