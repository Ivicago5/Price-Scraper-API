import dotenv from 'dotenv';
dotenv.config();

import { updatePricesForAllTracked } from '../src/services/productService.js';


try {
    await updatePricesForAllTracked();
    console.log('All prices updated');
    process.exit(0);
} catch (err) {
    console.error('Error updating prices:', err);
    process.exit(1);
}