# Lesson 10 - React + TypeScript: Edit Todo với React Hook Form

## 1. Mục tiêu bài học

Sau bài học này, sinh viên có thể:

- Hiểu chức năng Edit Todo.
- Hiểu API `PUT /todos/:id`.
- Kết hợp React Hook Form với dữ liệu có sẵn.
- Sử dụng `setValue()` để đưa dữ liệu Todo vào Form.
- Sử dụng `reset()` để đổ dữ liệu Todo vào Form.
- Chuyển Form từ chế độ Add sang Edit.
- Sử dụng Axios để gọi `PUT`.
- Cập nhật Todo trong State.
- Hiểu luồng Edit Todo hoàn chỉnh.

---

# 2. Ôn lại Lesson 9

Ở Lesson 9, chúng ta đã làm:

```text
GET /todos
    ↓
Axios
    ↓
React State
    ↓
Todo List
```

Thêm Todo:

```text
Form
 ↓
React Hook Form
 ↓
Validate
 ↓
handleSubmit()
 ↓
axios.post()
 ↓
POST /todos
 ↓
onAdd()
 ↓
setTodos()
```

Xóa Todo:

```text
Click Xóa
 ↓
axios.delete()
 ↓
DELETE /todos/:id
 ↓
setTodos()
 ↓
UI cập nhật
```

Lesson 10 bổ sung:

```text
Click Sửa
 ↓
Chọn Todo
 ↓
Đưa dữ liệu vào Form
 ↓
React Hook Form
 ↓
Validate
 ↓
axios.put()
 ↓
PUT /todos/:id
 ↓
Cập nhật State
 ↓
UI cập nhật
```

---

# 3. Edit Todo là gì?

Edit Todo nghĩa là:

```text
Todo hiện tại

Học React       [Sửa] [Xóa]
```

Khi click:

```text
[Sửa]
```

Form sẽ lấy dữ liệu Todo:

```text
[ Học React ] [Cập nhật]
```

Người dùng sửa thành:

```text
[ Học React Hook Form ] [Cập nhật]
```

Sau đó click:

```text
[Cập nhật]
```

Todo được cập nhật trên JSON Server.

---

# 4. API Edit Todo

JSON Server hỗ trợ:

```text
PUT /todos/:id
```

Ví dụ Todo:

```json
{
  "id": "1",
  "title": "Học React",
  "completed": false
}
```

Muốn sửa Todo có `id = 1`:

```text
PUT /todos/1
```

Gửi dữ liệu:

```json
{
  "title": "Học React Hook Form",
  "completed": false
}
```

Axios:

```tsx
axios.put("http://localhost:3000/todos/1", {
  title: "Học React Hook Form",
  completed: false,
});
```

---

# 5. PUT khác POST như thế nào?

## POST

POST dùng để:

```text
Tạo Todo mới
```

Ví dụ:

```tsx
axios.post("http://localhost:3000/todos", {
  title: "Học React",
  completed: false,
});
```

Luồng:

```text
POST
 ↓
Tạo Todo mới
```

## PUT

PUT dùng để:

```text
Cập nhật Todo đã tồn tại
```

Ví dụ:

```tsx
axios.put("http://localhost:3000/todos/1", {
  title: "Học React Hook Form",
  completed: false,
});
```

Luồng:

```text
PUT /todos/1
 ↓
Tìm Todo id = 1
 ↓
Cập nhật Todo
```

Có thể nhớ:

```text
POST → Thêm

PUT → Sửa

DELETE → Xóa

GET → Lấy
```

---

# 6. Cấu trúc Project

Tiếp tục Project của Lesson 9:

```text
src
├── components
│   ├── TodoForm.tsx
│   └── TodoItem.tsx
│
├── types
│   └── todo.ts
│
└── App.tsx
```

---

# 7. Todo Type

File:

```text
src/types/todo.ts
```

Code:

```tsx
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
```

Todo có:

```text
id
title
completed
```

Ví dụ:

```json
{
  "id": "1",
  "title": "Học React",
  "completed": false
}
```

---

# 8. Vấn đề khi Edit Form

Lesson 9 chúng ta có Form thêm:

```text
[ Nhập công việc... ] [Thêm]
```

Khi Edit, chúng ta cần:

```text
Todo:
Học React

        ↓

Form:

[ Học React ] [Cập nhật]
```

React Hook Form cần có cách đưa dữ liệu Todo vào Input.

React Hook Form cung cấp:

```tsx
setValue();
```

và:

```tsx
reset();
```

Trong Lesson 10, chúng ta sẽ ưu tiên sử dụng:

```tsx
reset();
```

để đưa dữ liệu Todo vào Form.

---

# 9. reset() có thể dùng để Edit

Lesson 9 đã sử dụng:

```tsx
reset();
```

để xóa Form:

```text
[ Học React ] [Thêm]

        ↓

reset()

        ↓

[          ] [Thêm]
```

Nhưng `reset()` cũng có thể nhận dữ liệu:

```tsx
reset({
  title: todo.title,
});
```

Ví dụ Todo:

```json
{
  "id": "1",
  "title": "Học React",
  "completed": false
}
```

Có thể:

```tsx
reset({
  title: todo.title,
});
```

Form sẽ trở thành:

```text
[ Học React ]
```

Đây là kỹ thuật quan trọng trong Edit Form.

---

# 10. Chế độ Add và Edit

TodoForm có thể hoạt động ở hai chế độ:

```text
ADD

[ Nhập công việc... ] [Thêm]
```

và:

```text
EDIT

[ Học React ] [Cập nhật]
```

Có thể hiểu:

```text
isEditing = false
    ↓
Chế độ thêm

isEditing = true
    ↓
Chế độ sửa
```

---

# 11. TodoForm nhận Todo cần sửa

App đang quản lý Todo.

Khi click Sửa:

```text
App
 ↓
Todo được chọn
 ↓
TodoForm
```

TodoForm có thể nhận:

```tsx
todo;
```

Ví dụ:

```tsx
interface TodoFormProps {
  todo: Todo | null;
}
```

Nếu:

```tsx
todo = null;
```

thì:

```text
Chế độ Add
```

Nếu:

```tsx
todo = {
  id: "1",
  title: "Học React",
  completed: false,
};
```

thì:

```text
Chế độ Edit
```

---

# 12. Props cho TodoForm

Có thể thiết kế:

```tsx
interface TodoFormProps {
  todo: Todo | null;
  onAdd: (todo: Todo) => void;
  onUpdate: (todo: Todo) => void;
  onCancelEdit: () => void;
}
```

Ý nghĩa:

```text
todo
↓
Todo đang sửa

onAdd
↓
Thêm Todo

onUpdate
↓
Cập nhật Todo

onCancelEdit
↓
Hủy Edit
```

---

# 13. useEffect để đưa Todo vào Form

Khi Todo được chọn để Edit:

```text
Click Sửa
 ↓
todo thay đổi
 ↓
TodoForm nhận Todo mới
 ↓
đưa dữ liệu vào Input
```

Có thể sử dụng:

```tsx
useEffect(() => {
  if (todo) {
    reset({
      title: todo.title,
    });
  }
}, [todo, reset]);
```

Ý nghĩa:

```text
todo có dữ liệu
 ↓
reset()
 ↓
Input hiển thị title
```

Nếu:

```text
todo = null
```

thì Form ở chế độ Add.

---

# 14. Tại sao cần useEffect?

`todo` là Props từ App.

Khi người dùng click:

```text
Sửa Todo 1
```

App thay đổi:

```tsx
setEditingTodo(todo);
```

TodoForm nhận Todo mới.

Cần phản ứng với sự thay đổi này:

```text
todo thay đổi
 ↓
useEffect()
 ↓
reset()
 ↓
Input cập nhật
```

Vì vậy:

```tsx
useEffect();
```

phù hợp với trường hợp này.

---

# 15. Tạo TodoForm hỗ trợ Edit

Code cơ bản:

```tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Todo } from "../types/todo";

interface TodoFormData {
  title: string;
}

interface TodoFormProps {
  todo: Todo | null;
  onAdd: (todo: Todo) => void;
  onUpdate: (todo: Todo) => void;
  onCancelEdit: () => void;
}

function TodoForm({ todo, onAdd, onUpdate, onCancelEdit }: TodoFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>();

  useEffect(() => {
    if (todo) {
      reset({
        title: todo.title,
      });
    } else {
      reset({
        title: "",
      });
    }
  }, [todo, reset]);

  const onSubmit = (data: TodoFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Nhập công việc..."
        {...register("title", {
          required: "Vui lòng nhập công việc",
          minLength: {
            value: 3,
            message: "Công việc phải có ít nhất 3 ký tự",
          },
          maxLength: {
            value: 100,
            message: "Công việc không được quá 100 ký tự",
          },
        })}
      />

      {errors.title && <p>{errors.title.message}</p>}

      <button type="submit">{todo ? "Cập nhật" : "Thêm"}</button>

      {todo && (
        <button type="button" onClick={onCancelEdit}>
          Hủy
        </button>
      )}
    </form>
  );
}

export default TodoForm;
```

---

# 16. Giải thích nút Submit

Đoạn:

```tsx
{
  todo ? "Cập nhật" : "Thêm";
}
```

là toán tử 3 ngôi.

Nếu:

```tsx
todo;
```

có dữ liệu:

```text
Cập nhật
```

Nếu:

```tsx
todo = null;
```

thì:

```text
Thêm
```

Có thể nhớ:

```text
todo có dữ liệu
    ↓
EDIT
    ↓
Cập nhật

todo = null
    ↓
ADD
    ↓
Thêm
```

---

# 17. Xử lý Submit

Trong `onSubmit()`:

```tsx
const onSubmit = async (data: TodoFormData) => {
  if (todo) {
    // Edit
  } else {
    // Add
  }
};
```

Luồng:

```text
Submit
 ↓
Validate
 ↓
onSubmit(data)
 ↓
todo có dữ liệu?
 ↓
 ┌───────────────┐
 │               │
Có              Không
 │               │
 ↓               ↓
Edit             Add
 │               │
PUT              POST
```

---

# 18. PUT Todo

Nếu đang Edit:

```tsx
if (todo) {
  const response = await axios.put<Todo>(
    `http://localhost:3000/todos/${todo.id}`,
    {
      title: data.title,
      completed: todo.completed,
    },
  );

  onUpdate(response.data);
}
```

Giải thích:

```text
todo.id
 ↓
Xác định Todo cần sửa
```

Ví dụ:

```text
todo.id = 1
```

Axios gọi:

```text
PUT /todos/1
```

Dữ liệu:

```json
{
  "title": "Học React Hook Form",
  "completed": false
}
```

---

# 19. POST và PUT trong cùng Form

Code:

```tsx
const onSubmit = async (data: TodoFormData) => {
  if (todo) {
    // PUT
  } else {
    // POST
  }
};
```

Có thể hiểu:

```text
TodoForm
    │
    ↓
Submit
    │
    ↓
todo?
 ┌──┴──┐
 │     │
Có    Không
 │     │
PUT   POST
 │     │
Edit  Add
```

Đây là cách xây dựng Form phổ biến trong ứng dụng thực tế.

---

# 20. Cập nhật State sau khi Edit

App có:

```tsx
const [todos, setTodos] = useState<Todo[]>([]);
```

Khi Todo được cập nhật:

```text
TodoForm
 ↓
axios.put()
 ↓
JSON Server
 ↓
Todo mới
 ↓
onUpdate(todo)
 ↓
App
 ↓
setTodos()
```

App cần tìm Todo cũ và thay bằng Todo mới.

Có thể dùng:

```tsx
setTodos((prevTodos) =>
  prevTodos.map((item) => (item.id === updatedTodo.id ? updatedTodo : item)),
);
```

---

# 21. Giải thích map()

Ví dụ:

```tsx
const todos = [
  {
    id: "1",
    title: "Học React",
    completed: false,
  },
  {
    id: "2",
    title: "Học TypeScript",
    completed: false,
  },
];
```

Sửa Todo `id = 1`.

Dùng:

```tsx
todos.map();
```

Có thể hiểu:

```text
Todo 1
 ↓
id giống nhau?
 ↓
Có → thay bằng Todo mới

Todo 2
 ↓
id giống nhau?
 ↓
Không → giữ nguyên
```

Code:

```tsx
setTodos((prevTodos) =>
  prevTodos.map((item) => (item.id === updatedTodo.id ? updatedTodo : item)),
);
```

---

# 22. Hàm handleUpdate trong App

App:

```tsx
const handleUpdate = (updatedTodo: Todo) => {
  setTodos((prevTodos) =>
    prevTodos.map((item) => (item.id === updatedTodo.id ? updatedTodo : item)),
  );
};
```

Sau đó truyền xuống:

```tsx
<TodoForm
  todo={editingTodo}
  onAdd={handleAdd}
  onUpdate={handleUpdate}
  onCancelEdit={handleCancelEdit}
/>
```

---

# 23. Chọn Todo để Edit

Trong TodoItem có nút:

```text
[Sửa]
```

Khi click:

```tsx
onEdit(todo);
```

Ví dụ:

```tsx
<button onClick={() => onEdit(todo)}>Sửa</button>
```

TodoItem cần nhận:

```tsx
interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}
```

---

# 24. TodoItem hoàn chỉnh

```tsx
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

function TodoItem({ todo, onDelete, onEdit }: TodoItemProps) {
  return (
    <div>
      <span>{todo.title}</span>

      <button onClick={() => onEdit(todo)}>Sửa</button>

      <button onClick={() => onDelete(todo.id)}>Xóa</button>
    </div>
  );
}

export default TodoItem;
```

---

# 25. State editingTodo

Trong App:

```tsx
const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
```

Ý nghĩa:

```text
null
 ↓
Không sửa Todo nào

Todo object
 ↓
Đang sửa Todo đó
```

Ví dụ:

```tsx
setEditingTodo(todo);
```

Sau khi click Sửa:

```text
editingTodo
 ↓
{
  id: "1",
  title: "Học React",
  completed: false
}
```

---

# 26. Hàm handleEdit

App:

```tsx
const handleEdit = (todo: Todo) => {
  setEditingTodo(todo);
};
```

Luồng:

```text
Click Sửa
 ↓
handleEdit(todo)
 ↓
setEditingTodo(todo)
 ↓
App render lại
 ↓
TodoForm nhận todo
 ↓
reset()
 ↓
Input hiển thị dữ liệu
```

---

# 27. Hàm Cancel Edit

Khi click:

```text
Hủy
```

chúng ta cần:

```tsx
setEditingTodo(null);
```

Tạo function:

```tsx
const handleCancelEdit = () => {
  setEditingTodo(null);
};
```

Luồng:

```text
Click Hủy
 ↓
setEditingTodo(null)
 ↓
TodoForm
 ↓
Chuyển về Add
```

---

# 28. handleUpdate hoàn chỉnh

```tsx
const handleUpdate = (updatedTodo: Todo) => {
  setTodos((prevTodos) =>
    prevTodos.map((item) => (item.id === updatedTodo.id ? updatedTodo : item)),
  );

  setEditingTodo(null);
};
```

Sau khi cập nhật:

```text
Todo được sửa
 ↓
State cập nhật
 ↓
editingTodo = null
 ↓
Form trở về Add
```

---

# 29. TodoForm hoàn chỉnh

```tsx
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Todo } from "../types/todo";

interface TodoFormData {
  title: string;
}

interface TodoFormProps {
  todo: Todo | null;
  onAdd: (todo: Todo) => void;
  onUpdate: (todo: Todo) => void;
  onCancelEdit: () => void;
}

function TodoForm({ todo, onAdd, onUpdate, onCancelEdit }: TodoFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>();

  useEffect(() => {
    if (todo) {
      reset({
        title: todo.title,
      });
    } else {
      reset({
        title: "",
      });
    }
  }, [todo, reset]);

  const onSubmit = async (data: TodoFormData) => {
    try {
      if (todo) {
        const response = await axios.put<Todo>(
          `http://localhost:3000/todos/${todo.id}`,
          {
            title: data.title,
            completed: todo.completed,
          },
        );

        onUpdate(response.data);
      } else {
        const response = await axios.post<Todo>("http://localhost:3000/todos", {
          title: data.title,
          completed: false,
        });

        onAdd(response.data);
      }

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Nhập công việc..."
        {...register("title", {
          required: "Vui lòng nhập công việc",
          minLength: {
            value: 3,
            message: "Công việc phải có ít nhất 3 ký tự",
          },
          maxLength: {
            value: 100,
            message: "Công việc không được quá 100 ký tự",
          },
        })}
      />

      {errors.title && <p>{errors.title.message}</p>}

      <button type="submit">{todo ? "Cập nhật" : "Thêm"}</button>

      {todo && (
        <button type="button" onClick={onCancelEdit}>
          Hủy
        </button>
      )}
    </form>
  );
}

export default TodoForm;
```

---

# 30. App hoàn chỉnh

Ví dụ App:

```tsx
import { useEffect, useState } from "react";
import axios from "axios";

import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

import type { Todo } from "./types/todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axios.get<Todo[]>("http://localhost:3000/todos");

        setTodos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getTodos();
  }, []);

  const handleAdd = (todo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);

      setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleUpdate = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === updatedTodo.id ? updatedTodo : item,
      ),
    );

    setEditingTodo(null);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <div>
      <h1>Todo List</h1>

      <TodoForm
        todo={editingTodo}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onCancelEdit={handleCancelEdit}
      />

      <hr />

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default App;
```

---

# 31. Giao diện sau khi chạy

Ban đầu:

```text
----------------------------------
           TODO LIST
----------------------------------

[ Nhập công việc... ] [Thêm]

----------------------------------

□ Học React                [Sửa] [Xóa]

□ Học TypeScript           [Sửa] [Xóa]

☑ Làm bài tập              [Sửa] [Xóa]

----------------------------------
```

Click:

```text
[Sửa]
```

Ví dụ Todo:

```text
Học React
```

Form trở thành:

```text
[ Học React ] [Cập nhật] [Hủy]
```

Sửa:

```text
[ Học React Hook Form ] [Cập nhật] [Hủy]
```

Click:

```text
[Cập nhật]
```

Kết quả:

```text
□ Học React Hook Form     [Sửa] [Xóa]
```

---

# 32. Luồng Edit Todo

Đây là phần cần nhớ:

```text
Click Sửa
    ↓
handleEdit(todo)
    ↓
setEditingTodo(todo)
    ↓
TodoForm nhận todo
    ↓
useEffect()
    ↓
reset({
  title: todo.title
})
    ↓
Input hiển thị Todo
    ↓
User sửa
    ↓
handleSubmit()
    ↓
Validate
    ↓
onSubmit(data)
    ↓
axios.put()
    ↓
PUT /todos/:id
    ↓
JSON Server
    ↓
Todo mới
    ↓
onUpdate()
    ↓
setTodos()
    ↓
setEditingTodo(null)
    ↓
React render
```

---

# 33. So sánh Add và Edit

| Chức năng       | Add       | Edit         |
| --------------- | --------- | ------------ |
| Form            | TodoForm  | TodoForm     |
| React Hook Form | Có        | Có           |
| Validate        | Có        | Có           |
| API             | POST      | PUT          |
| URL             | `/todos`  | `/todos/:id` |
| State           | Thêm Todo | Thay Todo    |
| Button          | Thêm      | Cập nhật     |

Có thể nhớ:

```text
ADD

POST /todos

EDIT

PUT /todos/:id
```

---

# 34. Vì sao không tạo EditForm riêng?

Có thể tạo:

```text
TodoForm.tsx
TodoEditForm.tsx
```

Nhưng trong bài học này chúng ta sử dụng một Form:

```text
TodoForm
```

và thay đổi theo:

```tsx
todo;
```

Nếu:

```text
todo = null
```

→ Add.

Nếu:

```text
todo có dữ liệu
```

→ Edit.

Cách này giúp giảm code trùng lặp.

---

# 35. Một Form - Hai chức năng

Có thể hình dung:

```text
                 TodoForm
                    │
              todo có dữ liệu?
               /           \
             Không          Có
               ↓             ↓
              ADD           EDIT
               ↓             ↓
             POST           PUT
               ↓             ↓
          /todos        /todos/:id
```

---

# 36. `reset()` trong Edit

Có hai cách sử dụng:

## Xóa Form

```tsx
reset();
```

Kết quả:

```text
[ Học React ]

     ↓

[          ]
```

## Đổ dữ liệu vào Form

```tsx
reset({
  title: todo.title,
});
```

Kết quả:

```text
todo.title
    ↓
reset()
    ↓
[ Học React ]
```

Đây là kiến thức quan trọng khi làm Form Edit.

---

# 37. `setValue()` là gì?

Ngoài `reset()`, React Hook Form có:

```tsx
setValue();
```

Ví dụ:

```tsx
const { setValue } = useForm<TodoFormData>();
```

Có thể:

```tsx
setValue("title", todo.title);
```

Ý nghĩa:

```text
title
 ↓
todo.title
```

Ví dụ:

```tsx
setValue("title", "Học React");
```

Input sẽ có:

```text
[ Học React ]
```

Trong bài này nên ưu tiên:

```tsx
reset();
```

vì chúng ta muốn đưa dữ liệu Todo vào toàn bộ Form.

---

# 38. `reset()` và `setValue()`

| Function      | Mục đích             |
| ------------- | -------------------- |
| `reset()`     | Đặt lại toàn bộ Form |
| `reset(data)` | Đưa dữ liệu vào Form |
| `setValue()`  | Thay đổi một field   |

Ví dụ:

```tsx
reset({
  title: todo.title,
});
```

Hoặc:

```tsx
setValue("title", todo.title);
```

---

# 39. Validate khi Edit

Edit vẫn phải Validate.

Ví dụ:

```text
Todo cũ:

Học React
```

Người dùng xóa hết:

```text
[                 ]
```

Click:

```text
[Cập nhật]
```

React Hook Form kiểm tra:

```text
required
 ↓
Có lỗi
 ↓
Không gọi axios.put()
```

Hiển thị:

```text
Vui lòng nhập công việc
```

Luồng:

```text
Edit
 ↓
Submit
 ↓
Validate
 ↓
Có lỗi?
 ↓
Có → errors
 ↓
Không gửi PUT
```

---

# 40. Không được bỏ Validate khi Edit

Một lỗi thường gặp:

```tsx
if (todo) {
  axios.put(...);
}
```

nhưng không có Rule:

```tsx
required;
```

Điều này có thể gửi dữ liệu:

```json
{
  "title": ""
}
```

Vì vậy Form Edit vẫn cần:

```tsx
register("title", {
  required: "Vui lòng nhập công việc",
  minLength: {
    value: 3,
    message: "Công việc phải có ít nhất 3 ký tự",
  },
});
```

---

# 41. Tại sao cần `type="button"` cho nút Hủy?

Form:

```tsx
<form>
```

Nếu button:

```tsx
<button>Hủy</button>
```

mặc định có thể được hiểu là:

```text
submit
```

Vì vậy nút Hủy nên viết:

```tsx
<button type="button">Hủy</button>
```

Khi đó:

```text
Hủy
 ↓
Không Submit Form
 ↓
Chỉ chạy onCancelEdit()
```

---

# 42. Xử lý lỗi API

PUT nên có:

```tsx
try {
  const response = await axios.put(...);

  onUpdate(response.data);
} catch (error) {
  console.error(error);
}
```

Luồng:

```text
PUT
 ↓
Thành công?
 ├── Có → onUpdate()
 │
 └── Không → catch
```

Không nên cập nhật State trước khi API thành công.

---

# 43. Không nên làm như thế này

Không nên:

```tsx
setTodos(...);
await axios.put(...);
```

Vì:

```text
State cập nhật
 ↓
API có thể thất bại
```

UI có thể hiển thị dữ liệu mới nhưng Server chưa cập nhật.

Nên:

```tsx
const response = await axios.put(...);

setTodos(...);
```

Luồng đúng:

```text
PUT
 ↓
Server thành công
 ↓
Todo mới
 ↓
setTodos()
```

---

# 44. Bài tập thực hành

## Bài 1 - Thêm nút Sửa

Trong `TodoItem.tsx`, thêm:

```text
[Sửa]
```

Khi click:

```text
onEdit(todo)
```

---

## Bài 2 - Tạo editingTodo

Trong App:

```tsx
const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
```

---

## Bài 3 - Chọn Todo để Edit

Tạo:

```tsx
const handleEdit = (todo: Todo) => {
  setEditingTodo(todo);
};
```

Truyền:

```tsx
<TodoForm todo={editingTodo} />
```

---

## Bài 4 - Hiển thị Todo lên Form

Sử dụng:

```tsx
useEffect();
```

và:

```tsx
reset({
  title: todo.title,
});
```

Kết quả:

```text
Click Sửa

        ↓

[ Nội dung Todo ]
```

---

## Bài 5 - Đổi Button

Nếu đang Edit:

```text
[Cập nhật]
```

Nếu đang Add:

```text
[Thêm]
```

Sử dụng:

```tsx
{
  todo ? "Cập nhật" : "Thêm";
}
```

---

## Bài 6 - PUT Todo

Khi Edit:

```tsx
axios.put(`http://localhost:3000/todos/${todo.id}`, {
  title: data.title,
  completed: todo.completed,
});
```

---

## Bài 7 - Cập nhật State

Sau khi PUT thành công:

```tsx
setTodos((prevTodos) =>
  prevTodos.map((item) => (item.id === updatedTodo.id ? updatedTodo : item)),
);
```

---

## Bài 8 - Nút Hủy

Thêm:

```text
[Hủy]
```

Khi click:

```tsx
setEditingTodo(null);
```

Form trở lại:

```text
[ Nhập công việc... ] [Thêm]
```

---

# 45. Bài tập nâng cao

Hoàn thiện Todo App:

```text
------------------------------------------
               TODO LIST
------------------------------------------

[ Nhập công việc................ ] [Thêm]

------------------------------------------

□ Học React                [Sửa] [Xóa]

□ Học TypeScript           [Sửa] [Xóa]

☑ Làm bài tập              [Sửa] [Xóa]

------------------------------------------
```

Click Sửa:

```text
------------------------------------------

[ Học React ] [Cập nhật] [Hủy]

------------------------------------------
```

Sau khi sửa:

```text
------------------------------------------

□ Học React Hook Form     [Sửa] [Xóa]

□ Học TypeScript          [Sửa] [Xóa]

☑ Làm bài tập             [Sửa] [Xóa]

------------------------------------------
```

Yêu cầu:

```text
GET       → lấy Todo
POST      → thêm Todo
PUT       → sửa Todo
DELETE    → xóa Todo

React Hook Form
      ↓
register()
      ↓
validate
      ↓
handleSubmit()
      ↓
onSubmit()
      ↓
POST / PUT
      ↓
JSON Server
      ↓
setTodos()
      ↓
UI
```

---

# 46. Câu hỏi ôn tập

## Câu 1

API nào dùng để sửa Todo?

```text
A. GET
B. POST
C. PUT
D. DELETE
```

Đáp án:

```text
C. PUT
```

---

## Câu 2

API Edit Todo có dạng gì?

```text
PUT /todos/:id
```

Ví dụ:

```text
PUT /todos/1
```

---

## Câu 3

`editingTodo` dùng để làm gì?

```text
Lưu Todo đang được chọn để sửa.
```

---

## Câu 4

Khi:

```tsx
editingTodo = null;
```

Form ở chế độ nào?

```text
ADD
```

---

## Câu 5

Khi:

```tsx
editingTodo;
```

có dữ liệu thì Form ở chế độ nào?

```text
EDIT
```

---

## Câu 6

Function nào đưa dữ liệu vào Form?

Có thể sử dụng:

```tsx
reset();
```

hoặc:

```tsx
setValue();
```

---

## Câu 7

Tại sao dùng:

```tsx
useEffect();
```

khi Edit?

Vì khi Todo được chọn thay đổi:

```text
todo thay đổi
 ↓
useEffect()
 ↓
reset()
 ↓
Form cập nhật
```

---

## Câu 8

Sau khi PUT thành công, tại sao phải cập nhật State?

Vì React cần biết dữ liệu Todo đã thay đổi để render lại UI.

---

# 47. Kiến thức cần nhớ

### GET

```tsx
axios.get("/todos");
```

### POST

```tsx
axios.post("/todos", data);
```

### PUT

```tsx
axios.put(`/todos/${id}`, data);
```

### DELETE

```tsx
axios.delete(`/todos/${id}`);
```

### React Hook Form

```tsx
const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<FormData>();
```

### Register

```tsx
<input {...register("title")} />
```

### Validate

```tsx
register("title", {
  required: "Bắt buộc nhập",
});
```

### Submit

```tsx
<form onSubmit={handleSubmit(onSubmit)}>
```

### Đổ dữ liệu vào Form

```tsx
reset({
  title: todo.title,
});
```

### Cập nhật State

```tsx
setTodos((prevTodos) =>
  prevTodos.map((item) => (item.id === updatedTodo.id ? updatedTodo : item)),
);
```

---

# 48. Tổng kết Lesson 10

Lesson 10 bổ sung chức năng:

```text
EDIT TODO
```

Luồng quan trọng nhất:

```text
Click Sửa
    ↓
setEditingTodo(todo)
    ↓
TodoForm
    ↓
useEffect()
    ↓
reset()
    ↓
Hiển thị dữ liệu
    ↓
User sửa
    ↓
handleSubmit()
    ↓
Validate
    ↓
onSubmit()
    ↓
axios.put()
    ↓
PUT /todos/:id
    ↓
JSON Server
    ↓
Todo mới
    ↓
onUpdate()
    ↓
setTodos()
    ↓
setEditingTodo(null)
    ↓
React render lại UI
```

## CRUD sau Lesson 10

Sinh viên đã có:

```text
GET
 ↓
Xem Todo

POST
 ↓
Thêm Todo

PUT
 ↓
Sửa Todo

DELETE
 ↓
Xóa Todo
```

Có thể nhớ:

```text
CRUD

C → Create → POST
R → Read   → GET
U → Update → PUT
D → Delete → DELETE
```

---

# 49. Kiến thức trọng tâm

Sau Lesson 10, sinh viên cần hiểu được:

```text
React
  ↓
useState
  ↓
Todo List
  ↓
TodoForm
  ↓
React Hook Form
  ↓
register()
  ↓
Validate
  ↓
handleSubmit()
  ↓
POST / PUT
  ↓
JSON Server
  ↓
setTodos()
  ↓
UI
```

Đặc biệt cần nhớ:

```text
POST
→ Thêm

PUT
→ Sửa

DELETE
→ Xóa

GET
→ Lấy dữ liệu

reset()
→ Đưa dữ liệu vào Form

editingTodo
→ Todo đang sửa

map()
→ Thay Todo cũ bằng Todo mới
```
