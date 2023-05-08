/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

export default function Rating({ voteAvg }) {
  const [rating, setRating] = useState((voteAvg / 2).toFixed(1));
  const [wholeNumberRating, setWholeNumberRating] = useState(Math.floor(rating));
  const [fractionalPart, setFractionalPart] = useState(rating.slice(-1));
  const [stars, setStars] = useState([]);
  const max_rating = 5;

  useEffect(() => {
    const updatedStars = [];

    for (let i = 1; i < max_rating; i++) {
      const starClassName = i <= wholeNumberRating ? 'starActive' : 'starNotActive';

      updatedStars.push(
        <svg className={starClassName} key={i} stroke="currentColor" fill="#171e31" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
        </svg>
      );
    }

    if (fractionalPart >= 5) {
      updatedStars[wholeNumberRating] = (
        <svg className="starActive" stroke="currentColor" fill="#171e31" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M136.3 497.2c-3.7 0-7.3-1.3-10.2-3.9L0 328.9c-7.1-6.6-6.3-17.7 1.8-23.3l106.6-78.5L64 78.3C62 70.5 66.7 62 74.8 59.9l125.6-31.4c7.9-2 16.2 3.2 18.2 11.2l29.7 118.8 118.8 29.7c8 2 13.2 10.3 11.2 18.2l-31.4 125.6c-2 8-10.5 12.7-18.5 10.7l-125.6-31.4L69.1 477.5c-2.4 3.4-5.9 5.6-9.5 6.2-1.1.2-2.3.3-3.5.3z"></path>
        </svg>
      );
    }

    setStars(updatedStars);
  }, [wholeNumberRating, fractionalPart]);

  return <div className="stars flex items-center">{stars.map((star) => star)}</div>;
}
