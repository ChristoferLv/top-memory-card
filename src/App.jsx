import './App.css'
import { useEffect, useMemo, useState } from 'react'
import Card from './Card'

let didInit = false;

function App() {
  const [chosen, setChosen] = useState([]);
  const [highest, setHighest] = useState(0);
  const [cardsList, setCardsList] = useState([]);

  const randomizedList = randomizeCards();

  function randomizeCards() {
    const newArray = cardsList.slice();
    for (var i = newArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    return newArray;
  }

  function finishGame() {
    setChosen([]);
  }

  function pickCard(name) {
    if (chosen.includes(name)) { finishGame(); }
    else {
      setChosen([...chosen, name]);
      if (chosen.length + 1 > highest)
        setHighest(chosen.length + 1);
    }
  }

  // useEffect(() => {
  //   randomizeCards();
  // }, [chosen])

  useEffect(() => {
    if (!didInit) {
      function buildCardList(cardsData) {
        const cardsArray = [];
        cardsData.forEach(element => {
          cardsArray.push({ "name": element.name })
        });
        return cardsArray;
      }
      console.log("run", didInit)
      didInit = true;
      fetch("https://pokeapi.co/api/v2/pokemon?limit=15&offset=0")
        .then(response => {
          if (!response.ok) {
            throw new Error("Erro ao buscar cartas.");
          }
          return response.json();
        }).then(data => { console.log(data); setCardsList(buildCardList(data.results)) })
        .catch(error => console.error('Fetch error:', error));
    }
  }, [])

  return (
    <div className="game">
      <div className="game-header">
        <p>Correct guesses: {chosen.length}</p>
        <p>Best: {highest}</p>
      </div>
      <div className='cards-grid'>
        {randomizedList.map((card) => <Card key={card.name} cardInfo={card.name} pickCard={pickCard} />)}
      </div>
    </div>
  )
}

export default App
