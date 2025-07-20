import scrapeAliExpressProduct from './scraper/aliexpressScraper.js';

const url = 'https://www.aliexpress.com/item/1005009178361384.html';

scrapeAliExpressProduct(url)
  .then(data => {
    console.log('Scraped data:', data);
  })
  .catch(err => {
    console.error('Scrape failed:', err.message);
  });
