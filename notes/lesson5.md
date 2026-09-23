# Hướng Dẫn Học React TypeScript Từ Đầu

Chào mừng bạn đến với hành trình học **React** với **TypeScript**! Tài liệu này sẽ giúp bạn làm quen với các khái niệm cơ bản như routes, props, state, `useState`, `useEffect`, chia component, và truyền props từ cha sang con. Chúng ta sẽ đi từng bước để bạn dễ dàng tiếp cận và áp dụng vào dự án thực tế.

## 1. Chuẩn bị môi trường

- **Cài đặt Node.js**: Tải từ [nodejs.org](https://nodejs.org/) và kiểm tra bằng `node -v`.
- **Tạo dự án với Vite**: Mở terminal, chạy:
  ```bash
  npm create vite@latest my-app -- --template react-ts
  cd my-app
  npm install
  npm run dev
  ```
- Mở trình duyệt tại `http://localhost:5173` để thấy app chạy.

## 2. Cấu trúc cơ bản

- **File chính**: `src/main.tsx` (entry point), `src/App.tsx` (component gốc).
- Thêm thư mục `src/components/` để chứa các component tự tạo.

## 3. Các khái niệm chính

### 3.1. Chia Component

- **Mục đích**: Tái sử dụng và tổ chức code tốt hơn.
- **Ví dụ**: Tạo file `src/components/Button.tsx`:

  ```tsx
  import React from "react";

  interface ButtonProps {
    label: string;
    onClick: () => void;
  }

  const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    return <button onClick={onClick}>{label}</button>;
  };

  export default Button;
  ```

- Sử dụng trong `App.tsx`:

  ```tsx
  import Button from "./components/Button";

  function App() {
    const handleClick = () => alert("Clicked!");
    return <Button label="Click me" onClick={handleClick} />;
  }
  ```

### 3.2. Truyền Props từ Cha sang Con

- **Props**: Dữ liệu từ component cha truyền xuống con.
- **Ví dụ**: Cập nhật `Button.tsx` và thêm `App.tsx`:

  ```tsx
  // src/components/Button.tsx
  interface ButtonProps {
    label: string;
    onClick: () => void;
    color?: string; // Prop tùy chọn
  }

  const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    color = "blue",
  }) => {
    return (
      <button style={{ color }} onClick={onClick}>
        {label}
      </button>
    );
  };

  export default Button;

  // src/App.tsx
  import Button from "./components/Button";

  function App() {
    return (
      <div>
        <Button
          label="Red Button"
          color="red"
          onClick={() => alert("Red clicked!")}
        />
        <Button label="Blue Button" onClick={() => alert("Blue clicked!")} />
      </div>
    );
  }
  ```

- **Lưu ý**: TypeScript yêu cầu định nghĩa interface cho props.

### 3.3. State và useState

- **State**: Dữ liệu thay đổi trong component.
- **Ví dụ**: Thêm state đếm số lần click:

  ```tsx
  import React, { useState } from "react";
  import Button from "./components/Button";

  function App() {
    const [count, setCount] = useState(0);

    return (
      <div>
        <p>Bạn đã click: {count} lần</p>
        <Button label="Tăng" onClick={() => setCount(count + 1)} />
      </div>
    );
  }
  ```

- `useState` trả về mảng `[state, setState]`, với kiểu TypeScript tự động suy ra.

### 3.4. useEffect

- **Mục đích**: Xử lý side effects (ví dụ: fetch data, cập nhật DOM).
- **Ví dụ**: Hiển thị thông báo khi `count` thay đổi:

  ```tsx
  import React, { useState, useEffect } from "react";
  import Button from "./components/Button";

  function App() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      document.title = `Bạn đã click ${count} lần`;
    }, [count]); // Chỉ chạy khi count thay đổi

    return (
      <div>
        <p>Bạn đã click: {count} lần</p>
        <Button label="Tăng" onClick={() => setCount(count + 1)} />
      </div>
    );
  }
  ```

### 3.5. Routes (Sử dụng React Router)

- **Cài đặt**: Chạy `npm install react-router-dom`.
- **Cấu hình**: Tạo các trang trong `src/pages/` (ví dụ: `Home.tsx`, `About.tsx`).
- **Ví dụ** trong `App.tsx`:

  ```tsx
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import Home from "./pages/Home";
  import About from "./pages/About";

  function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    );
  }

  // src/pages/Home.tsx
  const Home: React.FC = () => <h1>Trang chủ</h1>;
  export default Home;

  // src/pages/About.tsx
  const About: React.FC = () => <h1>Về chúng tôi</h1>;
  export default About;
  ```

- **Thêm navigation**: Tạo `src/components/Navbar.tsx`:

  ```tsx
  import { Link } from "react-router-dom";

  const Navbar: React.FC = () => {
    return (
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
    );
  };

  export default Navbar;
  ```

- Sử dụng trong `App.tsx`:
  ```tsx
  import Navbar from "./components/Navbar";
  // ... (các import khác)
  function App() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    );
  }
  ```

## 4. Lưu ý khi học

- **TypeScript**: Luôn định nghĩa type cho props, state, và callback để tránh lỗi.
- **Debug**: Dùng `console.log` hoặc React DevTools.
- **Tài liệu**: Tham khảo [React Docs](https://react.dev/) và [TypeScript Docs](https://www.typescriptlang.org/).

## 5. Thực hành

- Tạo một ứng dụng todo list:
  - Component `TodoList` hiển thị danh sách.
  - Component `TodoForm` thêm todo mới.
  - Sử dụng state, props, và routes để chuyển giữa các trang.

Hãy bắt đầu với các ví dụ trên và thực hành từng bước. Nếu cần hỗ trợ, cứ hỏi nhé!
