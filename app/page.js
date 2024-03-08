"use client"

import Image from "next/image";
import Loading from "./loading";
import "./home.sass";
import { useEffect, useState } from "react";
import Link from "next/link";
import Carousel from "./components/Carousel/Carousel";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {

  const [games, setGames] = useState([]);
  let mode = useSelector(state => state.darkmode.darkmode)

  useEffect(() => {
    fetch('http://localhost:3000/api/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
      .catch(error => console.error(error));
  }, []);


  let selectedGames = []
  let popularGames = []

  let game1 = games.find(game => game.title === "Flyff: Fly For Fun")
  let game2 = games.find(game => game.title === "League of Legends")
  let game3 = games.find(game => game.title === "Dofus")

  let game4 = games.find(game => game.title === "Valorant")
  let game5 = games.find(game => game.title === "Overwatch 2")
  let game6 = games.find(game => game.title === "Lost Ark")
  let game7 = games.find(game => game.title === "Genshin Impact")
  let game8 = games.find(game => game.title === "Fall Guys")

  selectedGames.push(game1, game2, game3)
  popularGames.push(game4, game5, game6, game7, game8, game2)

  return (
    <>
      {game8 ? <>
        <div className="bg">
        </div>
        <Carousel games={games} />
        <div className={`homeBanner ${mode ? "darkmode" : "lightmode"}`}>
        </div>
        <div className={`homeContainer ${mode ? "darkmode" : "lightmode"}`}>
          <div className="homeContent">
            <h1>Our Selection</h1>
            <div className={`selection-container ${mode ? "darkmode" : "lightmode"}`}>
              {selectedGames.map((game, index) => (
                <div key={index} className="selection-card">
                  <Link href={`/games/${game.id}`}>
                    <img src={game.thumbnail} alt={game.title} />
                    <p className="selection-card-title">{game.title}</p>
                  </Link>
                </div>
              ))}
            </div>
            <h1>The Most Popular</h1>
            <div className="selection-container">
              {popularGames.map((game, index) => (
                <div key={index} className="selection-card">
                  <Link href={`/games/${game.id}`}>
                    <img src={game.thumbnail} alt={game.title} />
                    <p className="selection-card-title">{game.title}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
        : <Loading />}
    </>
  );
}
