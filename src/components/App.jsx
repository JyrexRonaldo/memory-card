import { useState, useEffect } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "../styles/App.css";
import { Card } from "./Card";

function App() {
  // const [imgDataArray, setImgDataArray] = useState([]);
  // const [imageCardSet, setImageCardSet] = useState([]);
  // const [trigger, setTrigger] = useState(0);
  const results = useData("https://rickandmortyapi.com/api/character");

  console.log(results)

  function useData(url) {
    const [data, setData] = useState(null);
    useEffect(() => {
      let ignore = false;
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {

            let dataArray = []
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
      return
    }
    const cardSet = [];
    const order = getImageOrder();
    for (let i = 0; i < dataArray.length; i++) {
      // cardSet[order[i]] = dataArray[i]getShuffledCards
      cardSet[order[i]] = (
        <Card
          key={dataArray[i].name}
          imgUrl={dataArray[i].image}
          imgName={dataArray[i].name}
        />
      );
    }

    return cardSet;
  }

  // function getRandomIndex() {
  //   return Math.floor(Math.random() * 10)
  // }

  //   function getImageOrder() {
  //     const order = []
  //     while(order.length !== 10) {
  //       const index = getRandomIndex()
  //       if (order.includes(index)) continue
  //       order.push(index)
  //     }
  //     return order
  //   }

  //  useEffect(() => {
  //   async function getRickAndMortyData() {
  //     const dataArray = [];
  //     const response = await fetch("https://rickandmortyapi.com/api/character");
  //     const data = await response.json();
  //     for (let i = 0; i < 10; i++) {
  //       dataArray.push({
  //         name: data.results[i].name,
  //         image: data.results[i].image,
  //       });
  //     }
  //     console.log("Yuh")
  //     // setImgDataArray(dataArray);
  //     const cardSet = imgDataArray.map((data) => (
  //       <Card key={data.name} imgUrl={data.image} imgName={data.name} />
  //     ));
  //     setImageCardSet(cardSet)
  //   }
  //   getRickAndMortyData();
  // }, [imgDataArray]);

  // const imageCardSet = imgDataArray.map((data) => (
  //   <Card key={data.name} imgUrl={data.image} imgName={data.name} />
  // ));

  // console.log(imageCardSet);

  return (
    <>
      <h1>Memory Card Game</h1>
      <p>
        Remember the order in which you click your card, repeating a click on a
        card resets score
      </p>
      <p>Score:</p>
      <p>Best Score</p>
      <div className="cardSet">{getShuffledCards(results)}</div>
    </>
  );
}

export default App;
