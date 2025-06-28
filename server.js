import express from 'express';
import productRoutes from './routes/productRoutes.js';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { scrapeAllProducts } from './cron/scrapeAllProducts.js';


dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

cron.schedule('*/30 * * * *', async () => {
    console.log('Running Schedule scrape ...');
    await scrapeAllProducts();
})

