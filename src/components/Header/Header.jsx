import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <span className="logo-koin">Koin</span>
          <span className="logo-x">X</span>
          <sup className="logo-reg">®</sup>
        </div>
        <nav className="header-nav-desktop">
          {/* Placeholder nav items if needed */}
        </nav>
        <button className="header-hamburger" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
