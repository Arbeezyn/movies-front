import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import IMovie from "../../interface/IMovie";
import styles from "./movie.module.css";

export const Route = createFileRoute("/movie/$movieId")({
  component: Movie,
});

function Movie() {
  const { movieId } = Route.useParams();
  const [movie, setMovie] = useState<IMovie>();

  useEffect(() => {
    axios.get(`http://localhost:3000/movie/${movieId}`).then((response) => {
      setMovie(response.data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h1 className={styles.title}>{movie?.title}</h1>
        <p className={styles.age}>{movie?.age}</p>
        <p className={styles.description}>{movie?.description}</p>
      </div>

      <img
        className={styles.img}
        src={
          "http://localhost:3000/" + movie?.posterUrl.replace(/^uploads\//, "")
        }
      />

      {movie?.movieUrl ? (
        <video className={styles.video} controls>
          <source
            src={
              "http://localhost:3000/" +
              movie?.movieUrl.replace(/^uploads\//, "")
            }
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>No movie</p>
      )}
    </div>
  );
}
