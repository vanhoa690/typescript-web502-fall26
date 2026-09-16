# Hướng Dẫn TypeScript Cơ Bản

TypeScript là một siêu tập hợp của JavaScript, bổ sung tính năng kiểm tra kiểu tĩnh và các công cụ hỗ trợ lập trình hướng đối tượng. Dưới đây là hướng dẫn cơ bản về các kiểu dữ liệu và các khái niệm quan trọng trong TypeScript.

## 1. Core Types: number, string, boolean

TypeScript hỗ trợ các kiểu dữ liệu cơ bản giống JavaScript:

- **number**: Đại diện cho cả số nguyên và số thực.

  ```typescript
  let age: number = 25;
  let price: number = 19.99;
  ```

- **string**: Đại diện cho chuỗi ký tự.

  ```typescript
  let name: string = "hoadv";
  let greeting: string = `Hello, ${name}!`;
  ```

- **boolean**: Đại diện cho giá trị `true` hoặc `false`.
  ```typescript
  let isActive: boolean = true;
  let isLoading: boolean = false;
  ```

## 2. Type Inference

TypeScript tự động suy ra kiểu dữ liệu khi bạn khai báo và gán giá trị cho biến mà không chỉ định kiểu rõ ràng. Đây được gọi là **type inference**.

```typescript
let count = 10; // TypeScript suy ra count là number
count = "string"; // Lỗi: Type 'string' không thể gán cho type 'number'
```

Tuy nhiên, bạn nên chỉ định kiểu rõ ràng trong các trường hợp phức tạp để đảm bảo code rõ ràng và dễ bảo trì.

## 3. Core Types: object

Kiểu **object** đại diện cho các đối tượng. Bạn có thể chỉ định cấu trúc của đối tượng bằng cách định nghĩa các thuộc tính và kiểu của chúng.

```typescript
let person: { name: string; age: number } = {
  name: "Alice",
  age: 30,
};
```

Lưu ý: TypeScript sẽ kiểm tra tính hợp lệ của các thuộc tính trong đối tượng.

## 4. Core Types: array

Kiểu **array** cho phép lưu trữ một danh sách các giá trị cùng kiểu.

```typescript
let numbers: number[] = [1, 2, 3, 4];
let names: string[] = ["Alice", "Bob", "Charlie"];
```

Bạn cũng có thể sử dụng cú pháp generic:

```typescript
let scores: Array<number> = [90, 85, 88];
```

## 5. Special Types: tuple

**Tuple** là một mảng có độ dài cố định và các phần tử có kiểu được xác định trước.

```typescript
let tuple: [string, number] = ["Alice", 25];
// Lỗi nếu sai kiểu hoặc độ dài
tuple = ["Bob", 30, "extra"]; // Lỗi: Độ dài không khớp
```

## 6. Special Types: any

Kiểu **any** cho phép biến có thể nhận bất kỳ giá trị nào, bỏ qua kiểm tra kiểu. Tuy nhiên, nên hạn chế sử dụng vì nó làm mất đi lợi ích của TypeScript.

```typescript
let data: any = 10;
data = "Hello"; // Không lỗi
data = true; // Không lỗi
```

## 7. Type: Union và Literal Type

- **Union Type**: Cho phép một biến có thể thuộc nhiều kiểu khác nhau.

  ```typescript
  let result: number | string;
  result = 42; // Hợp lệ
  result = "Success"; // Hợp lệ
  result = true; // Lỗi
  ```

- **Literal Type**: Chỉ định giá trị cụ thể mà biến có thể nhận.
  ```typescript
  let status: "success" | "error" | "loading";
  status = "success"; // Hợp lệ
  status = "failed"; // Lỗi
  ```

## 8. Null và Undefined

- **null**: Đại diện cho giá trị "không có gì".
- **undefined**: Đại diện cho biến chưa được gán giá trị.

```typescript
let value: string | null = null;
let score: number | undefined = undefined;
```

Lưu ý: Trong chế độ `strictNullChecks`, bạn phải khai báo rõ ràng `null` hoặc `undefined` trong union type.

## 9. Unknown và Any

- **unknown**: Tương tự `any`, nhưng an toàn hơn vì bạn phải kiểm tra kiểu trước khi sử dụng.

  ```typescript
  let input: unknown = 42;
  if (typeof input === "number") {
    let num: number = input; // Hợp lệ sau khi kiểm tra kiểu
  }
  ```

- So sánh với **any**:
  ```typescript
  let data: any = 10;
  let num: number = data; // Không cần kiểm tra, nhưng không an toàn
  ```

## 10. Type Assertions

**Type assertions** cho phép bạn "ép" TypeScript tin rằng một giá trị thuộc một kiểu cụ thể.

```typescript
let someValue: any = "This is a string";
let strLength: number = (someValue as string).length;
// Hoặc sử dụng cú pháp <>
let strLength2: number = (<string>someValue).length;
```

Lưu ý: Type assertions không thay đổi giá trị thực tế, chỉ thay đổi cách TypeScript nhìn nhận kiểu.

## Kết Luận

TypeScript giúp tăng cường khả năng kiểm tra kiểu và bảo trì mã nguồn. Các kiểu dữ liệu cơ bản và tính năng như type inference, union types, và type assertions giúp lập trình viên viết mã an toàn và dễ đọc hơn. Hãy bắt đầu sử dụng TypeScript trong dự án của bạn để tận dụng sức mạnh của kiểm tra kiểu tĩnh!

## Lab 2

- Tạo type Product có các trường sau:
  - name: string
  - price: number
  - sale: boolean
  - rate: enum {low : 'Thấp', medium: 'Trung bình', hight : 'Cao'}

- Tạo mảng listProducts có các phần tử có kiểu Product
  - Nhập ít nhất 5 phần tử

- Viết hàm thêm mới 1 phần tử vào mảng listProducts có key = description, có giá trị = 'Tốt' nếu price > 5, 'Bình thường' nếu price <=5 (sử dụng map)

- Viết hàm hiển thị danh sách sản phẩm: (Tên sản phẩm, giá bán, trạng thái sale,Đánh giá) (Sử dụng forEach)

- Viết hàm tính tổng giá bán sản phẩm (sử dụng reduce)

- Viết hàm lọc những sản phẩm đang Sale và đánh giá từ Trung bình trở lên (Sử dụng filter)
