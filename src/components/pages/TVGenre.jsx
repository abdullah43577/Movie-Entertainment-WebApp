import { useState, useEffect } from 'react';
import { API_KEY } from '../helper/API';
import { Link } from 'react-router-dom';

export default function TVGenre() {
  const [tvGenre, setTVGenre] = useState([]);

  useEffect(() => {
    const getTVGenre = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`);
      const data = await res.json();
      setTVGenre(data.genres);
    };
    getTVGenre();
  }, []);

  useEffect(() => {
    console.log(tvGenre);
  }, [tvGenre]);

  const TVGenresArr = tvGenre?.map((genre) => {
    return (
      <Link to="genre/tv" key={genre.id} id={genre.id} className="rounded-lg">
        <div className="flex h-[150px] items-center justify-center text-center font-bold lg:text-xl">{genre.name}</div>
      </Link>
    );
  });

  return <div className="tvGenreContainer">{TVGenresArr}</div>;
}
