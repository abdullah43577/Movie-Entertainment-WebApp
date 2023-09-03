import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import movieClip from "../../icons folder/movieClip.svg";
import { API_KEY, getData } from "../helper/helperModules";
import TVShows from "./TVshows/TVShowsSection";
import Loader from "../helper/Loader";
import { SERVER } from "../helper/helperModules";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [movieTrends, setMovieTrends] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();
  const [pageState, setPageState] = useState(false);

  useEffect(() => {
    // check the validity of jsonwebtoken
    async function checkToken() {
      try {
        // check if the token is valid
        const { user_token } = localStorage;
        console.log(user_token);
        const formatedToken = user_token?.replace(/['"]+/g, "");

        const res = await fetch(`${SERVER}/checkToken`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${formatedToken}`,
          },
          credentials: "include",
        });

        const data = await res.json();
        console.log(data);
        if (data.error) {
          nav("/login");
        } else {
          setPageState(true);
        }
      } catch (err) {
        console.log(err);
      }
    }

    checkToken();
  }, []);

  useEffect(() => {
    if (pageState) {
      const fetchMovies = async () => {
        setIsLoading(true);

        const trendRes = getData(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
        );

        const popularRes = getData(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );

        const nowPlayingMoviesRes = getData(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
        );

        const upComingRes = getData(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
        );

        const topRatedRes = getData(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
        );

        // tells javascript to run all this code concurrently to avoid blocking codes
        const data = await Promise.all([
          trendRes,
          popularRes,
          nowPlayingMoviesRes,
          upComingRes,
          topRatedRes,
        ]);

        setMovieTrends(data[0].results);
        setPopularMovies(data[1].results);
        setNowPlaying(data[2].results);
        setUpComing(data[3].results);
        setTopRated(data[4].results);

        setIsLoading(false);
      };

      fetchMovies();
    }
  }, [pageState]);

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
        {isLoading ? <Loader isLoading={isLoading} /> : TrendingMoviesArr}
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
        {isLoading ? <Loader isLoading={isLoading} /> : popularMoviesArr}
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
        {isLoading ? <Loader isLoading={isLoading} /> : nowPlayingMoviesArr}
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
        {isLoading ? <Loader isLoading={isLoading} /> : upComingMoviesArr}
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
        {isLoading ? <Loader isLoading={isLoading} /> : topRatedMoviesArr}
      </div>

      <TVShows />
    </>
  );
}
