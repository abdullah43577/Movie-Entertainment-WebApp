import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieClip from '../../icons folder/movieClip.svg';
import { API_KEY } from '../helper/API';

export default function TVShowsSection() {
  const [tvTrends, setTvTrends] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  // const [nowPlaying, setNowPlaying] = useState([]);
  // const [upComing, setUpComing] = useState([]);
  // const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const trendRes = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`);
        const data = await trendRes.json();
        setTvTrends(data.results);

        const popularRes = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        const data2 = await popularRes.json();
        setPopularTVShows(data2.results);
      } catch (err) {
        console.error(err);
      }
    }

    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    console.log('movieTrends', tvTrends);
    console.log('popularTVShows', popularTVShows);
  }, [tvTrends, popularTVShows]);

  const trendingTVShows = tvTrends?.slice(0, 10).map((trend) => {
    const releaseDate = trend.release_date?.slice(0, 4) || trend.first_air_date?.slice(0, 4);

    return (
      <Link to="movie-detail" key={trend.id} id={trend.id}>
        <div className="card_element relative h-[250px] cursor-pointer overflow-hidden rounded-md bg-nav lg:h-[300px]">
          <img src={`https://image.tmdb.org/t/p/original/${trend.backdrop_path}`} alt={trend.title} className="h-auto w-full rounded-lg" />
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
    </>
  );
}
