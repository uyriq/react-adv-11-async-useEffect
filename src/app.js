import React, { useState } from "react";
//useState для функционального компонента

import styles from "./styles.module.css";

const Film = ({ data }) => {
  const image = (
    <img
      src={
        data.image
          ? `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`
          : "https://via.placeholder.com/250x150"
      }
      alt={data.nameRU}
    />
  );
  return (
    <div>
      <div className={styles.img}>{image}</div>
      <p className={styles.name}>{data.nameRU}</p>
      <p className={styles.description}>{`${data.year}, ${data.country}`}</p>
      <p className={styles.description}>{`${data.duration} мин.`}</p>
    </div>
  );
};

const App = (props) => {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  //didMount
  useEffect(() => {
    const  getFilms = async () => {
      setState({ ...state, hasError: false, isLoading: true });
      fetch("https://api.nomoreparties.co/beatfilm-movies")
        .then((res) => res.json())
        .then((data) => setState({ ...state, data, isLoading: false }))
        .catch((e) => {
          setState({ ...state, hasError: true, isLoading: false });
        });
    };
    
    getFilms();

  }, []);

  const { data, isLoading, hasError } = state;

  return (
    <div className={`${styles.app} ${styles.grid}`}>
      {isLoading && "Загрузка..."}
      {hasError && "Произошла ошибка"}
      {!isLoading &&
        !hasError &&
        data.length &&
        data.map((film, index) => <Film key={index} data={film} />)}
    </div>
  );
};

export default App;
