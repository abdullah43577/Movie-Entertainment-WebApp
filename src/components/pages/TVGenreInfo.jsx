import { useEffect, useState } from 'react';
import { API_KEY } from '../helper/API';
import { useParams, Link } from 'react-router-dom';
import movieClip from '../../icons folder/movieClip.svg';
import Loader from '../helper/Loader';

export default function TVGenreInfo() {
  const { id } = useParams();
  const [tvShowsGenreDetails, setTVShowsGenreDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMoviesByGenres = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${id}`);
        const data = await res.json();
        setTVShowsGenreDetails(data.results);

        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMoviesByGenres();
  }, [id]);

  const selectedGenre = tvShowsGenreDetails?.map((tv) => {
    const releaseDate = tv.release_date?.slice(0, 4) || tv.first_air_date?.slice(0, 4);

    return (
      <Link to={`${tv.id}`} key={tv.id}>
        <div className="card_element relative mx-auto h-[250px] w-full rounded-md bg-nav lg:h-[300px]">
          <img src={`https://image.tmdb.org/t/p/original/${tv.backdrop_path || tv.poster_path}`} alt={tv.title} className="h-full w-full rounded-lg" />
          <div className="overlay absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.4)]"></div>
          <div className="info_container absolute bottom-6 left-4 text-white">
            <div className="year-container flex items-center gap-3">
              <p>{releaseDate}</p>
              <p className="flex items-center gap-1">
                <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                <span>Movie</span>
              </p>
            </div>
            <div className="title text-2xl font-medium">{tv.title || tv.name}</div>
          </div>
        </div>
      </Link>
    );
  });

  return <div className="genreMovie gap-[1rem]">{isLoading ? <Loader isLoading={isLoading} /> : selectedGenre}</div>;
}
