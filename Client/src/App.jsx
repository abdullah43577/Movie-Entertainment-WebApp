import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useAuth } from "./components/Auth/AuthContext";

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
import Register from "./components/pages/register";
import Login from "./components/pages/Login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function App() {
  const { authenticated } = useAuth();

  // create an AuthRoute for authenticated users
  const AuthRoute = function ({ element }) {
    const navigate = useNavigate();

    useEffect(() => {
      if (!authenticated) {
        navigate("/login");
      }
    }, [authenticated]);

    return authenticated ? element : null;
  };

  const AuthCheck = function ({ element }) {
    const navigate = useNavigate();

    useEffect(() => {
      if (authenticated) {
        navigate("/");
      }
    }, [authenticated]);

    return authenticated ? null : element;
  };

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<RootLayout />}>
            <Route index element={<AuthRoute element={<Home />} />} />
            <Route
              path="register"
              element={<AuthCheck element={<Register />} />}
            />
            <Route path="login" element={<AuthCheck element={<Login />} />} />
            <Route
              path="search"
              element={<AuthRoute element={<SearchResults />} />}
            />

            {/* movies route */}
            <Route path="movies">
              <Route
                path=":id"
                element={<AuthRoute element={<MovieDetail />} />}
              />
              <Route
                path="similar/:id"
                element={<AuthRoute element={<MovieDetail />} />}
              />
              <Route
                path="trends/movies/:id"
                element={<AuthRoute element={<MovieDetail />} />}
              />

              <Route path="genres">
                <Route
                  index
                  element={<AuthRoute element={<MoviesGenre />} />}
                />
                <Route
                  path=":genre/:id"
                  element={<AuthRoute element={<MovieGenreInfo />} />}
                />
                <Route
                  path=":genre/:id/:movieId"
                  element={<AuthRoute element={<MovieDetail />} />}
                />
              </Route>

              {/* see more btns movies */}
              <Route
                path="trends"
                element={<AuthRoute element={<TrendsLayout />} />}
              />
              <Route
                path="popular-movies"
                element={<AuthRoute element={<PopularLayout />} />}
              />
              <Route
                path="now-playing"
                element={<AuthRoute element={<NowPlayingMoviesLayout />} />}
              />
              <Route
                path="upcoming-movies"
                element={<AuthRoute element={<UpcomingMoviesLayout />} />}
              />
              <Route
                path="toprated-movies"
                element={<AuthRoute element={<TopRatedMoviesLayout />} />}
              />

              {/* see more buttons movie details */}
              <Route
                path="trends/movies/:id"
                element={<AuthRoute element={<MovieDetail />} />}
              />
              <Route
                path="popular-movies/:id"
                element={<AuthRoute element={<MovieDetail />} />}
              />
              <Route
                path="now-playing/:id"
                element={<AuthRoute element={<MovieDetail />} />}
              />
              <Route
                path="upcoming-movies/:id"
                element={<AuthRoute element={<MovieDetail />} />}
              />
              <Route
                path="toprated-movies/:id"
                element={<AuthRoute element={<MovieDetail />} />}
              />
            </Route>

            {/* TV Route */}
            <Route path="tv">
              <Route
                path=":id"
                element={<AuthRoute element={<TVShowDetail />} />}
              />
              <Route
                path="trends/movies/:id"
                element={<AuthRoute element={<TVShowDetail />} />}
              />
              <Route
                path="similar/series/:id"
                element={<AuthRoute element={<TVShowDetail />} />}
              />

              <Route
                path="similar/:id"
                element={<AuthRoute element={<TVShowDetail />} />}
              />

              {/* genres rolute */}
              <Route path="genres">
                <Route index element={<AuthRoute element={<TVGenre />} />} />
                <Route
                  path=":genre/:id"
                  element={<AuthRoute element={<TVGenreInfo />} />}
                />
                <Route
                  path=":genre/:id/:tvId"
                  element={<AuthRoute element={<TVShowDetail />} />}
                />
              </Route>

              {/* see more btns tvshows */}
              <Route
                path="trends"
                element={<AuthRoute element={<TrendingShows />} />}
              />
              <Route
                path="popular-movies"
                element={<AuthRoute element={<PopularShows />} />}
              />
              <Route
                path="airing"
                element={<AuthRoute element={<AiringToday />} />}
              />
              <Route
                path="on-air"
                element={<AuthRoute element={<OnAir />} />}
              />
              <Route
                path="toprated"
                element={<AuthRoute element={<TopRatedShows />} />}
              />

              {/* see more buttons movie details */}
              <Route
                path="trends/movies/:id"
                element={<AuthRoute element={<TVShowDetail />} />}
              />
              <Route
                path="popular-movies/:id"
                element={<AuthRoute element={<TVShowDetail />} />}
              />
              <Route
                path="airing/:id"
                element={<AuthRoute element={<TVShowDetail />} />}
              />
              <Route
                path="on-air/:id"
                element={<AuthRoute element={<TVShowDetail />} />}
              />
              <Route
                path="toprated/:id"
                element={<AuthRoute element={<TVShowDetail />} />}
              />
            </Route>

            <Route path="search">
              <Route
                path="movie/:id"
                element={<AuthRoute element={<MovieDetail />} />}
              />
              <Route
                path="tv/:id"
                element={<AuthRoute element={<TVShowDetail />} />}
              />
            </Route>

            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Route>
        )
      )}
    />
  );
}
