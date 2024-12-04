import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cartList = [
    {
        "_id": "674fe089bb31e136efeabf4a",
        "orderDetails": [
            {
                "itemId": "67164548cf40ac46c7fb100e",
                "item_name": "Sev Chat",
                "oPrice": 2,
                "dPrice": 0,
                "quantity": 1,
                "description": "Sev Chat is a popular street food snack originating from India. It is a savory dish typically made with a combination of crunchy sev, tangy sauces, and flavorful spices mixed with a variety of vegetables and potatoes.",
                "rating": 3,
                "customization": [],
                "status": "Being Prepared",
                "_id": "674fe089bb31e136efeabf4b"
            }
        ],
        "isPlaced": true
    },
    {
        "_id": "674fe5cdbb31e136efeac148",
        "orderDetails": [
            {
                "itemId": "66e9fa97d97965a7068d839c",
                "item_name": "Biriyani",
                "oPrice": 21,
                "dPrice": 2,
                "quantity": 1,
                "description": "description",
                "rating": 3,
                "customization": [],
                "status": "Being Prepared",
                "_id": "674fe5cdbb31e136efeac149"
            },
            {
                "itemId": "66ea0703d97965a7068d8a9f",
                "item_name": "Pizza",
                "oPrice": 20,
                "dPrice": 2,
                "quantity": 1,
                "description": "Pizza is a favorite dish in many cuisines. It is a type of flatbread topped with various ingredients and baked in an oven. It originated in Italy and has become popular all over the world. It is a versatile dish that can be customized to suit different preferences.",
                "rating": 3,
                "customization": [
                    {
                        "customizationId": "67077baa2eb41d7d3aaa5152",
                        "title": "Add on",
                        "items": [
                            {
                                "itemName": "Olives",
                                "price": 2,
                                "itemId": "67077baa2eb41d7d3aaa5154",
                                "_id": "674fe5cdbb31e136efeac14c"
                            }
                        ],
                        "_id": "674fe5cdbb31e136efeac14b"
                    }
                ],
                "status": "Being Prepared",
                "_id": "674fe5cdbb31e136efeac14a"
            }
        ],
        "isPlaced": true
    }
]

const Home = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const makePayment = async (checkout = false) => {
        setLoading(true)
        const stripePublicKey = import.meta.env.VITE_STRIPE_PK;

        if (!stripePublicKey) {
            console.error("Stripe public key is not defined. Please check your environment variables.");
            return; // or handle the error as needed
        }
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);

        const allOrderDetails = cartList.reduce((acc, order) => {
            return acc.concat(order.orderDetails.map(item => ({
                ...item,
                price: item.oPrice - item.dPrice + item.customization.reduce((customizationAcc, customization) => customizationAcc + customization.items.reduce((itemAcc, item) => itemAcc + item.price, 0), 0)
            })));
        }, []);

        const body = {
            cartList: allOrderDetails,
            serviceFee: 0.25
        }

        if (checkout === true) {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create-payment-intent`, body)
            navigate(`/pay/${response?.data?.clientSecret}`)
        } else {

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create-checkout-session`, body)
            const result = stripe.redirectToCheckout({
                sessionId: response?.data?.id
            })
            if (result.error) {
                console.log(result.error)
            }
        }
        setLoading(false)
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <div>Make Payment</div>
            <button onClick={makePayment} disabled={loading}>
                Checkout
            </button>
            <button onClick={() => { makePayment(true) }} disabled={loading}>
                Pay
            </button>
        </div>
    )
}

export default Home