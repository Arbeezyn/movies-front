import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import IMovie from "../../interface/IMovie";
import styles from "./movie.module.css";

export const Route = createFileRoute("/movie/$movieId")({
  component: Movie,
});

let isAuth = false;
localStorage.getItem("user") !== null ? (isAuth = true) : (isAuth = false);
let id = "";
if (isAuth) {
  id = JSON.parse(localStorage.getItem("user") || "{}").id;
}

function Movie() {
  const { movieId } = Route.useParams();
  const [movie, setMovie] = useState<IMovie>();

  useEffect(() => {
    axios.get(`http://localhost:3000/movie/${movieId}`).then((response) => {
      setMovie(response.data);
    });
  }, [movieId]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/movie/${movieId}`)
      .then(() => {
        console.log("Movie deleted successfully");
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
        // Handle error, show message to user, etc.
      });
  };

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
          "http://localhost:3000/" +
          (movie?.posterUrl || "").replace(/^uploads\//, "")
        }
        alt="Movie poster"
      />

      {movie?.movieUrl ? (
        <video className={styles.video} controls>
          <source
            src={
              "http://localhost:3000/" +
              (movie?.movieUrl || "").replace(/^uploads\//, "")
            }
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>No movie</p>
      )}

      {id === "66056443d74775b1ec2c0cde" && (
        <button onClick={handleDelete} className={styles.delete}>
          Удалить
        </button>
      )}
    </div>
  );
}
