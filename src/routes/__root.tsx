import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import styles from "./root.module.css";

let isAuth = false;
localStorage.getItem("user") !== null ? (isAuth = true) : (isAuth = false);
let nick = "";
let id = "";
if (isAuth) {
  nick = JSON.parse(localStorage.getItem("user") || "{}").username;
  id = JSON.parse(localStorage.getItem("user") || "{}").id;
}

function logout() {
  localStorage.clear();
  window.location.reload();
}

export const Route = createRootRoute({
  component: () => (
    <div className="App">
      <div className={styles.header}>
        <div className={styles.links}>
          <Link to="/">Главная</Link>
          {id === "66056443d74775b1ec2c0cde" && (
            <Link to="/upload">Загрузить фильм</Link>
          )}
        </div>
        {isAuth && (
          <div className={styles.user}>
            <div>Вы вошли как: {nick}</div>
            <button onClick={() => logout()} className={styles.logout}>
              Выйти
            </button>
          </div>
        )}
      </div>
      <hr />

      <Outlet />
    </div>
  ),
});
