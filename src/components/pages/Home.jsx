import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import movieClip from '../../icons folder/movieClip.svg';
import { API_KEY } from '../helper/API';
import TVShows from './TVShowsSection';

export default function Home() {
  const [movieTrends, setMovieTrends] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const trendRes = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
        const data = await trendRes.json();
        setMovieTrends(data.results);

        const popularRes = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        const data2 = await popularRes.json();
        setPopularMovies(data2.results);

        const nowPlayingMoviesRes = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
        const data3 = await nowPlayingMoviesRes.json();
        setNowPlaying(data3.results);

        const upComingRes = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
        const data4 = await upComingRes.json();
        setUpComing(data4.results);

        const topRatedRes = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
        const data5 = await topRatedRes.json();
        setTopRated(data5.results);
      } catch (err) {
        console.error(err);
      }
    }

    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    console.log('movieTrends', movieTrends);
    console.log('popularMovies', popularMovies);
    console.log('nowPlaying', nowPlaying);
    console.log('upComing', upComing);
    console.log('topRated', topRated);
  }, [movieTrends, popularMovies, nowPlaying, upComing, topRated]);

  const TrendingMoviesArr = movieTrends?.slice(0, 10).map((trend) => {
    const releaseDate = trend.release_date?.slice(0, 4) || trend.first_air_date?.slice(0, 4);

    return (
      <Link to="movie-detail" key={trend.id} id={trend.id}>
        <div className="card-element relative h-auto cursor-pointer rounded-md bg-nav lg:w-[450px]">
          <img src={`https://image.tmdb.org/t/p/w500/${trend.backdrop_path}`} alt={trend.title} className="h-full w-full rounded-lg" />
          <div className="overlay absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.4)]"></div>
          <div className="info_container absolute bottom-6 left-4 text-white">
            <div className="year-container flex items-center gap-3">
              <p>{releaseDate}</p>
              <p className="flex items-center gap-1">
                <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                <span>{trend.media_type}</span>
              </p>
            </div>
            <div className="title text-2xl font-medium lg:text-3xl">{trend.title || trend.name}</div>
          </div>
        </div>
      </Link>
    );
  });

  // Popular Movies
  const popularMoviesArr = popularMovies?.slice(0, 11).map((movie) => {
    const releaseDate = movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4);

    return (
      <Link to="movie-detail" key={movie.id} id={movie.id}>
        <div className="card_element relative mx-auto rounded-md bg-nav">
          <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} className="w-full rounded-lg" />
          <div className="overlay absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.4)]"></div>
          <div className="info_container absolute bottom-6 left-4 text-white">
            <div className="year-container flex items-center gap-3">
              <p>{releaseDate}</p>
              <p className="flex items-center gap-1">
                <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                <span>{movie.media_type}</span>
              </p>
            </div>
            <div className="title text-2xl font-medium">{movie.title || movie.name}</div>
          </div>
        </div>
      </Link>
    );
  });

  // now playing
  const nowPlayingMoviesArr = nowPlaying?.slice(0, 10).map((playing) => {
    const releaseDate = playing.release_date?.slice(0, 4) || playing.first_air_date?.slice(0, 4);

    return (
      <Link to="movie-detail" key={playing.id} id={playing.id}>
        <div className="card_element relative mx-auto w-full rounded-md bg-nav">
          <img src={`https://image.tmdb.org/t/p/original/${playing.backdrop_path}`} alt={playing.title} className="w-full rounded-lg" />
          <div className="overlay absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.4)]"></div>
          <div className="info_container absolute bottom-6 left-4 text-white">
            <div className="year-container flex items-center gap-3">
              <p>{releaseDate}</p>
              <p className="flex items-center gap-1">
                <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                <span>{playing.media_type}</span>
              </p>
            </div>
            <div className="title text-2xl font-medium">{playing.title || playing.name}</div>
          </div>
        </div>
      </Link>
    );
  });

  const upComingMoviesArr = upComing?.slice(0, 10).map((upcoming) => {
    const releaseDate = upcoming.release_date?.slice(0, 4) || upcoming.first_air_date?.slice(0, 4);

    return (
      <Link to="movie-detail" key={upcoming.id} id={upcoming.id}>
        <div className="card_element relative mx-auto w-full rounded-md bg-nav">
          <img src={`https://image.tmdb.org/t/p/original/${upcoming.backdrop_path}`} alt={upcoming.title} className="w-full rounded-lg" />
          <div className="overlay absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.4)]"></div>
          <div className="info_container absolute bottom-6 left-4 text-white">
            <div className="year-container flex items-center gap-3">
              <p>{releaseDate}</p>
              <p className="flex items-center gap-1">
                <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                <span>{upcoming.media_type}</span>
              </p>
            </div>
            <div className="title text-2xl font-medium">{upcoming.title || upcoming.name}</div>
          </div>
        </div>
      </Link>
    );
  });

  const topRatedMoviesArr = topRated?.slice(0, 10).map((topRated) => {
    const releaseDate = topRated.release_date?.slice(0, 4) || topRated.first_air_date?.slice(0, 4);

    return (
      <Link to="movie-detail" key={topRated.id} id={topRated.id}>
        <div className="card_element relative mx-auto w-full rounded-md bg-nav">
          <img src={`https://image.tmdb.org/t/p/original/${topRated.backdrop_path}`} alt={topRated.title} className="w-full rounded-lg" />
          <div className="overlay absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.4)]"></div>
          <div className="info_container absolute bottom-6 left-4 text-white">
            <div className="year-container flex items-center gap-3">
              <p>{releaseDate}</p>
              <p className="flex items-center gap-1">
                <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                <span>{topRated.media_type}</span>
              </p>
            </div>
            <div className="title text-2xl font-medium">{topRated.title || topRated.name}</div>
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
          <h2 className="text-2xl font-medium text-white lg:text-3xl">Trending</h2>
          <div className="movieTxt-container rounded-lg border-2 border-white px-4 py-[2px] text-xs text-white lg:text-sm">MOVIE</div>
        </div>
        <Link to="movie-trends" className="text-xs uppercase text-btns hover:text-white hover:underline lg:text-sm">
          See more
        </Link>
      </div>

      <div className="trending-movies-container my-8 items-center overflow-x-scroll">{TrendingMoviesArr}</div>

      {/* popular movies */}
      <div className="trends-hd mt-32 flex items-center justify-between">
        <div className="trend-title flex items-center gap-3">
          <h2 className="text-2xl font-medium text-white lg:text-3xl">Popular</h2>
          <div className="movieTxt-container rounded-lg border-2 border-white px-4 py-[2px] text-xs text-white lg:text-sm">MOVIE</div>
        </div>
        <Link to="popular-movies" className="text-xs uppercase text-btns hover:text-white hover:underline lg:text-sm">
          See more
        </Link>
      </div>

      <div className="movies-container my-8">{popularMoviesArr}</div>

      {/* Now Playing */}
      <div className="trends-hd mt-32 flex items-center justify-between">
        <div className="trend-title flex items-center gap-3">
          <h2 className="text-2xl font-medium text-white lg:text-3xl">Now Playing</h2>
          <div className="movieTxt-container rounded-lg border-2 border-white px-4 py-[2px] text-xs text-white lg:text-sm">MOVIE</div>
        </div>
        <Link to="now-playing" className="text-xs uppercase text-btns hover:text-white hover:underline lg:text-sm">
          See more
        </Link>
      </div>

      <div className="movies-container my-8">{nowPlayingMoviesArr}</div>

      {/* UpComing */}
      <div className="trends-hd mt-32 flex items-center justify-between">
        <div className="trend-title flex items-center gap-3">
          <h2 className="text-2xl font-medium text-white lg:text-3xl">Upcoming</h2>
          <div className="movieTxt-container rounded-lg border-2 border-white px-4 py-[2px] text-xs text-white lg:text-sm">MOVIE</div>
        </div>
        <Link to="upcoming-movies" className="text-xs uppercase text-btns hover:text-white hover:underline lg:text-sm">
          See more
        </Link>
      </div>

      <div className="movies-container my-8">{upComingMoviesArr}</div>

      {/* Top rated */}
      <div className="trends-hd mt-32 flex items-center justify-between">
        <div className="trend-title flex items-center gap-3">
          <h2 className="text-2xl font-medium text-white lg:text-3xl">Top Rated</h2>
          <div className="movieTxt-container rounded-lg border-2 border-white px-4 py-[2px] text-xs text-white lg:text-sm">MOVIE</div>
        </div>
        <Link to="toprated-movies" className="text-xs uppercase text-btns hover:text-white hover:underline lg:text-sm">
          See more
        </Link>
      </div>

      <div className="movies-container my-8">{topRatedMoviesArr}</div>

      <TVShows />
    </>
  );
}
