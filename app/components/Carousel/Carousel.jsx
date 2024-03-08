// import { useState } from "react";
// import React from "react";
// import './Carousel.sass'

// export default function Carousel(props) {
//     const [currentImage, setCurrentImage] = useState(0);

//     let images = [props.img1, props.img2, props.img3, props.img4, props.img5];

//     const refs = images.reduce((acc, val, i) => {
//         acc[i] = React.createRef();
//         return acc;
//     }, {});

//     const scrollToImage = i => {
//         // First let's set the index of the image we want to see next
//         setCurrentImage(i);

//         refs[i].current.scrollIntoView({
//             //     Defines the transition animation.
//             behavior: 'smooth',
//             //      Defines vertical alignment.
//             block: 'nearest',
//             //      Defines horizontal alignment.
//             inline: 'start',
//         });
//     };

//     // Some validation for checking the array length could be added if needed
//     const totalImages = images.length;

//     // Below functions will assure that after last image we'll scroll back to the start,
//     // or another way round - first to last in previousImage method.
//     const nextImage = () => {
//         if (currentImage >= totalImages - 1) {
//             scrollToImage(0);
//         } else {
//             scrollToImage(currentImage + 1);
//         }
//     };

//     const previousImage = () => {
//         if (currentImage === 0) {
//             scrollToImage(totalImages - 1);
//         } else {
//             scrollToImage(currentImage - 1);
//         }
//     };


//     return (
//         <div className="p-12 flex justify-center w-screen md:w-1/2 items-center">
//             <div className="relative w-full">
//                 <div className="carousel">
//                     {sliderControl(true)}
//                     {images.map((img, i) => (
//                         <div className="w-full flex-shrink-0" key={img} ref={refs[i]}>
//                             <img src={img} className="w-full object-contain" />
//                         </div>
//                     ))}
//                     {sliderControl()}
//                 </div>
//             </div>
//         </div>
//     )
// };

import './Carousel.sass'
import { useEffect, useState } from "react";
import CarouselItem from '../CarouselItem/CarouselItem'
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import Loading from '@/app/loading';





export default function Carousel(props) {

    let games = props.games
    const [test, setTest] = useState(0)
    let gamesCarousel = []
    const [activeIndex, setActiveIndex] = useState(0);
    const [count, setCount] = useState(0);



    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= gamesCarousel.length) {
            newIndex = gamesCarousel.length - 1;
        }
        setActiveIndex(newIndex);
    }

    if (count > 0 && count <= 1) {
        for (let i = 0; i < 5; i++) {
            let random = Math.floor(Math.random() * games.length);
            if (!gamesCarousel.includes(games[random])) {
                gamesCarousel.push(games[random]);
                console.log(gamesCarousel)
                console.log(count)

            } else {
                i--;
            }
        };
    }
    useEffect(() => {
        setCount(count + 1)
    }, [])

    return (
        <>
            {
                gamesCarousel.length === 5 ? <div className='carousel'>
                    <div className='carousel-inner' style={{ transform: `translateY(-${activeIndex * 100}%)` }}>
                        {gamesCarousel.map((image, index) => (
                            <CarouselItem item={image} key={index} />
                        ))}
                    </div>
                    <div className="carousel-buttons">
                        <button className='carousel-buttons-first' style={{ color: activeIndex === 0 ? "grey" : "white" }} onClick={() => updateIndex(activeIndex - 1)}>
                            <FaArrowUp />
                        </button>
                        <div>
                            {gamesCarousel.map((image, index) => (
                                <button className='carousel-buttons-bis' key={index} onClick={() => updateIndex(index)}>
                                    {index === activeIndex ? <MdOutlineRadioButtonChecked style={{ color: "#38d2c8" }} /> : <MdOutlineRadioButtonUnchecked style={{ color: "white" }} />}
                                </button>
                            ))}
                        </div>
                        <button className='carousel-buttons-first' style={{ color: activeIndex === gamesCarousel.length - 1 ? "grey" : "white" }} onClick={() => updateIndex(activeIndex + 1)}>
                            <FaArrowDown />
                        </button>
                    </div>
                </div> : Loading
            }
        </>
    );
}