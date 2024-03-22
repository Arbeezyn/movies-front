import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="App">
      <div>
        <Link to="/">Главная</Link>
        <Link to="/filmPage">Фильмы</Link>
        <Link to="/movie">Мультфильмы</Link>
        <Link to="/upload">Загрузка</Link>
      </div>
      <Outlet />
    </div>
  ),
});
