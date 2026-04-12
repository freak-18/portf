import React from 'react';

const projects = [
  {
    title: 'Expense Tracker',
    description: 'Track income and expenses with a modern wallet-style interface and interactive charts.',
    tags: ['React', 'Chart.js', 'CSS'],
    color: '#3b82f6',
    link: 'https://wallet-expense-tracker-18.netlify.app/',
  },
  {
    title: 'Portfolio Website',
    description: 'A responsive personal site to showcase skills, projects, and allow contact form submission.',
    tags: ['React', 'Node.js', 'MongoDB'],
    color: '#8b5cf6',
    link: '#',
  },
  {
    title: 'Real-Time Quiz Website',
    description: 'Interactive quiz platform with live multiplayer support, timer, leaderboard, and host control panel.',
    tags: ['React', 'Socket.io', 'Express'],
    color: '#10b981',
    link: 'https://tpquiz.vercel.app',
  },
  {
    title: 'EcoLearn Platform',
    description: 'Environmental education platform that gamifies sustainability learning through interactive quizzes, daily challenges, leaderboards, and achievement badges.',
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    color: '#16a34a',
    link: 'https://eco-learnn.vercel.app/',
  },
  {
    title: 'Collab Board',
    description: 'Full-stack collaborative app builder with real-time boards, flowcharts, frontend code generation, and AI-powered backend scaffolding.',
    tags: ['React', 'TypeScript', 'Socket.io', 'Groq AI'],
    color: '#7c3aed',
    link: 'https://collab-boardd.vercel.app/',
  },
];

const Projects = () => (
  <div className="projects-grid">
    {projects.map((p) => (
      <div className="project-card" key={p.title} style={{ '--accent': p.color }}>
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <div className="tag-row">
          {p.tags.map((t) => (
            <span className="tag" key={t} style={{ background: p.color + '22', color: p.color }}>{t}</span>
          ))}
        </div>
        <a className="project-link" href={p.link} target="_blank" rel="noopener noreferrer">
          View Project &rarr;
        </a>
      </div>
    ))}
  </div>
);

export default Projects;
