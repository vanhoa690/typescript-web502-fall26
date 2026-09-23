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
sv1.showStudent();
