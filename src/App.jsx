import './App.css'
import { useEffect, useMemo, useState } from 'react'
import Card from './Card'

let didInit = false;

function App() {
  const [count, setCount] = useState(0)
  const [cardsList, setCardsList] = useState([]);

  console.log("cards", cardsList);

  useEffect(() => {
    if (!didInit) {
      function buildCardList(cardsData) {
        const cardsArray = [];
        cardsData.forEach(element => {
          cardsArray.push(<Card key={element.name} cardInfo={element.name} />)
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
        }).then(data => {console.log(data);setCardsList(buildCardList(data.results))})
        .catch(error => console.error('Fetch error:', error));
    }
  }, [])

  return (
    <div className='cards-grid'>
    {cardsList}
    </div>
  )
}

export default App
