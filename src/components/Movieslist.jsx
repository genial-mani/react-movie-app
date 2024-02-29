import React, { useEffect, useState } from "react";
import Moviecard from "./Moviecard";
import { Link } from "react-router-dom";
import "../App.css";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Movieslist = ({ movies, category }) => {
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState("");

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
    console.log(category);
    const categories = [
      {
        cat1: "now_playing",
        cat2: "Now Playing",
      },

      {
        cat1: "popular",
        cat2: "Popular",
      },

      {
        cat1: "top_rated",
        cat2: "Top Rated",
      },

      {
        cat1: "upcoming",
        cat2: "Up Coming",
      },
      {
        cat1: "searched",
        cat2: "Searched",
      },
    ];

    categories.forEach((cat) => {
      if (cat.cat1 === category) {
        setValue(cat.cat2);
      }
    });
  }, [category]);

  return (
    <div className="list">
      <h3>{value} Movies</h3>
      {loading ? (
        <ClimbingBoxLoader className="loader" size={15} color="#5b42f3" />
      ) : (
        <ul className="ul">
          {movies
            .filter((movie) => movie.poster_path)
            .map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <Moviecard {...movie} />
              </Link>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Movieslist;
