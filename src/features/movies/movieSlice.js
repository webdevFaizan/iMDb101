// IMPORTANT : While using @reactjs/toolkit we are not adding all the action-creator dispather and the reducer into one file so that it remains more managable. In the case of normal redux stores, we use the action-creator and the reducer and dispatcher independently so that the whole folder structure is dividied into smaller parts.
import { APIkey } from '../../common/apis/MovieApiKey';
import movieApi from '../../common/apis/movieApi';

import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// CreateAsyncThunk will help us in calling the action creator is an asynchronous manner. Till now we were calling the action creator in a synchronoum manner.

export const fetchAsyncMovies = createAsyncThunk(
    'movies/fetchAsyncMovies',  //This is the naming convention, movies comes from the createSlice method and /fetchAsyncMovies is the name of the current function.
    async ()=>{     //The second parameter is async in nature.
        const searchTerm = 'Batman';
        const type = 'movie';
        const response = await movieApi
        .get(`?apikey=${APIkey}&type=${type}&s=${searchTerm}`)
        .catch((error)=>{console.log(error)});
        return response.data;   //Here we used the dispatch method, but instead we are now using return response.data
    }
)

const initialState = {
    movies : {}
}

const movieSlice = createSlice({
    name : 'movies',
    initialState,
    reducers : {
        // This addMovies is an action creator that will be dispathced to the reducer which will actually alter the state of the store.
        addMovies : (state,{payload}) =>{
            state.movies = payload
            // IMPORTANT : Here there is a difference between the redux and the redux toolkit, in the redux the reudcers could not directly assign the values to the state object as it was immutable, but in redux toolkit the values of the state is mutable, which means we could easily replace the values inside the state. In the reudx toolkit, it uses an internal library to maintain the mutability. In the old redux way we had to destructure the old state object and add the new payload to the object before returning.
        }
    },
    // extraReducers : {}
    // There is an another optional parameter in here, known as the extra reducer, we can read the docs or visit the dipesh malvia video to understand about the extra reudcer. In our project we do not require the use of extra reducer.
    extraReducers : {
        [fetchAsyncMovies.pending] : ()=>{
            console.log('pending');
        },
        [fetchAsyncMovies.fulfilled] : (state, {payload})=>{
            console.log("Fulfilled");
            return {...state, movies : payload};
        },
        [fetchAsyncMovies.rejected] : ()=>{
            console.log('rejected');
        }
    }
});

export const {addMovies} = movieSlice.actions;
export const getAllMovies = (state) =>{return state.movies.movies};
export default movieSlice.reducer;