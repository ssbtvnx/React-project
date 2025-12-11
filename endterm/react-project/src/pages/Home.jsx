import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to AnimeApp</h1>
      <p>Discover and bookmark your favorite anime!</p>
      <Link to="/anime-list">Go to Anime List</Link>
    </div>
  );
};

export default Home;
