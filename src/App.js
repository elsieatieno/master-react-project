import React, { useEffect, useState } from 'react';
import SearchIcon from './components/search.svg';
import './components/styles/App.css';
import MovieCard from './components/MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=3285f108';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies('SpiderMan');
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(search)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              year={movie.Year}
              poster={movie.Poster}
              title={movie.Title}
              type={movie.Type}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies</h2>
        </div>
      )}
    </div>
  );
};

export default App;
