MERN Stack Product Transactions Application
A full-stack application to manage and analyze product transactions, featuring data initialization from a third-party API, transaction listings with search and pagination, and visual representations through statistics and charts.

Features
Database Initialization: Fetches and seeds data from a third-party API.
Transaction Listing: Supports search and pagination.
Statistics: Displays total sales, sold items, and unsold items for a selected month.
Bar Chart: Shows item distribution across price ranges for a selected month.
Pie Chart: Illustrates item distribution across categories for a selected month.
Tech Stack
Frontend: React
Backend: Node.js, Express.js
Database: MongoDB 
Installation
Clone the repository:
git clone https://github.com/your-username/mern-product-transactions.git
cd mern-product-transactions
Install dependencies:

Backend:
cd backend
npm install
Frontend:

cd ../frontend
npm install
Environment Variables
Create a .env file in the backend directory with the following
PORT=5000
MONGO_URI=your_mongodb_connection_string
THIRD_PARTY_API_URL=https://s3.amazonaws.com/roxiler.com/product_transaction.json
Replace your_mongodb_connection_string with your MongoDB connection string.

Usage
Start the backend server:

cd backend
npm start
Initialize the database:

Send a GET request to /api/initialize to fetch and seed data.

Start the frontend application:
cd ../frontend
npm start
Access the application at http://localhost:3000.

API Endpoints
Initialize Database: GET /api/initialize
List Transactions: GET /api/transactions?month=March&search=product&page=1&perPage=10
Statistics: GET /api/statistics?month=March
Bar Chart Data: GET /api/bar-chart?month=March
Pie Chart Data: GET /api/pie-chart?month=March
Combined Data: GET /api/combined-data?month=March
License
This project is licensed under the MIT License.
