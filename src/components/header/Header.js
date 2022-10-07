import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAsyncMovies, fetchAsyncShows } from "../../features/movies/movieSlice";
import user from "../../images/user.png";
import "./Header.scss";

const Header = () => {

  const [term,setTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e)=>{
    // console.log(e);
    setTerm(e.target.value);
    // console.log(term);
  }
  
  const onSubmitHandler = (e)=>{
    e.preventDefault();
    console.log(term);
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    navigate('/');
    setTerm('');
  }

  return (
    <div className="header">
      <Link to="/">
        <div className="logo">Movie App</div>
      </Link>
      <div className="search-box">
        <form onSubmit={onSubmitHandler}>
          <input id={'inputField'}type="text" value={term} onChange={handleOnChange} />
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
