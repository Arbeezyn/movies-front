// Компонент Index
import { createFileRoute } from "@tanstack/react-router";
import MainPage from "../pages/MainPage/MainPage";
import LoginPage from "../pages/LoginPage/LoginPage";

export const Route = createFileRoute("/")({
  component: Index,
});

let isAuth = false;
localStorage.getItem("user") !== null ? (isAuth = true) : (isAuth = false);

function Index() {
  return isAuth ? <MainPage /> : <LoginPage />;
}

export default Index;
