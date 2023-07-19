import { createBrowserRouter, RouterProvider } from "react-router-dom";

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "search",
        element: <SearchResults />,
      },

      {
        path: "movies/:id",
        element: <MovieDetail />,
      },

      {
        path: "movies/similar-movie/:id",
        element: <MovieDetail />,
      },

      {
        path: "movies/trends/movies/:id",
        element: <MovieDetail />,
      },

      {
        path: "tv/trends/movies/:id",
        element: <TVShowDetail />,
      },

      {
        path: "tv/:id",
        element: <TVShowDetail />,
      },

      {
        path: "tv/similar/series/:id",
        element: <TVShowDetail />,
      },

      // movie genres
      {
        path: "movies/genres",
        children: [
          {
            index: true,
            element: <MoviesGenre />,
          },

          {
            path: ":genre/:id",
            element: <MovieGenreInfo />,
          },

          {
            path: ":genre/:id/:movieId",
            element: <MovieDetail />,
          },
        ],
      },

      // search routes
      {
        path: "search",
        children: [
          {
            path: "movie/:id",
            element: <MovieDetail />,
          },

          {
            path: "tv/:id",
            element: <TVShowDetail />,
          },
        ],
      },

      // movies name

      {
        path: "movies/:name",
        children: [
          {
            path: ":id",
            element: <MovieDetail />,
          },
        ],
      },

      // tv names

      {
        path: "tv/:name",
        children: [
          {
            path: ":id",
            element: <TVShowDetail />,
          },
        ],
      },

      // TV genres
      {
        path: "tv/genres",
        children: [
          {
            index: true,
            element: <TVGenre />,
          },

          {
            path: ":genre/:id",
            element: <TVGenreInfo />,
          },

          {
            path: ":genre/:id/:tvId",
            element: <TVShowDetail />,
          },
        ],
      },

      // see more btns movies
      {
        path: "movies/trends",
        element: <TrendsLayout />,
      },

      {
        path: "movies/popular-movies",
        element: <PopularLayout />,
      },

      {
        path: "movies/now-playing",
        element: <NowPlayingMoviesLayout />,
      },

      {
        path: "movies/upcoming-movies",
        element: <UpcomingMoviesLayout />,
      },

      {
        path: "movies/toprated-movies",
        element: <TopRatedMoviesLayout />,
      },

      // see more btns tvshows
      {
        path: "tv/trends",
        element: <TrendingShows />,
      },

      {
        path: "tv/popular-movies",
        element: <PopularShows />,
      },

      {
        path: "tv/airing",
        element: <AiringToday />,
      },

      {
        path: "tv/on-air",
        element: <OnAir />,
      },

      {
        path: "tv/toprated",
        element: <TopRatedShows />,
      },

      // custom 404 page
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
