import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { MoviesLoader } from './components/pages/Home';

// components/pages
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import Movies from './components/pages/movies';
import TV from './components/pages/TV';
import MovieDetail from './components/pages/Movie-Detail';

// components/layouts
import RootLayout from './components/layouts/RootLayout';
import TrendsLayout from './components/layouts/TrendsLayout';
import PopularLayout from './components/layouts/PopularLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* change this later to the moviesloader to remove it since it wouldn't work without internet connection and API_KEY */}
      <Route index element={<Home />} loader={MoviesLoader} />
      <Route path="movies" element={<Movies />} />
      <Route path="tv-shows" element={<TV />} />
      <Route path="movie-detail" element={<MovieDetail />} />

      <Route path="movie-trends" element={<TrendsLayout />}></Route>

      <Route path="popular-movies" element={<PopularLayout />}></Route>

      {/* Custom 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
