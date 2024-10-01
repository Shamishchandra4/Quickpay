import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    async function getValue() {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token")
                },
                params:{
                    userId:localStorage.getItem('id')
                }
            }
            
        );
            console.log(response.data.balance)
            setValue(Math.floor(response.data.balance));
        } catch (error) {
            console.error("Error fetching balance", error);
        }
    }
    useEffect(() => {
        getValue();
    }, []);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await axios.get('http://localhost:3000/api/v1/user/bulk');
                console.log(res.data.user);
                setUsers(res.data.user);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        }
        fetchUsers();
    }, []);

    const handleSendMoney = (id,user) => {
        navigate("/transfer");
        localStorage.setItem('id', id);
        localStorage.setItem('transfername', user);
        console.log('Send money to:', id);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('id');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-800 text-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold font-pt-serif">Dashboard</h1>
                <button
                    className="bg-indigo-600 text-white px-2 py-1 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>
            <h1 className="text-center text-3xl font-bold font-pt-serif">Hello {localStorage.getItem("name")}!</h1>
            <h1 className="text-center text-xl font-bold font-pt-serif">Your Balance Rs {value}</h1>
            

            <h2 className="text-2xl font-bold mb-6 mt-5">Your Friends List to send money</h2>

            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                <ul className="space-y-4">
                    {Array.isArray(users) ? (
                        users.map((user) => (
                            <li key={user.username} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center shadow-sm hover:bg-gray-900 transition duration-200">
                                <span>{user.firstName} {user.lastName}</span>
                                <button
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onClick={() => handleSendMoney(user._id,user.firstName +" " +user.lastName)}
                                >
                                    Send Money
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>No users available.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
