# Lesson 7 - React + TypeScript: State và useState

## 1. Mục tiêu bài học

Sau bài học này, sinh viên có thể:

- Hiểu State.
- Hiểu sự khác nhau giữa Props và State.
- Sử dụng `useState`.
- Thay đổi State.
- Hiểu React render lại giao diện khi State thay đổi.
- Sử dụng State với TypeScript.
- Kết hợp Props + State.
- Xây dựng ứng dụng Counter và Todo đơn giản.

---

# 2. State là gì?

State là dữ liệu bên trong Component có thể thay đổi theo thời gian.

Ví dụ:

```text
Số lượng sản phẩm
Tên người dùng
Trạng thái đăng nhập
Danh sách sản phẩm
Trạng thái mở/đóng menu
```

Ví dụ Counter:

```text
count = 0

Click +
   ↓

count = 1

Click +
   ↓

count = 2
```

Khi State thay đổi, React cập nhật lại giao diện.

---

# 3. useState

React cung cấp Hook `useState` để quản lý State.

```tsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>Tăng</button>
    </div>
  );
}

export default App;
```

---

# 4. Giải thích useState

Dòng:

```tsx
const [count, setCount] = useState(0);
```

Có thể hiểu:

```text
count
↓
Giá trị hiện tại

setCount
↓
Function dùng để thay đổi count
```

Ban đầu:

```text
count = 0
```

Khi:

```tsx
setCount(1);
```

State trở thành:

```text
count = 1
```

React cập nhật lại UI.

---

# 5. Không thay đổi State trực tiếp

Không nên:

```tsx
count = count + 1;
```

Phải sử dụng:

```tsx
setCount(count + 1);
```

React cần biết State thay đổi thông qua Setter.

---

# 6. TypeScript tự suy luận kiểu State

Ví dụ:

```tsx
const [count, setCount] = useState(0);
```

TypeScript hiểu:

```text
count: number
```

Ví dụ:

```tsx
const [name, setName] = useState("Hòa");
```

TypeScript hiểu:

```text
name: string
```

---

# 7. State kiểu Boolean

Ví dụ trạng thái hiển thị:

```tsx
const [isOpen, setIsOpen] = useState(false);
```

Thay đổi:

```tsx
setIsOpen(true);
```

hoặc:

```tsx
setIsOpen(false);
```

Có thể dùng:

```tsx
<button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
```

---

# 8. State kiểu Object

Tạo interface:

```tsx
interface User {
  id: number;
  name: string;
  age: number;
}
```

Khai báo:

```tsx
const [user, setUser] = useState<User | null>(null);
```

Cập nhật:

```tsx
setUser({
  id: 1,
  name: "Hòa",
  age: 30,
});
```

---

# 9. State kiểu Array

Ví dụ danh sách sản phẩm:

```tsx
interface Product {
  id: number;
  name: string;
  price: number;
}
```

Khai báo:

```tsx
const [products, setProducts] = useState<Product[]>([]);
```

Thêm sản phẩm:

```tsx
setProducts([
  ...products,
  {
    id: 1,
    name: "iPhone",
    price: 20000000,
  },
]);
```

---

# 10. Props và State khác nhau

| Props                 | State                       |
| --------------------- | --------------------------- |
| Nhận từ Component cha | Quản lý bên trong Component |
| Không nên tự thay đổi | Có thể thay đổi             |
| Dùng truyền dữ liệu   | Dùng lưu dữ liệu thay đổi   |
| Parent → Child        | Component tự quản lý        |
| Được truyền qua JSX   | Thường dùng `useState`      |

Có thể hình dung:

```text
Parent
  │
  │ Props
  ↓
Child
  │
  │ State
  ↓
UI
```

---

# 11. Kết hợp Props và State

Ví dụ Component `Counter` nhận giá trị ban đầu từ Props:

```tsx
import { useState } from "react";

interface CounterProps {
  initialValue: number;
}

function Counter({ initialValue }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  return (
    <div>
      <h2>{count}</h2>

      <button onClick={() => setCount(count + 1)}>Tăng</button>
    </div>
  );
}

export default Counter;
```

Component cha:

```tsx
function App() {
  return (
    <div>
      <Counter initialValue={10} />
      <Counter initialValue={100} />
    </div>
  );
}
```

Kết quả:

```text
10    [Tăng]

100   [Tăng]
```

Mỗi Component `Counter` có State riêng.

---

# 12. State và Event

State thường kết hợp với Event.

Ví dụ:

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={handleIncrease}>Tăng</button>
    </div>
  );
}
```

Luồng hoạt động:

```text
User click
    ↓
Event
    ↓
setCount()
    ↓
State thay đổi
    ↓
React render lại
    ↓
UI thay đổi
```

Đây là tư duy rất quan trọng khi học React.

---

# 13. Bài tập thực hành 1 - Counter

Tạo Component:

```text
Counter
```

Yêu cầu:

- Hiển thị số hiện tại.
- Button `+`.
- Button `-`.
- Button `Reset`.
- Sử dụng `useState`.

Giao diện:

```text
---------------------

       Counter

          0

     [-] [+] [Reset]

---------------------
```

---

# 14. Bài tập thực hành 2 - Show/Hide

Tạo Button:

```text
[Hiển thị thông tin]
```

Khi click:

```text
Tên: Nguyễn Văn A
Email: example@gmail.com
```

Click lần nữa:

```text
Thông tin được ẩn
```

Gợi ý:

```tsx
const [isShow, setIsShow] = useState(false);
```

---

# 15. Bài tập thực hành 3 - Todo

Xây dựng ứng dụng Todo.

Cấu trúc:

```text
App
│
├── TodoForm
│
└── TodoList
    │
    ├── TodoItem
    ├── TodoItem
    └── TodoItem
```

Yêu cầu:

- Thêm Todo.
- Hiển thị Todo.
- Xóa Todo.
- Đánh dấu hoàn thành.
- Sử dụng `useState`.
- Sử dụng Props.
- Sử dụng Event.
- Chia thành nhiều Component.

---

# 16. Bài tập tổng hợp

Xây dựng ứng dụng quản lý sản phẩm đơn giản.

Cấu trúc:

```text
App
│
├── Header
│
├── ProductForm
│
└── ProductList
    │
    ├── ProductItem
    ├── ProductItem
    └── ProductItem
```

Product:

```tsx
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}
```

Yêu cầu:

- Hiển thị danh sách sản phẩm.
- Thêm sản phẩm.
- Xóa sản phẩm.
- Sử dụng `useState`.
- Truyền dữ liệu bằng Props.
- Truyền Function bằng Props.
- Sử dụng Event.
- Tách Component.

---

# 17. Tổng kết 3 Lesson

Sau 3 Lesson, sinh viên cần nắm được:

```text
React
 │
 ├── JSX
 │
 ├── Component
 │     │
 │     └── Function Component
 │
 ├── Props
 │     │
 │     └── Callback Function
 │
 ├── Event
 │
 └── State
       │
       └── useState
```

Luồng tư duy cơ bản:

```text
Component
    ↓
Props
    ↓
Event
    ↓
State
    ↓
UI cập nhật
```

---
