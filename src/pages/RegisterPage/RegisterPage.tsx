import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import styles from "./RegisterPage.module.css";
import { Link } from "@tanstack/react-router";

interface RegisterFormInput {
  username: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const { register, handleSubmit } = useForm<RegisterFormInput>();

  const [registerSuccess, setRegisterSuccess] = useState<string>("");

  const onSubmit = async (data: RegisterFormInput) => {
    console.log(data);
    try {
      const response = await axios.post("http://localhost:3000/register", data);
      if (response.status === 201) {
        console.log("Register successful");
        setRegisterSuccess(
          "Успешно зарегистрирован, кликните, чтобы перейти к авторизации"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Регистрация</h2>
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
          <button type="submit">Зарегистрироваться</button>
        </form>
        {registerSuccess && (
          <Link className={styles.successMessage} to="/">
            {registerSuccess}
          </Link>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
