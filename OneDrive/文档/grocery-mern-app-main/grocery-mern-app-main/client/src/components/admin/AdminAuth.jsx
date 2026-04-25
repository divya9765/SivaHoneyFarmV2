import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
const AdminAuth = () => {
  const { axios, navigate, setIsAdmin } = useAppContext();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "register") {
        const { data } = await axios.post("/api/admin/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsAdmin(true);
          toast.success(data.message);
          navigate("/seller");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post("/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          setIsAdmin(true);
          toast.success(data.message);
          navigate("/seller");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-30 flex items-center justify-center bg-black/50 text-gray-600">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-indigo-500">Admin</span> {mode === "register" ? "Register" : "Login"}
        </p>
        {mode === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full">
          <p>Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="password"
            required
          />
        </div>
        <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {mode === "register" ? "Register" : "Login"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "register" ? "login" : "register")}
          className="text-indigo-500 underline"
        >
          {mode === "register" ? "Already have an account? Login" : "Create new admin"}
        </button>
      </form>
    </div>
  );
};
export default AdminAuth;
