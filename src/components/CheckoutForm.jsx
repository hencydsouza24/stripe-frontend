import { useStripe, useElements, PaymentElement, ExpressCheckoutElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: import.meta.env.VITE_SERVER_URL.split(":3003")[0] + '5173/success',
            },
        });

        if (result.error) {
            console.error(result.error.message);
        }
    };

    const onConfirm = async () => {
        if (!stripe) {
            return;
        }

        const { error: submitError } = await elements.submit();
        if (submitError) {
            console.log(submitError.message)
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${import.meta.env.VITE_FRONTEND_URL}/success`,
            },
        });

        if (error) {
            console.log(error.message)
        } 
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <ExpressCheckoutElement onConfirm={onConfirm} />
                <PaymentElement />
                <button style={{ width: "100%" }} disabled={!stripe}>Submit</button>
            </div>
        </form>
    )
};

export default CheckoutForm;