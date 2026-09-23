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
// Type: object / Literal
type UserInfo = {
  id: number;
  name: string;
  age: number;
};
type StudentInfo = {
  class: string;
};

const newStudent: UserInfo & StudentInfo = {
  id: 1,
  name: "hoadv",
  age: 30,
  class: "typescript",
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

// Generic <T>: useState<T>()
function getValue<T>(value: T): T {
  return value;
}

getValue<string>("3");
getValue(1);
getValue<User>({ name: "hoadv", age: 30 });
