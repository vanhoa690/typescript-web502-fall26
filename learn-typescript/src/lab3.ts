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
