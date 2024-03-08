import './Footer.sass'
import { useSelector } from 'react-redux'

export default function Footer(){ 

    let mode = useSelector(state => state.darkmode.darkmode)

    return (
        <div className={`footer ${mode ? "darkmode2" : "lightmode2"}`}>
            <p>Copyright © 2024 GameHaven - All rights reserved</p>
        </div>
    )
}