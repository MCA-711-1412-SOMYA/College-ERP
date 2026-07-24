import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 text-white">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

          <h1 className="text-3xl font-extrabold">
            <span className="text-blue-500">AI</span> College ERP
          </h1>

          <div className="flex gap-6 text-lg">
            <Link
              to="/"
              className="hover:text-blue-400 transition"
            >
              Home
            </Link>

            <Link
              to="/login/admin"
              className="hover:text-blue-400 transition"
            >
              Admin
            </Link>
          </div>

        </div>
      </nav>

      {/* HERO */}
      <section className="text-center py-24 px-6">

        <h1 className="text-7xl md:text-8xl font-extrabold mb-6">
          AI Powered College ERP 
        </h1>

        <p className="text-2xl text-slate-300 mb-4">
          Smart Campus Management System
        </p>

        <p className="max-w-3xl mx-auto text-slate-400 text-lg mb-10">
          Manage Students, Faculty, Attendance,
          Analytics and AI Powered Reports
          from a single platform.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-5">

          <Link to="/login/student">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold">
              Student Login
            </button>
          </Link>

          <Link to="/login/faculty">
            <button className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl font-bold">
              Faculty Login
            </button>
          </Link>

          <Link to="/login/admin">
            <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-bold">
              Admin Login
            </button>
          </Link>

        </div>

      </section>

      {/* PORTALS */}
      <section className="max-w-7xl mx-auto px-8 py-10">

        <h2 className="text-4xl font-bold text-center mb-12">
          Choose Your Portal
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {/* STUDENT */}
          <div className="bg-slate-800/70 backdrop-blur-lg p-8 rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl">

            <div className="text-6xl mb-4">🎓</div>

            <h3 className="text-3xl font-bold mb-3">
              Student Portal
            </h3>

            <p className="text-slate-300 mb-6">
              View attendance, profile,
              academic records and AI Assistant.
            </p>

            <Link to="/login/student">
              <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold">
                Login as Student
              </button>
            </Link>

          </div>

          {/* FACULTY */}
          <div className="bg-slate-800/70 backdrop-blur-lg p-8 rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl">

            <div className="text-6xl mb-4"></div>

            <h3 className="text-3xl font-bold mb-3">
              Faculty Portal
            </h3>

            <p className="text-slate-300 mb-6">
              Manage attendance,
              students and AI Reports.
            </p>

            <Link to="/login/faculty">
              <button className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold">
                Login as Faculty
              </button>
            </Link>

          </div>

          {/* ADMIN */}
          <div className="bg-slate-800/70 backdrop-blur-lg p-8 rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl">

            <div className="text-6xl mb-4"></div>

            <h3 className="text-3xl font-bold mb-3">
              Admin Portal
            </h3>

            <p className="text-slate-300 mb-6">
              Manage users, analytics,
              dashboards and system settings.
            </p>

            <Link to="/login/admin">
              <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold">
                Login as Admin
              </button>
            </Link>

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-8 py-20">

        <div className="grid md:grid-cols-4 gap-8">

          <div className="bg-slate-800/70 backdrop-blur-lg p-8 rounded-2xl text-center">
            <h2 className="text-5xl font-bold text-blue-400">
              1000+
            </h2>
            <p className="mt-3">Students</p>
          </div>

          <div className="bg-slate-800/70 backdrop-blur-lg p-8 rounded-2xl text-center">
            <h2 className="text-5xl font-bold text-green-400">
              100+
            </h2>
            <p className="mt-3">Faculty</p>
          </div>

          <div className="bg-slate-800/70 backdrop-blur-lg p-8 rounded-2xl text-center">
            <h2 className="text-5xl font-bold text-purple-400">
              95%
            </h2>
            <p className="mt-3">Attendance Accuracy</p>
          </div>

          <div className="bg-slate-800/70 backdrop-blur-lg p-8 rounded-2xl text-center">
            <h2 className="text-5xl font-bold text-yellow-400">
              AI
            </h2>
            <p className="mt-3">Powered Reports</p>
          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-8 py-10">

        <h2 className="text-4xl font-bold text-center mb-12">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-800/70 backdrop-blur-lg p-6 rounded-xl text-center">
            <div className="text-5xl mb-3"></div>
            <h3 className="text-xl font-bold">
              Attendance
            </h3>
          </div>

          <div className="bg-slate-800/70 backdrop-blur-lg p-6 rounded-xl text-center">
            <div className="text-5xl mb-3">🎓</div>
            <h3 className="text-xl font-bold">
              Student Management
            </h3>
          </div>

          <div className="bg-slate-800/70 backdrop-blur-lg p-6 rounded-xl text-center">
            <div className="text-5xl mb-3"></div>
            <h3 className="text-xl font-bold">
              Analytics
            </h3>
          </div>

          <div className="bg-slate-800/70 backdrop-blur-lg p-6 rounded-xl text-center">
            <div className="text-5xl mb-3"></div>
            <h3 className="text-xl font-bold">
              AI Assistant
            </h3>
          </div>

        </div>

      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="max-w-7xl mx-auto px-8 py-20">

        <h2 className="text-4xl font-bold text-center mb-12">
          Dashboard Preview
        </h2>

        <div className="bg-slate-800/70 backdrop-blur-lg rounded-3xl p-10">

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-blue-600 p-6 rounded-xl text-center">
              <h2 className="text-4xl font-bold">1200</h2>
              <p>Total Students</p>
            </div>

            <div className="bg-green-600 p-6 rounded-xl text-center">
              <h2 className="text-4xl font-bold">1090</h2>
              <p>Present</p>
            </div>

            <div className="bg-red-600 p-6 rounded-xl text-center">
              <h2 className="text-4xl font-bold">110</h2>
              <p>Absent</p>
            </div>

            <div className="bg-purple-600 p-6 rounded-xl text-center">
              <h2 className="text-4xl font-bold">91%</h2>
              <p>Attendance</p>
            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 border-t border-slate-800 text-slate-400">
        © 2026 AI College ERP | Powered by AI 🚀
      </footer>

    </div>
  );
}

export default Home;