import { BrowserRouter, Routes, Route } from "react-router-dom";
import ActiveTodos from "./pages/ActiveTodos";
import CompeletedTodos from "./pages/CompletedTodos";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UsersPage from "./pages/UsersPage";


const Routing = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />

          <Route
            path="/active"
            element={
                <ActiveTodos />
            }
          />
          <Route
            path="/completed"
            element={
                <CompeletedTodos />
            }
          />
          <Route
            path="/users"
            element={
                <UsersPage
                  users={[]} 
                  onDeleteUser={(userId: number) => {
                    console.log('Delete user:', userId);
                  }} 
                />
            }
          />

          {/* Default Page Active Todos */}
          <Route
            path="/"
            element={
                <ActiveTodos />
            }
          />
        </Routes>
      </BrowserRouter>
  );
};

export default Routing;