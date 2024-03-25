import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import IMovie from "../../interface/IMovie";

function Search() {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<IMovie[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.get<IMovie[]>(`/search?query=${query}`);
      setMovies(response.data);
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Поиск фильмов..."
        />
        <button type="submit">Найти</button>
      </form>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
