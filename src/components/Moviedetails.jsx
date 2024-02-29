import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Castcard from "./Castcard";
import Mediacard from "./Mediacard";
import Moviecard from "./Moviecard";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Moviedetails = () => {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const movieId = id;
  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [mediaCategory, setMediaCategory] = useState("videos");
  const [recommendations, setRecomendations] = useState([]);

  const [imageType, setImageType] = useState("backdrops");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const Key = "77a959649b06d3efe0ba5f50793c06e5";
        const url1 = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${Key}`;
        const url2 = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${Key}&language=en-US`;
        const url3 = `https://api.themoviedb.org/3/movie/${movieId}/${mediaCategory}?api_key=${Key}`;
        const url4 = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${Key}`;
        const url5 = `https://api.themoviedb.org/3/movie/${movieId}/keywords?language=en-US&api_key=${Key}`;
        const res1 = await fetch(url2);
        const result1 = await res1.json();

        const res2 = await fetch(url1);
        const result2 = await res2.json();

        const res3 = await fetch(url3);
        const result3 = await res3.json();

        const res4 = await fetch(url4);
        const result4 = await res4.json();

        console.log(result4.results);

        const res5 = await fetch(url5);
        const result5 = await res5.json();

        // result2.crew.map((crew) => {
        //   if (crew.job === "Director") {
        //     console.log(crew.name);
        //   }
        // });
        setMovie(result1);
        setCast(result2.cast);
        setCrew(result2.crew);

        // setImages(result3);

        if (mediaCategory === "videos") {
          setVideos(result3.results);
          setImages([]);
          // console.log(videos);
        } else if (mediaCategory === "images") {
          setVideos([]);
          if (imageType === "backdrops") {
            setImages(result3.backdrops);
            // console.log(images);
          } else {
            setImages(result3.posters);
            // console.log(images);
          }
        }

        setKeywords(result5.keywords);
        setRecomendations(result4.results);
        setLoading(false);

        // console.log(mediaCategory);
      } catch (err) {
        console.log("Error fetching data..!", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId, mediaCategory, imageType]);

  const runtimeFormatter = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const min = runtime % 60;
    return `${hours}h ${min}m`;
  };

  function changeMediaSlide(index) {
    const slider = document.querySelector(".media-slider");
    const mediaItems = document.querySelectorAll(".click-media");

    const selectedMediaItem = mediaItems[index];
    const offsetLeft = selectedMediaItem.offsetLeft;

    slider.style.transform = `translateX(${offsetLeft}px)`;
    slider.style.width = `${selectedMediaItem.offsetWidth}px`;
  }

  return (
    <div className="details-page">
      {loading ? (
        <ClimbingBoxLoader className="loader" size={15} color="#5b42f3" />
      ) : (
        <>
          <div
            className="indi-details"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
            }}
          >
            <div className="wrapper">
              <div className="movie-img">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                />
                <div className="net-link"></div>
              </div>
              <div className="movie-content">
                <div className="details-div">
                  <marquee>
                    <h2>{movie.title}</h2>
                  </marquee>
                  <p>{movie.tagline && movie.tagline}</p>
                  <p>{movie.release_date && movie.release_date}</p>
                  <div className="genres">
                    {movie.genres &&
                      movie.genres.map((genre, index) => (
                        <p key={genre.id}>
                          {genre.name}
                          {index < movie.genres.length - 1 && <span>,</span>}
                        </p>
                      ))}
                  </div>
                  <p>{runtimeFormatter(movie.runtime)}</p>
                  <p>{movie.overview}</p>
                  <div className="dept">
                    <div>
                      <h6>Director</h6>
                      {crew.find(
                        (crewMember) => crewMember.job === "Director"
                      ) && (
                        <p>
                          {
                            crew.find(
                              (crewMember) => crewMember.job === "Director"
                            ).name
                          }
                        </p>
                      )}
                    </div>
                    <div>
                      <h6>Music</h6>
                      {crew.find(
                        (crewMember) =>
                          crewMember.job === "Original Music Composer"
                      ) ? (
                        <p>
                          {
                            crew.find(
                              (crewMember) =>
                                crewMember.job === "Original Music Composer"
                            ).name
                          }
                        </p>
                      ) : (
                        crew.find(
                          (crewMember) => crewMember.job === "Music"
                        ) && (
                          <p>
                            {
                              crew.find(
                                (crewMember) => crewMember.job === "Music"
                              ).name
                            }
                          </p>
                        )
                      )}
                    </div>
                    <div>
                      <h6>Writer</h6>
                      {crew.find(
                        (crewMember) => crewMember.job === "Writer"
                      ) ? (
                        <p>
                          {
                            crew.find(
                              (crewMember) => crewMember.job === "Writer"
                            ).name
                          }
                        </p>
                      ) : (
                        crew.find(
                          (crewMember) => crewMember.job === "Story"
                        ) && (
                          <p>
                            {
                              crew.find(
                                (crewMember) => crewMember.job === "Story"
                              ).name
                            }
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2 className="cast-heading">Top Cast</h2>
          <div className="wrapper-div">
            <div className="cast-crew">
              <div className="top-cast">
                <div className="casts">
                  {cast.length > 0 ? (
                    cast
                      .filter((person) => person.profile_path)
                      .map((person) => (
                        <Castcard key={person.id} person={person} />
                      ))
                  ) : (
                    <p>No cast information available.</p>
                  )}
                  <div className="invisible">s</div>
                </div>
              </div>

              <div className="movie-media">
                <ul>
                  <div>
                    <h3>Media</h3>
                  </div>
                  <div
                    className="click-media"
                    onClick={() => {
                      setMediaCategory("videos");
                      changeMediaSlide(0);
                    }}
                  >
                    Videos
                  </div>
                  <div
                    className="click-media"
                    onClick={() => {
                      setMediaCategory("images");
                      setImageType("backdrops");
                      changeMediaSlide(1);
                    }}
                  >
                    Backdrops
                  </div>
                  <div
                    className="click-media"
                    onClick={() => {
                      setMediaCategory("images");
                      setImageType("posters");
                      changeMediaSlide(2);
                    }}
                  >
                    Posters
                  </div>
                  <div className="media-slider"></div>
                </ul>
                <div className="media-result">
                  {videos && videos.length > 0
                    ? videos
                        .filter((video) => video.site === "YouTube")
                        .map((video) => (
                          <Mediacard key={video.id} video={video} />
                        ))
                    : images &&
                      images.map((image) => (
                        <Mediacard
                          key={image.file_path}
                          image={image}
                          imageType={imageType}
                        />
                      ))}
                </div>
              </div>
            </div>
            <div className="more-details">
              <div>
                <h6>Original Title</h6>
                <p>{movie.original_title && movie.original_title}</p>
              </div>
              <div>
                <h6>Status</h6>
                <p>{movie.status && movie.status}</p>
              </div>
              <div>
                <h6>Original Language</h6>
                <p>{movie.original_language && movie.original_language}</p>
              </div>
              <div>
                <h6>Budget</h6>
                <p>
                  $
                  {movie.budget &&
                    movie.budget.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                </p>
              </div>
              <div>
                <h6>Revenue</h6>
                <p>
                  $
                  {movie.revenue &&
                    movie.revenue.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                </p>
              </div>
              <div id="keywords-div">
                <h6>Keywords</h6>
                {keywords.length > 0 ? (
                  keywords.map((word) => <li key={word.id}>{word.name}</li>)
                ) : (
                  <p className="no-keywords">no keywords found</p>
                )}
              </div>
            </div>
          </div>
          <h2 className="heading-recommendations">Similar Movies</h2>
          <div className="recommendations">
            {recommendations.length > 0 ? (
              recommendations
                .filter((movie) => movie.poster_path)
                .map((movie) => (
                  <Link to={`/movie/${movie.id}`} key={movie.id}>
                    <Moviecard {...movie} />
                  </Link>
                ))
            ) : (
              <p>No Recommendations</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Moviedetails;
