import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import imageLogo from '../../icons folder/logo.svg';
import avatar from '../../icons folder/image-avatar.png';
import searchIcon from '../../icons folder/searchIcon.svg';

export default function RootLayout() {
  const handleSubmit = function (e) {
    e.preventDefault();
  };

  const [inputValue, setInputValue] = useState('');

  const handleInput = function (e) {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleFormSubmission = function () {
    if (!inputValue) return;
    setInputValue('');
  };

  return (
    <main className="container flex h-full w-full flex-col items-start gap-[2rem] p-8 xl:flex-row xl:px-2">
      <nav className="flex w-full items-center justify-between rounded-xl bg-nav p-6 xl:fixed xl:h-[90vh] xl:w-auto xl:flex-col">
        <img src={imageLogo} alt="image logo" />

        <div className="nav_icons flex items-center gap-[2rem] sm:gap-[5rem] xl:flex-col">
          <NavLink to="/">
            <svg className="icon-nav w-[20px] cursor-pointer lg:w-[25px]" fill="#5a6a90" height="auto" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z"></path>
            </svg>
          </NavLink>

          <NavLink to="movies">
            <svg className="icon-nav w-[20px] cursor-pointer lg:w-[25px]" fill="#5a6a90" height="auto" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z"></path>
            </svg>
          </NavLink>

          <NavLink to="tv-shows">
            <svg className="icon-nav w-[20px] cursor-pointer lg:w-[25px]" fill="#5a6a90" height="auto" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z"></path>
            </svg>
          </NavLink>
        </div>
        <div className="user_profile w-[30px] rounded-full border-2 border-white">
          <img src={avatar} alt="avatar img" className="w-full" />
        </div>
      </nav>

      <section className="w-full lg:mt-8 xl:ml-32 xl:max-w-[90%]">
        <form onSubmit={handleSubmit} className="mb-16 flex items-center justify-between">
          <img src={searchIcon} alt="search icon" className="w-[40px]" />
          <input type="text" placeholder="Search for movies or TV series" className="w-full border-b border-btns bg-transparent p-6 text-xl text-white outline-none" name="search" value={inputValue} onChange={handleInput} />
          <button className="ml-4 rounded-md bg-btns px-3 py-4 text-sm text-white hover:bg-white hover:text-btns xl:text-base" onClick={handleFormSubmission}>
            Search
          </button>
        </form>

        <Outlet />
      </section>
    </main>
  );
}
