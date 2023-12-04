const { VITE_API_SERVER } = import.meta.env;

// check to see if the user is still logged in
export const useCheckToken = async function () {
  try {
    // get token from localStorage
    const { user_token } = localStorage;
    const formattedToken = user_token?.replace(/['"]+/g, "");

    if (!user_token) return false;

    const checkToken = await fetch(`${VITE_API_SERVER}/checkToken`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${formattedToken}`,
      },
    });

    const data = await checkToken.json();

    if (data.error) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
  }
};
