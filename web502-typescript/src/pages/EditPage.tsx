import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

function EditPage() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  console.log(id);
  useEffect(() => {
    function getTodo() {
      axios.get(`http://localhost:3000/todos/${id}`).then((res) => {
        console.log(res.data);
        reset(res.data);
      });
    }
    getTodo();
  }, [id]);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Edit Todo</h1>

      <form className="space-y-6">
        {/* Text input */}
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Text
          </label>
          <input
            {...register("title")}
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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

export default EditPage;
