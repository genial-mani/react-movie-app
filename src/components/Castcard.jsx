import React from "react";

const Castcard = ({ person }) => {
  return (
    <div className="card cast-card" style={{ width: "140px" }}>
      <img
        src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
        className="card-img-top cast-img"
        alt="..."
      />
      <div className="card-body">
        <h6>{person.original_name}</h6>
        <p className="card-text">{person.character}</p>
      </div>
    </div>
  );
};

export default Castcard;
