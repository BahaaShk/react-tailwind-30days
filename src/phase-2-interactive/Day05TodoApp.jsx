import { useState } from "react";

const Day05TodoApp = () => {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState(""); 

const handleSubmit = (e) => {
  e.preventDefault()

  if(!input.trim()) return

  const newTodo = {
    id: crypto.randomUUID(),
    text: input,
    completed: false
  }

  setTodos([...todos, newTodo]);
  setInput("")
} 
  return (
    <div className=" min-h-screen bg-gray-200 flex justify-center p-6">
<div className=" w-full max-w-md bg-white p-6 rounded-2xl shadow-2xl">
  <h1 className=" text-2xl font-bold mb-4 text-center">Todo List</h1>

  <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a todo ..." />
  </form>
</div>
    </div>
  )
}

export default Day05TodoApp