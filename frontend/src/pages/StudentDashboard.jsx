import { Link } from "react-router-dom";

function StudentDashboard() {

  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      {/* Header */}

      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-5xl font-bold">
            🎓 Student Dashboard
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

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        {/* Attendance */}

        <div className="bg-slate-800 p-8 rounded-xl">

          <h2 className="text-3xl font-bold">
            📅 Attendance
          </h2>

          <p className="mt-3 text-slate-300">
            View attendance records and percentage
          </p>

          <Link to="/attendance">
            <button className="mt-5 bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-lg font-bold">
              Open
            </button>
          </Link>

        </div>

        {/* AI Assistant */}

        <div className="bg-slate-800 p-8 rounded-xl">

          <h2 className="text-3xl font-bold">
            🤖 AI Assistant
          </h2>

          <p className="mt-3 text-slate-300">
            Ask academic questions using AI
          </p>

          <Link to="/ai">
            <button className="mt-5 bg-purple-500 hover:bg-purple-600 px-5 py-3 rounded-lg font-bold">
              Open
            </button>
          </Link>

        </div>

        {/* Reports */}

        <div className="bg-slate-800 p-8 rounded-xl">

          <h2 className="text-3xl font-bold">
            📄 Reports
          </h2>

          <p className="mt-3 text-slate-300">
            Download PDF and Excel reports
          </p>

          <a
            href="http://127.0.0.1:8000/student-report"
            target="_blank"
            rel="noreferrer"
          >
            <button className="mt-5 bg-green-500 hover:bg-green-600 px-5 py-3 rounded-lg font-bold">
              Download
            </button>
          </a>

        </div>

      </div>

      {/* Student Info */}

      <div className="bg-slate-800 p-8 rounded-xl mt-10">

        <h2 className="text-3xl font-bold mb-4">
          👤 Student Information
        </h2>

        <p>
          Username: <span className="text-green-400">{username}</span>
        </p>

        <p className="mt-2">
          Role: <span className="text-yellow-400">Student</span>
        </p>

      </div>

    </div>
  );
}

export default StudentDashboard;