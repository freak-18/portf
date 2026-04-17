import React from 'react';

const stack = [
  {
    category: 'Frontend',
    color: '#3b82f6',
    techs: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    category: 'Backend & Database',
    color: '#10b981',
    techs: ['Node.js', 'Express', 'MongoDB'],
  },
  {
    category: 'Languages',
    color: '#8b5cf6',
    techs: ['C', 'C++', 'Python', 'Java'],
  },
  {
    category: 'Tools & Others',
    color: '#f59e0b',
    techs: ['GitHub', 'VS Code', 'Vercel', 'Render'],
  },
];

const TechStack = () => (
  <div className="techstack-grid">
    {stack.map((group) => (
      <div className="techstack-card" key={group.category} style={{ '--accent': group.color }}>
        <h3 className="techstack-category" style={{ color: group.color }}>{group.category}</h3>
        <div className="tech-pills">
          {group.techs.map((t) => (
            <span
              className="tech-pill"
              key={t}
              style={{ borderColor: group.color + '88', background: group.color + '18', color: group.color }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default TechStack;
