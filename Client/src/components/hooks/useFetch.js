import { useNavigate } from "react-router-dom";
const { VITE_API_TEST_SERVER, VITE_API_LIVE_SERVER } = import.meta.env;

const checkToken = async function () {
  try {
    // check token validity
    const checkToken = await fetch(`${VITE_API_TEST_SERVER}/checkToken`);
    return await checkToken.json();
  } catch (err) {
    console.log(err);
  }
};

export const useFetch = async function (endpoint) {
  try {
    // checks the authenticity of the token
    const tokenRes = checkToken();
    if (tokenRes.error) {
      const nav = useNavigate();
      nav("/login");
      console.log(tokenRes.error);
      return;
    }

    const res = await fetch(endpoint);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};
