# Lesson 10 - React + TypeScript: Edit Todo

## 1. Mục tiêu bài học

Sau bài học này, sinh viên có thể:

- Hiểu chức năng Edit Todo.
- Phân biệt `POST`, `PUT`, `PATCH`.
- Hiểu luồng lấy dữ liệu Todo cần sửa.
- Sử dụng React Hook Form cho Form Edit.
- Đổ dữ liệu Todo cũ vào Form.
- Hiểu và sử dụng `reset()` để đưa dữ liệu cũ vào Form.
- Gửi `PUT /todos/:id` bằng Axios.
- Cập nhật Todo trong State sau khi Edit.
- Đóng Form Edit sau khi cập nhật thành công.
- Tái sử dụng `TodoForm` cho cả Add và Edit.

---

## 2. Ôn lại Lesson 9

Lesson 9 đã có:

```text
GET /todos
    ↓
Axios
    ↓
useState
    ↓
Todo List
```

Thêm Todo:

```text
Form
    ↓
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
axios.post()
    ↓
POST /todos
    ↓
onAdd()
    ↓
setTodos()
    ↓
UI
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
Edit Todo
    ↓
Lấy Todo cần sửa
    ↓
Đưa dữ liệu cũ vào Form
    ↓
User chỉnh sửa
    ↓
Validate
    ↓
axios.put()
    ↓
PUT /todos/:id
    ↓
JSON Server
    ↓
Todo mới
    ↓
setTodos()
    ↓
UI cập nhật
```

---

# 3. CRUD là gì?

Các thao tác cơ bản:

| Chức năng     | HTTP   | API          |
| ------------- | ------ | ------------ |
| Lấy danh sách | GET    | `/todos`     |
| Lấy một Todo  | GET    | `/todos/:id` |
| Thêm          | POST   | `/todos`     |
| Sửa           | PUT    | `/todos/:id` |
| Xóa           | DELETE | `/todos/:id` |

CRUD:

```text
C = Create
R = Read
U = Update
D = Delete
```

Mapping:

```text
Create → POST
Read   → GET
Update → PUT / PATCH
Delete → DELETE
```

---

# 4. POST và PUT khác nhau như thế nào?

Lesson 9:

```tsx
axios.post("http://localhost:3000/todos", {
  title: "Học React",
  completed: false,
});
```

Mục đích:

```text
Tạo Todo mới
```

Lesson 10:

```tsx
axios.put("http://localhost:3000/todos/1", {
  title: "Học React Hook Form",
  completed: false,
});
```

Mục đích:

```text
Cập nhật Todo có id = 1
```

Có thể nhớ:

```text
POST
    ↓
Tạo dữ liệu mới
```

```text
PUT
    ↓
Cập nhật dữ liệu đã tồn tại
```

---

# 5. API Edit Todo

Giả sử JSON Server có:

```json
{
  "id": "1",
  "title": "Học React",
  "completed": false
}
```

Muốn sửa Todo:

```text
PUT /todos/1
```

Axios:

```tsx
await axios.put("http://localhost:3000/todos/1", {
  title: "Học React Hook Form",
  completed: false,
});
```

Sau khi thành công:

```json
{
  "id": "1",
  "title": "Học React Hook Form",
  "completed": false
}
```

---

# 6. Vì sao Edit cần biết id?

Khi thêm Todo:

```text
POST /todos
```

Không cần biết Todo ID.

JSON Server tự tạo ID.

Nhưng khi Edit:

```text
PUT /todos/:id
```

phải biết Todo nào cần sửa.

Ví dụ:

```text
Todo 1
Todo 2
Todo 3
```

Click Edit Todo 2:

```text
PUT /todos/2
```

Click Edit Todo 3:

```text
PUT /todos/3
```

Vì vậy:

```text
Edit
 ↓
Cần id
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

Nếu JSON Server đang dùng ID dạng number:

```tsx
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
```

Quan trọng:

> Kiểu `id` phải thống nhất với dữ liệu thực tế của project.

---

# 8. Vấn đề khi Edit

Giả sử Todo:

```json
{
  "id": "1",
  "title": "Học React",
  "completed": false
}
```

User click:

```text
[Sửa]
```

Chúng ta muốn Form xuất hiện:

```text
┌───────────────────────────────┐
│ [ Học React              ]    │
│                               │
│ [ Cập nhật ] [ Hủy ]          │
└───────────────────────────────┘
```

Không được để Form rỗng:

```text
[                         ]
```

Mà phải có dữ liệu Todo cũ:

```text
[ Học React ]
```

Đây là vấn đề quan trọng của Lesson 10.

---

# 9. React Hook Form và dữ liệu ban đầu

React Hook Form có thể nhận dữ liệu ban đầu thông qua:

```tsx
defaultValues;
```

Ví dụ:

```tsx
const { register, handleSubmit } = useForm<TodoFormData>({
  defaultValues: {
    title: "Học React",
  },
});
```

Form sẽ hiển thị:

```text
[ Học React ]
```

Tuy nhiên Todo được chọn sau khi component đã render.

Ví dụ:

```text
App render
    ↓
Chưa chọn Todo
    ↓
editingTodo = null
```

Sau đó:

```text
Click Edit
    ↓
editingTodo = Todo
```

Lúc này cần cập nhật dữ liệu trong Form.

---

# 10. reset() để đưa Todo cũ vào Form

React Hook Form có:

```tsx
reset();
```

Lesson 9:

```tsx
reset();
```

để xóa Form.

Lesson 10:

```tsx
reset({
  title: todo.title,
});
```

Ví dụ:

```tsx
const handleEdit = (todo: Todo) => {
  reset({
    title: todo.title,
  });
};
```

Nếu Todo:

```json
{
  "id": "1",
  "title": "Học React"
}
```

thì:

```tsx
reset({
  title: todo.title,
});
```

sẽ đưa:

```text
Học React
```

vào Input.

---

# 11. reset() có hai cách sử dụng

### Xóa Form

```tsx
reset();
```

Kết quả:

```text
[                     ]
```

### Đưa dữ liệu vào Form

```tsx
reset({
  title: "Học React",
});
```

Kết quả:

```text
[ Học React ]
```

Có thể nhớ:

```text
reset()

    ↓

Không truyền dữ liệu
    ↓
Xóa Form


reset(data)

    ↓

Truyền dữ liệu
    ↓
Đưa dữ liệu vào Form
```

---

# 12. setValue()

React Hook Form cũng cung cấp:

```tsx
setValue();
```

Dùng để thay đổi giá trị của một field.

Ví dụ:

```tsx
setValue("title", "Học TypeScript");
```

Input:

```text
[ Học TypeScript ]
```

Cú pháp:

```tsx
setValue(fieldName, value);
```

Ví dụ:

```tsx
setValue("title", todo.title);
```

Với Form Edit có nhiều field, có thể dùng nhiều `setValue()`:

```tsx
setValue("title", todo.title);
setValue("description", todo.description);
```

Tuy nhiên trong Lesson 10:

> Ưu tiên sử dụng `reset()` để đưa toàn bộ dữ liệu Todo vào Form.

---

# 13. Thiết kế lại TodoForm

Thay vì chỉ:

```tsx
<TodoForm onAdd={addTodo} />
```

có thể thiết kế:

```tsx
<TodoForm
  todo={editingTodo}
  onAdd={addTodo}
  onUpdate={updateTodo}
  onCancel={cancelEdit}
/>
```

TodoForm có hai mode:

```text
todo = null
    ↓
ADD MODE
```

hoặc:

```text
todo = Todo
    ↓
EDIT MODE
```

---

# 14. TodoFormProps

```tsx
interface TodoFormProps {
  todo?: Todo | null;
  onAdd: (todo: Todo) => void;
  onUpdate: (todo: Todo) => void;
  onCancel: () => void;
}
```

Giải thích:

```text
todo
    ↓
Todo đang được Edit

onAdd
    ↓
Thêm Todo

onUpdate
    ↓
Cập nhật Todo

onCancel
    ↓
Hủy Edit
```

---

# 15. Phân biệt Add Mode và Edit Mode

Có thể kiểm tra:

```tsx
if (todo) {
  // Edit
} else {
  // Add
}
```

Hoặc:

```tsx
const isEditMode = Boolean(todo);
```

Nếu:

```tsx
todo = null;
```

thì:

```text
isEditMode = false
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
isEditMode = true
```

---

# 16. Hiển thị Button theo Mode

Có thể dùng:

```tsx
<button type="submit">{isEditMode ? "Cập nhật" : "Thêm"}</button>
```

Nếu Edit:

```text
[ Cập nhật ]
```

Nếu Add:

```text
[ Thêm ]
```

---

# 17. Hiển thị nút Hủy

Chỉ cần có khi Edit:

```tsx
{
  isEditMode && (
    <button type="button" onClick={onCancel}>
      Hủy
    </button>
  );
}
```

Khi Add:

```text
[ Thêm ]
```

Khi Edit:

```text
[ Cập nhật ] [ Hủy ]
```

---

# 18. useEffect để đưa Todo vào Form

Import:

```tsx
import { useEffect } from "react";
```

Code:

```tsx
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
```

Luồng:

```text
Click Edit
    ↓
App setEditingTodo()
    ↓
todo thay đổi
    ↓
TodoForm nhận Todo mới
    ↓
useEffect()
    ↓
reset()
    ↓
Form hiển thị dữ liệu cũ
```

---

# 19. Vì sao cần useEffect?

Ban đầu:

```tsx
todo = null;
```

Sau khi click Edit:

```tsx
todo = {
  id: "1",
  title: "Học React",
};
```

Component nhận Props mới.

Chúng ta muốn thực hiện:

```tsx
reset({
  title: todo.title,
});
```

khi `todo` thay đổi.

Do đó:

```tsx
useEffect(() => {
  if (todo) {
    reset({
      title: todo.title,
    });
  }
}, [todo, reset]);
```

---

# 20. TodoForm hoàn chỉnh

```tsx
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Todo } from "../types/todo";

interface TodoFormData {
  title: string;
}

interface TodoFormProps {
  todo?: Todo | null;
  onAdd: (todo: Todo) => void;
  onUpdate: (todo: Todo) => void;
  onCancel: () => void;
}

function TodoForm({ todo, onAdd, onUpdate, onCancel }: TodoFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>();

  const isEditMode = Boolean(todo);

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
            ...todo,
            title: data.title,
          },
        );

        onUpdate(response.data);
      } else {
        const response = await axios.post<Todo>("http://localhost:3000/todos", {
          title: data.title,
          completed: false,
        });

        onAdd(response.data);
        reset();
      }
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

      <button type="submit">{isEditMode ? "Cập nhật" : "Thêm"}</button>

      {isEditMode && (
        <button type="button" onClick={onCancel}>
          Hủy
        </button>
      )}
    </form>
  );
}

export default TodoForm;
```

---

# 21. Phân tích onSubmit()

Đây là phần quan trọng nhất:

```tsx
const onSubmit = async (data: TodoFormData) => {
```

Nếu:

```tsx
todo;
```

tồn tại:

```tsx
if (todo) {
```

thì đang Edit.

API:

```tsx
axios.put(
  `http://localhost:3000/todos/${todo.id}`,
  ...
);
```

Nếu không có Todo:

```text
todo = null
```

thì:

```text
Add
```

và sử dụng:

```tsx
axios.post();
```

---

# 22. PUT Todo

```tsx
const response = await axios.put<Todo>(
  `http://localhost:3000/todos/${todo.id}`,
  {
    ...todo,
    title: data.title,
  },
);
```

Ví dụ Todo cũ:

```json
{
  "id": "1",
  "title": "Học React",
  "completed": false
}
```

User sửa thành:

```text
Học React Hook Form
```

Request:

```http
PUT /todos/1
```

Body:

```json
{
  "id": "1",
  "title": "Học React Hook Form",
  "completed": false
}
```

---

# 23. Vì sao sử dụng ...todo?

Code:

```tsx
{
  ...todo,
  title: data.title,
}
```

Giả sử:

```json
{
  "id": "1",
  "title": "Học React",
  "completed": false
}
```

Spread:

```tsx
...todo
```

giữ lại:

```text
id
completed
```

Sau đó:

```tsx
title: data.title;
```

ghi đè `title`.

Kết quả:

```json
{
  "id": "1",
  "title": "Học React Hook Form",
  "completed": false
}
```

---

# 24. onUpdate()

Sau khi PUT thành công:

```tsx
onUpdate(response.data);
```

TodoForm không tự quản lý:

```text
todos
```

TodoForm chỉ thông báo cho App:

```text
Todo đã được cập nhật
```

thông qua:

```tsx
onUpdate();
```

---

# 25. App quản lý todos

Trong App:

```tsx
const [todos, setTodos] = useState<Todo[]>([]);
```

App là nơi sở hữu danh sách.

App chịu trách nhiệm:

```text
GET
POST
UPDATE STATE
DELETE
```

TodoForm chịu trách nhiệm:

```text
Form
Validate
POST
PUT
```

---

# 26. Hàm updateTodo()

Trong `App.tsx`:

```tsx
const updateTodo = (updatedTodo: Todo) => {
  setTodos((currentTodos) =>
    currentTodos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo,
    ),
  );
};
```

Luồng:

```text
todos hiện tại
    ↓
map()
    ↓
Tìm Todo cùng id
    ↓
Nếu đúng
    ↓
Thay Todo cũ bằng Todo mới
```

---

# 27. Ví dụ updateTodo()

Danh sách ban đầu:

```json
[
  {
    "id": "1",
    "title": "Học React",
    "completed": false
  },
  {
    "id": "2",
    "title": "Học TypeScript",
    "completed": false
  }
]
```

Todo mới:

```json
{
  "id": "1",
  "title": "Học React Hook Form",
  "completed": false
}
```

`map()`:

```text
Todo 1
    ↓
id giống nhau
    ↓
thay bằng Todo mới

Todo 2
    ↓
id khác
    ↓
giữ nguyên
```

---

# 28. setTodos() và map()

```tsx
setTodos((currentTodos) =>
  currentTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
);
```

Có thể đọc:

```text
currentTodos
    ↓
map từng Todo
    ↓
id giống updatedTodo.id ?
       ↙       ↘
     Có         Không
      ↓           ↓
updatedTodo    todo cũ
```

Đây là kỹ thuật quan trọng khi cập nhật State trong React.

---

# 29. App hoàn chỉnh

`App.tsx`:

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

  const addTodo = (todo: Todo) => {
    setTodos((currentTodos) => [...currentTodos, todo]);
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo,
      ),
    );

    setEditingTodo(null);
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);

      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));

      if (editingTodo?.id === id) {
        setEditingTodo(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const cancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <div>
      <h1>Todo List</h1>

      <TodoForm
        todo={editingTodo}
        onAdd={addTodo}
        onUpdate={updateTodo}
        onCancel={cancelEdit}
      />

      <hr />

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={handleEdit}
          onDelete={deleteTodo}
        />
      ))}
    </div>
  );
}

export default App;
```

---

# 30. TodoItem

`TodoItem.tsx`:

```tsx
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

function TodoItem({ todo, onEdit, onDelete }: TodoItemProps) {
  return (
    <div>
      <span>{todo.title}</span>

      <button type="button" onClick={() => onEdit(todo)}>
        Sửa
      </button>

      <button type="button" onClick={() => onDelete(todo.id)}>
        Xóa
      </button>
    </div>
  );
}

export default TodoItem;
```

---

# 31. Luồng khi click Sửa

Giả sử:

```text
Học React
```

Click:

```text
[Sửa]
```

TodoItem gọi:

```tsx
onEdit(todo);
```

App:

```tsx
const handleEdit = (todo: Todo) => {
  setEditingTodo(todo);
};
```

State:

```text
editingTodo
```

thay đổi:

```text
null

↓

Todo
```

TodoForm nhận:

```tsx
todo = { editingTodo };
```

Sau đó:

```tsx
useEffect();
```

chạy:

```tsx
reset({
  title: todo.title,
});
```

Form:

```text
[ Học React ] [Cập nhật] [Hủy]
```

---

# 32. Luồng sau khi click Cập nhật

User sửa:

```text
Học React
```

thành:

```text
Học React Hook Form
```

Click:

```text
[Cập nhật]
```

Luồng:

```text
Click Cập nhật
       ↓
handleSubmit()
       ↓
Validate
       ↓
onSubmit(data)
       ↓
todo tồn tại?
       ↓
YES
       ↓
axios.put()
       ↓
PUT /todos/1
       ↓
JSON Server
       ↓
response.data
       ↓
onUpdate()
       ↓
updateTodo()
       ↓
setTodos()
       ↓
setEditingTodo(null)
       ↓
React render
```

---

# 33. Hủy Edit

Khi đang Edit:

```text
[ Học React Hook Form ]

[ Cập nhật ] [ Hủy ]
```

Click:

```text
[Hủy]
```

TodoForm gọi:

```tsx
onCancel();
```

App:

```tsx
const cancelEdit = () => {
  setEditingTodo(null);
};
```

Form trở về:

```text
[                    ] [Thêm]
```

---

# 34. Hai Mode của TodoForm

```text
                TodoForm
                   │
          ┌────────┴────────┐
          │                 │
          ↓                 ↓
       ADD MODE          EDIT MODE
          │                 │
       todo=null         todo=Todo
          │                 │
          ↓                 ↓
      axios.post()       axios.put()
          │                 │
          ↓                 ↓
        onAdd()          onUpdate()
          │                 │
          ↓                 ↓
      setTodos()         setTodos()
```

---

# 35. GET, POST, PUT, DELETE

Sau Lesson 10:

```text
GET
 ↓
Lấy Todo

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

CRUD:

```text
             TODO
               │
      ┌────────┼────────┐
      │        │        │
     GET      POST     PUT
      │        │        │
     Read    Create   Update
      │        │        │
      └────────┼────────┘
               │
             DELETE
               │
             Delete
```

---

# 36. PUT và PATCH

Ngoài PUT còn có:

```text
PATCH
```

PUT:

```tsx
axios.put("/todos/1", {
  id: "1",
  title: "Học React",
  completed: false,
});
```

PATCH:

```tsx
axios.patch("/todos/1", {
  title: "Học React Hook Form",
});
```

Hiểu đơn giản:

```text
PUT
 ↓
Cập nhật toàn bộ Resource
```

```text
PATCH
 ↓
Cập nhật một phần Resource
```

Trong Lesson 10 sử dụng:

```text
PUT
```

để hiểu Update trong CRUD.

---

# 37. Tại sao không gọi GET lại sau PUT?

Có hai cách.

### Cách 1

```text
PUT
 ↓
GET /todos
 ↓
setTodos()
```

### Cách 2

```text
PUT
 ↓
response.data
 ↓
updateTodo()
 ↓
setTodos()
```

Lesson 10 sử dụng:

```text
Cách 2
```

vì API đã trả về Todo mới.

---

# 38. Cập nhật State bằng map()

Khi Edit:

```tsx
setTodos((currentTodos) =>
  currentTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
);
```

Khi Delete:

```tsx
setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
```

Có thể nhớ:

```text
Thêm
 ↓
spread + []

Sửa
 ↓
map()

Xóa
 ↓
filter()
```

---

# 39. Không sửa trực tiếp State

Không nên:

```tsx
todos[0].title = "Học React";
```

Không nên:

```tsx
todos.push(newTodo);
```

Thay vào đó:

```tsx
setTodos((currentTodos) => [...currentTodos, newTodo]);
```

Update:

```tsx
setTodos((currentTodos) =>
  currentTodos.map(...)
);
```

Delete:

```tsx
setTodos((currentTodos) =>
  currentTodos.filter(...)
);
```

Nguyên tắc:

```text
Không mutate State trực tiếp.

Tạo State mới
    ↓
setState()
```

---

# 40. React Hook Form trong Edit

Lesson 9:

```tsx
register();
handleSubmit();
errors;
reset();
```

Lesson 10 bổ sung:

```tsx
reset(data);
```

để đưa dữ liệu Todo cũ vào Form.

Luồng:

```text
Todo
 ↓
reset()
 ↓
React Hook Form
 ↓
Input
```

---

# 41. Validation vẫn giữ nguyên

Edit cũng phải Validate:

```tsx
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
```

Nếu User sửa thành:

```text
ab
```

thì:

```text
Công việc phải có ít nhất 3 ký tự
```

Không gọi:

```tsx
axios.put();
```

Luồng:

```text
Edit
 ↓
Submit
 ↓
Validate
 ↓
Có lỗi
 ↓
Không PUT
```

---

# 42. Edit không có nghĩa là bỏ Validate

Cả Add và Edit đều phải:

```text
Validate
```

```text
ADD

Form
 ↓
Validate
 ↓
POST
```

```text
EDIT

Form
 ↓
Validate
 ↓
PUT
```

React Hook Form giúp dùng chung Rule.

---

# 43. Loading khi Edit

Trong project thực tế, PUT có thể mất thời gian.

Có thể tạo:

```tsx
const [loading, setLoading] = useState(false);
```

Khi Submit:

```tsx
setLoading(true);
```

Sau khi hoàn thành:

```tsx
setLoading(false);
```

Button:

```tsx
<button type="submit" disabled={loading}>
  {loading ? "Đang cập nhật..." : "Cập nhật"}
</button>
```

Trong Lesson 10 có thể giới thiệu, chưa bắt buộc triển khai.

---

# 44. Cấu trúc Project sau Lesson 10

```text
src
│
├── components
│   ├── TodoForm.tsx
│   └── TodoItem.tsx
│
├── types
│   └── todo.ts
│
└── App.tsx
```

Luồng:

```text
App
 │
 ├── todos
 ├── editingTodo
 │
 ├── TodoForm
 │     ├── Add
 │     └── Edit
 │
 └── TodoItem
       ├── Edit
       └── Delete
```

---

# 45. Bài tập thực hành

## Bài 1 - Thêm nút Sửa

Trong `TodoItem.tsx`:

```text
[Sửa]
```

Khi click:

```tsx
onEdit(todo);
```

---

## Bài 2 - Tạo editingTodo

Trong `App.tsx`:

```tsx
const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
```

---

## Bài 3 - Đưa Todo vào TodoForm

```tsx
<TodoForm
  todo={editingTodo}
  ...
/>
```

---

## Bài 4 - Hiển thị dữ liệu cũ

Khi Edit:

```text
[ Học React ]
```

phải được đưa vào Input.

Sử dụng:

```tsx
useEffect();
```

và:

```tsx
reset();
```

---

## Bài 5 - PUT Todo

Khi click:

```text
[Cập nhật]
```

gửi:

```text
PUT /todos/:id
```

Ví dụ:

```text
PUT /todos/1
```

---

## Bài 6 - Cập nhật State

Sau khi PUT thành công:

```tsx
setTodos();
```

Todo mới phải xuất hiện ngay trên giao diện.

Không gọi lại:

```text
GET /todos
```

---

## Bài 7 - Nút Hủy

Khi Edit:

```text
[Cập nhật] [Hủy]
```

Click Hủy:

```text
editingTodo = null
```

Form trở về Add Mode.

---

# 46. Bài tập nâng cao

Hoàn thiện giao diện:

```text
--------------------------------------

              TODO LIST

--------------------------------------

[ Nhập công việc............... ] [Thêm]

--------------------------------------

□ Học React
                    [Sửa] [Xóa]

□ Học TypeScript
                    [Sửa] [Xóa]

☑ Làm bài tập
                    [Sửa] [Xóa]

--------------------------------------
```

Khi click:

```text
[Sửa]
```

Giao diện:

```text
--------------------------------------

Đang sửa: Học React

[ Học React................... ]

[ Cập nhật ] [ Hủy ]

--------------------------------------
```

Sau khi cập nhật:

```text
--------------------------------------

[ Nhập công việc............... ] [Thêm]

--------------------------------------

□ Học React Hook Form
                    [Sửa] [Xóa]

□ Học TypeScript
                    [Sửa] [Xóa]

--------------------------------------
```

---

# 47. Bài tập nâng cao 2 - Edit Completed

Todo:

```tsx
interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
```

Mở rộng Form:

```text
[ Học React ]

[ ] Hoàn thành

[ Cập nhật ] [ Hủy ]
```

Form:

```tsx
interface TodoFormData {
  title: string;
  completed: boolean;
}
```

Checkbox:

```tsx
<input type="checkbox" {...register("completed")} />
```

Khi Edit:

```tsx
reset({
  title: todo.title,
  completed: todo.completed,
});
```

PUT:

```tsx
await axios.put<Todo>(`http://localhost:3000/todos/${todo.id}`, {
  ...todo,
  title: data.title,
  completed: data.completed,
});
```

---

# 48. Bài tập nâng cao 3 - Tách API

Tạo:

```text
src
├── api
│   └── todoApi.ts
│
├── components
│   ├── TodoForm.tsx
│   └── TodoItem.tsx
│
├── types
│   └── todo.ts
│
└── App.tsx
```

`todoApi.ts`:

```tsx
import axios from "axios";
import type { Todo } from "../types/todo";

const API_URL = "http://localhost:3000/todos";

export const getTodos = async () => {
  const response = await axios.get<Todo[]>(API_URL);

  return response.data;
};

export const createTodo = async (data: Omit<Todo, "id">) => {
  const response = await axios.post<Todo>(API_URL, data);

  return response.data;
};

export const updateTodoApi = async (id: string, data: Partial<Todo>) => {
  const response = await axios.put<Todo>(`${API_URL}/${id}`, data);

  return response.data;
};

export const deleteTodo = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
```

Khi đó Component sẽ sạch hơn.

---

# 49. Một số lỗi thường gặp

## Lỗi 1 - Không có id

Sai:

```tsx
axios.put("http://localhost:3000/todos", data);
```

Đúng:

```tsx
axios.put(`http://localhost:3000/todos/${todo.id}`, data);
```

Nhớ:

```text
POST

/todos


PUT

/todos/:id
```

---

## Lỗi 2 - Không đưa dữ liệu cũ vào Form

Click Edit nhưng Form vẫn:

```text
[                     ]
```

Nguyên nhân:

```text
Todo đã được chọn
nhưng React Hook Form chưa nhận dữ liệu mới.
```

Cần:

```tsx
useEffect(() => {
  if (todo) {
    reset({
      title: todo.title,
    });
  }
}, [todo, reset]);
```

---

## Lỗi 3 - Edit xong nhưng UI không đổi

API:

```text
PUT /todos/1
```

thành công nhưng UI vẫn hiển thị Todo cũ.

Nguyên nhân:

```text
Server đã cập nhật
nhưng State React chưa cập nhật.
```

Cần:

```tsx
onUpdate(response.data);
```

và:

```tsx
const updateTodo = (updatedTodo: Todo) => {
  setTodos((currentTodos) =>
    currentTodos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo,
    ),
  );
};
```

---

## Lỗi 4 - Quên reset Edit Mode

Sau khi Edit thành công Form vẫn ở:

```text
[Cập nhật] [Hủy]
```

Cần:

```tsx
setEditingTodo(null);
```

Sau đó:

```text
EDIT MODE
   ↓
UPDATE
   ↓
setEditingTodo(null)
   ↓
ADD MODE
```

---

## Lỗi 5 - Nút Hủy làm Submit Form

Trong `<form>`, nên viết:

```tsx
<button type="button" onClick={onCancel}>
  Hủy
</button>
```

Nút Submit:

```tsx
<button type="submit">Cập nhật</button>
```

Nhớ:

```text
Submit button
    ↓
type="submit"

Cancel button
    ↓
type="button"
```

---

# 50. Kiến thức cần nhớ

### Chọn Todo Edit

```tsx
setEditingTodo(todo);
```

### Form nhận Todo

```tsx
<TodoForm todo={editingTodo} />
```

### Kiểm tra Edit Mode

```tsx
const isEditMode = Boolean(todo);
```

### Đưa dữ liệu cũ vào Form

```tsx
reset({
  title: todo.title,
});
```

### Submit

```tsx
<form onSubmit={handleSubmit(onSubmit)}>
```

### PUT

```tsx
axios.put(`http://localhost:3000/todos/${todo.id}`, data);
```

### Cập nhật State

```tsx
setTodos((currentTodos) =>
  currentTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
);
```

### Hủy Edit

```tsx
setEditingTodo(null);
```

---

# 51. Tổng kết Lesson 10

Lesson 9:

```text
CREATE

Form
 ↓
React Hook Form
 ↓
Validate
 ↓
POST
 ↓
setTodos()
```

Lesson 10:

```text
UPDATE

Click Edit
 ↓
Todo
 ↓
reset()
 ↓
React Hook Form
 ↓
Validate
 ↓
PUT
 ↓
onUpdate()
 ↓
setTodos()
 ↓
UI
```

CRUD hiện tại:

```text
GET
POST
PUT
DELETE
```

Luồng Edit quan trọng nhất:

```text
Click Edit
    ↓
setEditingTodo(todo)
    ↓
TodoForm nhận todo
    ↓
useEffect()
    ↓
reset()
    ↓
Hiển thị dữ liệu cũ
    ↓
User chỉnh sửa
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
response.data
    ↓
onUpdate()
    ↓
map()
    ↓
setTodos()
    ↓
setEditingTodo(null)
    ↓
React render
```

Điểm cần nhớ:

```text
ADD

POST
 ↓
onAdd()
 ↓
setTodos()
```

```text
EDIT

PUT
 ↓
onUpdate()
 ↓
map()
 ↓
setTodos()
```

```text
DELETE

DELETE
 ↓
filter()
 ↓
setTodos()
```

Sau Lesson 10, sinh viên đã hoàn thành CRUD Todo cơ bản với:

```text
React
+
TypeScript
+
Axios
+
JSON Server
+
React Hook Form
```
