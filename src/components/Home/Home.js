import React, { useEffect } from 'react'
import MovieListing from '../MovieListing/MovieListing';

import { useDispatch } from 'react-redux';
import { fetchAsyncMovies,fetchAsyncShows } from '../../features/movies/movieSlice';

export default function Home(){

  const dispatch = useDispatch();

  //Method 1 - In this useEffect I was trying to use the fetch api to make a http request.
  // useEffect(()=>{
  //   const fetchMovies= async()=>{
  //     const searchTerm ='Batman';
  //     const type = 'movie'
  //     const url = `http://www.omdbapi.com/?apikey=${APIkey}&type=${type}&s=${searchTerm}`;
  //     let data = await fetch(url);
  //     let jsonData = await data.json();
  //     console.log(jsonData);
  //   }
  //   fetchMovies();
  // },[])

  //Method 2 - Making the call using axios -
  // useEffect(() => {
  //   const fetchMovies = async() => {
  //     const searchTerm = 'Batman';
  //     const type = 'movie';

  //     // Method 1 of using the axios get call, and it is similar to the Method 2 of axios call -
  //     const response = await movieApi
  //       .get(`?apikey=${APIkey}&type=${type}&s=${searchTerm}`)
  //       .catch((error)=>{console.log(error)});      

  //     // Method 2 -
  //     // const response = await axios.get(`https://www.omdbapi.com?apikey=${APIkey}&type=${type}&s=${searchTerm}`);
  //     // console.log(response.data);
  //     dispatch(addMovies(response.data));    //IMPORTANT : This method 2 is taking the fetch call asynchronously but it sending the data after that in a synchronous manner, in the method 3, we are going to use the redux-thunk, which will not dispatch the method synchronously, but instead it will dispath first, then in the action creator, the async function will be called which means action-creator is being called asynchronously.
  //   }
  //   fetchMovies();
  //   //eslint-disable-next-line
  // }, [])

// Method 3 - Calling the useEffect() method using asyncThunk
  useEffect(() => {
    dispatch(fetchAsyncMovies());   //Asynchronous action-creator will call the data asynchronously.
    dispatch(fetchAsyncShows());   //Asynchronous action-creator will call the data asynchronously.
  }, [dispatch])

  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  )
}