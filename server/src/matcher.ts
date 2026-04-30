import Fuse from 'fuse.js';
import { VtexProduct } from './vtexClient.js';

export const findTopMatches = (searchTerm: string, products: VtexProduct[]): VtexProduct[] => {
  if (!products || products.length === 0) return [];

  const options = {
    keys: [{ name: 'productName', weight: 2 }, { name: 'brand', weight: 1 }],
    threshold: 0.4,
  };

  const fuse = new Fuse(products, options);
  const results = fuse.search(searchTerm);

  return results.slice(0, 5).map(r => r.item);
};