import React, { useEffect } from 'react'
import MovieListing from '../MovieListing/MovieListing';
import { APIkey } from '../../common/apis/MovieApiKey';
import movieApi from '../../common/apis/movieApi';
import { useDispatch } from 'react-redux';
import { addMovies } from '../../features/movies/movieSlice';

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

  //Method 1 - Making the call using axios -
  useEffect(() => {
    const fetchMovies = async() => {
      const searchTerm = 'Batman';
      const type = 'movie';

      // Method 1 of using the axios get call, and it is similar to the Method 2 of axios call -
      const response = await movieApi
        .get(`?apikey=${APIkey}&type=${type}&s=${searchTerm}`)
        .catch((error)=>{console.log(error)});      

      // Method 2 -
      // const response = await axios.get(`https://www.omdbapi.com?apikey=${APIkey}&type=${type}&s=${searchTerm}`);
      // console.log(response.data);
      dispatch(addMovies(response.data));
    }
    fetchMovies();
    //eslint-disable-next-line
  }, [])

  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  )
}