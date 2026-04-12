const express = require('express');
const router = express.Router();

const GITHUB_USERNAME = 'freak-18';
const GITHUB_API = 'https://api.github.com';
const HEADERS = {
  'Accept': 'application/vnd.github+json',
  'User-Agent': 'portfolio-app',
};

router.get('/', async (req, res) => {
  try {
    // Fetch user profile + repos in parallel
    const [userRes, reposRes] = await Promise.all([
      fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, { headers: HEADERS }),
      fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100`, { headers: HEADERS }),
    ]);

    const user = await userRes.json();
    const repos = await reposRes.json();

    if (!Array.isArray(repos)) {
      return res.status(500).json({ message: 'Failed to fetch repos' });
    }

    // Total stars across all repos
    const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

    // Fetch commit count for each repo (last 30 days)
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const commitCounts = await Promise.all(
      repos.slice(0, 10).map((r) =>
        fetch(`${GITHUB_API}/repos/${GITHUB_USERNAME}/${r.name}/commits?since=${since}&per_page=100`, { headers: HEADERS })
          .then((r) => r.json())
          .then((data) => (Array.isArray(data) ? data.length : 0))
          .catch(() => 0)
      )
    );
    const recentCommits = commitCounts.reduce((a, b) => a + b, 0);

    res.json({
      publicRepos: user.public_repos || 0,
      followers: user.followers || 0,
      totalStars,
      recentCommits,
    });
  } catch (err) {
    console.error('GitHub stats error:', err);
    res.status(500).json({ message: 'Failed to fetch GitHub stats' });
  }
});

module.exports = router;
