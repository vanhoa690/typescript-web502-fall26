# Lesson 6 - React + TypeScript: Props và Event

## 1. Mục tiêu bài học

Sau bài học này, sinh viên có thể:

- Hiểu Props.
- Truyền dữ liệu từ Component cha xuống Component con.
- Định nghĩa Props bằng TypeScript.
- Sử dụng Props tùy chọn.
- Truyền Function thông qua Props.
- Xử lý sự kiện trong React.
- Kết hợp Component + Props + Event.

---

# 2. Props là gì?

Props là dữ liệu được truyền từ Component cha xuống Component con.

Ví dụ:

```text
App
 │
 │ name
 ↓
User
```

Component cha:

```tsx
<User name="Hòa" />
```

Component con:

```tsx
function User(props) {
  return <h2>Xin chào {props.name}</h2>;
}
```

Kết quả:

```text
Xin chào Hòa
```

---

# 3. Props với TypeScript

Trong TypeScript, chúng ta nên định nghĩa kiểu dữ liệu cho Props.

```tsx
interface UserProps {
  name: string;
  age: number;
}
```

Component:

```tsx
interface UserProps {
  name: string;
  age: number;
}

function User({ name, age }: UserProps) {
  return (
    <div>
      <h2>Tên: {name}</h2>
      <p>Tuổi: {age}</p>
    </div>
  );
}

export default User;
```

Sử dụng:

```tsx
function App() {
  return <User name="Hòa" age={30} />;
}
```

---

# 4. Props giúp TypeScript kiểm tra dữ liệu

Đúng:

```tsx
<User name="Hòa" age={30} />
```

Sai:

```tsx
<User name={123} age="30" />
```

Vì:

```text
name → string
age  → number
```

---

# 5. Props tùy chọn

Thêm dấu `?`:

```tsx
interface ButtonProps {
  label: string;
  color?: string;
}
```

Có thể sử dụng:

```tsx
<Button label="Đăng nhập" />
```

hoặc:

```tsx
<Button label="Đăng nhập" color="red" />
```

Có thể đặt giá trị mặc định:

```tsx
function Button({ label, color = "blue" }: ButtonProps) {
  return <button style={{ color }}>{label}</button>;
}
```

---

# 6. Props là Function

Props có thể truyền Function.

Ví dụ:

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}
```

Component:

```tsx
function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

export default Button;
```

Component cha:

```tsx
function App() {
  const handleClick = () => {
    alert("Bạn vừa click button");
  };

  return <Button label="Click me" onClick={handleClick} />;
}
```

Luồng dữ liệu:

```text
App
 │
 │ onClick
 ↓
Button
 │
 ↓
button
```

---

# 7. Event trong React

React sử dụng event để xử lý hành động của người dùng.

Ví dụ:

```tsx
<button onClick={handleClick}>Click</button>
```

Một số event thường gặp:

```text
onClick
onChange
onSubmit
onMouseEnter
onKeyDown
```

---

# 8. Event với TypeScript

Ví dụ input:

```tsx
function App() {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return <input onChange={handleChange} />;
}
```

Có thể import type:

```tsx
import type { ChangeEvent } from "react";
```

Sau đó:

```tsx
const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value);
};
```

---

# 9. Event click

Ví dụ:

```tsx
function App() {
  const handleClick = () => {
    alert("Hello React");
  };

  return <button onClick={handleClick}>Click</button>;
}
```

Có thể viết trực tiếp:

```tsx
<button onClick={() => alert("Hello")}>Click</button>
```

---

# 10. Props + Event

Ví dụ tạo Button dùng chung:

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

Sử dụng:

```tsx
function App() {
  const handleLogin = () => {
    alert("Đăng nhập");
  };

  const handleRegister = () => {
    alert("Đăng ký");
  };

  return (
    <div>
      <Button label="Đăng nhập" onClick={handleLogin} />

      <Button label="Đăng ký" onClick={handleRegister} />
    </div>
  );
}
```

Một Component có thể tái sử dụng nhiều lần với Props khác nhau.

---

# 11. Bài tập thực hành 1 - UserCard

Tạo:

```text
UserCard
```

Props:

```tsx
interface UserProps {
  name: string;
  age: number;
  email: string;
}
```

Hiển thị:

```text
----------------------
Tên: Nguyễn Văn A
Tuổi: 20
Email: example@gmail.com
----------------------
```

Trong `App.tsx` tạo ít nhất 3 UserCard.

---

# 12. Bài tập thực hành 2 - Button

Tạo Component:

```text
Button
```

Props:

```tsx
interface ButtonProps {
  label: string;
  color?: string;
  onClick: () => void;
}
```

Yêu cầu:

- Hiển thị label.
- Nhận màu từ Props.
- Click Button thực hiện Function từ Component cha.

---

# 13. Bài tập thực hành 3 - ProductItem

Tạo:

```tsx
interface ProductProps {
  name: string;
  price: number;
  category: string;
}
```

Ví dụ:

```tsx
<ProductItem name="iPhone" price={20000000} category="Điện thoại" />
```

---

# 14. Bài tập thực hành 4 - TodoForm

Tạo Component:

```text
TodoForm
```

Có:

```text
[ Nhập công việc             ]

        [Thêm]
```

Khi click `Thêm`, gọi Function được truyền từ Component cha thông qua Props.

---

# 15. Tổng kết

Sau Lesson 6 cần hiểu:

```text
Parent
   │
   │ Props
   ↓
Child
```

Props có thể là:

```text
String
Number
Boolean
Object
Array
Function
```

Ví dụ:

```tsx
interface Props {
  name: string;
  age: number;
  active: boolean;
  onClick: () => void;
}
```

Kiến thức trọng tâm:

```text
Component
    ↓
Props
    ↓
Event
    ↓
Callback Function
```
