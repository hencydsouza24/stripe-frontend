import { useNavigate } from "react-router-dom"

const Success = () => {
    const navigate = useNavigate()
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem"}}>
            <div>Payment was a success ✅</div>
            <button onClick={() => {
                navigate('/')
            }}>
                Go back
            </button>
        </div>
    )
}

export default Success