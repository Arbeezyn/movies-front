import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import IMovie from "../interface/IMovie";
import Card from "../components/Card/Card";
import styles from "./index.module.css";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [movieInfo, setMovieInfo] = useState<IMovie[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/movie/all")
      .then((response) => {
        // Обработка успешного ответа
        setMovieInfo(response.data);
        console.log(response.data); // Выводим movie info здесь
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка при получении данных:", error);
      });
  }, []);

  return (
    <div className={styles.container}>
      {movieInfo.map((movie) => (
        <Card key={movie._id} posterUrl={movie.posterUrl} filmId={movie._id} />
      ))}
    </div>
  );
}
