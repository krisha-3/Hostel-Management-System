const pool = require("../config/db");

const { validateRoomCapacity } = require("../utils/roomValidation");

const transferStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { newRoomId } = req.body;

    // Check student exists
    const studentResult = await pool.query(
      "SELECT * FROM students WHERE id = $1",
      [id]
    );

    if (studentResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const student = studentResult.rows[0];

    // Already in same room
    if (student.room_id === newRoomId) {
      return res.status(400).json({
        success: false,
        message: "Student is already assigned to this room",
      });
    }

    // Check destination room
    const roomValidation =
      await validateRoomCapacity(newRoomId);

    if (!roomValidation.success) {
      return res.status(400).json({
        success: false,
        message: roomValidation.message,
      });
    }

    // Transfer student
    const result = await pool.query(
      `
      UPDATE students
      SET room_id = $1
      WHERE id = $2
      RETURNING *
      `,
      [newRoomId, id]
    );

    res.status(200).json({
      success: true,
      message: "Student transferred successfully",
      student: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to transfer student",
    });
  }
};

const createStudent = async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      address,
      join_date,
      gender,
      guardian_name,
      guardian_phone,
      room_id,
    } = req.body;

    const roomValidation = await validateRoomCapacity(room_id);

    if (!roomValidation.success) {
      return res.status(400).json({
        success: false,
        message: roomValidation.message,
      });
    }

    // Insert student
    const result = await pool.query(
      `
      INSERT INTO students
      (
        full_name,
        email,
        phone,
        address,
        join_date,
        gender,
        guardian_name,
        guardian_phone,
        room_id
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,$9
      )
      RETURNING *
      `,
      [
        full_name,
        email,
        phone,
        address,
        join_date,
        gender,
        guardian_name,
        guardian_phone,
        room_id,
      ],
    );

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create student",
    });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const { search } = req.query;

    let query = `
      SELECT
        students.id,
        students.full_name,
        students.email,
        students.phone,
        students.gender,
        students.join_date,
        rooms.room_number
      FROM students
      JOIN rooms
      ON students.room_id = rooms.id
    `;

    let values = [];

    if (search) {
      query += `
        WHERE students.full_name
        ILIKE $1
      `;
      values.push(`%${search}%`);
    }

    query += `
      ORDER BY students.full_name
    `;

    const result = await pool.query(
      query,
      values
    );

    res.status(200).json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
    });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        students.*,
        rooms.room_number,
        rooms.floor_name
      FROM students
      JOIN rooms
      ON students.room_id = rooms.id
      WHERE students.id = $1
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch student",
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM students
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      student: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete student",
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      full_name,
      email,
      phone,
      address,
      join_date,
      gender,
      guardian_name,
      guardian_phone,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE students
      SET
        full_name = $1,
        email = $2,
        phone = $3,
        address = $4,
        join_date = $5,
        gender = $6,
        guardian_name = $7,
        guardian_phone = $8
      WHERE id = $9
      RETURNING *
      `,
      [
        full_name,
        email,
        phone,
        address,
        join_date,
        gender,
        guardian_name,
        guardian_phone,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update student",
    });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  transferStudent,
  deleteStudent,
  updateStudent,
};
