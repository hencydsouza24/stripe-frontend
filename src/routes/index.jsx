import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Success from '../pages/Success'
import Cancel from '../pages/Cancel'
import Payment from '../pages/Payment'
import SplitPayment from '../pages/SplitPayment'

const index = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/success' element={<Success />} />
            <Route path='/cancel' element={<Cancel />} />
            <Route path='/pay/:clientSecret' element={<Payment />} />
            <Route path='/split-payment' >
                <Route index element={<SplitPayment />} />
            </Route>
        </Routes>
    )
}

export default index