import React from "react";
import { useHistory } from "react-router-dom";

export default function KaydedilenlerListesi(props) {
  const history = useHistory();
  return (
    <div className="saved-list">
      <h3>Kaydedilen Filmler:</h3>
      {props.list.map((movie) => (
        <span key={movie.id} className="saved-movie">
          {movie.title}
        </span>
      ))}

      <div onClick={() => history.push("/")} className="home-button">
        Anasayfa
      </div>
    </div>
  );
}
