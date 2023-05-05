import { useState, useEffect } from 'react';
import { API_KEY } from '../helper/API';
import { Link } from 'react-router-dom';

export default function MoviesGenre() {
  const [movieGenre, setMovieGenre] = useState([]);

  useEffect(() => {
    const getMovieGenre = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
      const data = await res.json();
      setMovieGenre(data.genres);
    };
    getMovieGenre();
  }, []);

  useEffect(() => {
    console.log(movieGenre);
  }, [movieGenre]);

  const moviesGenresArr = movieGenre?.map((genre) => {
    return (
      <Link to="genre/movie" key={genre.id} id={genre.id} className="rounded-lg">
        <div className="flex h-[150px] items-center justify-center text-center font-bold lg:text-xl">{genre.name}</div>
      </Link>
    );
  });

  return <div className="moviesGenreContainer">{moviesGenresArr}</div>;
}
