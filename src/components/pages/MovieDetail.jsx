import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY } from '../helper/API';
import Loader from '../helper/Loader';
import Rating from '../helper/Rating';

export default function MovieDetail() {
  const { id, movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState([]);
  const [movieCredits, setMovieCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [voteAvg, setVoteAvg] = useState(0);

  useEffect(() => {
    const renderMovie = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId || id}?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        setMovieDetail(data);
        setVoteAvg(data.vote_average);

        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    renderMovie();
  }, [id, movieId]);

  useEffect(() => {
    const getCredits = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId || id}/credits?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        setMovieCredits(data);
      } catch (err) {
        console.error(err);
      }
    };

    getCredits();
  }, [id, movieId]);

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

  const handleImageLoad = () => setImageLoading(false);

  return (
    <div className="detail item-start flex max-w-[90%] flex-col justify-center gap-[3rem] lg:flex-row">
      <div className={`img h-[400px] w-full items-center justify-center rounded-lg bg-btns lg:h-[700px] lg:w-[500px] ${imageLoading ? 'flex' : ''}`}>
        {imageLoading && <Loader isLoading={imageLoading} />}
        <img
          src={`https://image.tmdb.org/t/p/original/${movieDetail.poster_path || movieDetail.backdrop_path}`}
          alt={movieDetail.title}
          className={`mx-auto h-full w-full rounded-lg object-cover ${imageLoading ? 'hidden' : 'block'}`}
          onLoad={handleImageLoad}
        />
      </div>

      <div className="infoContainer flex w-full flex-col gap-[2rem] lg:w-3/5">
        <h2 className="text-2xl md:text-3xl lg:text-5xl">{isLoading ? <Loader isLoading={isLoading} /> : movieDetail.title || movieDetail.original_title}</h2>
        <span className="text-lg text-gray-500">{isLoading ? <Loader isLoading={isLoading} /> : movieDetail.tagline}</span>
        <div className="rating flex items-center gap-[0.5rem]">
          <p className="text-2xl font-bold">{(voteAvg / 2).toFixed(1) || 'N/A'}</p>

          <Rating voteAvg={voteAvg} />
        </div>
        <div className="movie-info flex flex-col items-start justify-between gap-[2rem] lg:flex-row lg:items-center lg:gap-0">
          <div className="length">
            <p className="text-lg text-gray-500">Length</p>
            <span>
              {isLoading ? <Loader isLoading={isLoading} /> : getHours(movieDetail.runtime)} {getMinutes(movieDetail.runtime)}
            </span>
          </div>

          <div className="language">
            <p className="text-lg text-gray-500">Language</p>
            <span>{isLoading ? <Loader isLoading={isLoading} /> : movieDetail.spoken_languages?.[0].name || 'N/A'}</span>
          </div>

          <div className="year">
            <p className="text-lg text-gray-500">Year</p>
            <span>{isLoading ? <Loader isLoading={isLoading} /> : formatDate(movieDetail.release_date)}</span>
          </div>

          <div className="status">
            <p className="text-lg text-gray-500">Status</p>
            <span>{isLoading ? <Loader isLoading={isLoading} /> : movieDetail.status || 'N/A'}</span>
          </div>
        </div>

        <div className="genres">
          <h3 className="mb-2 text-lg font-bold">Genres</h3>
          <div className="genre flex flex-wrap gap-[0.5rem]">
            {movieDetail.genres?.map((genre) => (
              <p className="cursor-pointer rounded-md border border-white bg-white px-2 py-1 text-base font-bold text-background hover:bg-transparent hover:text-white" key={genre.id}>
                {isLoading ? <Loader isLoading={isLoading} /> : genre.name}
              </p>
            ))}
          </div>
        </div>

        <div className="synopsis">
          <h3 className="mb-2 text-lg font-bold">Synopsis</h3>

          <p>{isLoading ? <Loader isLoading={isLoading} /> : movieDetail.overview}</p>
        </div>

        <div className="casts">
          <h3 className="mb-2 text-lg font-bold">Casts</h3>
          <div className="cast-container flex flex-wrap gap-[0.5rem]">
            {isLoading ? (
              <Loader isLoading={isLoading} />
            ) : (
              movieCredits.cast?.map((cast) => (
                <span className="cursor-pointer rounded-md border border-white px-2 py-1 font-bold hover:bg-white hover:text-background" key={cast.id}>
                  {cast.name}
                </span>
              )) || 'N/A'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
