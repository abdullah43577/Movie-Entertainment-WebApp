import { useState, useEffect, Fragment } from "react";

export default function Rating({ voteAvg }) {
  const max_rating = 5;
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const rating = (voteAvg / 2).toFixed(1);
    const wholeNumberRating = Math.floor(rating);
    const fractionalPart = rating.slice(-1);
    const updatedStars = [];

    for (let i = 1; i <= max_rating; i++) {
      const starClassName =
        i <= wholeNumberRating ? "starActive" : "starNotActive";

      updatedStars.push(
        <i className={`fa-solid fa-star ${starClassName} fa-sm`}></i>
      );
    }

    if (fractionalPart >= 5) {
      updatedStars[wholeNumberRating] = (
        <i className="fa-solid fa-star-half-stroke starActive fa-sm"></i>
      );
    }

    setStars(updatedStars);
  }, [voteAvg]);

  return (
    <div className="stars flex items-center">
      {stars.map((star, i) => (
        <Fragment key={i}>{star}</Fragment>
      ))}
    </div>
  );
}
