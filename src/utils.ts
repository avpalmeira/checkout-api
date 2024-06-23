/**
 * Grouped items discount use SKUs that are not allowed for regular products
 */
export function getGroupedItemsDiscountSKUs() {
  const alphaArray = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode('A'.charCodeAt(0) + i),
  );
  const groupedItemsDiscountSKUs = alphaArray.map((char) => char.repeat(6));
  return groupedItemsDiscountSKUs;
}
