import axios from 'axios';
import Transaction from '../models/Transaction.js';

const initializeDatabase = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        await Transaction.deleteMany({});
        await Transaction.insertMany(transactions);

        res.status(200).send('Database initialized with seed data');
    } catch (error) {
        console.error('Error initializing database:', error.message);
        res.status(500).send('Error initializing database');
    }
};

const getTransactions = async (req, res) => {
    try {
        let { month, search, page = 1, perPage = 10 } = req.query;

        // Ensure month is a valid number
        month = parseInt(month, 10);
        if (isNaN(month) || month < 1 || month > 12) {
            return res.status(400).json({ error: "Invalid month parameter" });
        }

        // Ensure page and perPage are numbers
        page = parseInt(page, 10);
        perPage = parseInt(perPage, 10);
        if (isNaN(page) || isNaN(perPage) || page < 1 || perPage < 1) {
            return res.status(400).json({ error: "Invalid pagination parameters" });
        }

        // Build query
        const query = {
            $expr: { $eq: [{ $month: "$dateOfSale" }, month] } // Filter by month
        };

        // Sanitize search input
        if (search) {
            search = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape regex special characters
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { price: isNaN(search) ? null : Number(search) } // Ensure price is a number
            ].filter(Boolean); // Remove null values
        }

        // Fetch transactions
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(perPage);

        // Get total count
        const total = await Transaction.countDocuments(query);

        res.status(200).json({ transactions, total });
    } catch (error) {
        console.error("Error fetching transactions:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export default { initializeDatabase, getTransactions };
