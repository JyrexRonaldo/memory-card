import { useState, useEffect } from "react";
import "../styles/App.css";
import { Card } from "./Card";

function App() {
  const results = useData("https://rickandmortyapi.com/api/character");
  const [nameArray, setNameArray] = useState([])

  console.log(results);

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

  function hancleClick(e) {
    console.log(e.target.dataset.id)
    const tempArray = [...nameArray, e.target.dataset.id]
    console.log(tempArray)
    setNameArray(tempArray)
    shuffledCards = getShuffledCards(results)

  }

  return (
    <>
      <h1>Memory Card Game</h1>
      <p>
        Remember the order in which you click your card, repeating a click on a
        card resets score
      </p>
      <p>Score:</p>
      <p>Best Score</p>
      <div className="cardSet">{shuffledCards}</div>
    </>
  );
}

export default App;
