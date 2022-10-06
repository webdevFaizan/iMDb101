import React from "react";
import { Link } from "react-router-dom";
import './MovieCard.scss';

const MovieCard =(props)=>{
  const {data} = props
  return (
      <div className="card-item">
        <Link to={`/movie/${data.imDb}`}>
          <div className="card-inner">
            <div className="card-top">
              <img src={data.Poster} alt={data.Title} />
            </div>
            <div className="card-bottom">
              <div className="card-info">
                <strong>{data.Title}</strong>
                <p>{data.Year}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
  )
}

export default MovieCard;