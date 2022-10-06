import React, { useEffect } from 'react'
import MovieListing from '../MovieListing/MovieListing';
import { APIkey } from '../../common/apis/MovieApiKey';
import movieApi from '../../common/apis/movieApi';
import axios from 'axios';

export default function Home() {

  // In this useEffect I was trying to use the fetch api to make a http request.
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

  //Making the call using axios -
  useEffect(() => {
    const fetchMovies = async() => {
      const searchTerm = 'Batman';
      const type = 'movie';

      // Method 1 of using the axios get call, and it is similar to the Method 2 of axios call -
      const response = await movieApi
        .get(`?apikey=${APIkey}&type=${type}&s=${searchTerm}`)
        .catch((error)=>{console.log(error)});
      const data = await response.json();

      // Method 2 -
      // const response = await axios.get(`https://www.omdbapi.com?apikey=${APIkey}&type=${type}&s=${searchTerm}`);

      console.log(response.data);
    }
    fetchMovies();
  }, [])


  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  )
}
