import { Link } from "react-router-dom";

function AdminDashboard() {

  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-5xl font-bold">
             Admin Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Welcome, {username}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-bold"
        >
          Logout
        </button>

      </div>

      {/* DASHBOARD CARDS */}

      <div className="grid md:grid-cols-4 gap-6">

        {/* STUDENTS */}

        <div className="bg-slate-800 p-8 rounded-xl">
          <h2 className="text-3xl font-bold">
             Students
          </h2>

          <p className="mt-3 text-slate-300">
            Manage all students
          </p>

          <Link to="/students">
            <button className="mt-5 bg-green-500 hover:bg-green-600 px-5 py-3 rounded-lg font-bold">
              Open
            </button>
          </Link>
        </div>

        {/* FACULTY */}

        <div className="bg-slate-800 p-8 rounded-xl">
          <h2 className="text-3xl font-bold">
             Faculty
          </h2>

          <p className="mt-3 text-slate-300">
            Manage faculty records
          </p>

          <Link to="/faculty-management">
            <button className="mt-5 bg-indigo-500 hover:bg-indigo-600 px-5 py-3 rounded-lg font-bold">
              Open
            </button>
          </Link>
        </div>

        {/* ATTENDANCE */}

        <div className="bg-slate-800 p-8 rounded-xl">
          <h2 className="text-3xl font-bold">
             Attendance
          </h2>

          <p className="mt-3 text-slate-300">
            Manage attendance records
          </p>

          <Link to="/attendance">
            <button className="mt-5 bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-lg font-bold">
              Open
            </button>
          </Link>
        </div>

        {/* AI REPORTS */}

        <div className="bg-slate-800 p-8 rounded-xl">
          <h2 className="text-3xl font-bold">
             AI Reports
          </h2>

          <p className="mt-3 text-slate-300">
            View AI generated insights
          </p>

          <Link to="/ai">
            <button className="mt-5 bg-purple-500 hover:bg-purple-600 px-5 py-3 rounded-lg font-bold">
              Open
            </button>
          </Link>
        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="bg-slate-800 p-8 rounded-xl mt-10">

        <h2 className="text-3xl font-bold mb-6">
           Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <Link to="/students">
            <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-bold">
              Add Student
            </button>
          </Link>

          <Link to="/add-faculty">
            <button className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-lg font-bold">
              Add Faculty
            </button>
          </Link>

          <Link to="/attendance">
            <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-bold">
              Mark Attendance
            </button>
          </Link>

          <Link to="/dashboard">
            <button className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg font-bold text-black">
              View Analytics
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;