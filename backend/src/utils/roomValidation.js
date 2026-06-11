const pool = require("../config/db");

const validateRoomCapacity = async (roomId) => {
  // Check room exists
  const roomResult = await pool.query("SELECT * FROM rooms WHERE id = $1", [
    roomId,
  ]);

  if (roomResult.rows.length === 0) {
    return {
      success: false,
      message: "Room not found",
    };
  }

  const room = roomResult.rows[0];

  // Count students
  const studentCountResult = await pool.query(
    "SELECT COUNT(*) FROM students WHERE room_id = $1",
    [roomId],
  );

  const occupiedBeds = Number(studentCountResult.rows[0].count);

  if (occupiedBeds >= room.total_beds) {
    return {
      success: false,
      message: "Room is full",
    };
  }

  return {
    success: true,
    room,
  };
};

module.exports = {
  validateRoomCapacity,
};
