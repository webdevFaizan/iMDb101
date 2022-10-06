import axios from "axios";

export default axios.create({
  baseURL: "https://www.omdbapi.com",
});
// The reason for separating this base url is very simple, this is going to be used in all the api call, and using axios, this is the exact way by which the baseURL can be separated.
