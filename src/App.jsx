import React, { useState, useEffect } from "react";
import SpiderWeb from "./components/SpiderWeb";
import "./App.css";
import About from "./components/About";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import TechStack from "./components/TechStack";
import ContactForm from "./components/ContactForm";

function useTypingLoop(words, typeSpeed = 100, deleteSpeed = 60, pause = 1500) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      const current = words[wordIndex];
      if (!deleting) {
        charIndex++;
        setDisplayed(current.slice(0, charIndex));
        if (charIndex === current.length) {
          deleting = true;
          timer = setTimeout(tick, pause);
          return;
        }
      } else {
        charIndex--;
        setDisplayed(current.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      timer = setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
    };
    timer = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timer);
  }, []);
  return displayed;
}

function App() {
  const [dark, setDark] = useState(false);
  const [repos, setRepos] = useState(20);
  const navText = useTypingLoop(['Portfolio', 'Bharani Prasanth'], 160, 100, 1800);

  useEffect(() => {
    fetch('https://api.github.com/users/freak-18')
      .then((r) => r.json())
      .then((u) => { if (u.public_repos) setRepos(u.public_repos); })
      .catch(() => {});
  }, []);

  return (
    <>
      <SpiderWeb dark={dark} />

      <div className={`app ${dark ? "dark" : ""}`}>
        <header className="header">
          <h1 className="nav-title">
            {navText}<span className="cursor">|</span>
          </h1>
          <nav>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#certificates">Certificates</a>
            <a href="#techstack">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <div className="under-nav-bar">
          <div className="github-compact-card">
            <div className="github-card-top">
              <img
                src="https://avatars.githubusercontent.com/u/161952907?v=4"
                alt="avatar"
                className="github-avatar"
              />
              <div className="github-card-info">
                <span className="github-name">freak-18</span>
                <a
                  href="https://github.com/freak-18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-profile-link"
                >View Profile</a>
              </div>
              <span className="github-repos-badge">{repos} Repos</span>
            </div>
            <img
              src={`https://ghchart.rshah.org/${dark ? '39d353' : '40c463'}/freak-18`}
              alt="GitHub contributions"
              className="github-card-heatmap"
              style={{ filter: dark ? 'brightness(0.9)' : 'none' }}
            />
          </div>
        </div>

        <button className="floating-toggle-btn" onClick={() => setDark(!dark)}>
          {dark ? "\uD83C\uDF15" : "\uD83C\uDF19"}
        </button>

        <main>
          <section id="about" className="section parallax">
            <h2>About Me</h2>
            <About />
          </section>

          <div className="divider"></div>

          <section id="projects" className="section parallax">
            <h2>Projects</h2>
            <Projects />
          </section>

          <div className="divider"></div>

          <section id="certificates" className="section parallax">
            <h2>Certificates</h2>
            <Certificates />
          </section>

          <div className="divider"></div>

          <section id="techstack" className="section parallax">
            <h2>Skills</h2>
            <TechStack />
          </section>

          <div className="divider"></div>

          <section id="contact" className="section parallax">
            <h2>Contact Me</h2>
            <ContactForm />
          </section>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <p>Dream. Develop. Deliver.</p>
            <div className="social-icons">
              <a href="https://github.com/freak-18" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/bharani-prasanth-r-499594290/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="mailto:bharani4441@gmail.com">Email</a>
            </div>
            <p style={{ marginTop: '0.8rem', fontSize: '0.85rem' }}></p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
