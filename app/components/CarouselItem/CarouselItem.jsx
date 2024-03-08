import './CarouselItem.sass'
import Link from 'next/link'

export default function CarouselItem(props) {
    return (
        <div className='carousel-container'>
            <div className='carousel-item'>
                <Link href={`/games/${props.item.id}`}>
                    <img src={props.item.thumbnail} alt="game" />
                </Link>
                <h2>{props.item.title}</h2>
            </div>
        </div>
    )
}