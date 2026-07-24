import { useEffect, useState } from "react";
import axios from "axios";

function Students() {

  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  const [editingId, setEditingId] = useState(null);

  // FETCH STUDENTS

  const fetchStudents = async () => {
    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/students"
      );

      setStudents(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ADD STUDENT
const addStudent = async () => {

  if (!name.trim()) {
    alert("Student Name is required");
    return;
  }

  if (name.trim().length < 3) {
    alert("Name must be at least 3 characters");
    return;
  }

  if (!email.trim()) {
    alert("Email is required");
    return;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Enter valid email");
    return;
  }

  if (!course.trim()) {
    alert("Course is required");
    return;
  }

  try {

    await axios.post(
      "http://127.0.0.1:8000/students",
      {
        name,
        email,
        course,
      }
    );

    alert("Student Added Successfully ✅");

    setName("");
    setEmail("");
    setCourse("");

    fetchStudents();

  } catch (error) {

    if (error.response) {
      alert(error.response.data.detail);
    } else {
      alert("Server Error");
    }

  }
};

  // DELETE STUDENT

  const deleteStudent = async (id) => {
    try {

      await axios.delete(
        `http://127.0.0.1:8000/students/${id}`
      );

      fetchStudents();

    } catch (error) {
      console.log(error);
    }
  };

  // EDIT STUDENT

  const editStudent = (student) => {

    setEditingId(student.id);

    setName(student.name);
    setEmail(student.email);
    setCourse(student.course);
  };

  // UPDATE STUDENT
const updateStudent = async () => {

  if (!name.trim()) {
    alert("Student Name is required");
    return;
  }

  if (name.trim().length < 3) {
    alert("Name must be at least 3 characters");
    return;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Enter valid email");
    return;
  }

  if (!course.trim()) {
    alert("Course is required");
    return;
  }

  try {

    await axios.put(
      `http://127.0.0.1:8000/students/${editingId}`,
      {
        name,
        email,
        course,
      }
    );

    alert("Student Updated Successfully ✅");

    setEditingId(null);

    setName("");
    setEmail("");
    setCourse("");

    fetchStudents();

  } catch (error) {

    if (error.response) {
      alert(error.response.data.detail);
    } else {
      alert("Update Failed ❌");
    }

  }
};

  const exportStudents = () => {
  window.open(
    "http://127.0.0.1:8000/export-students",
    "_blank"
  );
};

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        Student Management 🎓
      </h1>

      

      <input
        type="text"
        placeholder="Search Student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded bg-slate-700 mb-6 outline-none"
      />

      <button
  onClick={exportStudents}
  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-bold mb-6"
>
  📊 Export Students
</button>

<button
  onClick={() =>
    window.open(
      "http://127.0.0.1:8000/student-report",
      "_blank"
    )
  }
  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold mb-6 ml-4"
>
  📄 Download PDF
</button>

{/* FORM */}

      <div className="bg-slate-800 p-6 rounded-xl mb-10">

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded bg-slate-700 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded bg-slate-700 outline-none"
          />

          <select
  value={course}
  onChange={(e) => setCourse(e.target.value)}
  className="p-3 rounded bg-slate-700 outline-none"
>
  <option value="">Select Course</option>
  <option value="MCA">MCA</option>
  <option value="MBA">MBA</option>
  <option value="MCA AI">MCA AI</option>
  <option value="BCA">BCA</option>
  <option value="BBA">BBA</option>
</select>

        </div>

        {editingId ? (

          <button
            onClick={updateStudent}
            className="mt-6 bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded font-bold"
          >
            Update Student
          </button>

        ) : (

          <button
            onClick={addStudent}
            className="mt-6 bg-green-500 hover:bg-green-600 px-6 py-3 rounded font-bold"
          >
            Add Student
          </button>

        )}

      </div>

      {/* TABLE */}

      <div className="bg-slate-800 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-700">

            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Course</th>
              <th className="p-4 text-left">Action</th>
            </tr>

          </thead>

          <tbody>

            {students
              .filter((student) =>
  student.name
    .toLowerCase()
    .includes(search.toLowerCase()) ||

  student.email
    .toLowerCase()
    .includes(search.toLowerCase()) ||

  student.course
    .toLowerCase()
    .includes(search.toLowerCase())
)
              .map((student) => (

                <tr
                  key={student.id}
                  className="border-b border-slate-700"
                >

                  <td className="p-4">{student.id}</td>
                  <td className="p-4">{student.name}</td>
                  <td className="p-4">{student.email}</td>
                  <td className="p-4">{student.course}</td>

                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() => editStudent(student)}
                      className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded"
                    >
                      Edit
                    </button>

                    <button
                     onClick={() => {

  const confirmDelete = window.confirm(
    `Delete ${student.name}?`
  );

  if (confirmDelete) {
    deleteStudent(student.id);
  }

}}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Students;