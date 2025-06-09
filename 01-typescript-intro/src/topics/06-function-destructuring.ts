export interface Product {
  description: string;
  price: number;
}

const phone: Product = {
  description: "A smartphone with a large display",
  price: 999.99,
};

const laptop: Product = {
  description: "A powerful laptop for gaming and work",
  price: 1999.99,
};

interface TaxCalculationOption {
  tax: number;
  products: Product[];
}

//function taxCalculation(options: TaxCalculationOption): [number, number] {
//function taxCalculation({tax, products}: TaxCalculationOption): [number, number] {
export function taxCalculation(options: TaxCalculationOption): [number, number] {
  const { tax, products } = options;

  let total = 0;

  products.forEach(({ price }) => {
    total += price;
  });

  return [total, total * tax];
}

// const shoppingCart: Product[] = [phone, laptop];
// const tax = 0.21;

// const [total, totalTax] = taxCalculation({
//   products: shoppingCart,
//   tax: tax,
// });

// console.log(`Total: ${total}`);
// console.log(`Tax: ${totalTax}`);

