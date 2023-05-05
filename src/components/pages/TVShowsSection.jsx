import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieClip from '../../icons folder/movieClip.svg';
import { API_KEY } from '../helper/API';

export default function TVShowsSection() {
  const [tvTrends, setTvTrends] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [onAir, setOnAir] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const trendRes = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`);
        const data = await trendRes.json();
        setTvTrends(data.results);

        const popularRes = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
        const data2 = await popularRes.json();
        setPopularTVShows(data2.results);

        const airingRes = await fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`);
        const data3 = await airingRes.json();
        setAiringToday(data3.results);

        const onAirRes = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`);
        const data4 = await onAirRes.json();
        setOnAir(data4.results);

        const topRatedRes = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
        const data5 = await topRatedRes.json();
        setTopRated(data5.results);
      } catch (err) {
        console.error(err);
      }
    }

    fetchTrendingMovies();
  }, []);

  const trendingTVShows = tvTrends?.slice(0, 10).map((trend) => {
    const releaseDate = trend.release_date?.slice(0, 4) || trend.first_air_date?.slice(0, 4);

    return (
      <Link to="movie-detail" key={trend.id} id={trend.id}>
        <div className="card_element relative h-[250px] cursor-pointer overflow-hidden rounded-md bg-nav lg:h-[300px]">
          <img src={`https://image.tmdb.org/t/p/original/${trend.backdrop_path || trend.poster_path}`} alt={trend.title} className="h-auto w-full rounded-lg" />
          <div className="overlay absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.4)]"></div>
          <div className="info_container absolute bottom-6 left-4 text-white">
            <div className="year-container flex items-center gap-3">
              <p>{releaseDate}</p>
              <p className="flex items-center gap-1">
                <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                <span>TV Series</span>
              </p>
            </div>
            <div className="title text-2xl font-medium lg:text-3xl">{trend.title || trend.name}</div>
          </div>
        </div>
      </Link>
    );
  });

  // Popular Movies
  const popularTVShowsArr = popularTVShows?.slice(0, 6).map((movie) => {
    const releaseDate = movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4);

    return (
      <Link to="movie-detail" key={movie.id} id={movie.id} className="linkEl">
        <div className="card_element relative mx-auto h-[250px] rounded-md bg-nav lg:h-[300px]">
          <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`} alt={movie.title} className="h-full w-full rounded-lg" />
          <div className="overlay absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.4)]"></div>
          <div className="info_container absolute bottom-6 left-4 text-white">
            <div className="year-container flex items-center gap-3">
              <p>{releaseDate}</p>
              <p className="flex items-center gap-1">
                <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                <span>Movie</span>
              </p>
            </div>
            <div className="title text-2xl font-medium">{movie.title || movie.name}</div>
          </div>
        </div>
      </Link>
    );
  });

  // airing today
  const airingTodayRes = airingToday?.slice(0, 6).map((playing) => {
    const releaseDate = playing.release_date?.slice(0, 4) || playing.first_air_date?.slice(0, 4);

    return (
      <Link to="movie-detail" key={playing.id} id={playing.id} className="linkEl">
        <div className="card_element relative mx-auto h-[250px] w-full rounded-md bg-nav lg:h-[300px]">
          <img src={`https://image.tmdb.org/t/p/original/${playing.backdrop_path || playing.poster_path}`} alt={playing.title} className="h-full w-full rounded-lg" />
          <div className="overlay absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.4)]"></div>
          <div className="info_container absolute bottom-6 left-4 text-white">
            <div className="year-container flex items-center gap-3">
              <p>{releaseDate}</p>
              <p className="flex items-center gap-1">
                <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                <span>Movie</span>
              </p>
            </div>
            <div className="title text-2xl font-medium">{playing.title || playing.name}</div>
          </div>
        </div>
      </Link>
    );
  });

  const onAirRes = onAir?.slice(0, 6).map((upcoming) => {
    const releaseDate = upcoming.release_date?.slice(0, 4) || upcoming.first_air_date?.slice(0, 4);

    return (
      <Link to="movie-detail" key={upcoming.id} id={upcoming.id} className="linkEl">
        <div className="card_element relative mx-auto h-[250px] w-full rounded-md bg-nav lg:h-[300px]">
          <img src={`https://image.tmdb.org/t/p/original/${upcoming.backdrop_path || upcoming.poster_path}`} alt={upcoming.title} className="h-full w-full rounded-lg" />
          <div className="overlay absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.4)]"></div>
          <div className="info_container absolute bottom-6 left-4 text-white">
            <div className="year-container flex items-center gap-3">
              <p>{releaseDate}</p>
              <p className="flex items-center gap-1">
                <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                <span>Movie</span>
              </p>
            </div>
            <div className="title text-2xl font-medium">{upcoming.title || upcoming.name}</div>
          </div>
        </div>
      </Link>
    );
  });

  const topRatedSeriesArr = topRated?.slice(0, 6).map((topRated) => {
    const releaseDate = topRated.release_date?.slice(0, 4) || topRated.first_air_date?.slice(0, 4);

    return (
      <Link to="movie-detail" key={topRated.id} id={topRated.id} className="linkEl">
        <div className="card_element relative mx-auto h-[250px] w-full rounded-md bg-nav lg:h-[300px]">
          <img src={`https://image.tmdb.org/t/p/original/${topRated.backdrop_path || topRated.poster_path}`} alt={topRated.title} className="h-full w-full rounded-lg" />
          <div className="overlay absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.4)]"></div>
          <div className="info_container absolute bottom-6 left-4 text-white">
            <div className="year-container flex items-center gap-3">
              <p>{releaseDate}</p>
              <p className="flex items-center gap-1">
                <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                <span>Movie</span>
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
      {/* Trending */}
      <div className="trends-hd mt-32 flex items-center justify-between">
        <div className="trend-title flex items-center gap-3">
          <h2 className="text-2xl font-medium text-white lg:text-3xl">Trending</h2>
          <div className="movieTxt-container rounded-lg bg-white px-4 py-[2px] text-xs text-background lg:text-sm">TV SHOW</div>
        </div>
        <Link to="popular-movies" className="text-xs uppercase text-btns hover:text-white hover:underline lg:text-sm">
          See more
        </Link>
      </div>

      <div className="trending-movies-container my-8 overflow-x-scroll">{trendingTVShows}</div>

      {/* popular movies */}
      <div className="trends-hd mt-32 flex items-center justify-between">
        <div className="trend-title flex items-center gap-3">
          <h2 className="text-2xl font-medium text-white lg:text-3xl">Popular</h2>
          <div className="movieTxt-container rounded-lg bg-white px-4 py-[2px] text-xs text-background lg:text-sm">TV SHOW</div>
        </div>
        <Link to="popular-movies" className="text-xs uppercase text-btns hover:text-white hover:underline lg:text-sm">
          See more
        </Link>
      </div>

      <div className="movies-container my-8">{popularTVShowsArr}</div>

      {/* Airing today */}
      <div className="trends-hd mt-32 flex items-center justify-between">
        <div className="trend-title flex items-center gap-3">
          <h2 className="text-2xl font-medium text-white lg:text-3xl">Airing Today</h2>
          <div className="movieTxt-container rounded-lg bg-white px-4 py-[2px] text-xs text-background lg:text-sm">TV SHOW</div>
        </div>
        <Link to="now-playing" className="text-xs uppercase text-btns hover:text-white hover:underline lg:text-sm">
          See more
        </Link>
      </div>

      <div className="movies-container my-8">{airingTodayRes}</div>

      {/* on Air */}
      <div className="trends-hd mt-32 flex items-center justify-between">
        <div className="trend-title flex items-center gap-3">
          <h2 className="text-2xl font-medium text-white lg:text-3xl">On Air</h2>
          <div className="movieTxt-container rounded-lg bg-white px-4 py-[2px] text-xs text-background lg:text-sm">TV SHOW</div>
        </div>
        <Link to="upcoming-movies" className="text-xs uppercase text-btns hover:text-white hover:underline lg:text-sm">
          See more
        </Link>
      </div>

      <div className="movies-container my-8">{onAirRes}</div>

      {/* Top rated */}
      <div className="trends-hd mt-32 flex items-center justify-between">
        <div className="trend-title flex items-center gap-3">
          <h2 className="text-2xl font-medium text-white lg:text-3xl">Top Rated</h2>
          <div className="movieTxt-container rounded-lg bg-white px-4 py-[2px] text-xs text-background lg:text-sm">TV SHOW</div>
        </div>
        <Link to="toprated-movies" className="text-xs uppercase text-btns hover:text-white hover:underline lg:text-sm">
          See more
        </Link>
      </div>

      <div className="movies-container my-8">{topRatedSeriesArr}</div>
    </>
  );
}
