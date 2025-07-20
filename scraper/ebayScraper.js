import puppeteer from 'puppeteer';

export async function scrapeEbayProduct(url) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  );

  //   await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });

 try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });

    // Wait for the title and price to appear
    await page.waitForSelector('.d-item-title', { timeout: 15000 });
    await page.waitForSelector('.x-price-primary', { timeout: 15000 });

    const data = await page.evaluate(() => {
      const title = document.querySelector('.d-item-title')?.textContent?.trim() || '';
      const priceText = document.querySelector('.x-price-primary')?.textContent?.trim() || '';
      const price = parseFloat(priceText.replace(/[^\d.,]/g, '').replace(',', '.'));

      return {
        title,
        price: isNaN(price) ? null : price, // Ensure price is valid
      };
    });

    if (!data.title || !data.price) {
      throw new Error('Failed to extract title or price from eBay.');
    }

    return data;
  } catch (error) {
    console.error('Error scraping eBay product:', error);
    return { title: '', price: null };  // Handle error gracefully
  } finally {
    await browser.close();
  }
}
