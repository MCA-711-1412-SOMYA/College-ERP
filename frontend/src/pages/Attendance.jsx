import { useEffect, useState } from "react";
import axios from "axios";

function Attendance() {

  const [attendance, setAttendance] = useState([]);

  const [formData, setFormData] = useState({
    student_id: "",
    status: "Present",
    attendance_date: "",
  });

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/attendance"
      );

      setAttendance(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const markAttendance = async () => {

    console.log(formData);

    if (
      !formData.student_id ||
      !formData.attendance_date
    ) {
      alert("Fill Student ID and Date");
      return;
    }

    try {

      await axios.post(
        "http://127.0.0.1:8000/attendance",
        {
          student_id: Number(formData.student_id),
          status: formData.status,
          attendance_date: formData.attendance_date,
        }
      );

      alert("Attendance Marked ✅");

      setFormData({
        student_id: "",
        status: "Present",
        attendance_date: "",
      });

      fetchAttendance();

    } catch (error) {
  console.log("ERROR =", error.response?.data);
  alert(JSON.stringify(error.response?.data));
}
  };

  return (
    <div
      style={{
        background: "#08132f",
        minHeight: "100vh",
        padding: "40px",
        color: "white",
      }}
    >
      <h1>Attendance Management 📅</h1>

      <div
        style={{
          background: "#1c2a47",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <input
          type="number"
          name="student_id"
          placeholder="Student ID"
          value={formData.student_id}
          onChange={handleChange}
          style={inputStyle}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={inputStyle}
        >
          <option>Present</option>
          <option>Absent</option>
        </select>

        <input
          type="date"
          name="attendance_date"
          value={formData.attendance_date}
          onChange={handleChange}
          style={inputStyle}
        />

        <br />

        <button
          onClick={markAttendance}
          style={buttonStyle}
        >
          Mark Attendance
        </button>
      </div>

      <table
        style={{
          width: "100%",
          marginTop: "30px",
          borderCollapse: "collapse",
          background: "#1c2a47",
        }}
      >
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Student ID</th>
            <th style={th}>Status</th>
            <th style={th}>Date</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((item) => (
            <tr key={item.id}>
              <td style={td}>{item.id}</td>
              <td style={td}>{item.student_id}</td>
              <td style={td}>{item.status}</td>
              <td style={td}>{item.attendance_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  margin: "10px",
  width: "250px",
  borderRadius: "5px",
  border: "none",
};

const buttonStyle = {
  padding: "10px 20px",
  background: "green",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const th = {
  padding: "12px",
  background: "#30415f",
};

const td = {
  padding: "12px",
  textAlign: "center",
};

export default Attendance;