import axios from "axios";
import { useForm } from "react-hook-form";

interface TodoFormData {
  title: string;
  completed: string;
  priority: string;
}
function AddPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormData>();
  const onSubmit = (data: TodoFormData) => {
    console.log(data);
    const newData = {
      ...data,
      completed: data.completed == "true" ? true : false,
    };
    axios.post("http://localhost:3000/todos", newData).then(() => {
      alert("them thanh cong");
    });
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Text input */}
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Text
          </label>
          <input
            {...register("title", { required: "bat buoc phai nhap title" })}
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {errors?.title && <span>{errors.title.message}</span>}
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            priority
          </label>
          <input
            {...register("priority")}
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Select */}
        <div>
          <label htmlFor="selectOption" className="block font-medium mb-1">
            Select - option
          </label>
          <select
            {...register("completed")}
            id="selectOption"
            className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="true">Hoan thanh</option>
            <option value="false">Chua lam</option>
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddPage;
