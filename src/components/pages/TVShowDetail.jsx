import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY } from '../helper/API';
import Loader from '../helper/Loader';

export default function TVShowDetail() {
  const { id } = useParams();

  const [tvShowDetail, setTVShowDetail] = useState([]);
  const [movieCredits, setMovieCredits] = useState([]);
  // const [movieRatings, setMovieRatings] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const handleImageLoad = () => setIsLoadingImage(false);

  useEffect(() => {
    const renderMovie = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        setTVShowDetail(data);

        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    renderMovie();
  }, [id]);

  useEffect(() => {
    const getCredits = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        setMovieCredits(data);
      } catch (err) {
        console.error(err);
      }
    };

    getCredits();
  }, [id]);

  useEffect(() => {
    console.log('movieCredits', movieCredits);
  }, [movieCredits]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  };

  return (
    <div className="detail item-start flex max-w-[90%] flex-col justify-center gap-[3rem] lg:flex-row">
      <div className={`img h-[400px] w-full items-center justify-center rounded-lg bg-btns lg:h-[600px] lg:w-[500px] ${isLoadingImage ? 'flex' : ''}`}>
        {isLoadingImage && <Loader isLoading={isLoadingImage} />}

        <img
          src={`https://image.tmdb.org/t/p/original/${tvShowDetail.poster_path || tvShowDetail.backdrop_path}`}
          alt={tvShowDetail.title}
          className={`mx-auto h-full w-full rounded-lg object-cover ${isLoadingImage ? 'hidden' : 'block'}`}
          onLoad={handleImageLoad}
        />
      </div>

      <div className="infoContainer flex w-full flex-col gap-[2rem] lg:w-3/5">
        <h2 className="text-2xl md:text-3xl lg:text-5xl">{tvShowDetail.name || 'N/A'}</h2>
        <span className="text-lg text-gray-500">{tvShowDetail.tagline}</span>
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
        <div className="movie-info flex flex-col flex-wrap items-start gap-[2rem] lg:flex-row lg:items-center">
          <div className="firstAir">
            <p className="text-lg text-gray-500">First Air</p>
            <span>{formatDate(tvShowDetail.first_air_date)}</span>
          </div>
          <div className="language">
            <p className="text-lg text-gray-500">Language</p>
            <span>{isLoading ? <Loader isLoading={isLoading} /> : tvShowDetail.spoken_languages?.[0]?.english_name || tvShowDetail.spoken_languages?.[0]?.name}</span>
          </div>

          <div className="episodeRunTime">
            <p className="text-lg text-gray-500">Episodes Runtime</p>
            <span>
              {isLoading ? <Loader isLoading={isLoading} /> : tvShowDetail.episode_run_time?.[0]} {tvShowDetail.episode_run_time > 60 ? 'hrs' : 'mins'}
            </span>
          </div>

          <div className="Seasons">
            <p className="text-lg text-gray-500">Seasons</p>
            <span>{isLoading ? <Loader isLoading={isLoading} /> : tvShowDetail.number_of_seasons}</span>
          </div>

          <div className="Episodes">
            <p className="text-lg text-gray-500">Episodes</p>
            <span>{isLoading ? <Loader isLoading={isLoading} /> : tvShowDetail.number_of_episodes}</span>
          </div>

          <div className="lastAirDate">
            <p className="text-lg text-gray-500">Last Air</p>
            <span>{isLoading ? <Loader isLoading={isLoading} /> : formatDate(tvShowDetail.last_air_date)}</span>
          </div>

          <div className="status">
            <p className="text-lg text-gray-500">Status</p>
            <span>{isLoading ? <Loader isLoading={isLoading} /> : tvShowDetail.status || 'N/A'}</span>
          </div>
        </div>

        <div className="genres">
          <h3 className="mb-2 text-lg font-bold">Genres</h3>
          <div className="genre flex flex-wrap gap-[0.5rem]">
            {tvShowDetail.genres?.map((genre) => (
              <p className="cursor-pointer rounded-md border border-white bg-white px-2 py-1 text-base font-bold text-background hover:bg-transparent hover:text-white" key={genre.id}>
                {isLoading ? <Loader isLoading={isLoading} /> : genre.name}
              </p>
            ))}
          </div>
        </div>

        <div className="synopsis">
          <h3 className="mb-2 text-lg font-bold">Synopsis</h3>

          <p>{isLoading ? <Loader isLoading={isLoading} /> : tvShowDetail.overview}</p>
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
