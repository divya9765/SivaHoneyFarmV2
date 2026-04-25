export const formatINR = (value) => {
  const number = Number(value) || 0;
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  } catch {
    // Fallback if Intl fails
    return `₹${number.toFixed(2)}`;
  }
};
