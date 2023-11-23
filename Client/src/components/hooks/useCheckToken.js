import { useEffect, useState } from "react";
import { SERVER } from "../helper/helperModules";
import { useNavigate } from "react-router-dom";

export const useCheckToken = function () {
  const [pageState, setPageState] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    // check the validity of jsonwebtoken
    async function checkToken() {
      try {
        // check if the token is valid
        const { user_token } = localStorage;
        const formatedToken = user_token?.replace(/['"]+/g, "");

        const res = await fetch(`${SERVER}/checkToken`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${formatedToken}`,
          },
          credentials: "include",
        });

        const data = await res.json();
        if (data.error) {
          nav("/login");
        } else {
          setPageState(true);
        }
      } catch (err) {
        console.log(err);
      }
    }

    checkToken();
  }, []);

  return { pageState };
};
