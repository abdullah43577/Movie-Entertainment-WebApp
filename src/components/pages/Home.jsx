import { useLoaderData, Link } from 'react-router-dom';
import movieClip from '../../icons folder/movieClip.svg';
import { API_KEY } from '../helper/API';

export default function Home() {
  const movies = useLoaderData();

  const result = movies?.map((movie) => {
    console.log(movie);
  });

  return (
    <>
      <div className="trends-hd flex items-center justify-between">
        <div className="trend-title flex items-center gap-3">
          <h2 className="text-2xl font-medium text-white lg:text-4xl">Trending</h2>
          <div className="movieTxt-container rounded-lg border-2 border-white px-4 py-[2px] text-xs text-white lg:text-sm">MOVIE</div>
        </div>
        <Link to="movie-trends" className="text-xs uppercase text-btns hover:text-white hover:underline lg:text-sm">
          See more
        </Link>
      </div>

      <div className="trending-movies-container my-8 items-center overflow-x-scroll">
        <Link to="movie-detail">
          <div className="trend-card-element relative h-[250px] cursor-pointer rounded-md bg-nav lg:h-[300px] lg:w-[600px]">
            <div className="info_container absolute bottom-6 left-4 text-white">
              <div className="year-container flex items-center gap-3">
                <p>2023</p>
                <p className="flex items-center gap-1">
                  <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                  <span>Movie</span>
                </p>
              </div>
              <div className="title text-2xl font-medium lg:text-4xl">Uncharted</div>
            </div>
          </div>
        </Link>

        <Link to="movie-detail">
          <div className="trend-card-element relative h-[250px] cursor-pointer rounded-md bg-nav lg:h-[300px] lg:w-[600px]">
            <div className="info_container absolute bottom-6 left-4 text-white">
              <div className="year-container flex items-center gap-3">
                <p>2023</p>
                <p className="flex items-center gap-1">
                  <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                  <span>Movie</span>
                </p>
              </div>
              <div className="title text-2xl font-medium lg:text-4xl">The Batman</div>
            </div>
          </div>
        </Link>

        <Link to="movie-detail">
          <div className="trend-card-element relative h-[250px] cursor-pointer rounded-md bg-nav lg:h-[300px] lg:w-[600px]">
            <div className="info_container absolute bottom-6 left-4 text-white">
              <div className="year-container flex items-center gap-3">
                <p>2023</p>
                <p className="flex items-center gap-1">
                  <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                  <span>Movie</span>
                </p>
              </div>
              <div className="title text-2xl font-medium lg:text-4xl">Jack Reacher</div>
            </div>
          </div>
        </Link>

        <Link to="movie-detail">
          <div className="trend-card-element relative h-[250px] cursor-pointer rounded-md bg-nav lg:h-[300px] lg:w-[600px]">
            <div className="info_container absolute bottom-6 left-4 text-white">
              <div className="year-container flex items-center gap-3">
                <p>2023</p>
                <p className="flex items-center gap-1">
                  <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                  <span>Movie</span>
                </p>
              </div>
              <div className="title text-2xl font-medium lg:text-4xl">Naruto</div>
            </div>
          </div>
        </Link>
      </div>

      {/* popular movies */}
      <div className="trends-hd mt-32 flex items-center justify-between">
        <div className="trend-title flex items-center gap-3">
          <h2 className="text-2xl font-medium text-white lg:text-4xl">Popular</h2>
          <div className="movieTxt-container rounded-lg border-2 border-white px-4 py-[2px] text-xs text-white lg:text-sm">MOVIE</div>
        </div>
        <Link to="popular-movies" className="text-xs uppercase text-btns hover:text-white hover:underline lg:text-sm">
          See more
        </Link>
      </div>

      <div className="movies-container my-8 gap-[1rem] lg:gap-[3rem]">
        <Link to="movie-detail">
          <div className="popular_movies_card_element relative mx-auto h-[250px] w-full rounded-md bg-nav lg:h-[300px]">
            <div className="info_container absolute bottom-6 left-4 text-white">
              <div className="year-container flex items-center gap-3">
                <p>2023</p>
                <p className="flex items-center gap-1">
                  <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                  <span>Movie</span>
                </p>
              </div>
              <div className="title text-2xl font-medium lg:text-4xl">Naruto</div>
            </div>
          </div>
        </Link>

        <Link to="movie-detail">
          <div className="popular_movies_card_element relative mx-auto h-[250px] w-full rounded-md bg-nav lg:h-[300px]">
            <div className="info_container absolute bottom-6 left-4 text-white">
              <div className="year-container flex items-center gap-3">
                <p>2023</p>
                <p className="flex items-center gap-1">
                  <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                  <span>Movie</span>
                </p>
              </div>
              <div className="title text-2xl font-medium lg:text-4xl">Naruto</div>
            </div>
          </div>
        </Link>

        <Link to="movie-detail">
          <div className="popular_movies_card_element relative mx-auto h-[250px] w-full rounded-md bg-nav lg:h-[300px]">
            <div className="info_container absolute bottom-6 left-4 text-white">
              <div className="year-container flex items-center gap-3">
                <p>2023</p>
                <p className="flex items-center gap-1">
                  <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                  <span>Movie</span>
                </p>
              </div>
              <div className="title text-2xl font-medium lg:text-4xl">Naruto</div>
            </div>
          </div>
        </Link>

        <Link to="movie-detail">
          <div className="popular_movies_card_element grid-col-span-4 relative mx-auto h-[250px] w-full rounded-md bg-nav lg:h-[300px]">
            <div className="info_container absolute bottom-6 left-4 text-white">
              <div className="year-container flex items-center gap-3">
                <p>2023</p>
                <p className="flex items-center gap-1">
                  <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                  <span>Movie</span>
                </p>
              </div>
              <div className="title text-2xl font-medium lg:text-4xl">Superman</div>
            </div>
          </div>
        </Link>

        <Link to="movie-detail">
          <div className="popular_movies_card_element relative mx-auto h-[250px] w-full rounded-md bg-nav lg:h-[300px]">
            <div className="info_container absolute bottom-6 left-4 text-white">
              <div className="year-container flex items-center gap-3">
                <p>2023</p>
                <p className="flex items-center gap-1">
                  <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                  <span>Movie</span>
                </p>
              </div>
              <div className="title text-2xl font-medium lg:text-4xl">Boruto</div>
            </div>
          </div>
        </Link>

        <Link to="movie-detail">
          <div className="popular_movies_card_element relative mx-auto h-[250px] w-full rounded-md bg-nav lg:h-[300px]">
            <div className="info_container absolute bottom-6 left-4 text-white">
              <div className="year-container flex items-center gap-3">
                <p>2023</p>
                <p className="flex items-center gap-1">
                  <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                  <span>Movie</span>
                </p>
              </div>
              <div className="title text-2xl font-medium lg:text-4xl">Boruto</div>
            </div>
          </div>
        </Link>

        <Link to="movie-detail">
          <div className="popular_movies_card_element relative mx-auto h-[250px] w-full rounded-md bg-nav lg:h-[300px]">
            <div className="info_container absolute bottom-6 left-4 text-white">
              <div className="year-container flex items-center gap-3">
                <p>2023</p>
                <p className="flex items-center gap-1">
                  <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                  <span>Movie</span>
                </p>
              </div>
              <div className="title text-2xl font-medium lg:text-4xl">Boruto</div>
            </div>
          </div>
        </Link>

        <Link to="movie-detail">
          <div className="popular_movies_card_element grid-col-span-2 relative mx-auto h-[250px] w-full rounded-md bg-nav lg:h-[300px]">
            <div className="info_container absolute bottom-6 left-4 text-white">
              <div className="year-container flex items-center gap-3">
                <p>2023</p>
                <p className="flex items-center gap-1">
                  <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                  <span>Movie</span>
                </p>
              </div>
              <div className="title text-2xl font-medium lg:text-4xl">Call of Duty</div>
            </div>
          </div>
        </Link>

        <Link to="movie-detail">
          <div className="popular_movies_card_element grid-col-span-2 relative mx-auto h-[250px] w-full rounded-md bg-nav lg:h-[300px]">
            <div className="info_container absolute bottom-6 left-4 text-white">
              <div className="year-container flex items-center gap-3">
                <p>2023</p>
                <p className="flex items-center gap-1">
                  <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                  <span>Movie</span>
                </p>
              </div>
              <div className="title text-2xl font-medium lg:text-4xl">Modern Warfare</div>
            </div>
          </div>
        </Link>

        <Link to="movie-detail">
          <div className="popular_movies_card_element grid-col-span-2 relative mx-auto h-[250px] w-full rounded-md bg-nav lg:h-[300px]">
            <div className="info_container absolute bottom-6 left-4 text-white">
              <div className="year-container flex items-center gap-3">
                <p>2023</p>
                <p className="flex items-center gap-1">
                  <img src={movieClip} alt="movie clip element" className="w-4 before:content-['.']" />
                  <span>Movie</span>
                </p>
              </div>
              <div className="title text-2xl font-medium lg:text-4xl">Black Ops III</div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export const MoviesLoader = async () => {
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Jack+Reacher`);

  return res.json();
};
