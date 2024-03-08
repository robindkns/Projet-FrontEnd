"use client"

import "./sign-up.sass"
import urlKratos from "../../assets/Kratos.webp"
import urlGeralt from "../../assets/Geralt.png"
import Image from "next/image";
import { useContext, useState } from "react";
import Link from "next/link";
import Context from "../../components/Context/Context";
import { useDispatch } from "react-redux";
import { addLog } from "@/app/redux/features/logsSlice";
import { useRouter } from 'next/navigation';

export default function SignUp() {

    // const context = useContext(Context);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [color,setColor] = useState("lightgrey")
    const router = useRouter()

    const [user, setUser] = useState({
        username : "",
        password : "",
        email : ""
    });

    const handleSubmit = (e) => {
        const userTemp = { username: username, password : password, email : email }
        e.preventDefault();
        if (username === "" || email === "" || password === "") {
            console.log("error");
            setColor("red")
            return
        } else {
            setUser(userTemp)
            dispatch(addLog(user))
            setColor("lightgrey")
            // router.push("/login")
        }
    }

    return (
        <div className="signUp">
            <div className="signUpContainer">
                <form action="">
                    <h1>Sign Up</h1>
                    <div className="form-grid">
                        <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username*" value={username} required />
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email*" value={email} required />
                        <input type="text" placeholder="Last Name" />
                        <input type="text" placeholder="First Name" />
                        <input type="date" placeholder="Date of birth (dd/mm/yyyy)" />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password*" value={password} required />
                    </div>
                    <p className="error" style={{color: color}}>Please fill in the required fields *</p>
                </form>
                <button onClick={handleSubmit} type="submit" className="btnSignUp">Sign Up</button>
                <p>Already have an account? <Link href="/login">Login</Link></p>
            </div>
            <div className="signUpBg">
                <div className="characters">
                    <Image className="kratos" src={urlKratos} alt="Kratos" />
                    <Image className="geralt" src={urlGeralt} alt="Geralt de Riv" />
                </div>
            </div>
        </div>
    );
}