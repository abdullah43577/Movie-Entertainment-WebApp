import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';

// components/pages
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import MoviesGenre from './components/pages/MoviesGenre';
import TVGenre from './components/pages/TVGenre';
import MovieDetail from './components/pages/Movie-Detail';
import TVShowDetail from './components/pages/TVShowDetail';

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
      <Route path="movies/genres" element={<MoviesGenre />} />
      <Route path="tv-shows/genres" element={<TVGenre />} />

      <Route path="movies/:id" element={<MovieDetail />} />
      <Route path="tv-shows/:id" element={<TVShowDetail />} />

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
