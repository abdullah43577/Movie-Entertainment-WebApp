import { useState, useEffect } from "react";
import { API_KEY } from "../../helper/helperModules";
import { Link } from "react-router-dom";

export default function TVGenre() {
  const [tvGenre, setTVGenre] = useState([]);

  useEffect(() => {
    const getTVGenre = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setTVGenre(data.genres);
      } catch (err) {
        console.error(err.message);
      }
    };

    getTVGenre();
  }, []);

  useEffect(() => {
    console.log(tvGenre);
  }, [tvGenre]);

  const TVGenresArr = tvGenre?.map((genre) => {
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

  return <div className="tvGenreContainer">{TVGenresArr}</div>;
}
