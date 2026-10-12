# Lesson 11 - React + TypeScript: Register với React Hook Form + JSON Server Auth

## 1. Mục tiêu bài học

- Tạo Form đăng ký tài khoản bằng React Hook Form.
- Validate họ tên, email, mật khẩu và xác nhận mật khẩu.
- Kết hợp Axios với JSON Server Auth.
- Gửi `POST /register`.
- Xử lý đăng ký thành công và thất bại.

File `db.json`:

```json
{
  "users": []
}
```

Chạy backend:

```bash
npm run db
```

API đăng ký:

```text
POST http://localhost:3000/register
```

## 3. Code hoàn chỉnh `RegisterPage.tsx`

Toàn bộ logic được viết trong một file, không tách riêng `services`, `types` hoặc `components`.

```tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterResponse {
  accessToken: string;
  user?: {
    id: string | number;
    email: string;
    fullName?: string;
  };
}

function RegisterPage() {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  // Theo dõi mật khẩu để kiểm tra xác nhận mật khẩu
  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await axios.post<RegisterResponse>(
        "http://localhost:3000/register",
        {
          fullName: data.fullName.trim(),
          email: data.email.trim().toLowerCase(),
          password: data.password,
        },
      );

      console.log("Register response:", response.data);

      setIsSuccess(true);
      setMessage("Đăng ký tài khoản thành công!");

      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setMessage("Dữ liệu không hợp lệ hoặc email đã được sử dụng.");
        } else {
          setMessage("Đăng ký thất bại. Vui lòng kiểm tra kết nối API.");
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
      <h2 style={{ textAlign: "center" }}>Đăng ký tài khoản</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Họ và tên */}
        <div style={{ marginBottom: 16 }}>
          <label>Họ và tên</label>

          <input
            {...register("fullName", {
              required: "Vui lòng nhập họ và tên",
              minLength: {
                value: 2,
                message: "Họ tên phải có ít nhất 2 ký tự",
              },
            })}
            placeholder="Nhập họ và tên"
            style={{
              width: "100%",
              padding: 10,
              marginTop: 6,
              boxSizing: "border-box",
            }}
          />

          {errors.fullName && (
            <p style={{ color: "red" }}>{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label>Email</label>

          <input
            type="email"
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
          <label>Mật khẩu</label>

          <input
            type="password"
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

        {/* Xác nhận mật khẩu */}
        <div style={{ marginBottom: 16 }}>
          <label>Xác nhận mật khẩu</label>

          <input
            type="password"
            {...register("confirmPassword", {
              required: "Vui lòng xác nhận mật khẩu",
              validate: (value) =>
                value === password || "Mật khẩu xác nhận không khớp",
            })}
            placeholder="Nhập lại mật khẩu"
            style={{
              width: "100%",
              padding: 10,
              marginTop: 6,
              boxSizing: "border-box",
            }}
          />

          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Thông báo kết quả */}
        {message && (
          <p
            role={isSuccess ? "status" : "alert"}
            style={{
              color: isSuccess ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: 12,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
```

## 5. Kiểm tra API

Có thể kiểm tra bằng Postman:

- Method: `POST`
- URL: `http://localhost:3000/register`
- Body → raw → JSON:

```json
{
  "email": "student@example.com",
  "password": "React123!",
  "fullName": "Nguyễn Văn An"
}
```

Đăng ký thành công, API trả về token và thông tin người dùng theo phiên bản/cấu hình thư viện. Không cần gửi `confirmPassword` vì đây chỉ là trường dùng để kiểm tra ở frontend.

## 6. Luồng hoạt động

```text
Người dùng nhập Form
        ↓
register() + handleSubmit()
        ↓
Validate dữ liệu
        ↓
onSubmit(data)
        ↓
Axios POST /register
        ↓
JSON Server Auth
        ↓
Hiển thị kết quả đăng ký
```

## 7. Giải thích các kiến thức chính

| API                 | Vai trò                                 |
| ------------------- | --------------------------------------- |
| `register()`        | Kết nối Input với React Hook Form       |
| `handleSubmit()`    | Validate và gọi `onSubmit()` nếu hợp lệ |
| `watch("password")` | Theo dõi mật khẩu để so sánh            |
| `errors`            | Chứa lỗi validation                     |
| `isSubmitting`      | Xác định Form đang gửi request          |
| `reset()`           | Đặt lại Form sau khi đăng ký thành công |
| `axios.post()`      | Gửi dữ liệu đăng ký lên API             |

## 8. Các lỗi thường gặp

| Lỗi                  | Nguyên nhân cần kiểm tra                   |
| -------------------- | ------------------------------------------ |
| `Network Error`      | JSON Server chưa chạy hoặc sai URL         |
| `404 Not Found`      | Sai endpoint `/register`                   |
| `400 Bad Request`    | Dữ liệu không hợp lệ hoặc email đã tồn tại |
| Form không Submit    | Kiểm tra `errors` và các rule validation   |
| Không hiện thông báo | Kiểm tra state và phần JSX render          |

Mã trạng thái và nội dung lỗi có thể khác nhau tùy phiên bản hoặc cấu hình API.

## 9. Bài tập thực hành

### Bài 1 – Tạo Form đăng ký

Tạo Form có họ tên, email, mật khẩu, xác nhận mật khẩu và nút Đăng ký.

### Bài 2 – Validate dữ liệu

- Họ tên bắt buộc, tối thiểu 2 ký tự.
- Email đúng định dạng.
- Mật khẩu tối thiểu 8 ký tự.
- Xác nhận mật khẩu phải trùng khớp.

### Bài 3 – Kết nối API

Gửi request đến `POST http://localhost:3000/register`.

### Bài 4 – Xử lý kết quả

- Đăng ký thành công: hiện thông báo và reset Form.
- Đăng ký thất bại: hiển thị lỗi.
- Không gửi request khi Form chưa hợp lệ.
- Vô hiệu hóa nút trong khi đang gửi request.

### Bài 5 – Nâng cao

- Tạo trang Login sử dụng `POST /login`.
- Xử lý lỗi khi thông tin đăng nhập không đúng.
- Hiển thị email sau khi đăng nhập thành công.

## 10. Kiến thức cần nhớ

```tsx
const {
  register,
  handleSubmit,
  watch,
  reset,
  formState: { errors, isSubmitting },
} = useForm<RegisterFormData>();
```

Luồng quan trọng nhất:

```text
register()
    ↓
validate
    ↓
handleSubmit()
    ↓
onSubmit(data)
    ↓
axios.post("/register")
    ↓
JSON Server Auth
    ↓
Thông báo kết quả
```
