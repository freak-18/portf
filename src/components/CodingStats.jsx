import React, { useEffect, useState } from 'react';

const USERNAME = 'freak-18';

const CodingStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`).then((r) => r.json()),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`).then((r) => r.json()),
    ])
      .then(([user, repos]) => {
        const totalStars = Array.isArray(repos)
          ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
          : 0;
        setStats({
          repos: user.public_repos || 0,
          followers: user.followers || 0,
          stars: totalStars,
        });
      })
      .catch(() => {});
  }, []);

  if (!stats) return null;

  const items = [
    { label: 'Repos', value: stats.repos, color: '#3b82f6' },
    { label: 'Stars', value: stats.stars, color: '#f59e0b' },
    { label: 'Followers', value: stats.followers, color: '#8b5cf6' },
  ];

  return (
    <div className="mini-stats">
      {items.map((item) => (
        <div className="mini-stat-item" key={item.label}>
          <span className="mini-stat-value" style={{ color: item.color }}>{item.value}</span>
          <span className="mini-stat-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CodingStats;
