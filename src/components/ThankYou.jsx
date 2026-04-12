import React from "react";
import "../style.css"; // or "./ThankYou.css" if you isolate styles

function ThankYou() {
  return (
    <div className="message">
      <h2>Thank You!</h2>
      <p>Your message has been successfully sent.</p>
      <a href="/">Back to Portfolio</a>
    </div>
  );
}

export default ThankYou;
