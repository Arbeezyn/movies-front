import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movie/")({
  component: Movie,
});

function Movie() {
  return (
    <div>
      <Link to="/movie/$movieId" params={{ movieId: "1" }}>
        Movie 1
      </Link>
    </div>
  );
}
