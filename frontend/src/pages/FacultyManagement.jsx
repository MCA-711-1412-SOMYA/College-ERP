import { useEffect, useState } from "react";
import axios from "axios";

function FacultyManagement() {

  const [faculty, setFaculty] = useState([]);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/faculty"
      );

      setFaculty(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const deleteFaculty = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/faculty/${id}`
      );

      fetchFaculty();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        👨‍🏫 Faculty Management
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full bg-slate-800 rounded-xl overflow-hidden">

          <thead>
            <tr className="bg-slate-700">
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Department</th>
              <th className="p-4">Designation</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>

            {faculty.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-700"
              >
                <td className="p-4">{item.id}</td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.email}</td>
                <td className="p-4">{item.department}</td>
                <td className="p-4">{item.designation}</td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      deleteFaculty(item.id)
                    }
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
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

export default FacultyManagement;