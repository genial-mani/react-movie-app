import React from "react";

const Mediacard = ({ video, image, imageType }) => {
  if (video) {
    return (
      <iframe
        title={video.name}
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${video.key}`}
        allowFullScreen
      ></iframe>
    );
  } else {
    if (imageType === "posters") {
      return (
        <img
        className="media-img"
          src={`https://image.tmdb.org/t/p/original${image.file_path}`}
          alt="Movie Poster"
          style={{ width: "200px", height: "315px" }}
        />
      );
    } else {
      return (
        <img
        className="media-img"
          src={`https://image.tmdb.org/t/p/original${image.file_path}`}
          alt="Movie Poster"
          style={{ width: "550px", height: "315px" }}
        />
      );
    }
  }
};

export default Mediacard;
