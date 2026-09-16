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
