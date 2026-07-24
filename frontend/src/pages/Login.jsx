import { useState } from "react";
import axios from "axios";
import {
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { role } = useParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getRoleTitle = () => {
    if (role === "admin") return "🛡️ Admin Login";
    if (role === "faculty") return "👨‍🏫 Faculty Login";
    return "🎓 Student Login";
  };

  const getButtonColor = () => {
    if (role === "admin")
      return "bg-red-600 hover:bg-red-700";

    if (role === "faculty")
      return "bg-green-600 hover:bg-green-700";

    return "bg-blue-600 hover:bg-blue-700";
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        {
          email,
          password,
        }
      );

      if (response.data.role !== role) {
        alert(
          `This account belongs to ${response.data.role}`
        );
        return;
      }

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      localStorage.setItem(
        "username",
        response.data.username
      );

      alert("Login Successful 🚀");

      if (response.data.role === "admin") {
        navigate("/admin");
      } else if (
        response.data.role === "faculty"
      ) {
        navigate("/faculty");
      } else {
        navigate("/student");
      }
    } catch (error) {
      console.log(error);
      alert("Login Failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">

        {/* BACK BUTTON */}

        <div className="mb-6">
          <Link
            to="/"
            className="text-slate-300 hover:text-white transition duration-300"
          >
            ← Back to Home
          </Link>
        </div>

        {/* HEADER */}

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">
            {getRoleTitle()}
          </h1>

          <p className="text-slate-400">
            AI Powered College ERP
          </p>
        </div>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-slate-700 text-white mb-4 outline-none"
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-slate-700 text-white mb-6 outline-none"
        />

        {/* LOGIN BUTTON */}

        <button
          onClick={handleLogin}
          className={`w-full p-4 rounded-xl font-bold text-white transition duration-300 ${getButtonColor()}`}
        >
          Login
        </button>

        <div className="text-center text-slate-400 text-sm mt-6">
          AI College ERP Portal
        </div>

      </div>

    </div>
  );
}

export default Login;