// function
function sum(a: number, b: number): number {
  return a + b;
}

console.log(sum(3, 4));

function sayHello(name: string): string {
  return "Xin chao " + name;
}

sayHello("hoadv"); // Xin chao hoadv

function sayHiAnhTrai(name: string): void {
  console.log("Xin chao " + name);
}

sayHiAnhTrai("hoadv");

// arrow function
const sumAB = (a: number, b: number): number => {
  return a + b;
};
sumAB(3, 4);

// default params

const sayHellerUser = (user: string | number = "hoadv") => {
  return user;
};
console.log(sayHellerUser());
console.log(sayHellerUser("namdv"));
console.log(sayHellerUser(66));

// option param
const sayHelloPerson = (user?: string) => {
  return user;
};

console.log(sayHelloPerson());

const createUser = (name: string, age?: number, role = "user") => {
  console.log(name, age, role);
};

createUser("hoadv", 36, "admin");

const callTotalPrice = (...prices: number[]) => {
  console.log(prices); // [...prices]
};

callTotalPrice(10000, 2000, 30000);

// array:
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [...arr1, ...arr2]; // chia ra arr1: [1,2,3,4]
console.log(arr3);

const obj1 = {
  id: 1,
  name: "hoadv",
};

const obj2 = {
  age: 36,
};

const obj3 = { ...obj1, ...obj2 };

console.log(obj3);

const mergeProducts = (...products: string[][]): void => {
  console.log(products.flat());
};

const a = ["iPhone", "Samsung"];
const b = ["Xiaomi", "Oppo"];
mergeProducts(a, b);
