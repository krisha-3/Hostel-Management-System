// import { useEffect, useState } from "react";

// import { getRooms } from "../services/api";

// import RoomCard from "../components/RoomCard";

// export default function Rooms() {
//   const [rooms, setRooms] = useState([]);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const data = await getRooms();

//         setRooms(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchRooms();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-4xl font-bold mb-8">Rooms</h1>

//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//         {rooms.map((room) => (
//           <RoomCard
//             key={room.id}
//             room={room}
//             occupiedBeds={Number(room.occupied_beds)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";

import { getRooms } from "../services/api";

import RoomCard from "../components/RoomCard";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();

        setRooms(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter((room) => {
    const occupiedBeds = Number(room.occupied_beds);
    const totalBeds = Number(room.total_beds);

    if (filter === "Full") {
      return occupiedBeds === totalBeds;
    }

    if (filter === "Partial") {
      return occupiedBeds > 0 && occupiedBeds < totalBeds;
    }

    if (filter === "Empty") {
      return occupiedBeds === 0;
    }

    return true;
  });

  const fullRooms = rooms.filter(
    (room) => Number(room.occupied_beds) === Number(room.total_beds)
  ).length;

  const partialRooms = rooms.filter(
    (room) =>
      Number(room.occupied_beds) > 0 &&
      Number(room.occupied_beds) < Number(room.total_beds)
  ).length;

  const emptyRooms = rooms.filter(
    (room) => Number(room.occupied_beds) === 0
  ).length;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Rooms</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setFilter("All")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === "All"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          All ({rooms.length})
        </button>

        <button
          onClick={() => setFilter("Full")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === "Full"
              ? "bg-green-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Full ({fullRooms})
        </button>

        <button
          onClick={() => setFilter("Partial")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === "Partial"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Partial ({partialRooms})
        </button>

        <button
          onClick={() => setFilter("Empty")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === "Empty"
              ? "bg-gray-700 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Empty ({emptyRooms})
        </button>
      </div>

      {/* Rooms Grid */}
      {filteredRooms.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          No rooms found.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              occupiedBeds={Number(room.occupied_beds)}
            />
          ))}
        </div>
      )}
    </div>
  );
}