import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Moviedetails from "./components/Moviedetails";
import Movieslist from "./components/Movieslist";
import Navbar from "./components/Navbar";

function App() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("now_playing");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const Key = "77a959649b06d3efe0ba5f50793c06e5";
    let url;

    if (category === "searched" && searchQuery.trim() !== " ") {
      url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&page=1&api_key=${Key}`;
    } else {
      url = `https://api.themoviedb.org/3/movie/${category}?page=1&api_key=${Key}`;
    }

    // console.log("Category:", category);
    // console.log("Search Query:", searchQuery);
    // console.log("URL:", url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [category, searchQuery]);

  return (
    <Router>
      <Navbar setCategory={setCategory} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route
          path="/"
          element={<Movieslist movies={movies} category={category} />}
        />
        <Route
          path="/now_playing"
          element={<Movieslist movies={movies} category={category} />}
        />
        <Route
          path="/popular"
          element={<Movieslist movies={movies} category={category} />}
        />
        <Route
          path="/top_rated"
          element={<Movieslist movies={movies} category={category} />}
        />
        <Route
          path="/upcoming"
          element={<Movieslist movies={movies} category={category} />}
        />
        <Route path="/movie/:id" element={<Moviedetails />} />
        <Route
          path="/search/:query"
          element={<Movieslist movies={movies} category="searched" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
