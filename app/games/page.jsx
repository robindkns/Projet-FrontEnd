"use client"

import "./games.sass";
import { useEffect, useState } from "react";
import Loading from "../loading";
import Pagination from "../components/Pagination/Pagination";
import Link from "next/link";
import { SiWindows11 } from "react-icons/si";
import { BsBrowserChrome } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function Games() {

    const [games, setGames] = useState([]);
    const [height, setHeight] = useState("250px");
    const [done, setDone] = useState(false);
    const [done2, setDone2] = useState(false);
    const [fullGames, setFullGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeGenre, setActiveGenre] = useState([]);
    const [filterON, setFilterON] = useState(false);
    let mode = useSelector(state => state.darkmode.darkmode)

    useEffect(() => {
        fetch('http://localhost:3000/api/games')
            .then(response => response.json())
            .then(data => {
                setGames(data)
                setFullGames(data)
                setLoading(true)
            })
            .catch(error => {
                console.error(error)
                setLoading(true)
            });
    }, []);

    let filterGames = (e) => {
        // let actualGames = games
        if (filterON === true) {
            let filtered = games.filter((game) => game.title.toLowerCase().includes(e.toLowerCase()))
            setGames(filtered);
        } else {
            let filtered = fullGames.filter((game) => game.title.toLowerCase().includes(e.toLowerCase()))
            setGames(filtered);
        }
        
    }

    let filterGenre = (e) => {
        let filtered = games.filter((game) => game.genre.toLowerCase().includes(e.toLowerCase()))
        if (activeGenre.length !== 0 ) {
            setGames(fullGames);
            setActiveGenre([]);
            setDone(false);
            setDone2(false);
            setFilterON(false)
        } else {
            setGames(filtered);
            setActiveGenre(e)
            setFilterON(true)
        }
    }

    let filterPublisher = (e) => {
        if (e !== "All") {
            let filtered = fullGames.filter((game) => game.developer.toLowerCase().includes(e.toLowerCase()))
            setGames(filtered);
            setFilterON(true)
        }else {
            setGames(fullGames);
            setFilterON(false)
        }
    }

    let filterPlatform = (e) => {
        if(e === "Web Browser"){
            let filtered = games.filter((game) => game.platform.toLowerCase().includes(e.toLowerCase()))
            if (done2 === false) {
                setDone2(true)
                setGames(filtered);
                setFilterON(true)
                if (done === true) {
                    setDone(false)
                    setActiveGenre([])
                    filtered = fullGames.filter((game) => game.platform.toLowerCase().includes(e.toLowerCase()))
                    setGames(filtered);
                }
            } else {
                setDone2(false)
                setGames(fullGames);
                setFilterON(false)
                setActiveGenre([])
            }
        }else if (e === "PC (Windows)") {
            let filtered = games.filter((game) => game.platform.toLowerCase().includes(e.toLowerCase()))
            if (done === false) {
                setDone(true)
                setGames(filtered);
                setFilterON(true)
                if (done2 === true) {
                    setDone2(false)
                    setActiveGenre([])
                    filtered = fullGames.filter((game) => game.platform.toLowerCase().includes(e.toLowerCase()))
                    setGames(filtered);
                }
            } else {
                setDone(false)
                setGames(fullGames)
                setActiveGenre([])
                setFilterON(false)
            }
        }
    }

    let genres = []
    let developer = []

    for (let i = 0; i < fullGames.length; i++) {
        if (!genres.includes(fullGames[i].genre)) {
            genres.push(fullGames[i].genre)
        }
    }

    for (let i = 0; i < fullGames.length; i++) {
        if (!developer.includes(fullGames[i].developer)) {
            developer.push(fullGames[i].developer)
        }
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [gamePerPage, setGamePerPage] = useState(18);

    let lastIndex = currentPage * gamePerPage;
    let firstIndex = lastIndex - gamePerPage;

    let currentGame = games.slice(firstIndex, lastIndex); 

    return (
        <>
            {
                loading ? <div className={`games ${mode ? "darkmode" : "lightmode"}`}>
                    <div className="games-main">
                        <div className="filter-container">
                            <div className="filter-content">
                                <div className="filter-header">
                                    <input onChange={(e) => filterGames(e.target.value)} type="text" placeholder="Search" />
                                </div>
                                <div className="filter-body">
                                    <div className="filter-genres" style={{ height: height }}>
                                        <h3>Genre</h3>
                                        {genres.map((genre, index) => (<p onClick={() => filterGenre(genre)} className={`genre ${activeGenre === genre ? "active-genre" : ""}`} key={index}>{genre}</p>))}
                                        {height === "250px" ? <button onClick={() => setHeight("auto")} className="seeMore">Show all</button> : <button onClick={() => setHeight("250px")} className="seeMore">Show less</button>}
                                    </div>
                                    <h3>Publisher</h3>
                                    <select onChange={(e) => filterPublisher(e.target.value)}>
                                        <option>All</option>
                                        {developer.map((develop, index) => (
                                            <option key={index} value={develop} >
                                                {develop}
                                            </option>
                                        ))}
                                    </select>
                                    <h3>Platform</h3>
                                    <div className="platform">
                                        <div onClick={() => filterPlatform("PC (Windows)")}>
                                            <input type="checkbox" checked={done} />
                                            <label>PC (Windows) <SiWindows11 /></label>
                                        </div>
                                        <div onClick={() => filterPlatform("Web Browser")}>
                                            <input type="checkbox" checked={done2} />
                                            <label>Web Browser <BsBrowserChrome /></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="separator"></div>
                        <div className="games-container">
                            <div className="games-grid">
                                {currentGame.length === 0 ? <p className="noGame">No games found.</p> : currentGame.map((game, index) => (
                                    <div className="game" key={index}>
                                        <Link href={`/games/${game.id}`}>
                                            <img src={game.thumbnail} alt="game" />
                                        </Link>
                                        <p>{game.title}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="games-grid-footer">
                                <Pagination total={games.length} gamePerPage={gamePerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                            </div>
                        </div>
                    </div>
                </div> : <Loading />
            }</>

    );
}