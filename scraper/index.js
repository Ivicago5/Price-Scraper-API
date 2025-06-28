import scrapeAliExpressProduct from "./aliexpressScraper.js";
import scrapeEbayProduct from "./ebayScraper.js";


export default async function scrapeProduct(url, source) {
    if (source === 'aliexpress') return await scrapeAliExpressProduct(url);
    if (source === 'ebay') return await scrapeEbayProduct(url);
    throw new Error(`Unsupported source: ${source}`);
}