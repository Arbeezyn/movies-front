import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { useForm } from "react-hook-form";

import styles from "./upload.module.css";

interface FormData {
  title: string;
  poster: FileList;
  movie: FileList;
  description: string;
  age: number;
}

export const Route = createFileRoute("/upload")({
  component: Upload,
});

function Upload() {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("age", data.age.toString());
    formData.append("poster", data.poster[0]);
    formData.append("movie", data.movie[0]);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.title}>Загрузка фильма</h1>
        <label>Название</label>
        <input type="text" {...register("title")} />
        <label>Описание</label>
        <input type="text" {...register("description")} />
        <label>Дата выпуска</label>
        <input type="number" {...register("age")} />
        <label>Файл с постером</label>
        <input type="file" accept="image/*" {...register("poster")} />
        <label>Файл с фильмом</label>
        <input type="file" accept="video/*" {...register("movie")} />
        <input type="submit" />
      </form>
    </>
  );
}
