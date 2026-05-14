export default function Card({ cardInfo }) {
    return <div className="card">
        <div className="picture">
            <img src="./0025Pikachu.webp" alt="" />
        </div>
        <p className="name">{cardInfo}</p>
    </div>
}