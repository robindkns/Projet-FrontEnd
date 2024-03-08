import Link from "next/link"

export default function NotFound() {
    return (
        <div className="not-found">
            <h1>ERROR 404 GO BACK TO</h1><br></br>
            <Link href="/">Homepage</Link>
        </div>
    )
}