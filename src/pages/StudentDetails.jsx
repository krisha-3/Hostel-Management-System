import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router";

import { getStudentById, deleteStudent } from "../services/api";

import { getRooms } from "../services/api";

import { transferStudent } from "../services/api";

export default function StudentDetails() {
  const [rooms, setRooms] = useState([]);

  const [showTransfer, setShowTransfer] = useState(false);

  const [newRoomId, setNewRoomId] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const roomsData = await getRooms();

        setRooms(roomsData);

        const data = await getStudentById(id);

        setStudent(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmDelete) return;

    try {
      await deleteStudent(id);

      navigate("/students");
    } catch (error) {
      console.error(error);
    }
  };

  const handleTransfer = async () => {
    if (!newRoomId) {
      return alert("Please select a room");
    }

    try {
      await transferStudent(student.id, Number(newRoomId));

      alert("Student transferred successfully");

      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Transfer failed");
    }
  };

  if (!student) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Student Details</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/students/edit/${student.id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => setShowTransfer(!showTransfer)}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Transfer Room
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
        {showTransfer && (
          <div className="bg-white p-6 rounded-xl shadow mt-6">
            <h3 className="text-xl font-semibold mb-4">Transfer Student</h3>

            <select
              value={newRoomId}
              onChange={(e) => setNewRoomId(e.target.value)}
              className="border p-3 rounded w-full mb-4"
            >
              <option value="">Select New Room</option>

              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.room_number}
                </option>
              ))}
            </select>

            <button
              onClick={handleTransfer}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Confirm Transfer
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500">Full Name</p>

            <p className="font-semibold">{student.full_name}</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>

            <p className="font-semibold">{student.email}</p>
          </div>

          <div>
            <p className="text-gray-500">Phone</p>

            <p className="font-semibold">{student.phone}</p>
          </div>

          <div>
            <p className="text-gray-500">Gender</p>

            <p className="font-semibold">{student.gender}</p>
          </div>

          <div>
            <p className="text-gray-500">Room Number</p>

            <p className="font-semibold">{student.room_number}</p>
          </div>

          <div>
            <p className="text-gray-500">Floor</p>

            <p className="font-semibold">{student.floor_name}</p>
          </div>

          <div>
            <p className="text-gray-500">Join Date</p>

            <p className="font-semibold">{student.join_date?.split("T")[0]}</p>
          </div>

          <div>
            <p className="text-gray-500">Guardian Name</p>

            <p className="font-semibold">{student.guardian_name}</p>
          </div>

          <div>
            <p className="text-gray-500">Guardian Phone</p>

            <p className="font-semibold">{student.guardian_phone}</p>
          </div>

          <div>
            <p className="text-gray-500">Address</p>

            <p className="font-semibold">{student.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
