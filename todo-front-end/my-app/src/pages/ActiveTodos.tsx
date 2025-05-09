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

const ActiveTodos = () => {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const getAllNotCompletedTodos = async () => {
    const userId = getLoginInfo()?.userId;
    if(userId != null) {
      const response = await custom_axios.get(ApiConstants.TODO.FIND_NOT_COMPLETED(userId), { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
      setTodos(response.data);
      console.log(response.data);
    } else {
      toast.info("Désolé, tu n'es pas authentifié");
    }
  }
  const saveTodo = async () => {
    try {
      if(title === ""){
        toast.info("Ecrivez un titre svp");
        return;
      }
      
      const userId = getLoginInfo()?.userId;
      if(userId != null) {
        await custom_axios.post(ApiConstants.TODO.ADD(userId), { title: title}, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
        await getAllNotCompletedTodos();
        setTitle('');
        toast.success('Todo ajoutée avec succès');
      } else {
        toast.info("Désolé, tu n'es pas authentifié");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la todo:", error);
      toast.error("Erreur lors de l'ajout de la todo");
    }
  }

  const deleteTodo = async (todoId: number) => {
    try {
      await custom_axios.delete(ApiConstants.TODO.DELETE(todoId), { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
      getAllNotCompletedTodos();
      toast.success("Todo Deleted Sucessfully!!");
    } catch(error) {
      console.log("erreur lors de la suppression", error)
    }
  }

  const markTodo = async (todoId: number) => {
    try {
      await custom_axios.patch(ApiConstants.TODO.MARK_COMPLETE(todoId), { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
      getAllNotCompletedTodos();
      toast.success("Todo Marked Sucessfully!!");
    } catch(error) {
      console.log("erreur lors de la suppression", error)
    }
  }

  useEffect(() => {
    if (todos.length === 0) getAllNotCompletedTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <NavBar></NavBar>
      <div className="container mb-2 flex mx-auto w-full items-center justify-center">
        <ul className="flex flex-col p-4">
          <span className="text-black text-2xl">Enter Todo :</span>
          <input value={title} onChange={(e)=> setTitle(e.target.value)} className="mt-2 p-2 rounded-xl" />
          <button onClick={saveTodo} className="w-36 px-2 py-4 text-white mx-auto mb-12 mt-2 bg-green-400 rounded-xl hover:bg-green-500 text-2xl">
            Save
          </button>

          {
            todos.map((todo)=> {
              return <ActiveTodoList
              key={todo.id}
              id={todo.id}
              todo={todo.title}
              dateTime={todo.date}
              deleteTodo={()=> deleteTodo(todo.id)}
              markTodo={()=> markTodo(todo.id)}
            ></ActiveTodoList>
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default ActiveTodos;