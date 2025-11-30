import { Check, X } from "lucide-react";
import { useState } from "react";

const Day05TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    const newTodo = {
      id: crypto.randomUUID(),
      text,
      done: false,
    };

    setTodos([...todos, newTodo]);
    setText("");
  };

  const toggleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a todo..."
            className="flex-1 border p-2 rounded-lg"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded-lg cursor-pointer hover:bg-blue-700"
          >
            Add
          </button>
        </form>

        {/* Empty state */}
        {todos.length === 0 && (
          <p className="text-center font-bold text-gray-500">
            Oops! It's empty. Add a todo to get started.
          </p>
        )}

        {/* Todo List */}
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="p-3 bg-gray-100 rounded-lg shadow flex justify-between items-center"
            >
              <p className={`${todo.done ? "line-through text-gray-400" : ""}`}>
                {todo.text}
              </p>

              <button
                onClick={() => toggleDone(todo.id)}
                className="p-2 rounded-lg hover:bg-gray-200"
              >
                {todo.done ? <X color="red" /> : <Check color="green" />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Day05TodoApp;
