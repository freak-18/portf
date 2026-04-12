import React, { useEffect, useState } from 'react';

const USERNAME = 'freak-18';

const ContributionHeatmap = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${USERNAME}`)
      .then((r) => r.json())
      .then((u) => setStats({ repos: u.public_repos }))
      .catch(() => {});
  }, []);

  return (
    <div className="heatmap-wrapper">
      <div className="heatmap-chart-box">
        <img
          src={`https://ghchart.rshah.org/2563eb/${USERNAME}`}
          alt="GitHub Contribution Chart"
          className="heatmap-img"
        />
      </div>

      {stats && (
        <div className="heatmap-stats-row">
          <div className="heatmap-stat">
            <span className="heatmap-stat-value" style={{ color: '#3b82f6' }}>{stats.repos}</span>
            <span className="heatmap-stat-label">Public Repos</span>
          </div>
          <div className="heatmap-stat-divider" />
          <div className="heatmap-stat">
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="heatmap-gh-link"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributionHeatmap;
