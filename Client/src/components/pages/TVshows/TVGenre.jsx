import { useState, useEffect } from "react";
import { API_KEY, getData } from "../../helper/helperModules";
import { Link } from "react-router-dom";
import { SERVER } from "../../helper/helperModules";
import { useNavigate } from "react-router-dom";

export default function TVGenre() {
  const [tvGenre, setTVGenre] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    // check the validity of jsonwebtoken
    async function checkToken() {
      try {
        // check if the token is valid
        const { user_token } = localStorage;
        console.log(user_token);
        const formatedToken = user_token?.replace(/['"]+/g, "");

        const res = await fetch(`${SERVER}/checkToken`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${formatedToken}`,
          },
          credentials: "include",
        });

        const data = await res.json();
        console.log(data);
        if (data.error) nav("/login");
      } catch (err) {
        console.log(err);
      }
    }

    checkToken();
  }, []);

  useEffect(() => {
    const getTVGenre = async () => {
      const data = await getData(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
      );
      setTVGenre(data.genres);
    };

    getTVGenre();
  }, []);

  const TVGenresArr = tvGenre?.map((genre) => {
    return (
      <Link
        to={`${genre.name}/${genre.id}`}
        key={genre.id}
        id={genre.id}
        className="rounded-lg"
      >
        <div className="flex h-[150px] items-center justify-center px-2 text-center font-bold lg:text-xl">
          {genre.name}
        </div>
      </Link>
    );
  });

  return <div className="tvGenreContainer">{TVGenresArr}</div>;
}
