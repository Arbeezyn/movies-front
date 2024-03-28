import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import styles from "./LoginPage.module.css";
import { Link } from "@tanstack/react-router";

interface LoginFormInput {
  username: string;
  password: string;
}

interface UserData {
  id: string;
  username: string;
}

const LoginPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { register, handleSubmit } = useForm<LoginFormInput>();

  const onSubmit = async (data: LoginFormInput) => {
    try {
      const response = await axios.post("http://localhost:3000/login", data);
      if (response.status === 200) {
        const userData: UserData = response.data; // Данные о пользователе из ответа
        // Сохранение данных пользователя в localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("Login successful");
        // Перезагрузка страницы
        window.location.reload();
      } else {
        console.error("Login failed");
        setErrorMessage("Неверный логин или пароль");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Неверный логин или пароль");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Вход</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className={styles.firstLabel}>Логин:</label>
            <input type="text" {...register("username", { required: true })} />
          </div>
          <div>
            <label>Пароль:</label>
            <input
              type="password"
              {...register("password", { required: true })}
            />
          </div>
          <button type="submit">Войти</button>
        </form>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <Link to="/register" className={styles.registerLink}>
          Нет аккаунта? Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
