import { Check, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

const Day07TodoApp = () => {
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const [todos, setTodos] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("todos"));
    if (saved) {
      try {
        return Array.isArray(saved) ? saved : [];
      } catch {
        return [];
      }
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSave = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
    setEditingText("");
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
            className="bg-blue-600 text-white px-3 rounded-lg cursor-pointer hover:bg-blue-700"
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
              <div className={`${todo.done ? "line-through text-gray-400" : ""}`}>
                {editingId === todo.id ? (
                  <div>
                    <input
                      value={editingText}
                      className="flex-1 border p-2 rounded-lg"
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                    <div className=" flex justify-around mt-2">
                      <button
                        onClick={handleSave}
                        disabled={editingText === ""}
                        className={`bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 ${editingText === "" ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditingText("");
                        }}
                        className="bg-gray-500 text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <span>
                    <p>{todo.text}</p>
                  </span>
                )}
              </div>
              <div className="items-center justify-center flex gap-1">
                <button
                  onClick={() => toggleDone(todo.id)}
                  className={`p-2 rounded-lg hover:bg-gray-300 border border-gray-300 ${editingId !== null ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                  disabled={editingId !== null}
                >
                  {todo.done ? (
                    <X color="red" size={20} />
                  ) : (
                    <Check color="green" size={20} />
                  )}
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className={`p-2 rounded-lg hover:bg-gray-300 border border-gray-300 ${editingId !== null ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                  disabled={editingId !== null}
                >
                  <Trash2 color="red" size={20} />
                </button>
                <button
                  onClick={() => {
                    setEditingId(todo.id);
                    setEditingText(todo.text);
                  }}
                  className={`p-2 rounded-lg hover:bg-gray-300 border border-gray-300 ${editingId !== null || todo.done ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                  disabled={editingId !== null || todo.done}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Day07TodoApp;
