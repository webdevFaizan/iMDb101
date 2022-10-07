// IMPORTANT : While using @reactjs/toolkit we are not adding all the action-creator dispather and the reducer into one file so that it remains more managable. In the case of normal redux stores, we use the action-creator and the reducer and dispatcher independently so that the whole folder structure is dividied into smaller parts.
import { APIkey } from '../../common/apis/MovieApiKey';
import movieApi from '../../common/apis/movieApi';

import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// CreateAsyncThunk will help us in calling the action creator is an asynchronous manner. Till now we were calling the action creator in a synchronoum manner.

export const fetchAsyncMovies = createAsyncThunk(
    'movies/fetchAsyncMovies',  //This is the naming convention for identifying the async action creator, movies comes from the createSlice method and /fetchAsyncMovies is the name of the current function.
    async ()=>{     //The second parameter is the payload creator async function.
        const searchTerm = 'Justice League';
        const type = 'movie';
        const response = await movieApi
        .get(`?apikey=${APIkey}&type=${type}&s=${searchTerm}`)
        .catch((error)=>{console.log(error)});
        return response.data;   //Here we used the dispatch method, but instead we are now using return response.data
    }
)

export const fetchAsyncShows = createAsyncThunk(
    'movies/fetchAsyncShows',  
    async ()=>{     //The second parameter is the payload creator async function.
        const searchTerm = 'Friends';
        const type = 'series';
        const response = await movieApi
        .get(`?apikey=${APIkey}&type=${type}&s=${searchTerm}`)
        .catch((error)=>{console.log(error)});
        return response.data;   //Here we used the dispatch method, but instead we are now using return response.data
    }
)

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
    'movies/fetchAsyncMovieOrShowDetail',
    async (id) => {        
        const type = 'movie';
        const response = await movieApi.get(`?apiKey=${APIkey}&type=${type}&i=${id}&Plot=full`);
        return response.data;
    }
)


// IMPORTANT : Note, we do not want to remove the movies asynchronously, not does it should take any time, this is why we are moving this  async action creator  to synchronous action creator. 
// export const removeSelectedMovieOrShow = createAsyncThunk(
//     'movies/removeSelectedMovieOrShow',
//     async () => {
//         return {};
//     }
// )

const initialState = {
    movies : {},
    series : {},
    selectMovieOrShow: {},
}

const movieSlice = createSlice({
    name : 'movies',
    initialState,
    reducers : {
        // This addMovies is an action creator that will be dispathced to the reducer which will actually alter the state of the store.
        addMovies : (state,{payload}) =>{           //IMPORTANT : Initially when we created this app, this addMovies was a part of synchornous action-creator, but later we changed to async action creator, so this being here is kind of useless.
            state.movies = payload
            // IMPORTANT : Here there is a difference between the redux and the redux toolkit, in the redux the reudcers could not directly assign the values to the state object as it was immutable, but in redux toolkit the values of the state is mutable, which means we could easily replace the values inside the state. In the reudx toolkit, it uses an internal library to maintain the mutability. In the old redux way we had to destructure the old state object and add the new payload to the object before returning.
        },
        removeSelectedMovieOrShow : (state)=>{
            // state.movies = state.movies;
            state.selectMovieOrShow={};     //This is the inbuilt functionality of the redux toolkit that I am able to change the state of the variable in a mutable manner, this however is not possible in the case of normal react redux.
        }

    },
    // extraReducers : {}
    // There is an another optional parameter in here, known as the extra reducer, we can read the docs or visit the dipesh malvia video to understand about the extra reudcer. In our project we do not require the use of extra reducer.
    extraReducers : {    //IMPORTANT : This extraReducers method will have the lifecycle methods of the async action creator, which simply means that in an async life cycle, when the state of the action-creator is in pending state, it will be added here, when it is in the fulfilled state it will be added here and so on.
        [fetchAsyncMovies.pending] : ()=>{
            console.log('pending');
        },
        [fetchAsyncMovies.fulfilled] : (state, {payload})=>{
            console.log("Fulfilled");
            return {...state, movies : payload};    //This is the traditional way of updating the state of the store, which also shows that the state of the store is still immutable, only in the reducer : {} object, this was kept mutable that too through handling internally but redux.
        },
        [fetchAsyncMovies.rejected] : ()=>{
            console.log('rejected');
        },
        [fetchAsyncShows.pending] : ()=>{
            console.log('pending');
        },
        [fetchAsyncShows.fulfilled] : (state, {payload})=>{
            console.log("Fulfilled");
            return {...state, series : payload};    //This is the traditional way of updating the state of the store, which also shows that the state of the store is still immutable, only in the reducer : {} object, this was kept mutable that too through handling internally but redux.
        },
        [fetchAsyncShows.rejected] : ()=>{
            console.log('rejected');
        },
        [fetchAsyncMovieOrShowDetail.fulfilled] : (state, {payload})=>{
            console.log("Fulfilled");
            return {...state, selectMovieOrShow : payload};
        }
    }
});

export const {removeSelectedMovieOrShow} = movieSlice.actions;
// We have state.movies..... here the movies represent the name of the Slice. We could have given any different name as per our requirement, but this suited best.
export const getAllMovies = (state) =>{console.log(state.movies.movies); return state.movies.movies};
export const getAllSeries = (state) =>{return state.movies.series};
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;