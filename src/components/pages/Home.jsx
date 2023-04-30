// import { useLoaderData, Link } from 'react-router-dom';
import searchIcon from '../../icons folder/searchIcon.svg';

export default function Home() {
  // const movies = useLoaderData();

  // Apart from the prototype you're working with, do this:
  // todo: 1) Add a download btn on the info page for each movie
  // todo: 2) change the scroll bar to a custom one for the page

  const handleSubmit = function (e) {
    e.preventDefault();
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit} className="flex items-center justify-between">
        <img src={searchIcon} alt="search icon" className="w-[40px]" />
        <input type="text" placeholder="Search for movies or TV series" className="w-full border-none bg-transparent p-6 text-2xl text-white outline-none" />
        <button className="bg-btns px-3 py-4 text-sm text-white">Search</button>
      </form>

      <div className="trends-hd">
        <div className="trend-title">
          <h2>Trending</h2>
          <div className="movieTxt-container rounded-3xl border-2 border-white text-sm text-white">MOVIE</div>
        </div>
        <a href="#">See more</a>
      </div>

      <div className="trending-movies-container">
        <div className="trend-card-element">
          <img src="" alt="" />
          <div className="year-container">
            <p>2023</p>
            <p className="flex items-center gap-4">
              <img src="" alt="" className="before:content-['.']" />
              Movie
            </p>
          </div>
          <div className="title">Peter Pan & Wendy</div>
        </div>
      </div>
    </>
  );
}

// loader function (using this instead of useEffect hook)
// export const moviesLoader = async () => {
//   const res = await fetch('https://www.google.com');

//   return res.json();
// };
