import express from 'express';
import dotenv from 'dotenv';
import cron from 'node-cron';

import productRoutes from './src/routes/productRoutes.js';
import { updatePricesForAllTracked } from './src/services/productService.js';


dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);

cron.schedule('0 * * * *', async () => {
  console.log('Running hourly product update...');
  try {
    await updatePricesForAllTracked();
    console.log('Prices updated successfully.');
  } catch (error) {
    console.error('Error updating prices:', error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});