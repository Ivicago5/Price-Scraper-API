import { scrapeAmazonProduct } from './amazonScraper.js';
import { scrapeEbayProduct } from './ebayScraper.js';

export async function scrapeProduct(url) {
  if (!url) {
    throw new Error('URL is undefined or missing!');
  }

  const source = getSourceFromUrl(url);

  if (source === 'amazon') {
    return scrapeAmazonProduct(url);
  } else if (source === 'ebay') {
    return scrapeEbayProduct(url);
  } else {
    throw new Error(`Unsupported source for URL: ${url}`);
  }
}

// Dynamic source detection based on URL
export function getSourceFromUrl(url) {
  if (typeof url !== 'string') {
    throw new Error('Provided URL is not a valid string.');
  }

  if (url.includes('amazon')) {
    return 'amazon';
  } else if (url.includes('ebay')) {
    return 'ebay';
  } else {
    throw new Error('Unsupported source (only Amazon or eBay)');
  }
}