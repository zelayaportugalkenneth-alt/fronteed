import Navbar from "../components/NavBar";

function HomePage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl p-8">
        <h1 className="text-4xl font-bold">Página principal</h1>
        <p className="mt-4 text-gray-600">
          Bienvenido a la aplicación.
        </p>
      </main>
    </>
  );
}

export default HomePage;