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

  useEffect(() => {
    if (!didInit) {

      async function buildCardList(cardsData) {
        const cardsArray = [];

        for (const data of cardsData) {
          const response = await fetch(data.url);
          if (!response.ok) {
            throw new Error("Erro ao buscar imagens.");
          }
          const newCard = await response.json();

          const image = await fetch(newCard.sprites.front_default);
          const imageBlob = await image.blob();
          const imageURL = URL.createObjectURL(imageBlob);
          cardsArray.push({ "name": data.name, "pic": imageURL });
        }

        return cardsArray;
      }

      didInit = true;
      
      fetch("https://pokeapi.co/api/v2/pokemon?limit=15&offset=0")
        .then(response => {
          if (!response.ok) {
            throw new Error("Erro ao buscar cartas.");
          }
          return response.json();
        }).then(data => buildCardList(data.results))
        .then(builtArray => setCardsList(builtArray))
        .catch(error => console.error('Fetch error:', error));
    }
  }, [])

  return (
    <div className="game">
      <div className="game-header">
        <p className='title'>Pokemon Memory Game</p>
        <p className='choises-resume'>Correct guesses: {chosen.length}</p>
        <p className='choises-resume'>Best: {highest}</p>
      </div>
      <div className='cards-grid'>
        {randomizedList.map((card) => <Card key={card.name} cardInfo={card} pickCard={pickCard} />)}
      </div>
    </div>
  )
}

export default App
