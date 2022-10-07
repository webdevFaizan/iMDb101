import React, { useEffect } from 'react'
import MovieListing from '../MovieListing/MovieListing';

import { useDispatch } from 'react-redux';
import { fetchAsyncMovies,fetchAsyncShows,removeAllMovieAndShows } from '../../features/movies/movieSlice';

export default function Home(props){

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
    var searchTerm = props.term;
    if(!searchTerm){
      searchTerm = 'Harry'
    }
    // console.log(props.term)
    //IMPORTANT : The search term is being defined as props.term which simply means that if I click on the back button in the navation bar of the browser, when the website comes from the movieDetail page to the home page, the term will still remain the same as old one, which means if I went to the batman movie detail page, and then searched for harry potter, now if I click back button, I will go to harry not batman page. This is becasue the global state of term variable is still the same as 'harry' no matter how many times I click back. This is why I think the navigation should not be taken in such a manner using react, it should have been done by some other way.
    dispatch(fetchAsyncMovies(searchTerm));   //Asynchronous action-creator will call the data asynchronously.
    dispatch(fetchAsyncShows(searchTerm));   //Asynchronous action-creator will call the data asynchronously.
    return()=>{
      dispatch(removeAllMovieAndShows());   //This delete function is added so that we could easily add the loading bar in the page when new movies are being loaded.
    }
  }, [dispatch,props.term])
  // IMPORTANT : I am now tracking the props.term variable, which means when the value of the props.term variable changes in the search bar, there will be an api call. But this has been handled using the debouncing in the useEffect hook of the Header component, only after a certain time there will be an api call.

  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  )
}