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

  function win() {
    alert("You Win! Click any card to restart.")
  }

  function pickCard(name) {
    console.log(name)
    if (chosen.includes(name)) { finishGame(); }
    else {
      if (chosen.length == 14) {
        win();
      }
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


/**
 * Api return in case the pokemon API goes down
 * {"count":1350,"next":"https://pokeapi.co/api/v2/pokemon?offset=15&limit=15","previous":null,"results":[{"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/"},{"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon/2/"},{"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},{"name":"charmander","url":"https://pokeapi.co/api/v2/pokemon/4/"},{"name":"charmeleon","url":"https://pokeapi.co/api/v2/pokemon/5/"},{"name":"charizard","url":"https://pokeapi.co/api/v2/pokemon/6/"},{"name":"squirtle","url":"https://pokeapi.co/api/v2/pokemon/7/"},{"name":"wartortle","url":"https://pokeapi.co/api/v2/pokemon/8/"},{"name":"blastoise","url":"https://pokeapi.co/api/v2/pokemon/9/"},{"name":"caterpie","url":"https://pokeapi.co/api/v2/pokemon/10/"},{"name":"metapod","url":"https://pokeapi.co/api/v2/pokemon/11/"},{"name":"butterfree","url":"https://pokeapi.co/api/v2/pokemon/12/"},{"name":"weedle","url":"https://pokeapi.co/api/v2/pokemon/13/"},{"name":"kakuna","url":"https://pokeapi.co/api/v2/pokemon/14/"},{"name":"beedrill","url":"https://pokeapi.co/api/v2/pokemon/15/"}]}
 */
