import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = ({ setCategory, setSearchQuery }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const placeholders = [
    "ex: Kalki 2898 AD",
    "ex: Salaar",
    "ex: Avengers",
    "ex: Bahubali",
    "ex: Avatar",
    "ex: Spirit",
  ];
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex(
        (prevIndex) => (prevIndex + 1) % placeholders.length
      );
    }, 2000); // Change placeholder every second

    return () => clearInterval(interval);
  }, [placeholders.length]);

  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  const handleInput = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      setCategory("searched");
      navigate(`/search/${query}`);
    }
  };

  function changeSlide(index) {
    const slider = document.querySelector(".slider");
    const navItems = document.querySelectorAll(".nav-link");

    const selectedNavItem = navItems[index];
    const offsetLeft = Array.from(navItems).reduce((acc, navItem, i) => {
      if (i < index) {
        acc += navItem.getBoundingClientRect().width;
      }
      return acc;
    }, 0);

    slider.style.transform = `translateX(${offsetLeft}px)`;
    slider.style.width = `${selectedNavItem.getBoundingClientRect().width}px`;
  }

  return (
    <div className="navbar-div">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top navbar-light">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            onClick={() => handleCategoryClick("now_playing")}
            style={{
              background:
                "linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Moovy
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link
                className="nav-link"
                to="/now_playing"
                onClick={() => {
                  handleCategoryClick("now_playing");
                  changeSlide(0);
                }}
              >
                Now Playing
              </Link>
              <Link
                className="nav-link"
                to="/popular"
                onClick={() => {
                  handleCategoryClick("popular");
                  changeSlide(1);
                }}
              >
                Popular
              </Link>
              <Link
                className="nav-link"
                to="/top_rated"
                onClick={() => {
                  handleCategoryClick("top_rated");
                  changeSlide(2);
                }}
              >
                Top Rated
              </Link>
              <Link
                className="nav-link"
                to="/upcoming"
                onClick={() => {
                  handleCategoryClick("upcoming");
                  changeSlide(3);
                }}
              >
                Upcoming
              </Link>
              <div class="slider"></div>
            </div>
          </div>
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2 bg-dark"
              type="search"
              placeholder={placeholders[currentPlaceholderIndex]}
              aria-label="Search"
              value={query}
              onChange={(e) => handleInput(e)}
            />
            <button
              className="btn btn-outline-success"
              id="submit-btn"
              type="submit"
              style={{
                background:
                  "linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb)",
                color: "black",
                transition: "all .3s ease-in-out",
              }}
              onMouseOver={() => {
                // Change the text color to white when hovered
                document.getElementById("submit-btn").style.color = "white";
                document.getElementById("submit-btn").style.background =
                  "linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb)";
              }}
              onMouseOut={() => {
                // Change the text color back to black when not hovered
                document.getElementById("submit-btn").style.color = "black";
                document.getElementById("submit-btn").style.background =
                  "linear-gradient(144deg, #00ddeb, #af40ff, #5b42f3 50%)";
              }}
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
