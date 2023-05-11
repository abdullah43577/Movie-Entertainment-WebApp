import { useState, useEffect } from 'react';
import { API_KEY } from '../helper/API';
import { Link } from 'react-router-dom';

export default function MoviesGenre() {
  const [movieGenre, setMovieGenre] = useState([]);

  useEffect(() => {
    const getMovieGenre = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        setMovieGenre(data.genres);
      } catch (err) {
        console.error(err);
      }
    };

    getMovieGenre();
  }, []);

  const moviesGenresArr = movieGenre?.map((genre) => {
    return (
      <Link to={`${genre.name}/${genre.id}`} key={genre.id} id={genre.id} className="rounded-lg">
        <div className="flex h-[150px] items-center justify-center px-2 text-center font-bold lg:text-xl">{genre.name}</div>
      </Link>
    );
  });

  return <div className="moviesGenreContainer">{moviesGenresArr}</div>;
}
