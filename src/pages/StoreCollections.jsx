import React from 'react';
import { ProductGridPage } from './ProductGridPage';
import { products } from '../data/products';

export const BestSellers = () => {
  const topRated = products.filter(p => p.rating >= 4.8);
  return <ProductGridPage title="Best Sellers" subtitle="Our highest-rated community favorites." data={topRated} />;
};

export const NewArrivals = () => {
  // Take last 8 items as newest
  const newest = products.slice(-8).reverse();
  return <ProductGridPage title="New Arrivals" subtitle="The absolute latest gear to hit NovaMart." data={newest} />;
};

export const WeeklyDeals = () => {
  // Arbitrary selection for demonstration
  const deals = products.slice(2, 6);
  return <ProductGridPage title="Weekly Deals" subtitle="Up to 50% off select high-performance gear." data={deals} />;
};
