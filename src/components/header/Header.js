import React,{useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAsyncMovies, fetchAsyncShows } from "../../features/movies/movieSlice";
import user from "../../images/user.png";
import "./Header.scss";

const Header = (props) => {

  // const [term,setTerm] = useState("");
  var {term, termChangeHandler} = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [t, setT] = useState(term);
  const [id, setID] = useState(232);
  // var id=234;

  const handleOnChange = (e)=>{
    setT(e.target.value); //IMPORTANT : I had to create an extra state variable so that the current value could be tracked, suppose the current value is 'bat' but if we donot use this way of using useEffect to track the current state, then the one place previous value will be considered, which would be 'ba' and we do not want that to be sent for api call since it will give us a wrong result.
  }
  
  const onSubmitHandler = (e)=>{
    e.preventDefault();
    console.log("Inside the box "+term);
    if(term===''){
      alert("Please enter a search term first.");
      return;
    }
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    navigate('/');
    // termChangeHandler('');
  }

  useEffect(()=>{
    // IMPORTANT : I have applied the concept of debouncing here, when the state of t has not been changed for a specified time, then there will be no api call. And once that time expires then there will be an api call. This will limit the rate of the api call and make the page efficient.
    clearTimeout(id);
    setID(setTimeout(()=>{
      termChangeHandler(t);
    },800));
    //eslint-disable-next-line 
  },[t])
  // IMPORTANT : This value t, is now being live tracked, and thus the value is being passed to the useEffect hook live, which in turn changes the original global variable 'term' on time, this is very important so that the api call is made using the correct search term. Api search for 'ba' instead of 'bat' will give bad user experience.

  return (
    <div className="header">
      <Link to="/">
        <div className="logo">iMDb 101</div>
      </Link>
      <div className="search-box">
        <form onSubmit={onSubmitHandler}>
          <input id={'inputField'}type="text" value={t} onChange={handleOnChange}/>
          <button>Search</button>
        </form>
      </div>
      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  );
};

export default Header;
