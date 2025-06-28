import productModel from '../models/productModel.js';
import scrapeProduct from "../../scraper/index.js";

function getSourceFromUrl(url) {
    if (url.includes('aliexpress.com')) return 'aliexpress';
    if (url.includes('ebay.com')) return 'ebay';
    return 'unknown';
}

export async function trackProduct(url) {
    const source = getSourceFromUrl(url);
    if (source === 'unknown') throw new Error("Unsupported URL source (more coming soon)");


    const match = source === 'aliexpress'
    ? url.match(/item\/(\d+)\.html/)      
    : url.match(/\/itm\/(\d+)/);    // ebay Id fallback

    if (!match) throw new Error(`Invalid ${source} URL`);
    const productId = match[1];


    const {title, price} = await scrapeProduct(url, source);

    const product = await productModel.insertProduct({ productId, url, source, title, price});
    return product;

} 

export async function scrapeAll() {
    const products = await productModel.getAllProducts();
    for (const p of products) {
        const {price: newPrice } = await scrapeProduct(p.url, p.source);
        if (parseFloat(newPrice) !== parseFloat(p.price)) {
            await updateProductPrice(p.product_id, newPrice);
            console.log(`Updated price for ${p.title}: ${p.price} -> ${newPrice}`);
        } 
    }
}