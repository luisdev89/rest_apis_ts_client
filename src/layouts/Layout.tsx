import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="bg-slate-800">
        <div className="max-w-6xl mx-auto py-8">
          <h1 className="text-4xl font-bold text-white ">
            Administrador de Productos.
          </h1>
        </div>
      </header>

      <main className="mt-10 max-w-6xl mx-auto bg-white p-10 shadow">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
