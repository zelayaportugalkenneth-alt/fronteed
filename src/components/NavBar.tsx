function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold tracking-wide">
          MiApp
        </a>

        {/* Menú */}
        <ul className="flex items-center gap-6">
          <li>
            <a
              href="/"
              className="transition-colors hover:text-cyan-400"
            >
              Inicio
            </a>
          </li>

          <li>
            <a
              href="/login"
              className="rounded-md bg-cyan-500 px-4 py-2 font-medium transition-colors hover:bg-cyan-600"
            >
              Iniciar sesión
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;