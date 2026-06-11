import {
  FaDoorOpen,
  FaBed,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import { MdMeetingRoom } from "react-icons/md";

export default function DashboardCard({ title, value, color, icon }) {
  const colors = {
    blue: "border-blue-500",
    green: "border-green-500",
    red: "border-red-500",
    yellow: "border-yellow-500",
    purple: "border-purple-500",
    orange: "border-orange-500",
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md border-l-4 ${colors[color]} p-6`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className="text-4xl font-bold mt-2">{value}</h2>
        </div>

        <div className="text-4xl text-gray-400">{icon}</div>
      </div>
    </div>
  );
}
