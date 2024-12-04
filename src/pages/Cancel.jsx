import { useNavigate } from "react-router-dom"

const Cancel = () => {
    const navigate = useNavigate()
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem"}}>
            <p>Payment was cancelled ❌</p>
            <button onClick={() => {
                navigate('/')
            }}>
                Go back
            </button>
        </div>
    )
}

export default Cancel