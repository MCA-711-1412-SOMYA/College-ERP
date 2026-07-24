import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AddFaculty() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Empty validation
    if (
      !name.trim() ||
      !email.trim() ||
      !department.trim() ||
      !designation.trim()
    ) {
      alert("All fields are required!");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Enter valid email address!");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/faculty",
        {
          name,
          email,
          department,
          designation,
        }
      );

      alert(response.data.message);

      // Clear form
      setName("");
      setEmail("");
      setDepartment("");
      setDesignation("");

    } catch (error) {
      alert(
        error.response?.data?.detail ||
        "Failed to add faculty"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-5xl font-bold">
          👨‍🏫 Add Faculty
        </h1>

        <Link to="/faculty-management">
          <button className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-lg font-bold">
            ← Back
          </button>
        </Link>

      </div>

      {/* Form */}

      <div className="bg-slate-800 p-8 rounded-xl w-full max-w-xl">

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Faculty Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 mb-4 rounded bg-slate-700"
          />

          <input
            type="email"
            placeholder="Faculty Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 mb-4 rounded bg-slate-700"
          />

          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full p-4 mb-4 rounded bg-slate-700"
          />

          <input
            type="text"
            placeholder="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full p-4 mb-6 rounded bg-slate-700"
          />

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-bold"
          >
            Add Faculty
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddFaculty;