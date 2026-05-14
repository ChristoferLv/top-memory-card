export default function Card({ cards, cardInfo, pickCard }) {
    return <div className="card" onClick={() => pickCard(cardInfo)}>
        <div className="picture">
            <img src="./0025Pikachu.webp" alt="" />
        </div>
        <p className="name">{cardInfo}</p>
    </div>
}