/**
 * Format a number as currency (₹ INR)
 */
export const formatCurrency = (value) => {
  const absValue = Math.abs(value);
  const formatted = absValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (value < 0) return `- $${formatted}`;
  return `$${formatted}`;
};

/**
 * Format a number to a readable short form
 */
export const formatNumber = (value) => {
  if (value === 0) return "0";
  const absVal = Math.abs(value);
  if (absVal < 0.000001) return value.toExponential(2);
  if (absVal < 0.01) return value.toFixed(6);
  if (absVal < 1) return value.toFixed(4);
  if (absVal < 1000) return value.toFixed(2);
  return value.toLocaleString("en-IN", { maximumFractionDigits: 2 });
};

/**
 * Format gain/loss value with sign and color class
 */
export const getGainInfo = (gain) => {
  if (gain >= 0) {
    return { text: formatCurrency(gain), className: "gain-positive" };
  }
  return { text: formatCurrency(gain), className: "gain-negative" };
};
