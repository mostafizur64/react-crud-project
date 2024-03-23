import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState({
    name: "",
    email: "",
    number: "",
    item: "",
  });
  console.log(editText);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const number = parseInt(form.number.value);
    const item = form.item.value;

    const newItem = {
      id: new Date().getTime(),
      name: name,
      email: email,
      number: number,
      item: item,
    };
    setTodos([...todos, newItem]);
    form.reset();
  };

  const handleEdit = (id, name, email, number, item) => {
    setEditId(id);
    setEditText({ name, email, number, item });
  };

  const handleEditChange = (e, fieldName) => {
    const { value } = e.target;
    setEditText((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleEditSubmit = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          name: editText.name,
          email: editText.email,
          number: editText.number,
          item: editText.item,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditId(null);
    setEditText({ name: "", email: "", number: "", item: "" });
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10  text-white">
      <div className="flex lg:flex-row flex-col items-center justify-between gap-6 h-[650px]">
        <div className="w-full bg-red-800 flex-1 h-full rounded-lg shadow-2xl">
          <h1 className="text-5xl text-center text-white">Todo List</h1>
          <div className="px-4 h-full flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center w-full text-black"
            >
              <input
                name="name"
                className="py-4 px-4 rounded-md w-full mb-4"
                type="text"
                placeholder="Enter the Name"
              />
              <input
                name="email"
                className="py-4 px-4 rounded-md w-full mb-4"
                type="text"
                placeholder="Enter the Email"
              />
              <input
                name="number"
                className="py-4 px-4 rounded-md w-full mb-4 "
                type="number"
                placeholder="Enter the Number"
              />
              <input
                name="item"
                className="py-4 px-4 rounded-md w-full mb-4"
                type="text"
                placeholder="Enter the Item"
              />
              <button
                type="submit"
                className="bg-green-500 py-4 px-4 w-[180px] rounded-lg hover:scale-105 hover:bg-blue-800 duration-800 transition-all ease-in-out mb-12"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="bg-yellow-500 flex-1 h-full text-[12px] rounded-lg px-2 w-full">
          <h1 className="text-5xl text-center text-white">All Todo List</h1>
          <ul className="px-4 mt-12 overflow-x-auto">
            {todos.map((todo, index) => (
              <li key={index}>
                {editId === todo.id ? (
                  <form
                    onSubmit={() => handleEditSubmit(todo.id)}
                    className="flex flex-col items-center justify-center w-full text-black"
                  >
                    <input
                      name="name"
                      className="py-4 px-4 rounded-md w-full mb-4"
                      type="text"
                      value={editText.name}
                      onChange={(e) => handleEditChange(e, "name")}
                    />
                    <input
                      name="email"
                      className="py-4 px-4 rounded-md w-full mb-4"
                      type="text"
                      value={editText.email}
                      onChange={(e) => handleEditChange(e, "email")}
                    />
                    <input
                      name="number"
                      className="py-4 px-4 rounded-md w-full mb-4 text-black"
                      type="number"
                      value={editText.number}
                      onChange={(e) => handleEditChange(e, "number", todo.id)}
                    />
                    <input
                      name="item"
                      className="py-4 px-4 rounded-md w-full mb-4"
                      type="text"
                      value={editText.item}
                      onChange={(e) => handleEditChange(e, "item")}
                    />
                    <button
                      type="submit"
                      className="bg-green-500 py-4 px-4 w-[180px] rounded-lg hover:scale-105 hover:bg-blue-800 duration-800 transition-all ease-in-out mb-4"
                    >
                      Submit
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center gap-4 border mb-4 px-4 py-4 border-r-sky-200 rounded-lg w-full">
                    <h2 className="">{todo.name}</h2>
                    <h2>{todo.email}</h2>
                    <h2>{todo.number}</h2>
                    <h2>{todo.item}</h2>
                    <div className="flex items-end gap-4 justify-end">
                      <button
                        onClick={() =>
                          handleEdit(
                            todo.id,
                            todo.name,
                            todo.email,
                            todo.number,
                            todo.item
                          )
                        }
                        className="bg-yellow-900 p-1 rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="bg-green-900 p-1 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
