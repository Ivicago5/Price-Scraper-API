import puppeteer from "puppeteer";

export default async function scrapeAliExpressProduct (productUrl) {
    const browser = await puppeteer.launch({headless: 'new' });
    const page = await browser.newPage();

    try {
    await page.goto(productUrl, {waitUntil: 'domcontentloaded', timeout: 0});


    const data = await page.evaluate(() => {
        const title = document.querySelector('h1')?.innerText || '';
        const priceEl = document.querySelector('[class*=product-price-current], .uniform-banner-box-price');
        const rawPrice = priceEl?.innerText?.replace(/[^\d.,]/g, '').replace(',', '.') || '0';

        return{
            title: title.trim,
            price: parseFloat(rawPrice),
            timestamp: new Date().toISOString()
        }
    })

    return data;

    } catch (err) {

        console.error('AliExpress scrape error:', err.message);
        throw new Error('Failed to scrape AliExpress product');

    } finally {
        
        await browser.close();
    }
}