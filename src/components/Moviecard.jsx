import React from "react";

const Moviecard = (movie) => {
  return (
    <div className="card" style={{ width: "10rem" }}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text">{movie.release_date}</p>
        <p className="card-text">{movie.overview}</p>
      </div>
    </div>
  );
};

export default Moviecard;