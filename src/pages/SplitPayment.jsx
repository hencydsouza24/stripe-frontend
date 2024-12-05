const SplitPayment = () => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        const amount = e.target.amount.value
        const count = e.target.count.value
        e.target.amount.value = ""
        e.target.count.value = ""
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/get-split-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount,
                count
            })
        })
        const data = await res.json()
        console.log(data)
    }
    return (
        <>
            <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                <input name="amount" type="text" placeholder="Enter the amount" />
                <input name="count" type="text" placeholder="count" />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default SplitPayment