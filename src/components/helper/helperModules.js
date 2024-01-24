// export const API_KEY = "d62fd8046c31d61026bd9c50ab82251d";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };

  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const getHours = function (mins) {
  return `${Math.floor(mins / 60)} hrs`;
};

export const getMinutes = function (mins) {
  return `${mins % 60} mins`;
};

// export const SERVER = "http://localhost:8080";
export const SERVER = "https://movie-database-api.onrender.com";
