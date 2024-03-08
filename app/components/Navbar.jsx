"use client"

import Image from "next/image"
import urlLogo from "../assets/logo.png"
import "./Navbar.sass"
import Link from "next/link"
import { FaHeart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { PiSignInBold } from "react-icons/pi";
import { MdAssignmentAdd } from "react-icons/md";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux"
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { changeMode } from "../redux/features/darkmodeSlice"



export default function Navbar() {

    const [stickyClass, setStickyClass] = useState('navContainer');
    const [dropdown, setDropdown] = useState(false);
    const [activeUser, setActiveUser] = useState(false);
    const loggedIn = useSelector(state => state.logs.loggedIn)
    let user = useSelector(state => state.logs.user)
    let mode = useSelector(state => state.darkmode.darkmode)
    const dispatch = useDispatch()



    let openDropdown = () => {
        setDropdown(!dropdown);
        setActiveUser(!activeUser);
    }

    useEffect(() => {
        window.addEventListener('scroll', stickNavbar);
        return () => window.removeEventListener('scroll', stickNavbar);
        console.log(loggedIn);
    }, [loggedIn]);

    const stickNavbar = () => {
        if (window !== undefined) {
            let windowHeight = window.scrollY;
            windowHeight > 1 ? setStickyClass(`sticky-nav ${mode ? "darkmode2" : "lightmode2"}`) : setStickyClass('navContainer');
        }
    };

    return (
        <div className={`${stickyClass}`}>
            <div className="navContent">
                <div className="logoContainer">
                    <Link className="logoLink" href="/">
                        <div className="logo">
                            <Image src={urlLogo} alt="Logo" width={60} height={60} />
                        </div>
                        <h1>GameHaven</h1>
                    </Link>
                </div>
                <div className="navlinks">
                    <Link href="/"><span>Home</span></Link>
                    <Link href="/games"><span>Games</span></Link>
                    <Link href="/favorites"><span>Favorites</span></Link>
                </div>
                <div className="panierLogin">
                    <div className="panierLoginContainer">
                        {mode ? <MdDarkMode onClick={() => dispatch(changeMode())}  style={{ color: "white", fontSize: "30px", cursor: "pointer" }} /> : <MdLightMode onClick={() => dispatch(changeMode())} style={{ color: "white", fontSize: "30px", cursor: "pointer" }} />}
                        <div className="icon">
                            {/* {mode ? <MdDarkMode style={{ color: "white", fontSize: "30px", cursor: "pointer" }} /> : <MdLightMode style={{ color: "white", fontSize: "30px", cursor: "pointer" }} />} */}
                        <Link href="/favorites">
                            <FaHeart style={{ color: "white", fontSize: "30px", cursor: "pointer" }} />
                        </Link>
                        </div>
                        <div onClick={() => openDropdown()} className={`${activeUser ? "activeUser" : "icon"}`}>
                            <FaUserCircle id="user" />
                            {dropdown ? <div className="loginDropdown">
                                <div className="loginDropdownContent">
                                {loggedIn ? <div className="dropdownLoggedIn">
                                    Bienvenue {user}!
                                </div> :
                                <>
                                    <Link className="linkLogs" href="/login">
                                        <PiSignInBold />
                                        <span className="log">Log In</span>
                                    </Link>
                                    <div className="linkLogs2"></div>
                                    <Link className="linkLogs" href="/sign-up">
                                        <MdAssignmentAdd />
                                        <span className="log">Sign Up</span>
                                    </Link> 
                                </>}
                                
                                </div>
                            </div> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}