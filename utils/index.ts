// This file is the equivalent of functions.php in WordPress.
// It's where you can define utility functions that can be used throughout your app.

const formatPrice = (price: number) => {
  // Format the price as a currency string
  price = price / 100; // Convert cents to dollars
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(price);
};

export { formatPrice };
