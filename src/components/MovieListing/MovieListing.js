import React from 'react'
import { useSelector } from 'react-redux'
import { getAllMovies,getAllSeries } from '../../features/movies/movieSlice';
import MovieCard from '../MovieCard/MovieCard'
import './MovieListing.scss'
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import {Carousel} from 'react-responsive-carousel';
// import Carousel from 'react-elastic-carousel'
// import ReactSimplyCarousel from 'react-simply-carousel';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
// import settings  from '../../common/settings.js';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function MovieListing() {
  const movies = useSelector(getAllMovies);
  const series = useSelector(getAllSeries);

  let renderMovies = "";
  let renderShows = "";   
  
  renderMovies = movies.Response ==='True' ? (
    movies.Search.map((movie, index) => {
      return (<MovieCard key={index} data={movie} />)
    })
  ):(
    <div className="movies-error">
      <h3>{movies.Error}</h3>
    </div>
  );

  renderShows = series.Response ==='True' ? (
    series.Search.map((movie, index) => (
      <MovieCard data-index={index} key={index} data={movie} />
    ))
  ):(
    <div className="movies-error">
      <h3>{series.Error}</h3>
    </div>
  );

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">
          <div className="movie-inner-container">
            <Carousel itemsToShow={1}>
            {/* <ReactSimplyCarousel itemsToShow={1} itemsToScroll={1} offsetWidth={499}> */}
            {/* <Slider {...settings}> */}
              {renderMovies}
            {/* </Slider> */}
            {/* </ReactSimplyCarousel> */}
            </Carousel>
          </div>  
        </div>
      </div>
      <div className="show-list">
        <h2>Shows</h2>
        <div className="movie-container">
          {/* <Slider {...settings}> */}
            {renderShows}
          {/* </Slider> */}
        </div>
      </div>
    </div>
  )
}
