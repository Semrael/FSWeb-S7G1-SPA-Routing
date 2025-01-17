import React, { useState, useEffect } from "react";
import axios from "axios";

import { Switch, Route, Link } from "react-router-dom";

import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";
import FilmListesi from "./Filmler/FilmListesi";
import Film from "./Filmler/Film";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın
        .then((response) => {
          console.log("Filmler", response.data);
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
          setMovieList(response.data);
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (id) => {
    console.log("saved", id);
    if (saved.find((movie) => movie.id == id)) {
      console.log("Bu film zaten kayıtlı");
    } else {
      const movieToAdd = movieList.find((movie) => movie.id == id);
      setSaved([...saved, movieToAdd]);
    }

    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
  };

  return (
    <div>
      <KaydedilenlerListesi list={[...saved]} />

      <Switch>
        <Route path="/" exact>
          Ana Sayfa
          <FilmListesi movies={movieList} />
        </Route>
        <Route path="/filmler/:id" exact>
          Tek Film <Film kaydet={KaydedilenlerListesineEkle} />
        </Route>
        <Route path="/filmler">
          Filmler listesi
          <FilmListesi movies={movieList} />
        </Route>
      </Switch>
    </div>
  );
}
