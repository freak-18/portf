import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://project-p3ao.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Success:', data);
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        let errorMessage = 'Oops! Something went wrong. Please try again.';
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (_) {}
        console.error('Server error:', errorMessage);
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Submission failed. Please try again later.');
    }
  };

  return (
    <div className="contact-form-box">
      <h2>Let's Connect</h2>
      {submitted ? (
        <p className="success-message">
          Your message has been delivered — I’ll be in touch soon!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          />
          <button type="submit">Send</button>
        </form>
      )}

      <div className="social-icons">
        <a href="https://www.linkedin.com/in/bharani-prasanth-r-499594290/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={28} color="#0077b5" />
        </a>
        <a href="https://github.com/freak-18" target="_blank" rel="noopener noreferrer">
          <FaGithub size={28} color="#000" />
        </a>
        <a href="https://www.instagram.com/bharani._.18?igsh=N3MwM3l6MG1pZWM1" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={28} color="#E1306C" />
        </a>
      </div>
    </div>
  );
};

export default ContactForm;
