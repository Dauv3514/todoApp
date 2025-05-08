import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import ActiveTodoList from "../components/ActiveTodoList";
import custom_axios from "../axios/AxiosSetup";
import { getLoginInfo } from "../utils/LoginInfo";
import { toast } from "react-toastify";
import { ApiConstants } from "../api/ApiConstants";

interface TodoModel {
  title: string;
  date: string;
  id: number;
}

function ActiveTodos() {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const getAllNotCompletedTodos = async () => {
    const userId = getLoginInfo()?.userId;
    if(userId != null) {
      const response = await custom_axios.get(ApiConstants.TODO.FIND_NOT_COMPLETED(userId));
      setTodos(response.data);
    } else {
      toast.info("Désolé, tu n'es pas authentifié");
    }
  }
  useEffect(() => {
    if (todos.length === 0) getAllNotCompletedTodos();
  });
  return (
    <div>
      <NavBar></NavBar>
      <div className="container mb-2 flex mx-auto w-full items-center justify-center">
        <ul className="flex flex-col p-4">
          <span className="text-black text-2xl">Enter Todo :</span>
          <input className="mt-2 p-2 rounded-xl" />
          <button className="w-36 px-2 py-4 text-white mx-auto mb-12 mt-2 bg-green-400 rounded-xl hover:bg-green-500 text-2xl">
            Save
          </button>

          {
            todos.map((todo)=> {
              return <ActiveTodoList
              key={todo.id}
              id={todo.id}
              todo={todo.title}
              dateTime={todo.date}
              deleteTodo={() => console.log("cam")}
              markCompelte={() => console.log("completed")}
            />
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default ActiveTodos;