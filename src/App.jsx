import { useState } from "react";

import "./App.css";

function App() {
  const handleSubmit = (e) => {

    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const number = form.name.value;
    const item = form.item.value;

    const newItem = { name, email, number, item };
    console.log(newItem);
  };
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10 bg-[#125781]/40 h-screen text-white">
      <div className="flex lg:flex-row flex-col items-center justify-between gap-6 h-[450px]">
        <div className="bg-red-800 flex-1 h-full rounded-lg shadow-2xl">
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
                className="bg-green-500 py-4 px-4 w-[180px] rounded-lg hover:scale-105 hover:bg-blue-800 duration-800 transition-all ease-in-out"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="bg-yellow-500 flex-1 h-full">right side </div>
      </div>
    </div>
  );
}

export default App;
