import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
    const toacc= localStorage.getItem('id')
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');

    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/v1/account/transfer', { amount, to: toacc }, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            alert('Payment successful');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error during payment', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-white text-center">Send Money to {localStorage.getItem("transfername")}</h2>
                <form onSubmit={handlePayment} className="space-y-6">
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-300">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Send Money
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
