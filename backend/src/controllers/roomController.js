const pool = require("../config/db");

const getAllRooms = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM rooms ORDER BY room_number");

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch rooms",
    });
  }
};
const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;

    const roomResult = await pool.query(
      "SELECT * FROM rooms WHERE id = $1",
      [id]
    );

    if (roomResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const studentsResult = await pool.query(
      "SELECT id, full_name FROM students WHERE room_id = $1",
      [id]
    );

    const room = roomResult.rows[0];
    const students = studentsResult.rows;

    const occupiedBeds = students.length;
    const vacantBeds = room.total_beds - occupiedBeds;

    res.status(200).json({
      room,
      occupiedBeds,
      vacantBeds,
      students,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch room details",
    });
  }
};

module.exports = {
  getAllRooms,
  getRoomById,
};
