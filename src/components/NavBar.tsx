import "./NavBar.css";

interface NavBarProps {
  userName: string;
  onLogout: () => void;
}

function NavBar({ userName, onLogout }: NavBarProps) {
  return (
    <header className="nav-bar">
      <nav className="nav-bar__content" aria-label="Navegación principal">
        <a className="nav-bar__brand" href="/" aria-label="Ir al inicio">
          <img
            className="nav-bar__logo"
            src="/Gemini_Generated_Image_h8kc53h8kc53h8kc.jpg"
            alt="Colegio Don Bosco Sucre"
          />
        </a>

        <div className="nav-bar__actions">
          <span className="nav-bar__user">{userName}</span>
          <button className="nav-bar__button nav-bar__button--logout" type="button" onClick={onLogout}>
            Salir
          </button>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
