import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router";
import Layout from "./Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Rooms from "./pages/Rooms.jsx";
import RoomDetails from "./pages/RoomDetails.jsx";
import Students from "./pages/Students.jsx";
import StudentDetails from "./pages/StudentDetails.jsx";
import AddStudent from "./pages/AddStudent.jsx";
import EditStudent from "./pages/EditStudent.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Dashboard />} />
      <Route path="students" element={<Students />} />
      <Route path="students/add" element={<AddStudent />} />
      <Route path="/students/edit/:id" element={<EditStudent />} />
      <Route path="rooms" element={<Rooms />} />
      <Route path="rooms/:id" element={<RoomDetails />} />
      <Route path="students/:id" element={<StudentDetails />} />
    </Route>,
  ),
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
