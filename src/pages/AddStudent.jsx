import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import StudentForm from "../components/StudentForms";

import {
  createStudent,
  getRooms,
} from "../services/api";

export default function AddStudent() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);

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

  const handleSubmit = async (
    formData
  ) => {
    try {
      await createStudent({
        ...formData,
        room_id: Number(formData.room_id),
      });

      navigate("/students");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to create student"
      );
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Add Student
      </h1>

      <StudentForm
        initialData={{
          full_name: "",
          email: "",
          phone: "",
          address: "",
          join_date: "",
          gender: "",
          guardian_name: "",
          guardian_phone: "",
          room_id: "",
        }}
        rooms={rooms}
        onSubmit={handleSubmit}
        buttonText="Add Student"
      />
    </div>
  );
}