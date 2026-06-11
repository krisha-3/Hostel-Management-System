import { useEffect, useState } from "react";

import { getDashboardStats, getRooms } from "../services/api";

import DashboardCard from "../components/DashboardCard";
import RoomCard from "../components/RoomCard";

import {
  FaDoorOpen,
  FaBed,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import { MdMeetingRoom } from "react-icons/md";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [rooms, setRooms] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await getDashboardStats();

        const roomsData = await getRooms();

        setStats(statsData);
        setRooms(roomsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Rooms"
          value={stats.totalRooms}
          color="blue"
          icon={<MdMeetingRoom />}
        />

        <DashboardCard
          title="Total Beds"
          value={stats.totalBeds}
          color="purple"
          icon={<FaBed />}
        />

        <DashboardCard
          title="Occupied Beds"
          value={stats.occupiedBeds}
          color="green"
          icon={<FaCheckCircle />}
        />

        <DashboardCard
          title="Vacant Beds"
          value={stats.vacantBeds}
          color="blue"
          icon={<FaBed />}
        />

        <DashboardCard
          title="Partially Occupied Rooms"
          value={stats.partiallyOccupiedRooms}
          color="yellow"
          icon={<FaDoorOpen />}
        />

        <DashboardCard
          title="Empty Rooms"
          value={stats.emptyRooms}
          color="red"
          icon={<FaTimesCircle />}
        />
      </div>

      {/* Room Overview */}

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Hostel Room Overview</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              occupiedBeds={Number(room.occupied_beds)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
