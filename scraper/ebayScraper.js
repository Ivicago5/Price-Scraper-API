import puppeteer from "puppeteer";

export default async function scrapeEbayProduct(productUrl) {
    const browser = await puppeteer.launch({headless: 'new' });
    const page = await browser.newPage();
   

    try {
         await page.goto(productUrl, {waitUntil: 'domcontentloaded', timeout: 0});

         const data = await page.evaluate(() => {
            const title = document.querySelector('#itemTitle')?.innerText?.replace('Details about ', '') || '';
            const priceEl = 
                document.querySelector('#prcIsum') ||
                document.querySelector('#prcIsum_bidPrice') || 
                document.querySelector('[itemprop="price"]');

            const rawPrice = priceEl?.innerText || priceEl?.getAttribute('content') || '0';
            const cleanedPrice = rawPrice.replace(/[^\d.,]/g, '').replace(',', '.');

            return{
                title: title.trim(),
                price: parseFloat(cleanedPrice),
                timestamp: new Date().toISOString()
            }
          })
    } catch (err) {

        console.error('eBay scrape error:', err.message);
        throw new Error('Failed to scrape eBay product');

    } finally {
        await browser.close();
    }
}