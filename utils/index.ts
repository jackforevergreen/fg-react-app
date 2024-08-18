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
