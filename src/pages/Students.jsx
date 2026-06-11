import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { getStudents } from "../services/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents(search);

        setStudents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, [search]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Students</h1>

        <button
          onClick={() => navigate("/students/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Student
        </button>
      </div>

      <input
        type="text"
        placeholder="Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-3 rounded-lg mb-6"
      />

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Room No.</th>

              <th className="text-left p-4">Student Name</th>

              <th className="text-left p-4">Phone</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                onClick={() => navigate(`/students/${student.id}`)}
                className="cursor-pointer hover:bg-gray-50 border-b"
              >
                <td className="p-4">{student.room_number}</td>

                <td className="p-4">{student.full_name}</td>

                <td className="p-4">{student.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
