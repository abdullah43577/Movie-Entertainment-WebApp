import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// components/pages
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import MoviesGenre from "./components/pages/movies/MoviesGenre";
import TVGenre from "./components/pages/TVshows/TVGenre";
import MovieDetail from "./components/pages/movies/MovieDetail";
import TVShowDetail from "./components/pages/TVshows/TVShowDetail";
import MovieGenreInfo from "./components/pages/movies/MovieGenreInfo";
import TVGenreInfo from "./components/pages/TVshows/TVGenreInfo";

// components/layouts/movies
import RootLayout from "./components/layouts/RootLayout";
import TrendsLayout from "./components/layouts/movies/TrendsLayout";
import PopularLayout from "./components/layouts/movies/PopularMoviesLayout";
import NowPlayingMoviesLayout from "./components/layouts/movies/NowPlayingMoviesLayout";
import TopRatedMoviesLayout from "./components/layouts/movies/TopRatedMoviesLayout";
import UpcomingMoviesLayout from "./components/layouts/movies/UpComingMoviesLayout";

// components/layouts/TVshows
import TrendingShows from "./components/layouts/TVshows/TrendingShows";
import PopularShows from "./components/layouts/TVshows/PopularShows";
import AiringToday from "./components/layouts/TVshows/AiringToday";
import OnAir from "./components/layouts/TVshows/OnAir";
import TopRatedShows from "./components/layouts/TVshows/TopRatedShows";

// search result
import SearchResults from "./components/layouts/SearchResults";

export default function App() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<SearchResults />} />

            {/* movies route */}
            <Route path="movies">
              <Route path=":id" element={<MovieDetail />} />
              <Route path="similar/:id" element={<MovieDetail />} />
              <Route path="trends/movies/:id" element={<MovieDetail />} />

              <Route path="genres">
                <Route index element={<MoviesGenre />} />
                <Route path=":genre/:id" element={<MovieGenreInfo />} />
                <Route path=":genre/:id/:movieId" element={<MovieDetail />} />
              </Route>

              {/* see more btns movies */}
              <Route path="trends" element={<TrendsLayout />} />
              <Route path="popular-movies" element={<PopularLayout />} />
              <Route path="now-playing" element={<NowPlayingMoviesLayout />} />
              <Route
                path="upcoming-movies"
                element={<UpcomingMoviesLayout />}
              />
              <Route
                path="toprated-movies"
                element={<TopRatedMoviesLayout />}
              />

              {/* see more buttons movie details */}
              <Route path="trends/movies/:id" element={<MovieDetail />} />
              <Route path="popular-movies/:id" element={<MovieDetail />} />
              <Route path="now-playing/:id" element={<MovieDetail />} />
              <Route path="upcoming-movies/:id" element={<MovieDetail />} />
              <Route path="toprated-movies/:id" element={<MovieDetail />} />
            </Route>

            {/* TV Route */}
            <Route path="tv">
              <Route path=":id" element={<TVShowDetail />} />
              <Route path="trends/movies/:id" element={<TVShowDetail />} />
              <Route path="similar/series/:id" element={<TVShowDetail />} />

              <Route path="similar/:id" element={<TVShowDetail />} />

              {/* genres rolute */}
              <Route path="genres">
                <Route index element={<TVGenre />} />
                <Route path=":genre/:id" element={<TVGenreInfo />} />
                <Route path=":genre/:id/:tvId" element={<TVShowDetail />} />
              </Route>

              {/* see more btns tvshows */}
              <Route path="trends" element={<TrendingShows />} />
              <Route path="popular-movies" element={<PopularShows />} />
              <Route path="airing" element={<AiringToday />} />
              <Route path="on-air" element={<OnAir />} />
              <Route path="toprated" element={<TopRatedShows />} />

              {/* see more buttons movie details */}
              <Route path="trends/movies/:id" element={<TVShowDetail />} />
              <Route path="popular-movies/:id" element={<TVShowDetail />} />
              <Route path="airing/:id" element={<TVShowDetail />} />
              <Route path="on-air/:id" element={<TVShowDetail />} />
              <Route path="toprated/:id" element={<TVShowDetail />} />
            </Route>

            <Route path="search">
              <Route path="movie/:id" element={<MovieDetail />} />
              <Route path="tv/:id" element={<TVShowDetail />} />
            </Route>

            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Route>
        )
      )}
    />
  );
}
