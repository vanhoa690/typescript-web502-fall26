# Lesson 12 - React + TypeScript: Login, lưu Token và Private Route

## 1. Mục tiêu bài học

Sau bài học này, sinh viên có thể:

- Tạo Form đăng nhập bằng React Hook Form.
- Validate email và mật khẩu.
- Kết nối API đăng nhập bằng Axios.
- Lưu `accessToken` và thông tin người dùng vào `localStorage`.
- Sử dụng React Router để điều hướng sau khi đăng nhập.
- Bảo vệ trang `/add` bằng `PrivateRoute`.
- Đăng xuất và xóa thông tin đăng nhập.

**Yêu cầu của bài:** Đăng nhập thành công thì chuyển đến trang `/`. Chỉ trang `/add` yêu cầu đăng nhập. Không tạo trang Dashboard.

---

## 2. Ôn tập Lesson 11

Ở Lesson 11, chúng ta đã tạo trang `RegisterPage.tsx` để đăng ký tài khoản bằng React Hook Form, Axios và JSON Server Auth.

Lesson 12 tiếp tục sử dụng API:

```http
POST http://localhost:3000/login
```

Ví dụ dữ liệu gửi lên:

```json
{
  "email": "student@example.com",
  "password": "React123!"
}
```

Phản hồi thành công có thể có dạng:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "student@example.com",
    "fullName": "Nguyễn Văn An"
  }
}
```

Đây là dữ liệu minh họa. Cấu trúc thực tế phụ thuộc phiên bản và cấu hình JSON Server Auth.

Chạy backend:

```bash
npm run db
```

---

## 4. Code hoàn chỉnh `LoginPage.tsx`

Tạo file `src/pages/LoginPage.tsx`. Toàn bộ logic của Form, gọi API, lưu Token và chuyển trang nằm trong file này.

```tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginFormData {
  email: string;
  password: string;
}

interface User {
  id: string | number;
  email: string;
  fullName?: string;
}

interface LoginResponse {
  accessToken: string;
  user: User;
}

function LoginPage() {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:3000/login",
        {
          email: data.email.trim().toLowerCase(),
          password: data.password,
        },
      );

      const { accessToken, user } = response.data;

      if (!accessToken || !user?.id || !user?.email) {
        setMessage("API không trả về đầy đủ thông tin đăng nhập.");
        return;
      }

      // Lưu Token và thông tin người dùng.
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      setIsSuccess(true);
      setMessage("Đăng nhập thành công!");

      reset();

      // Đăng nhập thành công thì chuyển đến trang chủ "/".
      navigate("/", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          setMessage("Email hoặc mật khẩu không chính xác.");
        } else {
          setMessage("Đăng nhập thất bại. Vui lòng kiểm tra kết nối API.");
        }
      } else {
        setMessage("Đã xảy ra lỗi không xác định.");
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "40px auto",
        padding: 24,
        border: "1px solid #ddd",
        borderRadius: 12,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Đăng nhập</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email", {
              required: "Vui lòng nhập email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email không hợp lệ",
              },
            })}
            placeholder="Nhập email"
            style={{
              width: "100%",
              padding: 10,
              marginTop: 6,
              boxSizing: "border-box",
            }}
          />

          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        {/* Mật khẩu */}
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="password">Mật khẩu</label>

          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password", {
              required: "Vui lòng nhập mật khẩu",
              minLength: {
                value: 8,
                message: "Mật khẩu phải có ít nhất 8 ký tự",
              },
            })}
            placeholder="Nhập mật khẩu"
            style={{
              width: "100%",
              padding: 10,
              marginTop: 6,
              boxSizing: "border-box",
            }}
          />

          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        {/* Thông báo kết quả */}
        {message && (
          <p
            role={isSuccess ? "status" : "alert"}
            style={{ color: isSuccess ? "green" : "red" }}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: 12,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
```

### Giải thích

- `axios.post("/login")`: gửi email và mật khẩu đến API.
- `localStorage.setItem("accessToken", accessToken)`: lưu Token.
- `localStorage.setItem("user", JSON.stringify(user))`: lưu thông tin người dùng.
- `navigate("/", { replace: true })`: chuyển đến trang chủ sau khi đăng nhập thành công.
- `isSubmitting`: vô hiệu hóa nút trong lúc request đang được xử lý.

---

## 5. Tạo `PrivateRoute.tsx` để bảo vệ trang `/add`

Tạo file `src/components/PrivateRoute.tsx`.

```tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";

function PrivateRoute() {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default PrivateRoute;
```

### Giải thích

- Nếu không có Token, chuyển người dùng đến `/login`.
- `state={{ from: location }}` lưu đường dẫn mà người dùng muốn truy cập.
- `Outlet` hiển thị Route con khi có Token.

**Lưu ý:** `PrivateRoute` chỉ kiểm tra ở frontend. Backend vẫn cần xác thực Token trên các API được bảo vệ. Việc có Token trong `localStorage` không đảm bảo Token còn hạn hoặc hợp lệ.

---

## 7. Cấu hình Route trong `App.tsx`

Trang `/` và `/login` là trang công khai. Chỉ `/add` được bảo vệ bằng `PrivateRoute`.

```tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";
import AddPage from "./pages/AddPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        {/* Trang đăng ký: công khai */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Trang đăng nhập: công khai */}
        <Route path="/login" element={<LoginPage />} />

        {/* Chỉ bảo vệ trang /add */}
        <Route element={<PrivateRoute />}>
          <Route path="/add" element={<AddPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Cấu trúc thư mục

```text
src/
├── components/
│   └── PrivateRoute.tsx
├── pages/
│   ├── RegisterPage.tsx
│   ├── LoginPage.tsx
│   └── HomePage.tsx
├── App.tsx
└── main.tsx
```

---

## 8. Đăng xuất

Có thể đặt chức năng đăng xuất trong trang chủ hoặc thanh điều hướng hiện có:

```tsx
const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");

  window.location.href = "/";
};
```

Sau khi đăng xuất, trang chủ `/` vẫn truy cập được. Khi người dùng truy cập `/add`, `PrivateRoute` sẽ chuyển họ đến `/login`.

Đây là thao tác xóa thông tin đăng nhập ở frontend. Nếu backend hỗ trợ thu hồi Token hoặc logout, ứng dụng thực tế nên gọi API tương ứng trước khi xóa dữ liệu phiên.

---

## 9. Kiểm tra chức năng

### Trường hợp 1 – Đăng nhập thành công

1. Chạy `npm run db`.
2. Mở `/login`.
3. Nhập email và mật khẩu đã đăng ký ở Lesson 11.
4. Nhấn **Đăng nhập**.
5. Kiểm tra trình duyệt chuyển đến `/`.
6. Mở DevTools → Application → Local Storage.
7. Kiểm tra có `accessToken` và `user`.

**Kết quả mong đợi:** Đăng nhập thành công và chuyển đến trang chủ `/`.

### Trường hợp 2 – Đăng nhập sai

1. Nhập email đúng nhưng mật khẩu sai.
2. Nhấn Đăng nhập.

**Kết quả mong đợi:** Hiển thị thông báo lỗi, không lưu Token mới và không chuyển trang.

### Trường hợp 3 – Truy cập `/add` khi chưa đăng nhập

1. Xóa `accessToken` và `user` trong Local Storage.
2. Truy cập trực tiếp `/add`.

**Kết quả mong đợi:** Trình duyệt chuyển đến `/login`.

### Trường hợp 4 – Trang chủ không cần đăng nhập

1. Xóa Token.
2. Truy cập `/`.

**Kết quả mong đợi:** Trang chủ vẫn hiển thị bình thường.

### Trường hợp 5 – Đăng xuất

1. Đăng nhập thành công.
2. Thực hiện đăng xuất.
3. Truy cập `/`.

**Kết quả mong đợi:** Trang chủ vẫn truy cập được nhưng không còn Token.

4. Truy cập `/add`.

**Kết quả mong đợi:** Chuyển đến `/login`.

---

## 10. Các lỗi thường gặp

| Lỗi                               | Nguyên nhân cần kiểm tra                                 |
| --------------------------------- | -------------------------------------------------------- |
| `Network Error`                   | JSON Server chưa chạy hoặc sai URL                       |
| `404 Not Found`                   | Sai endpoint `/login`                                    |
| `400` hoặc `401`                  | Sai thông tin đăng nhập hoặc phản hồi API khác           |
| Không chuyển về `/`               | Kiểm tra `useNavigate()` và cấu hình Router              |
| `/add` luôn chuyển về Login       | Kiểm tra Token có được lưu đúng khóa `accessToken` không |
| `useNavigate()` báo lỗi           | Component chưa nằm trong Router                          |
| `Outlet` không hiển thị           | Kiểm tra Route cha có sử dụng `PrivateRoute` không       |
| Token tồn tại nhưng API trả `401` | Token hết hạn, không hợp lệ hoặc sai cấu hình xác thực   |

---

## 11. Bài tập thực hành

### Bài 1 – Tạo Form Login

- Email bắt buộc và đúng định dạng.
- Mật khẩu bắt buộc, tối thiểu 8 ký tự.
- Hiển thị lỗi validation dưới từng trường.

### Bài 2 – Kết nối API

- Gửi `POST /login`.
- Hiển thị thông báo đăng nhập thành công hoặc thất bại.
- Vô hiệu hóa nút khi đang gửi request.

### Bài 3 – Lưu Token

- Lưu `accessToken` vào Local Storage.
- Lưu thông tin `user`.
- Kiểm tra dữ liệu trong DevTools.

### Bài 4 – Bảo vệ Route

- Trang `/` không yêu cầu đăng nhập.
- Trang `/login` không yêu cầu đăng nhập.
- Trang `/register` không yêu cầu đăng nhập.
- Trang `/add` yêu cầu có Token.

### Bài 5 – Đăng xuất

- Xóa Token và thông tin người dùng.
- Sau khi đăng xuất, vẫn truy cập được `/`.
- Sau khi đăng xuất, không truy cập được `/add`.

---

## 12. Kiến thức cần nhớ

| API / Thành phần            | Vai trò                                |
| --------------------------- | -------------------------------------- |
| `useForm()`                 | Quản lý Form                           |
| `handleSubmit()`            | Validate và xử lý Submit               |
| `axios.post()`              | Gửi request đăng nhập                  |
| `localStorage.setItem()`    | Lưu Token                              |
| `localStorage.getItem()`    | Đọc Token                              |
| `localStorage.removeItem()` | Xóa Token                              |
| `useNavigate()`             | Điều hướng sau đăng nhập               |
| `Navigate`                  | Chuyển hướng Route                     |
| `Outlet`                    | Hiển thị Route con                     |
| `PrivateRoute`              | Kiểm tra điều kiện truy cập ở frontend |

Phân biệt:

- **Authentication:** Xác thực người dùng là ai.
- **Authorization:** Kiểm tra người dùng được phép làm gì.
- **PrivateRoute:** Bảo vệ giao diện ở frontend.
- **Backend authorization:** Bắt buộc xác thực Token và quyền hạn ở backend trước khi cho phép truy cập dữ liệu.

## 13. Tổng kết

Luồng của Lesson 12:

```text
/login
   ↓
Nhập email + mật khẩu
   ↓
POST /login
   ↓
Nhận accessToken + user
   ↓
Lưu localStorage
   ↓
Chuyển đến /
   ↓
Người dùng truy cập /add
   ↓
PrivateRoute kiểm tra Token
   ├── Có Token → Hiển thị trang Add
   └── Không có Token → Chuyển đến /login
```
