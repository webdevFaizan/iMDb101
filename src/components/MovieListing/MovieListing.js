import React from 'react'
import { useSelector } from 'react-redux'
import { getAllMovies,getAllSeries } from '../../features/movies/movieSlice';
import MovieCard from '../MovieCard/MovieCard'
import './MovieListing.scss'
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import {Carousel} from 'react-responsive-carousel';
// import Carousel from 'react-elastic-carousel'
// import ReactSimplyCarousel from 'react-simply-carousel';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import settings  from '../../common/settings.js';

// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';

// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';

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
    series.Search.map((movie, index) => {
        return (<MovieCard data-index={index} key={index} data={movie}/>)
      }
    )
  ):(
    <div className="movies-error">
      <h3>{series.Error}</h3>
    </div>
  );

  // const responsive = {}
  console.log(movies);
  return (
    <div className="movie-wrapper">
      <div className="movie-list">
          <h2>Movies</h2>
          <div className="movie-container">
            <div className="movie-inner-container">
              {/* <Carousel axis='horizontal' autoPlay='true' centerSlidePercentage={3} infiniteLoop={true} interval={5000}> */}
              {/* There were a lot of packages for the addition of carousel in this page but none of them could be customised like the react-slick */}
                <Slider {...settings}>
                  {/* <ReactSimplyCarousel itemsToShow={1} itemsToScroll={1} offsetWidth={499}> */}
                  {/* <Carousel responsive={responsive}> */}
                    {renderMovies}
                    <div className='extra-component'>fafd</div>
                    {/* IMPORTANT & BUG : Before the usage of this last div element, the renderMovies was still containing state, but it was not able to be rendered on the UI, this is why through experimentation, when I added this div element, it could not render the whole div element. */}
                  {/* </ReactSimplyCarousel> */}
                </Slider>
                  {/* </Carousel> */}
              {/* </Carousel> */}
            </div>  
          </div>
      </div>
      <div className="show-list">
        <h2>Shows</h2>
        <div className="movie-container">
          <div className="movie-inner-container">
            <Slider {...settings}>
              {renderShows}
              <div className='extra-component'>fafd</div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  )
}
