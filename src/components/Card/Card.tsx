import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import CardProps from "../../interface/ICard";
import styles from "./Card.module.css";
import axios from "axios";

const Card: React.FC<CardProps> = ({ posterUrl, filmId }) => {
  interface IFilm {
    title: string;
    age: string;
  }

  const [filmInfo, setFilmInfo] = useState<IFilm | null>(null);

  useEffect(() => {
    const fetchFilmInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/movie/${filmId}`
        );
        setFilmInfo(response.data as IFilm);
      } catch (error) {
        console.error("Error fetching film info:", error);
      }
    };

    fetchFilmInfo();
  }, [filmId]);

  return (
    <Link to={`/movie/${filmId}`}>
      <div className={styles.card}>
        <img
          className={styles.img}
          src={
            "http://localhost:3000/" +
            (posterUrl?.replace(/^uploads\//, "") || "")
          }
          alt=""
        />

        {filmInfo && <p className={styles.title}>{filmInfo.title}</p>}
        {filmInfo && <p className={styles.age}> Год выпуска: {filmInfo.age}</p>}
      </div>
    </Link>
  );
};
export default Card;
