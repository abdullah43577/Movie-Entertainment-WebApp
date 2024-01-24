import { Link } from "react-router-dom";
import { useFetch } from "../../helper/useFetch";
const { VITE_API_KEY } = import.meta.env;

export default function MoviesGenre() {
  const { data: movieGenre } = useFetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${VITE_API_KEY}&language=en-US`,
    "getMovieGenre",
    "genres"
  );

  const moviesGenresArr = movieGenre?.map((genre) => {
    return (
      <Link
        to={`${genre.name}/${genre.id}`}
        key={genre.id}
        id={genre.id}
        className="rounded-lg"
      >
        <div className="flex h-[150px] items-center justify-center px-2 text-center font-bold lg:text-xl">
          {genre.name}
        </div>
      </Link>
    );
  });

  return <div className="moviesGenreContainer">{moviesGenresArr}</div>;
}
