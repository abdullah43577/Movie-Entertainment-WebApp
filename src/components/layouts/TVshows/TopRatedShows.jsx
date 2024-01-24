import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import movieClip from "../../../icons folder/movieClip.svg";
import Pagination from "../../helper/Pagination";
import Loader from "../../helper/Loader";
import { useFetch } from "../../helper/useFetch";
const { VITE_API_KEY } = import.meta.env;

export default function TopRatedShows() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { isLoading, data: movies } = useFetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${VITE_API_KEY}&language=en-US&page=${currentPage}`,
    "getTopRatedShowsLayout",
    "results"
  );

  const { data: totalNumberOfPages } = useFetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${VITE_API_KEY}&language=en-US&page=${currentPage}`,
    "totalNumberOfPagesTopRatedShows",
    "total_pages"
  );

  useEffect(() => {
    if (totalNumberOfPages) setTotalPages(Math.min(totalNumberOfPages, 500));
  }, [currentPage, totalNumberOfPages]);

  const topRatedArr = movies?.map((movie) => {
    const releaseDate =
      movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4);

    return (
      <Link to={movie.id.toString()} key={movie.id} className="link">
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
                  loading="lazy"
                />
                <span>TV Series</span>
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

  const handlePageClick = (selectedPage) => {
    const currentPage = selectedPage.selected;
    // if currentPage >= 0, means if the selected page in the pagination is >= 1
    if (currentPage >= 0 && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="genreMovie">
        {isLoading ? <Loader isLoading={isLoading} /> : topRatedArr}
      </div>

      <Pagination
        handlePageClick={handlePageClick}
        totalPageNumber={totalPages}
      />
    </>
  );
}
