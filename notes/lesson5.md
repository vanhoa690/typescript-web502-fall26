# Lesson 5 - React + TypeScript: JSX và Component

## 1. Mục tiêu bài học

Sau bài học này, sinh viên có thể:

- Hiểu React là gì.
- Tạo project React + TypeScript bằng Vite.
- Hiểu JSX.
- Phân biệt JSX và HTML.
- Hiểu Component.
- Tạo Function Component.
- Tách Component thành các file riêng.
- Sử dụng Component trong `App.tsx`.

---

## 2. React là gì?

React là thư viện JavaScript dùng để xây dựng giao diện người dùng.

React cho phép chúng ta chia giao diện thành nhiều Component nhỏ.

Ví dụ:

```text
Website
│
├── Header
├── Navbar
├── ProductList
│   ├── ProductItem
│   ├── ProductItem
│   └── ProductItem
├── Sidebar
└── Footer
```

Thay vì viết toàn bộ giao diện trong một file lớn, chúng ta chia giao diện thành nhiều Component.

Lợi ích:

- Code dễ đọc.
- Dễ tái sử dụng.
- Dễ bảo trì.
- Dễ phát triển dự án lớn.

---

# 3. Chuẩn bị môi trường

## 3.1. Cài Node.js

Tải Node.js tại:

https://nodejs.org/

Kiểm tra:

```bash
node -v
npm -v
```

---

# 4. Tạo project React + TypeScript

Sử dụng Vite:

```bash
npm create vite@latest react-ts-demo -- --template react-ts
```

Di chuyển vào project:

```bash
cd react-ts-demo
```

Cài package:

```bash
npm install
```

Chạy project:

```bash
npm run dev
```

Mở trình duyệt:

```text
http://localhost:5173
```

---

# 5. Cấu trúc project

```text
react-ts-demo
│
├── public
├── src
│   ├── assets
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── tsconfig.json
└── vite.config.ts
```

Hai file quan trọng:

- `main.tsx`: điểm bắt đầu của ứng dụng React.
- `App.tsx`: Component chính.

---

# 6. JSX là gì?

JSX là cú pháp cho phép chúng ta viết giao diện giống HTML bên trong JavaScript/TypeScript.

Ví dụ:

```tsx
function App() {
  return (
    <div>
      <h1>Hello React</h1>
      <p>Xin chào React + TypeScript</p>
    </div>
  );
}

export default App;
```

Phần:

```tsx
<h1>Hello React</h1>
```

là JSX.

JSX giúp việc viết giao diện trong React trực quan hơn.

---

# 7. JSX không hoàn toàn giống HTML

JSX nhìn giống HTML nhưng có một số khác biệt.

HTML:

```html
<div class="container">
  <h1>Hello</h1>
</div>
```

JSX:

```tsx
<div className="container">
  <h1>Hello</h1>
</div>
```

Một số thuộc tính thường gặp:

| HTML      | JSX         |
| --------- | ----------- |
| `class`   | `className` |
| `for`     | `htmlFor`   |
| `onclick` | `onClick`   |

---

# 8. Hiển thị dữ liệu trong JSX

Có thể đưa JavaScript vào JSX bằng `{}`.

```tsx
function App() {
  const name = "Hòa";
  const age = 30;

  return (
    <div>
      <h1>Xin chào {name}</h1>
      <p>Tuổi: {age}</p>
    </div>
  );
}
```

Có thể sử dụng biểu thức:

```tsx
<p>{10 + 20}</p>
```

Kết quả:

```text
30
```

---

# 9. Component là gì?

Component là một phần giao diện được đóng gói thành một khối riêng.

Ví dụ:

```tsx
function Button() {
  return <button>Đăng nhập</button>;
}
```

Sử dụng:

```tsx
function App() {
  return (
    <div>
      <Button />
    </div>
  );
}
```

Có thể hiểu:

```text
Button Component
       ↓
    <button>
```

---

# 10. Function Component

Trong React hiện đại, chúng ta thường sử dụng Function Component.

Ví dụ:

```tsx
function Header() {
  return (
    <header>
      <h1>My Website</h1>
    </header>
  );
}

export default Header;
```

Sử dụng:

```tsx
import Header from "./Header";

function App() {
  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
```

---

# 11. Quy tắc đặt tên Component

Tên Component nên viết hoa chữ cái đầu:

```tsx
function Header() {}
function Footer() {}
function ProductList() {}
function ProductItem() {}
```

Sử dụng:

```tsx
<Header />
<Footer />
<ProductList />
<ProductItem />
```

Không nên:

```tsx
function header() {}
function product() {}
```

---

# 12. Tách Component thành file riêng

Tạo cấu trúc:

```text
src
│
├── components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Button.tsx
│
├── App.tsx
└── main.tsx
```

`Header.tsx`:

```tsx
function Header() {
  return (
    <header>
      <h1>My Website</h1>
    </header>
  );
}

export default Header;
```

`App.tsx`:

```tsx
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
```

---

# 13. Bài tập thực hành

## Bài 1

Tạo Component `Header`:

```text
Header
├── Logo
└── Menu
```

## Bài 2

Tạo Component `Footer`.

## Bài 3

Tạo Component `ProductItem` và hiển thị:

```text
Tên sản phẩm
Giá
Danh mục
```

## Bài 4

Tạo giao diện:

```text
App
│
├── Header
├── ProductList
│   ├── ProductItem
│   ├── ProductItem
│   └── ProductItem
└── Footer
```

---

# 14. Tổng kết

Sau Lesson 5 cần hiểu:

```text
React
 │
 ├── JSX
 │
 └── Component
       │
       └── Function Component
```

Chưa cần học `useState`, `useEffect` hay Router ở bài này.
