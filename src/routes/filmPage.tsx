import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import IMovie from "../interface/IMovie";
import Card from "../components/Card/Card";
import styles from "./index.module.css";
import ReactPlayer from "react-player";

export const Route = createFileRoute("/filmPage")({
  component: FilmPage,
});

function FilmPage() {
  return (
    <div className={styles.container}>
      <video controls>
        <source
          src="http://localhost:3000/movies/movie_mems.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
