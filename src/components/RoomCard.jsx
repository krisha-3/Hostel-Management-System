import { Link } from "react-router";

export default function RoomCard({ room, occupiedBeds }) {
  const totalBeds = room.total_beds;
  let bgColor = "bg-gray-100";
  let status = "Empty";

  if (occupiedBeds === totalBeds) {
    bgColor = "bg-green-100";
    status = "Full";
  } else if (occupiedBeds > 0) {
    bgColor = "bg-yellow-100";
    status = "Partial";
  }

  return (
    <Link
      to={`/rooms/${room.id}`}
      className={`${bgColor} p-4 rounded-xl shadow hover:shadow-lg transition`}
    >
      <h3 className="font-bold text-lg">{room.room_number}</h3>

      <p className="text-sm text-gray-600">
        {occupiedBeds}/{totalBeds} Beds Occupied
      </p>

      <p className="text-xs mt-2 font-medium">{status}</p>
    </Link>
  );
}
