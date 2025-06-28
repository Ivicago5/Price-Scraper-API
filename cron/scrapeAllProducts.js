import scrapeProduct from "../scraper/index.js";
import productModel from "../src/models/productModel.js";

export async function scrapeAllProducts() {
    const products = await productModel.getAllTrackedProducts();

    for (const product of products) {
        try {
            const scraped = await scrapeProduct(product.url, product.source);

            await productModel.insertProduct({
                ...scraped,
                url: product.url,
                source: product.source
            });

            console.log(`Scraped: ${product.url}`);
        } catch (err) {
            console.log(`Failed to scrape ${product.url}:`, err.message);
        }
    }
}