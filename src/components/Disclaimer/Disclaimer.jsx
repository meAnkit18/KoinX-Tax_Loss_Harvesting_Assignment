import { useState } from 'react';
import './Disclaimer.css';

export default function Disclaimer() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="disclaimer">
      <button
        className="disclaimer-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="disclaimer-toggle-left">
          <svg className="disclaimer-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" stroke="#0052FE" strokeWidth="2" />
            <path d="M10 9V14" stroke="#0052FE" strokeWidth="2" strokeLinecap="round" />
            <circle cx="10" cy="6.5" r="1" fill="#0052FE" />
          </svg>
          <span className="disclaimer-title">Important Notes &amp; Disclaimers</span>
        </div>
        <svg
          className={`disclaimer-chevron ${isOpen ? 'open' : ''}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path d="M5 8L10 13L15 8" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {isOpen && (
        <ul className="disclaimer-list">
          <li>Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.</li>
          <li>Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.</li>
          <li>Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.</li>
          <li>Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.</li>
          <li>Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.</li>
        </ul>
      )}
    </div>
  );
}
