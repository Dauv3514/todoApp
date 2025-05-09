import { useEffect, useState } from "react";
import { ApiConstants } from "../api/ApiConstants";
import custom_axios from "../axios/AxiosSetup";
import NavBar from "../components/NavBar";
import { getLoginInfo } from "../utils/LoginInfo";
import { toast } from "react-toastify";

interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  role: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<UserModel[]>([]);

  const getAllUsers = async () => {
    const role = getLoginInfo()?.role;
    if(role != null && role == "ADMIN") {
      const response = await custom_axios.get(ApiConstants.USER.FIND_ALL, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
      setUsers(response.data);
    } else {
      toast.info("Forbidden Resource");
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await custom_axios.delete(ApiConstants.USER.DELETE(userId), { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
      getAllUsers();
      toast.success("User Deleted Sucessfully!!");
    } catch(error) {
      console.log("erreur lors de la suppression", error)
    }
  }

  useEffect(() => {
    if (users.length === 0) getAllUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NavBar />
      <h1 className="text-2xl text-black text-center p-4">Users</h1>
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">First Name</th>
                      <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">Last Name</th>
                      <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">Email</th>
                      <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.firstName}</td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{user.lastName}</td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.email}</td>
                        <td className="py-4 px-6 text-sm font-medium text-start whitespace-nowrap">
                            <button
                              hidden={user.role === "ADMIN" ? true : false}
                              onClick={() => deleteUser(user.id)}
                              className="bg-red-400 hover:bg-red-500 rounded-lg px-4 py-2 text-white shadow-sm text-xl"
                            >
                              Delete
                            </button>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center text-gray-500 p-4">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;