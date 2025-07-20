import puppeteer from 'puppeteer';

export async function scrapeAmazonProduct(url) {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'domcontentloaded', timeout: '0' });

    const data = await page.evaluate(() => {
        const title = document.querySelector('#productTitle')?.innerText || '';
        const priceText = document.querySelector('.a-price .a-offscreen')?.innerText || '';
        const price = parseFloat(priceText.replace(/[^\d.]/g, ''));

        return {
            title: title.trim(),
            price,
        }
    });

    await browser.close();

    const productId = new URL(url).pathname.split('/')[3];

    return {
        ...data,
        productId
    }
}