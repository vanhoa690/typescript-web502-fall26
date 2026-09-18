# Hướng dẫn về Hàm trong TypeScript

Hướng dẫn này bao gồm các khái niệm chính về hàm trong TypeScript, bao gồm hàm mũi tên (arrow function), kiểu trả về, kiểu hàm, tham số, và cấu hình trình biên dịch TypeScript.

## 1.1 Hàm trả về giá trị (Function Return) hoặc Kiểu Void

Hàm trong TypeScript có thể khai báo kiểu trả về rõ ràng bằng cách sử dụng dấu hai chấm (`:`) theo sau là kiểu dữ liệu sau danh sách tham số. Điều này đảm bảo an toàn kiểu cho giá trị trả về.

```typescript
function add(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => a * b;
```

Kiểu `void` được sử dụng cho các hàm không trả về giá trị hoặc trả về `undefined`.

```typescript
function logMessage(message: string): void {
  console.log(message);
}
```

## 1.2 Hàm với tham số (Function with Parameters)

TypeScript cho phép bạn định nghĩa kiểu tham số một cách rõ ràng để đảm bảo an toàn kiểu.

```typescript
function sayHello(name: string, age: number): string {
  return `Xin chào, ${name} - ${age}`;
}
```

### 1.3 Tham số mặc định (Default Parameter)

Tham số mặc định cho phép gán giá trị mặc định nếu tham số không được cung cấp.

```typescript
function sayHelloUser(name: string, age: number = 20): string {
  return `Xin chào, ${name} - ${age}`;
}

console.log(sayHelloUser("hoadv")); // Kết quả: Xin chào, hoadv - 20!
console.log(sayHelloUser("hoadv", 30)); // Kết quả: Xin chào, hoadv - 30!
```

### 1.4 Tham số tùy chọn (Optional Parameter)

Tham số tùy chọn được đánh dấu bằng dấu `?` và có thể bị bỏ qua khi gọi hàm.

```typescript
function sayHelloPerson(name: string, age?: number): string {
  if (age) {
    return `${name} is ${age} years old.`;
  }
  return `${name} has no age specified.`;
}

console.log(sayHelloPerson("hoadv")); // Kết quả: hoadv has no age specified.
console.log(sayHelloPerson("hoadv", 25)); // Kết quả: hoadv is 25 years old.
```

### 1.5 Toán tử Rest (Rest Parameter)

Toán tử reset (`...`) cho phép truyền một mảng các giá trị vào hàm như các tham số riêng lẻ.

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // Kết quả: 6
console.log(sum(4, 5, 6, 7)); // Kết quả: 22
```

### 1.6 Spread (Spread Operator)

Dùng để tách mảng / object thành các phần tử riêng lẻ

```typescript
const arr1: number[] = [1, 2, 3];
const arr2: number[] = [4, 5];

const arr3 = [...arr1, ...arr2];
console.log(arr3); // [1, 2, 3, 4, 5]
```

## Thực hành Lab 3:

## 1: Hàm tính điểm trung bình (Return type + Arrow Function)

### Yêu cầu

- Viết hàm `averageScore`
- Nhận vào **nhiều điểm số** (`number`)
- Trả về **điểm trung bình** (`number`)
- Sử dụng **arrow function** và **rest parameter**

### Ví dụ

```ts
averageScore(8, 9, 10); // 9
averageScore(5, 6, 7, 8); // 6.5
```

### Gợi ý

```ts
(...scores: number[]) => number;
```

---

### 2: Định nghĩa kiểu hàm kiểm tra số chẵn lẻ

### Yêu cầu

- Định nghĩa kiểu cho hàm kiểm tra số
- Hàm nhận vào **1 số** (`number`)
- Trả về `"even"` hoặc `"odd"`

### Ví dụ

```ts
checkNumber(4); // "even"
checkNumber(7); // "odd"
```

### Gợi ý

```ts
function checkNumber = (n: number) => string;
```

---

### 3: Hàm tạo thông tin người dùng (Default + Optional Parameter)

### Yêu cầu

- Viết hàm `createUser`
- Tham số:
  - `name`: `string` (bắt buộc)
  - `age`: `number` (tùy chọn)
  - `role`: `string` (mặc định `"user"`)
- Trả về chuỗi mô tả người dùng

### Ví dụ

```ts
createUser("Hòa");
// "Name: Hòa, Role: user"

createUser("Nam", 25, "admin");
// "Name: Nam, Age: 25, Role: admin"
```

---

### 4: Hàm xử lý danh sách sản phẩm (Spread + Rest)

### Yêu cầu

- Viết hàm `mergeProducts`
- Nhận vào **2 mảng sản phẩm**
- Trả về **mảng mới đã gộp**
- Viết thêm hàm `printProducts` để in danh sách ra console

### Ví dụ

```ts
const a = ["iPhone", "Samsung"];
const b = ["Xiaomi", "Oppo"];

mergeProducts(a, b);
// ["iPhone", "Samsung", "Xiaomi", "Oppo"]
```

### Gợi ý

- Dùng **spread**

```ts
[...arr1, ...arr2];
```

- Dùng **rest**

```ts
(...products: string[])
```
