export default function Card({ cardInfo, pickCard }) {
    return <div className="card" onClick={() => pickCard(cardInfo.name)}>
        <div className="picture">
            <img src={cardInfo.pic} alt="" />
        </div>
        <p className="name">{cardInfo.name}</p>
    </div>
}