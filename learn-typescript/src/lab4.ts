// class: thuoc tinh, contructor, method
class Student {
  //property
  id: string;
  name: string;
  age: number;
  constructor(id: string, name: string, age: number) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
  // method
  showStudent() {
    console.log(this.id);
  }
}

const sv1 = new Student("ph333", "hoadv", 30);
const sv2 = new Student("ph444", "namedv", 20);
sv1.showStudent();

// Interface: object
interface User {
  name: string;
  age: number;
}
// Type: object
type UserInfo = {
  id: number;
  name: string;
  age: number;
};
const user: UserInfo = {
  id: 1,
  name: "hoadv",
  age: 30,
};

const users: User[] = [
  {
    name: "hoadv",
    age: 30,
  },
];
