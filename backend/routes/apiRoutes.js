import { Router } from 'express';
import transactionController from '../controllers/transactionController.js';

const { initializeDatabase, getTransactions } = transactionController;

import { getStatistics, getBarChartData, getPieChartData } from '../controllers/statsController.js';

const router = Router();

// Initialize database
router.get('/initialize-database', initializeDatabase);

// Get transactions
router.get('/transactions', getTransactions);

// Get statistics
router.get('/statistics', getStatistics);

// Get bar chart data
router.get('/bar-chart', getBarChartData);

// Get pie chart data
router.get('/pie-chart', getPieChartData);

export default router;
