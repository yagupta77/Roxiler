import Transaction from '../models/Transaction.js';

// Get statistics for the selected month
export const getStatistics = async (req, res) => {
  const { month } = req.query;

  try {
    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] },
          sold: true,
        },
      },
      { $group: { _id: null, totalAmount: { $sum: '$price' } } },
    ]);

    const totalSoldItems = await Transaction.countDocuments({
      $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] },
      sold: true,
    });

    const totalNotSoldItems = await Transaction.countDocuments({
      $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] },
      sold: false,
    });

    res.status(200).json({
      totalSaleAmount: totalSaleAmount[0]?.totalAmount || 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error.message);
    res.status(500).send('Error fetching statistics');
  }
};

// Get bar chart data for the selected month
export const getBarChartData = async (req, res) => {
  const { month } = req.query;

  const ranges = [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 400 },
    { min: 401, max: 500 },
    { min: 501, max: 600 },
    { min: 601, max: 700 },
    { min: 701, max: 800 },
    { min: 801, max: 900 },
    { min: 901, max: Infinity },
  ];

  try {
    const result = await Promise.all(
      ranges.map(async (range) => {
        const count = await Transaction.countDocuments({
          $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] },
          price: { $gte: range.min, $lte: range.max },
        });
        return { range: `${range.min}-${range.max}`, count };
      })
    );

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching bar chart data:', error.message);
    res.status(500).send('Error fetching bar chart data');
  }
};

// Get pie chart data for the selected month
export const getPieChartData = async (req, res) => {
  const { month } = req.query;

  try {
    const categories = await Transaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] },
        },
      },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching pie chart data:', error.message);
    res.status(500).send('Error fetching pie chart data');
  }
};
 export default {getBarChartData,getPieChartData,getStatistics};