import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  API_KEY,
  formatDate,
  getHours,
  getMinutes,
  getData,
} from "../../helper/helperModules";
import Loader from "../../helper/Loader";
import Rating from "../../helper/Rating";
import movieClip from "../../../icons folder/movieClip.svg";
import { useMediaQuery } from "@react-hook/media-query";

export default function MovieDetail() {
  const { id, movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState([]);
  const [movieCredits, setMovieCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [voteAvg, setVoteAvg] = useState(0);
  const [similarMovies, setSimilarMovies] = useState([]);
  const isSmallScreen = useMediaQuery("(max-width:480px)");
  const navigate = useNavigate();

  useEffect(() => {
    const renderMovie = async () => {
      setIsLoading(true);

      const data = await getData(
        `https://api.themoviedb.org/3/movie/${
          movieId || id
        }?api_key=${API_KEY}&language=en-US`
      );
      setMovieDetail(data);
      setVoteAvg(data.vote_average);

      setIsLoading(false);
    };

    renderMovie();
  }, [id, movieId]);

  useEffect(() => {
    const getCredits = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${
            movieId || id
          }/credits?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setMovieCredits(data);
      } catch (err) {
        console.error(err);
      }
    };

    getCredits();
  }, [id, movieId]);

  // get similar movies
  useEffect(() => {
    const getSimilarMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await res.json();
        // console.log("similar movies", data);

        const result = isSmallScreen
          ? data.results.slice(0, 5)
          : data.results.slice(0, 10);
        setSimilarMovies(result);
      } catch (err) {
        console.error(err);
      }
    };

    getSimilarMovies();
  }, [id, movieId, isSmallScreen]);

  const Navigator = function (id) {
    // Replace the current URL with this
    navigate(`movies/similar-movie/:${id}`, { replace: true });
  };

  const similarMoviesArr = similarMovies?.map((movie) => {
    const releaseDate =
      movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4);

    return (
      <Link
        to={`movies/similar-movie/${movie.id}`}
        key={movie.id}
        className="link"
        onClick={() => Navigator(movie.id)}
        replace
      >
        <div className="card_element relative mx-auto h-[250px] rounded-md bg-nav lg:h-[300px]">
          <img
            src={`https://image.tmdb.org/t/p/original/${
              movie.backdrop_path || movie.poster_path
            }`}
            alt={movie.title}
            className="h-full w-full rounded-lg"
          />
          <div className="overlay absolute left-0 top-0 h-full w-full rounded-lg bg-[rgba(0,0,0,0.4)]"></div>
          <div className="info_container absolute bottom-6 left-4 text-white">
            <div className="year-container flex items-center gap-3">
              <p>{releaseDate}</p>
              <p className="flex items-center gap-1">
                <img
                  src={movieClip}
                  alt="movie clip element"
                  className="w-4 before:content-['.']"
                />
                <span>Movie</span>
              </p>
            </div>
            <div className="title text-2xl font-medium">
              {movie.title || movie.name}
            </div>
          </div>
        </div>
      </Link>
    );
  });

  const handleImageLoad = () => setImageLoading(false);

  return (
    <>
      <div className="detail item-start flex max-w-[90%] flex-col justify-center gap-[3rem] lg:flex-row">
        <div
          className={`img h-[400px] w-full items-center justify-center rounded-lg bg-transparent lg:h-[700px] lg:w-[500px] lg:bg-btns ${
            imageLoading ? "flex" : ""
          }`}
        >
          {imageLoading && <Loader isLoading={imageLoading} />}
          <img
            src={`https://image.tmdb.org/t/p/original/${
              movieDetail.poster_path || movieDetail.backdrop_path
            }`}
            alt={movieDetail.title}
            className={`mx-auto h-full w-full rounded-lg object-contain lg:object-cover ${
              imageLoading ? "hidden" : "block"
            }`}
            onLoad={handleImageLoad}
          />
        </div>

        <div className="infoContainer flex w-full flex-col gap-[2rem] lg:w-3/5">
          <h2 className="text-2xl md:text-3xl lg:text-5xl">
            {isLoading ? (
              <Loader isLoading={isLoading} />
            ) : (
              movieDetail.title || movieDetail.original_title
            )}
          </h2>
          <span className="text-lg text-gray-500">
            {isLoading ? <Loader isLoading={isLoading} /> : movieDetail.tagline}
          </span>
          <div className="rating flex items-center gap-[0.5rem]">
            <p className="text-2xl font-bold">
              {(voteAvg / 2).toFixed(1) || "N/A"}
            </p>

            <Rating voteAvg={voteAvg} />
          </div>
          <div className="movie-info flex flex-col items-start justify-between gap-[2rem] lg:flex-row lg:items-center lg:gap-0">
            <div className="length">
              <p className="text-lg text-gray-500">Length</p>
              <span>
                {isLoading ? (
                  <Loader isLoading={isLoading} />
                ) : (
                  getHours(movieDetail.runtime)
                )}{" "}
                {getMinutes(movieDetail.runtime)}
              </span>
            </div>

            <div className="language">
              <p className="text-lg text-gray-500">Language</p>
              <span>
                {isLoading ? (
                  <Loader isLoading={isLoading} />
                ) : (
                  movieDetail.spoken_languages?.[0].name || "N/A"
                )}
              </span>
            </div>

            <div className="year">
              <p className="text-lg text-gray-500">Year</p>
              <span>
                {isLoading ? (
                  <Loader isLoading={isLoading} />
                ) : (
                  formatDate(movieDetail.release_date)
                )}
              </span>
            </div>

            <div className="status">
              <p className="text-lg text-gray-500">Status</p>
              <span>
                {isLoading ? (
                  <Loader isLoading={isLoading} />
                ) : (
                  movieDetail.status || "N/A"
                )}
              </span>
            </div>
          </div>

          <div className="genres">
            <h3 className="mb-2 text-lg font-bold">Genres</h3>
            <div className="genre flex flex-wrap gap-[0.5rem]">
              {movieDetail.genres?.map((genre) => (
                <p
                  className="cursor-pointer rounded-md border border-white bg-white px-2 py-1 text-base font-bold text-background hover:bg-transparent hover:text-white"
                  key={genre.id}
                >
                  {isLoading ? <Loader isLoading={isLoading} /> : genre.name}
                </p>
              ))}
            </div>
          </div>

          <div className="synopsis">
            <h3 className="mb-2 text-lg font-bold">Synopsis</h3>

            <p>
              {isLoading ? (
                <Loader isLoading={isLoading} />
              ) : (
                movieDetail.overview
              )}
            </p>
          </div>

          <div className="casts">
            <h3 className="mb-2 text-lg font-bold">Casts</h3>
            <div className="cast-container flex flex-wrap gap-[0.5rem]">
              {isLoading ? (
                <Loader isLoading={isLoading} />
              ) : (
                movieCredits.cast?.map((cast) => (
                  <span
                    className="cursor-pointer rounded-md border border-white px-2 py-1 font-bold hover:bg-white hover:text-background"
                    key={cast.id}
                  >
                    {cast.name}
                  </span>
                )) || "N/A"
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="similar-movies">
        <h3
          className={`my-8 text-2xl font-bold ${
            isSmallScreen ? "text-center" : "text-left"
          }`}
        >
          {isSmallScreen ? "Top 5 Similar Movies" : "Top 10 Similar Movies"}
        </h3>
        <div className="similar-movies-container genreMovie flex flex-wrap gap-[0.5rem]">
          {isLoading ? <Loader isLoading={isLoading} /> : similarMoviesArr}
        </div>
      </div>
    </>
  );
}
