
## QuickPay
QuickPay is a full-stack peer-to-peer payment platform built with ReactJS and expressJS. The application is made in Express.js for the backend, JWT for secure authentication, React.js for the frontend, MongoDB for the database, and Tailwind CSS for styling.

Key Features:
Landing Page:
Users are welcomed to a minimalistic landing page, with options to sign up for new users or sign in for existing users. 

User Authentication (JWT):
QuickPay implements secure user authentication using JSON Web Tokens (JWT). User credentials are securely handled, allowing for safe login, signup, and protected routes within the application.

Personalized Dashboard:
Once signed in, users are taken to their personalized dashboard. Here, they are greeted by name, along with their current available balance displayed at the top. The dashboard showcases a list of the user’s friends, each represented with clickable profiles, facilitating easy access to transactions.

Friend Management & Money Transfer:
Users can select a friend from the dashboard and send dummy money directly through the platform. Once the transfer is initiated, the database updates both the sender's and recipient's balances in real-time. This functionality is backed by MongoDB, ensuring fast and reliable data updates.

Real-Time Database Integration:
All transactions and user data are stored in a MongoDB database. Any money sent between friends is reflected immediately, real-time experience for users as they manage their balance

Logout Functionality:
QuickPay provides a logout mechanism that deletes the JWT token

Technology Stack:
Frontend:
React.js: Dynamic and responsive user interface.
Tailwind CSS: A utility-first CSS framework for building modern, responsive designs with ease.
Backend:
Express.js: Fast, unopinionated backend framework for handling the API and routing logic.
JWT: Secure token-based authentication for protecting routes and user data.
MongoDB: A NoSQL database for efficiently storing user profiles, balances, and transaction history.

How It Works:
Sign Up / Sign In:
Users can register a new account or sign in using existing credentials.

Access Dashboard:
Upon authentication, users are greeted by their name, shown their current balance, and presented with a list of friends.

Send Dummy Money:
Users can select a friend, enter an amount, and send virtual money. The database is updated instantly, reflecting the new balances for both the sender and recipient.

Logout:
Users can log out securely from their account, ending the session and ensuring their data is protected.
