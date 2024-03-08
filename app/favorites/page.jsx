'use client'
import './favorites.sass'
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import urlChokbarKratos from '../assets/kratoschokbar.png'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { removeFavorite } from '../redux/features/panierSlice';
import { logout } from '../redux/features/logsSlice';
import { removeAllFavorite } from '../redux/features/panierSlice';

export default function Favorites() {

    const loggedIn = useSelector(state => state.logs.loggedIn)
    const panier = useSelector(state => state.panier.content)
    const dispatch = useDispatch()
    let mode = useSelector(state => state.darkmode.darkmode)

    return (
        <div className={`favorites ${mode ? "darkmode" : "lightmode"}`}>
            {loggedIn ? <div className='favorites-container'>
                <div className={`favorites-content-left ${mode ? "darkmode2" : "lightmode3"}`}>
                    <div className="left-content">
                        <h1>Your favorites ({panier.length})</h1>
                        <div className="grid-favorites" style={panier.length < 5 ? {overflowY: ""} : {overflowY: "scroll"}}>
                            {
                                panier.length === 0 ? <p>You dont have any favorites yet</p> : panier.map((game,index) => (
                                <div key={index} className='grid-favorites-item'>
                                    <img src={game.thumbnail} alt="game" />
                                    <div className='grid-favorites-item-text'>
                                        <p>{game.title}</p>
                                        <button onClick={() => dispatch(removeFavorite(game))}>Remove</button>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
                <div className={`favorites-content-right ${mode ? "darkmode2" : "lightmode3"}`}>
                    <div className='right-content'>
                        <div className="right-content-top">
                            <FaUserCircle style={{ color: "white", fontSize: "60px" }} />
                            <h3>Welcome</h3>
                            <p>Here are all your favorites</p>
                        </div>
                        <div className="right-content-bottom">
                            <button onClick={() => dispatch(removeAllFavorite())}>Remove all</button>
                            <button onClick={() => dispatch(logout())}>Log Out</button>
                        </div>
                    </div>
                </div>
            </div> : 
            <div className={`favorites-loggedout ${mode ? "darkmode2" : "lightmode3 "}`}>
                <Image className='chokbar' src={urlChokbarKratos} alt="Kratos chokbar" />
                <h1>Please log in to have access</h1>
                <Link href="/login">
                    <button>Log In</button>
                </Link>
            </div>
            }
        </div>
    )
}