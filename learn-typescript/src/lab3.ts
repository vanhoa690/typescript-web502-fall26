// function
function sum(a: number, b: number): number {
  return a + b;
}

sum(3, 4);

function sayHello(name: string): string {
  return "Xin chao " + name;
}

sayHello("hoadv"); // Xin chao hoadv

function sayHiAnhTrai(name: string): void {
  console.log("Xin chao " + name);
}

// arrow function
const sumAB = (a: number, b: number): number => {
  return a + b;
};
sumAB(3, 4);
