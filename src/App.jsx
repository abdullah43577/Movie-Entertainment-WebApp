import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';

// components/pages
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import MoviesGenre from './components/pages/MoviesGenre';
import TVGenre from './components/pages/TVGenre';
import MovieDetail from './components/pages/MovieDetail';
import TVShowDetail from './components/pages/TVShowDetail';
import MovieGenreInfo from './components/pages/MovieGenreInfo';
import TVGenreInfo from './components/pages/TVGenreInfo';

// components/layouts/movies
import RootLayout from './components/layouts/RootLayout';
import TrendsLayout from './components/layouts/movies/TrendsLayout';
import PopularLayout from './components/layouts/movies/PopularMoviesLayout';
import NowPlayingMoviesLayout from './components/layouts/movies/NowPlayingMoviesLayout';
import TopRatedMoviesLayout from './components/layouts/movies/TopRatedMoviesLayout';
import UpcomingMoviesLayout from './components/layouts/movies/UpComingMoviesLayout';

// components/layouts/TVshows

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* homepage navigation links */}
      <Route index element={<Home />} />

      <Route path="movies/:id" element={<MovieDetail />} />
      <Route path="tv/:id" element={<TVShowDetail />} />

      <Route path="movies/genres">
        <Route index element={<MoviesGenre />} />
        <Route path=":genre/:id" element={<MovieGenreInfo />} />
        <Route path=":genre/:id/:movieId" element={<MovieDetail />} />
      </Route>

      <Route path="tv/genres">
        <Route index element={<TVGenre />} />
        <Route path=":genre/:id" element={<TVGenreInfo />} />
        <Route path=":genre/:id/:tvId" element={<TVShowDetail />} />
      </Route>

      {/* <Route path="tv-shows/genres" element={<TVGenre />} /> */}

      {/* see more btns */}
      <Route path="movies/trends" element={<TrendsLayout />} />
      <Route path="movies/popular-movies" element={<PopularLayout />} />
      <Route path="movies/now-playing" element={<NowPlayingMoviesLayout />} />
      <Route path="movies/upcoming-movies" element={<UpcomingMoviesLayout />} />
      <Route path="movies/toprated-movies" element={<TopRatedMoviesLayout />} />

      {/* Custom 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
