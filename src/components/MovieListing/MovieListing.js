import React from 'react'
import { useSelector } from 'react-redux'
import { getAllMovies,getAllSeries } from '../../features/movies/movieSlice';
import MovieCard from '../MovieCard/MovieCard'
import './MovieListing.scss'

export default function MovieListing() {
  const movies = useSelector(getAllMovies);
  const series = useSelector(getAllSeries);

  let renderMovies = "";
  let renderShows = "";  
  
  renderMovies = movies.Response ==='True' ? (
    movies.Search.map((movie, index) => (
      <MovieCard key={index} data={movie} />
    ))
  ):(
    <div className="movies-error">
      <h3>{movies.Error}</h3>
    </div>
  );

  renderShows = series.Response ==='True' ? (
    series.Search.map((movie, index) => (
      <MovieCard key={index} data={movie} />
    ))
  ):(
    <div className="movies-error">
      <h3>{series.Error}</h3>
    </div>
  );

  
  // console.log(renderMovies);
  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">{renderMovies}</div>
      </div>
      <div className="show-list">
        <h2>Shows</h2>
        <div className="movie-container">{renderShows}</div>
      </div>
    </div>
  )
}
