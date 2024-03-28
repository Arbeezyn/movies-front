import { createFileRoute } from "@tanstack/react-router";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  return <RegisterPage />;
}

export default Register;
