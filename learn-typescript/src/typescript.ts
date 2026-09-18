console.log("typescript");

let age: number = 25;
age = 30;

let myName: string = "hoadv";
myName = "20";

let dihockhong: boolean = true;
dihockhong = false;

let myYear = 2005;
// myYear = "20008"; // error

// object: chua nhieu thuoc tinh
const student: { name: string; age: number; isActive: boolean } = {
  name: "hoadv",
  age: 34,
  isActive: true,
};

// enum
enum status {
  done = "hoàn thành",
  doing = "đang làm",
}

// array: []: nhieu phan tu
const numbers: number[] = [1, 2, 3, 4];
const students: string[] = ["nam", "an"];
const products: { name: string }[] = [{ name: "laptop" }, { name: "laptop" }];

// any: ko quan tam kieu du lieu , code js
let data: any = "data";
data = 1;

// Union: ket hop |
let result: string | number = "ket qua";
result = 3;

// Literal : |
let doSomething: "success" | "error" = "success";

// Null va Underfined
let value: null | undefined;
