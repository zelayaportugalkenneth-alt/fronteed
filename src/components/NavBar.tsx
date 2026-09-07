import "./NavBar.css";

interface NavBarProps {
  userName: string;
}

function NavBar({ userName }: NavBarProps) {
  return (
    <header className="nav-bar">
      <nav className="nav-bar__content" aria-label="Navegación principal">
        <a className="nav-bar__brand" href="/" aria-label="Ir al inicio">
          <span className="nav-bar__logo" aria-hidden="true">
            H
          </span>
          <span>Colegio Don Bosco Sucre</span>
        </a>

        <div className="nav-bar__actions">
          <span className="nav-bar__user">{userName}</span>
          <button className="nav-bar__button" type="button">
            Perfil
          </button>
          <button className="nav-bar__button" type="button">
            Entrevistas
          </button>
          <button className="nav-bar__button" type="button">
            Notificaciones
          </button>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
