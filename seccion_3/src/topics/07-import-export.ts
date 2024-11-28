import { Product, taxCalculation } from "./06-fuction-destructuring";

const shoppipngCart: Product[] = [
  {
    description: "Nokia",
    price: 100,
  },
  {
    description: "iPad",
    price: 150,
  },
];

const [total, tax] = taxCalculation({
  products: shoppipngCart,
  tax: 0.15,
});

console.log("Total", total);
console.log("Tax", tax);
