import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router";

import StudentForm from "../components/StudentForms";

import { getStudentById, updateStudent, getRooms } from "../services/api";

export default function EditStudent() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [student, setStudent] = useState(null);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await getStudentById(id);

        const roomsData = await getRooms();

        setStudent(studentData);
        setRooms(roomsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateStudent(id, formData);

      navigate(`/students/${id}`);
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to update student");
    }
  };

  if (!student) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Edit Student</h1>

      <StudentForm
        initialData={{
          full_name: student.full_name || "",

          email: student.email || "",

          phone: student.phone || "",

          address: student.address || "",

          join_date: student.join_date?.split("T")[0] || "",

          gender: student.gender || "",

          guardian_name: student.guardian_name || "",

          guardian_phone: student.guardian_phone || "",

          room_id: student.room_id || "",
        }}
        rooms={rooms}
        onSubmit={handleSubmit}
        buttonText="Update Student"
      />
    </div>
  );
}
