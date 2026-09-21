# TypeScript Cơ Bản: Class, Interface, Type & Generics

## 1. Class

Class dùng để tạo đối tượng gồm **thuộc tính** và **phương thức**.

```ts
class Person {
  name: string;

  constructor(public name: string) {
    this.name = name;
  }

  greet() {
    console.log(`Xin chào ${this.name}`);
  }
}

const p = new Person("An", 20);
p.greet();
```

---

## 2. Interface

Interface dùng để định nghĩa cấu trúc của một object.

```ts
interface User {
  id: number;
  name: string;
  email?: string;
}

const user: User = {
  id: 1,
  name: "Hòa",
};
```

---

## 3. Type

Khai báo kiểu dữ liệu cho object hoặc tập giá trị.

```ts
type Product = {
  id: number;
  name: string;
  price: number;
};

type Status = "loading" | "success" | "error";
```

---

## 4. Intersection Type

Gộp nhiều kiểu dữ liệu thành một.

```ts
type Person = {
  name: string;
};

type Employee = {
  employeeId: string;
};

type EmployeeInfo = Person & Employee;

const emp: EmployeeInfo = {
  name: "Hòa",
  employeeId: "GV001",
};
```

---

## 5. Enum

Dùng cho các giá trị cố định.

```ts
enum Role {
  Admin = "ADMIN",
  User = "USER",
}

let role = Role.Admin;
```

---

## 6. Generic

Viết hàm có thể làm việc với nhiều kiểu dữ liệu.

```ts
function identity<T>(value: T): T {
  return value;
}

identity(10);
identity("Hello");
```

---

# Bài tập thực hành

## Bài 1

Tạo `class Student` gồm:

- id
- name
- phương thức `display()`

---

## Bài 2

Tạo `interface User`

- id
- email
- phone (optional)

---

## Bài 3

Tạo `type Product`

- id
- name
- price

Khai báo một object theo type trên.

---

## Bài 4

Tạo

```ts
type Status = "loading" | "success" | "error";
```

Viết hàm:

```ts
function logStatus(status: Status);
```

Hiển thị thông báo tương ứng.

---

## Bài 5

Viết hàm Generic

```ts
function identity<T>(value: T): T;
```

Gọi thử với:

- number
- string
- boolean
