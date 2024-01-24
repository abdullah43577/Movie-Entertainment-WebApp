import { Link } from "react-router-dom";
import movieClip from "../../icons folder/movieClip.svg";
import TVShows from "./TVshows/TVShowsSection";
import Loader from "../helper/Loader";
import { useFetch } from "../helper/useFetch";
const { VITE_API_KEY } = import.meta.env;

export default function Home() {
  const { isLoading: isLoadingTrends, data: movieTrends } = useFetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${VITE_API_KEY}`,
    "getTrends",
    "results"
  );

  const { isLoading: isLoadingPopularMovies, data: popularMovies } = useFetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${VITE_API_KEY}&language=en-US&page=1`,
    "getPopularTrends",
    "results"
  );

  const { isLoading: isLoadingNowPlaying, data: nowPlaying } = useFetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${VITE_API_KEY}&language=en-US&page=1`,
    "getNowPlayingTrends",
    "results"
  );

  const { isLoading: isLoadingUpComing, data: upComing } = useFetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${VITE_API_KEY}&language=en-US&page=1`,
    "getUpcomingTrends",
    "results"
  );

  const { isLoading: isLoadingTopRated, data: topRated } = useFetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${VITE_API_KEY}&language=en-US&page=1`,
    "topRatedTrends",
    "results"
  );

  const TrendingMoviesArr = movieTrends?.slice(0, 10).map((trend) => {
    const releaseDate =
      trend.release_date?.slice(0, 4) || trend.first_air_date?.slice(0, 4);

    return (
      <Link to={`movies/${trend.id}`} key={trend.id} className="link">
        <div className="card_element relative h-[250px] cursor-pointer overflow-hidden rounded-md bg-nav lg:h-[300px]">
          <img
            src={`https://image.tmdb.org/t/p/w500/${
              trend.backdrop_path || trend.poster_path
            }`}
            alt={trend.title}
            className="h-auto w-full rounded-lg"
            loading="lazy"
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
                  loading="lazy"
                />
                <span>Movie</span>
              </p>
            </div>
            <div className="title text-2xl font-medium lg:text-3xl">
              {trend.title || trend.name}
            </div>
          </div>
        </div>
      </Link>
    );
  });

  // Popular Movies
  const popularMoviesArr = popularMovies?.slice(0, 6).map((movie) => {
    const releaseDate =
      movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4);

    return (
      <Link to={`movies/${movie.id}`} key={movie.id} className="linkEl link">
        <div className="card_element relative mx-auto h-[250px] rounded-md bg-nav lg:h-[300px]">
          <img
            src={`https://image.tmdb.org/t/p/original/${
              movie.backdrop_path || movie.poster_path
            }`}
            alt={movie.title}
            className="h-full w-full rounded-lg"
            loading="lazy"
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

  // now playing
  const nowPlayingMoviesArr = nowPlaying?.slice(0, 6).map((playing) => {
    const releaseDate =
      playing.release_date?.slice(0, 4) || playing.first_air_date?.slice(0, 4);

    return (
      <Link
        to={`movies/${playing.id}`}
        key={playing.id}
        className="linkEl link"
      >
        <div className="card_element relative mx-auto h-[250px] w-full rounded-md bg-nav lg:h-[300px]">
          <img
            src={`https://image.tmdb.org/t/p/original/${
              playing.backdrop_path || playing.poster_path
            }`}
            alt={playing.title}
            className="h-full w-full rounded-lg"
            loading="lazy"
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
                  loading="lazy"
                />
                <span>Movie</span>
              </p>
            </div>
            <div className="title text-2xl font-medium">
              {playing.title || playing.name}
            </div>
          </div>
        </div>
      </Link>
    );
  });

  const upComingMoviesArr = upComing?.slice(0, 6).map((upcoming) => {
    const releaseDate =
      upcoming.release_date?.slice(0, 4) ||
      upcoming.first_air_date?.slice(0, 4);

    return (
      <Link
        to={`movies/${upcoming.id}`}
        key={upcoming.id}
        className="linkEl link"
      >
        <div className="card_element relative mx-auto h-[250px] w-full rounded-md bg-nav lg:h-[300px]">
          <img
            src={`https://image.tmdb.org/t/p/original/${
              upcoming.backdrop_path || upcoming.poster_path
            }`}
            alt={upcoming.title}
            className="h-full w-full rounded-lg"
            loading="lazy"
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
                  loading="lazy"
                />
                <span>Movie</span>
              </p>
            </div>
            <div className="title text-2xl font-medium">
              {upcoming.title || upcoming.name}
            </div>
          </div>
        </div>
      </Link>
    );
  });

  const topRatedMoviesArr = topRated?.slice(0, 6).map((topRated) => {
    const releaseDate =
      topRated.release_date?.slice(0, 4) ||
      topRated.first_air_date?.slice(0, 4);

    return (
      <Link
        to={`movies/${topRated.id}`}
        key={topRated.id}
        className="linkEl link"
      >
        <div className="card_element relative mx-auto h-[250px] w-full rounded-md bg-nav lg:h-[300px]">
          <img
            src={`https://image.tmdb.org/t/p/original/${
              topRated.backdrop_path || topRated.poster_path
            }`}
            alt={topRated.title}
            className="h-full w-full rounded-lg"
            loading="lazy"
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
                  loading="lazy"
                />
                <span>Movie</span>
              </p>
            </div>
            <div className="title text-2xl font-medium">
              {topRated.title || topRated.name}
            </div>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <>
      <div className="trends-hd flex items-center justify-between">
        {/* Daily Movies */}
        <div className="trend-title flex items-center gap-3">
          <h2 className="text-2xl font-medium text-white lg:text-3xl">
            Trending
          </h2>
          <div className="movieTxt-container rounded-lg border-2 border-white px-4 py-[2px] text-xs text-white lg:text-sm">
            MOVIE
          </div>
        </div>
        <Link
          to="movies/trends"
          className="text-xs uppercase text-btns hover:text-white hover:underline lg:text-sm"
        >
          See more
        </Link>
      </div>

      <div className="trending-movies-container my-8 overflow-x-scroll">
        {isLoadingTrends ? (
          <Loader isLoading={isLoadingTrends} />
        ) : (
          TrendingMoviesArr
        )}
      </div>

      {/* popular movies */}
      <div className="trends-hd mt-32 flex items-center justify-between">
        <div className="trend-title flex items-center gap-3">
          <h2 className="text-2xl font-medium text-white lg:text-3xl">
            Popular
          </h2>
          <div className="movieTxt-container rounded-lg border-2 border-white px-4 py-[2px] text-xs text-white lg:text-sm">
            MOVIE
          </div>
        </div>
        <Link
          to="movies/popular-movies"
          className="text-xs uppercase text-btns hover:text-white hover:underline lg:text-sm"
        >
          See more
        </Link>
      </div>
      <div className="movies-container my-8">
        {isLoadingPopularMovies ? (
          <Loader isLoading={isLoadingPopularMovies} />
        ) : (
          popularMoviesArr
        )}
      </div>

      {/* Now Playing */}
      <div className="trends-hd mt-32 flex items-center justify-between">
        <div className="trend-title flex items-center gap-3">
          <h2 className="text-2xl font-medium text-white lg:text-3xl">
            Now Playing
          </h2>
          <div className="movieTxt-container rounded-lg border-2 border-white px-4 py-[2px] text-xs text-white lg:text-sm">
            MOVIE
          </div>
        </div>
        <Link
          to="movies/now-playing"
          className="text-xs uppercase text-btns hover:text-white hover:underline lg:text-sm"
        >
          See more
        </Link>
      </div>

      <div className="movies-container my-8">
        {isLoadingNowPlaying ? (
          <Loader isLoading={isLoadingNowPlaying} />
        ) : (
          nowPlayingMoviesArr
        )}
      </div>

      {/* UpComing */}
      <div className="trends-hd mt-32 flex items-center justify-between">
        <div className="trend-title flex items-center gap-3">
          <h2 className="text-2xl font-medium text-white lg:text-3xl">
            Upcoming
          </h2>
          <div className="movieTxt-container rounded-lg border-2 border-white px-4 py-[2px] text-xs text-white lg:text-sm">
            MOVIE
          </div>
        </div>
        <Link
          to="movies/upcoming-movies"
          className="text-xs uppercase text-btns hover:text-white hover:underline lg:text-sm"
        >
          See more
        </Link>
      </div>

      <div className="movies-container my-8">
        {isLoadingUpComing ? (
          <Loader isLoading={isLoadingUpComing} />
        ) : (
          upComingMoviesArr
        )}
      </div>

      {/* Top rated */}
      <div className="trends-hd mt-32 flex items-center justify-between">
        <div className="trend-title flex items-center gap-3">
          <h2 className="text-2xl font-medium text-white lg:text-3xl">
            Top Rated
          </h2>
          <div className="movieTxt-container rounded-lg border-2 border-white px-4 py-[2px] text-xs text-white lg:text-sm">
            MOVIE
          </div>
        </div>
        <Link
          to="movies/toprated-movies"
          className="text-xs uppercase text-btns hover:text-white hover:underline lg:text-sm"
        >
          See more
        </Link>
      </div>

      <div className="movies-container my-8">
        {isLoadingTopRated ? (
          <Loader isLoading={isLoadingTopRated} />
        ) : (
          topRatedMoviesArr
        )}
      </div>

      <TVShows />
    </>
  );
}
