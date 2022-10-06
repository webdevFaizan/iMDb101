import React from 'react';
import { useParams } from 'react-router-dom';


export default function MovieDetail() {
    const param = useParams();
    console.log(param);
  return (
    <div>
      MovieDetail{param.imdbID}
    </div>
  )
}
