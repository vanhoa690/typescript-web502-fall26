// const Product
// enum
enum ProductRate {
  low = "thấp",
  high = "cao",
}

const product: { name: string; rate: ProductRate; price: number } = {
  name: "laptop",
  rate: ProductRate.low,
  price: 10000,
};

console.log(product);

const listProducts: { name: string; rate: ProductRate; price: number }[] = [
  {
    name: "laptop1",
    rate: ProductRate.low,
    price: 10000,
  },
  {
    name: "laptop2",
    rate: ProductRate.high,
    price: 10000,
  },
];

function calPrice(list: { name: string; rate: ProductRate; price: number }[]) {
  return 111;
}
console.log(listProducts);
console.log(calPrice(listProducts));
