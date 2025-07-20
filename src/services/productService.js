import productModel from '../models/productModel.js';
import { scrapeProduct } from "../../scraper/index.js";
import { getSourceFromUrl } from '../../scraper/index.js';

export async function trackNewProduct (url) {
    const scrapedData = await scrapeProduct(url);

    const source = getSourceFromUrl(url);

     const productId = extractProductId(url, source);

    const newProduct = await productModel.insertProduct({
        productId,
        url,
        source,
        title: scrapedData.title,
        price: scrapedData.price
    });

    return newProduct;
}

export async function fetchAllProducts() {
    return productModel.getAllProducts();
}

export async function updatePricesForAllTracked() {
    const tracked = await productModel.getAllTrackedProducts();

    for (const {url, source} of tracked) {
        const {productId, price} = await scrapeProduct(url, source);
        await productModel.updateProductPrice(productId, price);
    }
}

function extractProductId(url, source) {
  if (source === 'amazon') {
    const match = url.match(/\/dp\/([A-Z0-9]+)/);
    return match ? match[1] : null;
  } else if (source === 'ebay') {
    const match = url.match(/\/itm\/(\d+)/);
    return match ? match[1] : null;
  }
  return null;
}








// function getSourceFromUrl(url) {
//     if (url.includes('aliexpress.com')) return 'aliexpress';
//     if (url.includes('ebay.com')) return 'ebay';
//     return 'unknown';
// }

// export async function trackProduct(url) {
//     const source = getSourceFromUrl(url);
//     if (source === 'unknown') throw new Error("Unsupported URL source (more coming soon)");


//     const match = source === 'aliexpress'
//     ? url.match(/item\/(\d+)\.html/)      
//     : url.match(/\/itm\/(\d+)/);    // ebay Id fallback

//     if (!match) throw new Error(`Invalid ${source} URL`);
//     const productId = match[1];


//     const {title, price} = await scrapeProduct(url, source);

//     const product = await productModel.insertProduct({ productId, url, source, title, price});
//     return product;

// } 

// export async function scrapeAll() {
//     const products = await productModel.getAllProducts();
//     for (const p of products) {
//         const {price: newPrice } = await scrapeProduct(p.url, p.source);
//         if (parseFloat(newPrice) !== parseFloat(p.price)) {
//             await updateProductPrice(p.product_id, newPrice);
//             console.log(`Updated price for ${p.title}: ${p.price} -> ${newPrice}`);
//         } 
//     }
// }