import React from "react";
import NavBar from "../components/NavBar";
import ActiveTodoList from "../components/ActiveTodoList";

function ActiveTodos() {
  return (
    <div>
      <NavBar />
      <div className="container mb-2 flex mx-auto w-full items-center justify-center">
        <ul className="flex flex-col p-4">
          <span className="text-black text-2xl">Enter Todo :</span>
          <input className="mt-2 p-2 rounded-xl" />
          <button className="w-36 px-2 py-4 text-white mx-auto mb-12 mt-2 bg-green-400 rounded-xl hover:bg-green-500 text-2xl">
            Save
          </button>

          {/* Exemple statique d’un todo (à remplacer par du mapping dynamique plus tard) */}
          <ActiveTodoList
            key={1}
            id={1}
            todo="Exemple de tâche"
            dateTime="2025-01-01"
            deleteTodo={() => {}}
            markCompelte={() => {}}
          />
        </ul>
      </div>
    </div>
  );
}

export default ActiveTodos;