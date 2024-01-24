import { useLocation, useOutletContext, Link } from "react-router-dom";
import movieClip from "../../icons folder/movieClip.svg";
import Pagination from "../helper/Pagination";

export default function SearchResult() {
  const location = useLocation();
  const { inputValue, searchResult, totalResult, totalPages } = location.state;

  const { handlePageClick } = useOutletContext();

  const search = searchResult?.map((search) => {
    const releaseDate =
      search.release_date?.slice(0, 4) || search.first_air_date?.slice(0, 4);

    let router;

    if (search.media_type === "movie") {
      router = "movie";
    } else {
      router = "tv";
    }

    return (
      <Link to={`${router}/${search.id}`} key={search.id} className="link">
        <div className="card_element relative mx-auto h-[250px] w-full rounded-md bg-nav lg:h-[300px]">
          <img
            src={`https://image.tmdb.org/t/p/original/${
              search.backdrop_path || search.poster_path
            }`}
            alt={search.title}
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
                <span>{search.media_type.toUpperCase()}</span>
              </p>
            </div>
            <div className="title text-2xl font-medium">
              {search.title || search.name}
            </div>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <>
      <h2 className="text-2xl">
        Found <span className="font-bold text-iconNavLink">{totalResult}</span>{" "}
        results for{" "}
        <span className="font-bold capitalize text-iconNavLink">
          {inputValue}
        </span>
      </h2>

      <div className="genreMovie mt-8">{search}</div>

      <Pagination
        handlePageClick={handlePageClick}
        totalPageNumber={totalPages}
      />
    </>
  );
}
