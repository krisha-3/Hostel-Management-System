const pool = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {

    // Total Rooms
    const roomsResult = await pool.query(
      "SELECT COUNT(*) FROM rooms"
    );

    // Total Beds
    const bedsResult = await pool.query(
      "SELECT SUM(total_beds) FROM rooms"
    );

    // Occupied Beds
    const occupiedResult = await pool.query(
      "SELECT COUNT(*) FROM students"
    );

    // Room Occupancy Details
    const occupancyResult = await pool.query(`
      SELECT
        rooms.total_beds,
        COUNT(students.id) AS occupied_beds
      FROM rooms
      LEFT JOIN students
      ON rooms.id = students.room_id
      GROUP BY rooms.id
    `);

    let fullyOccupiedRooms = 0;
    let partiallyOccupiedRooms = 0;
    let emptyRooms = 0;

    occupancyResult.rows.forEach((room) => {
      const occupied = Number(room.occupied_beds);
      const totalBeds = room.total_beds;

      if (occupied === 0) {
        emptyRooms++;
      } else if (occupied === totalBeds) {
        fullyOccupiedRooms++;
      } else {
        partiallyOccupiedRooms++;
      }
    });

    const totalRooms = Number(
      roomsResult.rows[0].count
    );

    const totalBeds = Number(
      bedsResult.rows[0].sum
    );

    const occupiedBeds = Number(
      occupiedResult.rows[0].count
    );

    const vacantBeds = totalBeds - occupiedBeds;

    res.status(200).json({
      totalRooms,
      totalBeds,
      occupiedBeds,
      vacantBeds,
      fullyOccupiedRooms,
      partiallyOccupiedRooms,
      emptyRooms,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
};

module.exports = {
  getDashboardStats,
};