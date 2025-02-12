import express, { json } from 'express';
import connectDB from './config/db.js';
import apiRoutes from './routes/apiRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

connectDB();

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});