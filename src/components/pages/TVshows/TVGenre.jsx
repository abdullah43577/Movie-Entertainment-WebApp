import { useState, useEffect } from "react";
import { API_KEY, getData } from "../../helper/helperModules";
import { Link } from "react-router-dom";

export default function TVGenre() {
  const [tvGenre, setTVGenre] = useState([]);

  useEffect(() => {
    const getTVGenre = async () => {
      const data = await getData(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
      );
      setTVGenre(data.genres);
    };

    getTVGenre();
  }, []);

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
