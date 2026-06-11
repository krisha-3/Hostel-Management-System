import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getDashboardStats = async () => {
  const response = await API.get("/dashboard");
  return response.data;
};

export const getRooms = async () => {
  const response = await API.get("/rooms");

  return response.data;
};

export const getRoomById = async (id) => {
  const response = await API.get(`/rooms/${id}`);
  return response.data;
};

export const getStudents = async (search = "") => {
  const response = await API.get(`/students?search=${search}`);

  return response.data;
};

export const createStudent = async (data) => {
  const response = await API.post("/students", data);

  return response.data;
};

export const updateStudent = async (id, data) => {
  const response = await API.put(`/students/${id}`, data);

  return response.data;
};

export const transferStudent = async (id, newRoomId) => {
  const response = await API.put(`/students/${id}/transfer`, {
    newRoomId,
  });

  return response.data;
};

export const getStudentById = async (id) => {
  const response = await API.get(`/students/${id}`);

  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await API.delete(`/students/${id}`);

  return response.data;
};

export default API;
