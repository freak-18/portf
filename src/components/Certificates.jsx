import React from 'react';

const certificates = [
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: '2024',
    color: '#3b82f6',
    link: '/cert-cybersecurity.pdf',
  },
  {
    title: 'Data Structures & Algorithms Using Java',
    issuer: 'Infosys Springboard',
    date: '2025',
    color: '#8b5cf6',
    link: '/cert1.pdf',
  },
  {
    title: 'MERN Stack Development',
    issuer: 'Certification Program',
    date: '2025',
    color: '#10b981',
    link: '/cert-mern.pdf',
  },
];

const Certificates = () => (
  <div className="cert-grid">
    {certificates.map((c) => (
      <div className="cert-card" key={c.title} style={{ '--accent': c.color }}>
        <div className="cert-badge" style={{ background: c.color + '22', color: c.color }}>
          <span className="cert-seal">CERT</span>
        </div>
        <div className="cert-info">
          <h3>{c.title}</h3>
          <p className="cert-issuer">{c.issuer}</p>
          <span className="cert-date">{c.date}</span>
        </div>
        <a className="cert-link" href={c.link} target="_blank" rel="noopener noreferrer">
          View Certificate &rarr;
        </a>
      </div>
    ))}
  </div>
);

export default Certificates;
