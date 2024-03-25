// Компонент Index
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchError, setSearchError] = useState<string>("");
  const [searchCompleted, setSearchCompleted] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>("asc"); // По умолчанию сортировка по возрастанию

  useEffect(() => {
    fetchMovies();
  }, [sortOrder]); // Выполнить загрузку фильмов при изменении sortOrder

  const fetchMovies = () => {
    const url = searchQuery
      ? `http://localhost:3000/search?query=${searchQuery}&sort=${sortOrder}`
      : `http://localhost:3000/movie/all?sort=${sortOrder}`;
    axios
      .get(url)
      .then((response) => {
        setMovieInfo(response.data);
        setSearchError("");
        setSearchCompleted(true);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
        setSearchError("Произошла ошибка при выполнении поиска");
        setSearchCompleted(true);
      });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortOrder(event.target.value);
  };

  return (
    <div>
      <div className={styles.searchContainer}>
        <div className={styles.searchFormContainer}>
          <form
            className={styles.searchForm}
            onSubmit={(event) => {
              event.preventDefault();
              fetchMovies();
            }}
          >
            <input
              className={styles.searchInput}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Поиск фильмов..."
            />
            <button className={styles.searchButton} type="submit">
              Найти
            </button>
          </form>
        </div>
        <div className={styles.sortContainer}>
          <label htmlFor="sortSelect" className={styles.sortLabel}>
            Сортировать:
          </label>
          <select
            id="sortSelect"
            className={styles.sortSelect}
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </select>
        </div>
      </div>
      {searchError && <p>{searchError}</p>}
      {searchCompleted && movieInfo.length === 0 && !searchError && (
        <p className="noResultsMessage">Нет результатов поиска</p>
      )}
      <div className={styles.container}>
        {movieInfo.map((movie) => (
          <Card
            key={movie._id}
            posterUrl={movie.posterUrl}
            filmId={movie._id}
          />
        ))}
      </div>
    </div>
  );
}

export default Index;
