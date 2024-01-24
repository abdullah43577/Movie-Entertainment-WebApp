import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../../helper/helperModules";
import Loader from "../../helper/Loader";
import Rating from "../../helper/Rating";
import { useFetch } from "../../helper/useFetch";
const { VITE_API_KEY } = import.meta.env;

export default function TVShowDetail() {
  const { id, tvId } = useParams();
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [voteAvg, setVoteAvg] = useState(0);

  const handleImageLoad = () => setIsLoadingImage(false);

  const { isLoading: isLoadingTvShowDetail, data: tvShowDetail } = useFetch(
    `https://api.themoviedb.org/3/tv/${
      id || tvId
    }?api_key=${VITE_API_KEY}&language=en-US`,
    tvId || id
  );

  const { isLoading: isLoadingTvCredits, data: movieCredits } = useFetch(
    `https://api.themoviedb.org/3/tv/${
      id || tvId
    }/credits?api_key=${VITE_API_KEY}&language=en-US`,
    "getTVCredits"
  );

  useEffect(() => {
    if (tvShowDetail) setVoteAvg(tvShowDetail.vote_average);
  }, [id, tvId, tvShowDetail]);

  return (
    <>
      <div className="detail item-start flex max-w-[90%] flex-col justify-center gap-[3rem] lg:flex-row">
        <div
          className={`img :bg-contain h-[400px] w-full items-center justify-center rounded-lg bg-transparent lg:h-[700px] lg:w-[500px] lg:bg-btns ${
            isLoadingImage ? "flex" : ""
          }`}
        >
          {isLoadingImage && <Loader isLoading={isLoadingImage} />}

          <img
            src={`https://image.tmdb.org/t/p/original/${
              tvShowDetail?.poster_path || tvShowDetail?.backdrop_path
            }`}
            alt={tvShowDetail?.title}
            className={`mx-auto h-full w-full rounded-lg object-contain lg:object-cover ${
              isLoadingImage ? "hidden" : "block"
            }`}
            onLoad={handleImageLoad}
          />
        </div>

        <div className="infoContainer flex w-full flex-col gap-[2rem] lg:w-3/5">
          <h2 className="text-2xl md:text-3xl lg:text-5xl">
            {tvShowDetail?.name || "N/A"}
          </h2>
          <span className="text-lg text-gray-500">{tvShowDetail?.tagline}</span>
          <div className="rating flex items-center gap-[0.5rem]">
            <p className="text-2xl font-bold">
              {(voteAvg / 2).toFixed(1) || "N/A"}
            </p>

            <Rating voteAvg={voteAvg} />
          </div>
          <div className="movie-info flex flex-col flex-wrap items-start gap-[2rem] lg:flex-row lg:items-center">
            <div className="firstAir">
              <p className="text-lg text-gray-500">First Air</p>
              <span>{formatDate(tvShowDetail?.first_air_date)}</span>
            </div>

            <div className="language">
              <p className="text-lg text-gray-500">Language</p>
              <span>
                {isLoadingTvShowDetail ? (
                  <Loader isLoading={isLoadingTvShowDetail} />
                ) : (
                  tvShowDetail?.spoken_languages?.[0]?.english_name ||
                  tvShowDetail?.spoken_languages?.[0]?.name
                )}
              </span>
            </div>

            <div className="episodeRunTime">
              <p className="text-lg text-gray-500">Episodes Runtime</p>
              <span>
                {isLoadingTvShowDetail ? (
                  <Loader isLoading={isLoadingTvShowDetail} />
                ) : (
                  tvShowDetail?.episode_run_time?.[0]
                )}{" "}
                {tvShowDetail?.episode_run_time > 60 ? "hrs" : "mins"}
              </span>
            </div>

            <div className="Seasons">
              <p className="text-lg text-gray-500">Seasons</p>
              <span>
                {isLoadingTvShowDetail ? (
                  <Loader isLoading={isLoadingTvShowDetail} />
                ) : (
                  tvShowDetail?.number_of_seasons
                )}
              </span>
            </div>

            <div className="Episodes">
              <p className="text-lg text-gray-500">Episodes</p>
              <span>
                {isLoadingTvShowDetail ? (
                  <Loader isLoading={isLoadingTvShowDetail} />
                ) : (
                  tvShowDetail.number_of_episodes
                )}
              </span>
            </div>

            <div className="status">
              <p className="text-lg text-gray-500">Status</p>
              <span>
                {isLoadingTvShowDetail ? (
                  <Loader isLoading={isLoadingTvShowDetail} />
                ) : (
                  tvShowDetail?.status || "N/A"
                )}
              </span>
            </div>

            <div className="lastAirDate">
              <p className="text-lg text-gray-500">Last Air</p>
              <span>
                {isLoadingTvShowDetail ? (
                  <Loader isLoading={isLoadingTvShowDetail} />
                ) : (
                  formatDate(tvShowDetail?.last_air_date)
                )}
              </span>
            </div>
          </div>

          <div className="genres">
            <h3 className="mb-2 text-lg font-bold">Genres</h3>
            <div className="genre flex flex-wrap gap-[0.5rem]">
              {tvShowDetail?.genres?.map((genre) => (
                <p
                  className="cursor-pointer rounded-md border border-white bg-white px-2 py-1 text-base font-bold text-background hover:bg-transparent hover:text-white"
                  key={genre.id}
                >
                  {isLoadingTvShowDetail ? (
                    <Loader isLoading={isLoadingTvShowDetail} />
                  ) : (
                    genre.name
                  )}
                </p>
              ))}
            </div>
          </div>

          <div className="synopsis">
            <h3 className="mb-2 text-lg font-bold">Synopsis</h3>

            <p>
              {isLoadingTvShowDetail ? (
                <Loader isLoading={isLoadingTvShowDetail} />
              ) : (
                tvShowDetail?.overview
              )}
            </p>
          </div>

          <div className="casts">
            <h3 className="mb-2 text-lg font-bold">Casts</h3>
            <div className="cast-container flex flex-wrap gap-[0.5rem]">
              {isLoadingTvCredits ? (
                <Loader isLoading={isLoadingTvCredits} />
              ) : (
                movieCredits?.cast?.map((cast) => (
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
    </>
  );
}
