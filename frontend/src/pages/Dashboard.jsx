import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Dashboard() {

  const [stats, setStats] = useState({
    total_students: 0,
    present_students: 0,
    absent_students: 0,
    attendance_percentage: 0,
  });
  const [aiReport, setAiReport] = useState("");

  const [courseStats, setCourseStats] = useState([]);

  useEffect(() => {

  fetchStats();
  fetchCourseStats();

  const interval = setInterval(() => {
    fetchStats();
    fetchCourseStats();
  }, 10000);
  


  return () => clearInterval(interval);

}, []);
  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/attendance-stats"
      );

      setStats(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourseStats = async () => {
    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/course-stats"
      );

      setCourseStats(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const generateAIReport = async () => {
  try {
    const res = await axios.get(
      "http://127.0.0.1:8000/ai-report"
    );

    setAiReport(res.data.report);

  } catch (error) {
    console.log(error);
    alert("Failed to generate AI report");
  }
};

  const pieData = [
    {
      name: "Present",
      value: stats.present_students,
    },
    {
      name: "Absent",
      value: stats.absent_students,
    },
  ];

  const barData = [
    {
      name: "Students",
      total: stats.total_students,
    },
    {
      name: "Present",
      total: stats.present_students,
    },
    {
      name: "Absent",
      total: stats.absent_students,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        College ERP Dashboard 📊
      </h1>

      {/* STATS CARDS */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-slate-800 p-8 rounded-xl text-center">
          <h2 className="text-5xl font-bold">
            {stats.total_students}
          </h2>
          <p className="mt-2 text-lg">
            Total Students
          </p>
        </div>

        <div className="bg-green-700 p-8 rounded-xl text-center">
          <h2 className="text-5xl font-bold">
            {stats.present_students}
          </h2>
          <p className="mt-2 text-lg">
            Present Students
          </p>
        </div>

        <div className="bg-red-700 p-8 rounded-xl text-center">
          <h2 className="text-5xl font-bold">
            {stats.absent_students}
          </h2>
          <p className="mt-2 text-lg">
            Absent Students
          </p>
        </div>

        <div className="bg-blue-700 p-8 rounded-xl text-center">
          <h2 className="text-5xl font-bold">
            {stats.attendance_percentage}%
          </h2>
          <p className="mt-2 text-lg">
            Attendance %
          </p>
        </div>

      </div>

      {/* NAVIGATION BUTTONS */}

      <div className="flex gap-4 mt-10">

        <Link to="/students">
          <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-bold">
            🎓 Students
          </button>
        </Link>

        <Link to="/attendance">
          <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-bold">
            📅 Attendance
          </button>
        </Link>

        <Link to="/ai">
          <button className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg font-bold">
            🤖 AI Assistant
          </button>
        </Link>

      </div>

      <button
  onClick={generateAIReport}
  className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg font-bold"
>
  🤖 Generate AI Report
</button>

      {/* FIRST ROW CHARTS */}

      <div className="grid md:grid-cols-2 gap-8 mt-10">

        <div className="bg-slate-800 p-8 rounded-xl">

          <h2 className="text-2xl font-bold mb-6">
            Attendance Overview
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >

                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip />
              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-slate-800 p-8 rounded-xl">

          <h2 className="text-2xl font-bold mb-6">
            Student Analytics
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={barData}>

              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="total"
                fill="#3b82f6"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* COURSE DISTRIBUTION */}

      <div className="bg-slate-800 p-8 rounded-xl mt-10">

        <h2 className="text-2xl font-bold mb-6">
          Course Distribution
        </h2>

        <ResponsiveContainer width="100%" height={350}>
<BarChart data={courseStats}>

  <XAxis dataKey="course" />
  <YAxis />

  <Tooltip
    contentStyle={{
      background: "#1e293b",
      border: "none",
      color: "white",
    }}
  />

  <Bar
    dataKey="count"
    fill="#22c55e"
    radius={[10, 10, 0, 0]}
  />

</BarChart>
          







        </ResponsiveContainer>

      </div>

      {aiReport && (
  <div className="bg-slate-800 p-8 rounded-xl mt-10">
    <h2 className="text-2xl font-bold mb-4">
      AI Generated Report 🤖
    </h2>

    <pre className="whitespace-pre-wrap text-green-400">
      {aiReport}
    </pre>
  </div>
)}

    </div>
  );
}

export default Dashboard;