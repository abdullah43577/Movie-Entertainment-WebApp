import { useEffect, useState } from "react";
import { API_KEY, getData } from "../../helper/helperModules";
import { Link } from "react-router-dom";
import movieClip from "../../../icons folder/movieClip.svg";
import FullPagination from "../../helper/FullPagination";

export default function TrendsLayout() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllMovieTrends = async () => {
      setIsLoading(true);

      const data = await getData(
        `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`
      );
      setMovies(data.results);

      setIsLoading(false);
    };

    getAllMovieTrends();
  }, []);

  const TrendingMoviesArr = movies?.map((trend) => {
    const releaseDate =
      trend.release_date?.slice(0, 4) || trend.first_air_date?.slice(0, 4);

    return (
      <Link to={`movies/${trend.id}`} key={trend.id} className="link">
        <div className="card_element relative mx-auto h-[250px] rounded-md bg-nav lg:h-[300px]">
          <img
            src={`https://image.tmdb.org/t/p/w500/${
              trend.backdrop_path || trend.poster_path
            }`}
            alt={trend.title}
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
                <span>TV Series</span>
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

  return <FullPagination moviesArr={TrendingMoviesArr} isLoading={isLoading} />;
}
