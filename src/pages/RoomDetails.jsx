import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

import { getRoomById } from "../services/api";

export default function RoomDetails() {
  const { id } = useParams();

  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getRoomById(id);

        setRoomData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoom();
  }, [id]);

  if (!roomData) {
    return <h2>Loading...</h2>;
  }
  let roomStatus = "Empty";
  let statusColor = "bg-gray-200 text-gray-700";

  if (roomData.occupiedBeds === roomData.room.total_beds) {
    roomStatus = "Full";
    statusColor = "bg-green-100 text-green-700";
  } else if (roomData.occupiedBeds > 0) {
    roomStatus = "Partial";
    statusColor = "bg-yellow-100 text-yellow-700";
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Room {roomData.room.room_number}</h1>

        <span className={`px-4 py-2 rounded-full font-medium ${statusColor}`}>
          {roomStatus}
        </span>
      </div>

      {/* Room Stats */}

     <div className="grid md:grid-cols-3 gap-6 mb-8">
  <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
    <h3 className="text-gray-500">Total Beds</h3>
    <p className="text-4xl font-bold text-blue-600 mt-2">
      {roomData.room.total_beds}
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
    <h3 className="text-gray-500">Occupied Beds</h3>
    <p className="text-4xl font-bold text-green-600 mt-2">
      {roomData.occupiedBeds}
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
    <h3 className="text-gray-500">Vacant Beds</h3>
    <p className="text-4xl font-bold text-red-600 mt-2">
      {roomData.vacantBeds}
    </p>
  </div>
</div>
      {/* Student List */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Students in Room ({roomData.students.length})
        </h2>

        {roomData.students.length === 0 ? (
          <p className="text-gray-500">No students assigned.</p>
        ) : (
          <div className="space-y-3">
            {roomData.students.map((student) => (
              <Link
                key={student.id}
                to={`/students/${student.id}`}
                className="flex justify-between items-center p-4 border rounded-xl hover:bg-gray-50 transition"
              >
                <div>
                  <h3 className="font-semibold">{student.full_name}</h3>
                </div>

                <span className="text-blue-600 font-medium">View →</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
