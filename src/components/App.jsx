import { useState, useEffect } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "../styles/App.css";
import { Card } from "./Card";

function App() {
  const [imgDataArray, setImgDataArray] = useState([]);
  const [imageCardSet ,setImageCardSet] = useState([])
  
   useEffect(() => {
    async function getRickAndMortyData() {
      const dataArray = [];
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      for (let i = 0; i < 10; i++) {
        dataArray.push({
          name: data.results[i].name,
          image: data.results[i].image,
        });
      }
      setImgDataArray(dataArray);
      const cardSet = imgDataArray.map((data) => (
        <Card key={data.name} imgUrl={data.image} imgName={data.name} />
      ));
      setImageCardSet(cardSet)
    }
    getRickAndMortyData();
  }, [imgDataArray]);

  

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
      <div className="cardSet">{imageCardSet}</div>
    </>
  );
}

export default App;
