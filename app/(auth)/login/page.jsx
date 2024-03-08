"use client"

import Image from "next/image";
import urlKratos from "../../assets/Kratos.webp"
import urlGeralt from "../../assets/Geralt.png"
import { useDispatch,useSelector } from "react-redux";
import "./login.sass"
import { checkLog } from "@/app/redux/features/logsSlice";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState({})
    const dispatch = useDispatch()
    const router = useRouter()
    const loggedIn = useSelector(state => state.logs.loggedIn)
    const inscrits = useSelector(state => state.logs.data)

    const handleLogin = (e) => {
        const userTemp = { username: username, password : password }
        e.preventDefault()
        if (username === "" || password === "") {
            console.log("error")
        } else {
            setUser(userTemp)
            dispatch(checkLog(user))
            console.log(user);

            // if (loggedIn === true) {
            //     alert("Logged in")
            //     router.push("/")
            // } else {
            //     alert("Wrong username or password")
            // }
        }
    }

    useEffect(() => {
        // console.log('user', user);
        // console.log('username', username);
        // console.log('password', password);
        console.log(inscrits);
    }, [])

    return (
        <div>
            <div className="signUp">
            <div className="signUpBg">
                <div className="characters">
                    <Image className="kratos" src={urlKratos} alt="Kratos" />
                    <Image className="geralt" src={urlGeralt} alt="Geralt de Riv" />
                </div>
            </div>
            <div className="signUpContainer">
                <form action="">
                    <h1>Login</h1>
                    <div className="form-grid">
                        <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" value={username} />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" value={password} />
                    </div>
                </form>
                <button onClick={handleLogin} className="btnSignUp">Login</button>
                <p>Not signed up yet? <a href="/sign-up">Sign Up</a></p>
            </div>
        </div>
        </div>
    );
}