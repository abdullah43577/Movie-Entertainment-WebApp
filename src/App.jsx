import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';

// components/pages
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import Movies from './components/pages/movies';
import TV from './components/pages/TV';
import MovieDetail from './components/pages/Movie-Detail';

// components/layouts
import RootLayout from './components/layouts/RootLayout';
import TrendsLayout from './components/layouts/TrendsLayout';
import PopularLayout from './components/layouts/PopularMoviesLayout';
import NowPlayingMoviesLayout from './components/layouts/NowPlayingMoviesLayout';
import TopRatedMoviesLayout from './components/layouts/TopRatedMoviesLayout';
import UpcomingMoviesLayout from './components/layouts/UpComingMoviesLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* homepage navigation links */}
      <Route index element={<Home />} />
      <Route path="movies" element={<Movies />} />
      <Route path="tv-shows" element={<TV />} />

      {/* movie details path :id - changing path URL but rendering same page*/}
      <Route path="movie-detail" element={<MovieDetail />} />

      {/* see more btns */}
      <Route path="movie-trends" element={<TrendsLayout />} />
      <Route path="popular-movies" element={<PopularLayout />} />
      <Route path="now-playing" element={<NowPlayingMoviesLayout />} />
      <Route path="upcoming-movies" element={<UpcomingMoviesLayout />} />
      <Route path="toprated-movies" element={<TopRatedMoviesLayout />} />

      {/* Custom 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
