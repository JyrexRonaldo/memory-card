import { useState, useEffect } from "react";
import styles from "./App.module.css";
import Card from "../Card/Card.jsx";

function App() {
  const results = useData("https://rickandmortyapi.com/api/character");
  const [nameArray, setNameArray] = useState([])
  const [bestScore, setBestScore] = useState(0)

  function useData(url) {
    const [data, setData] = useState(null);
    useEffect(() => {
      let ignore = false;
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            let dataArray = [];
            for (let i = 0; i < 10; i++) {
              dataArray.push({
                name: json.results[i].name,
                image: json.results[i].image,
              });
            }
            setData(dataArray);
          }
        });
      return () => {
        ignore = true;
      };
    }, [url]);
    return data;
  }

  function getRandomIndex() {
    return Math.floor(Math.random() * 10);
  }

  function getImageOrder() {
    const order = [];
    while (order.length !== 10) {
      const index = getRandomIndex();
      if (order.includes(index)) continue;
      order.push(index);
    }
    return order;
  }

  function getShuffledCards(dataArray) {
    if (dataArray === null) {
      return;
    }
    const cardSet = [];
    const order = getImageOrder();
    for (let i = 0; i < dataArray.length; i++) {
      cardSet[order[i]] = (
        <Card
          key={dataArray[i].name}
          imgUrl={dataArray[i].image}
          imgName={dataArray[i].name}
          clickHandler={hancleClick}
        />
      );
    }
    return cardSet;
  }

  let shuffledCards = getShuffledCards(results)
  let score = nameArray.length

  function hancleClick(e) {
    const tempArray = [...nameArray, e.target.dataset.id]
    setNameArray(tempArray)

    if (nameArray.includes(e.target.dataset.id)) {
      if (bestScore < score) {
        setBestScore(score)
      }
      score = 0
      setNameArray([]) 
    }
    shuffledCards = getShuffledCards(results)
  }


  return (
    <div className={styles.app}>
      <h1>Memory Card Game</h1>
      <p>
        Remember the order in which you click your card, repeating a click on a
        card resets score
      </p>
      <p>Score: {score}</p>
      <p>Best Score: {bestScore}</p>
      <div className={styles.cardSet}>{shuffledCards}</div>
    </div>
  );
}

export default App;
