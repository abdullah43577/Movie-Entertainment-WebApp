import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY } from '../helper/API';

export default function MovieDetail() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState([]);
  const [movieCredits, setMovieCredits] = useState([]);
  // const [movieRatings, setMovieRatings] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const renderMovie = async () => {
      try {
        // setIsLoading(true);
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        setMovieDetail(data);

        // setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    renderMovie();
  }, [id]);

  useEffect(() => {
    const getCredits = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        setMovieCredits(data);
      } catch (err) {
        console.error(err);
      }
    };

    getCredits();
  }, [id]);

  const getHours = function (mins) {
    return `${Math.floor(mins / 60)} hrs`;
  };

  const getMinutes = function (mins) {
    return `${mins % 60} mins`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  };

  return (
    <div className="detail item-start flex max-w-[90%] flex-col justify-center gap-[3rem] lg:flex-row">
      <img src={`https://image.tmdb.org/t/p/original/${movieDetail.poster_path || movieDetail.backdrop_path}`} alt={movieDetail.title} className="mx-auto h-[400px] w-full rounded-lg object-cover lg:h-[600px] lg:w-[500px]" />

      <div className="infoContainer flex w-full flex-col gap-[2rem] lg:w-3/5">
        <h2 className="text-5xl">{movieDetail.title || movieDetail.original_title}</h2>
        <span className="text-lg text-gray-500">{movieDetail.tagline}</span>
        <div className="rating flex items-center gap-[0.5rem]">
          <p className="text-2xl font-bold">4.3</p>

          <div className="stars flex items-center">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
            </svg>

            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
            </svg>

            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
            </svg>

            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
            </svg>

            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
            </svg>
          </div>
        </div>
        <div className="movie-info flex flex-col items-start justify-between gap-[2rem] lg:flex-row lg:items-center lg:gap-0">
          <div className="length">
            <p className="text-lg text-gray-500">Length</p>
            <span>
              {getHours(movieDetail.runtime)} {getMinutes(movieDetail.runtime)}
            </span>
          </div>
          <div className="language">
            <p className="text-lg text-gray-500">Language</p>
            <span>{movieDetail.spoken_languages?.[0]?.name || 'N/A'}</span>
          </div>
          <div className="year">
            <p className="text-lg text-gray-500">Year</p>
            <span>{formatDate(movieDetail.release_date)}</span>
          </div>
          <div className="status">
            <p className="text-lg text-gray-500">Status</p>
            <span>{movieDetail.status || 'N/A'}</span>
          </div>
        </div>

        <div className="genres">
          <h3 className="mb-2 text-lg font-bold">Genres</h3>
          <div className="genre flex flex-wrap gap-[0.5rem]">
            {movieDetail.genres?.map((genre) => (
              <p className="cursor-pointer rounded-md border border-white bg-white px-2 py-1 text-base font-bold text-background hover:bg-transparent hover:text-white" key={genre.id}>
                {genre.name}
              </p>
            ))}
          </div>
        </div>

        <div className="synopsis">
          <h3 className="mb-2 text-lg font-bold">Synopsis</h3>

          <p>{movieDetail.overview}</p>
        </div>

        <div className="casts">
          <h3 className="mb-2 text-lg font-bold">Casts</h3>
          <div className="cast-container flex flex-wrap gap-[0.5rem]">
            {movieCredits.cast?.map((cast) => (
              <span className="cursor-pointer rounded-md border border-white px-2 py-1 font-bold hover:bg-white hover:text-background" key={cast.id}>
                {cast.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
