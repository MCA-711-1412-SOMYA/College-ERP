import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleRegister = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/register",
        {
          username,
          email,
          password,
          role,
        }
      );

      alert("Registration Successful ✅");

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.detail ||
        "Registration Failed ❌"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-slate-950 to-blue-950 flex justify-center items-center p-5">

      <div className="w-full max-w-lg bg-slate-800/70 backdrop-blur-lg p-10 rounded-3xl shadow-2xl">

        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Create Account 🚀
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full p-4 mb-4 rounded-xl bg-slate-700 text-white outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-4 mb-4 rounded-xl bg-slate-700 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-4 mb-4 rounded-xl bg-slate-700 text-white outline-none"
        />

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          className="w-full p-4 mb-6 rounded-xl bg-slate-700 text-white outline-none"
        >
          <option value="student">
            Student
          </option>

          <option value="faculty">
            Faculty
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl font-bold"
        >
          Register
        </button>

        <p className="text-center text-slate-300 mt-6">
          Already have an account?
        </p>

        <Link to="/login">
          <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold">
            Login
          </button>
        </Link>

      </div>

    </div>
  );
}

export default Register;