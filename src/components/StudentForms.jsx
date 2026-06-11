import { useState } from "react";

export default function StudentForm({
  initialData,
  onSubmit,
  buttonText,
  rooms,
}) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="bg-white p-6 rounded-xl shadow space-y-4"
>
  {/* Personal Information */}
  <div>
    <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
      Personal Information
    </h2>

    <div className="grid md:grid-cols-2 gap-4">
      {/* Full Name */}
       <input
        type="text"
        name="full_name"
        placeholder="Full Name"
        value={formData.full_name}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

     <input
        type="text"
        name="phone"
        placeholder="Phone"
        maxLength={10}
        value={formData.phone}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Gender */}
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
  </div>

  {/* Address Information */}
  <div>
    <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
      Address Information
    </h2>

    <div className="grid md:grid-cols-2 gap-4">
      {/* Address */}
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Join Date */}
       <input
        type="date"
        name="join_date"
        value={formData.join_date}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  {/* Guardian Information */}
  <div>
    <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
      Guardian Information
    </h2>

    <div className="grid md:grid-cols-2 gap-4">
      {/* Guardian Name */}
     <input
        type="text"
        name="guardian_name"
        placeholder="Guardian Name"
        value={formData.guardian_name}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Guardian Phone */}
       <input
        type="text"
        name="guardian_phone"
        placeholder="Guardian Phone"
        maxLength={10}
        value={formData.guardian_phone}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  {/* Hostel Information */}
  {rooms && buttonText === "Add Student" && (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
        Hostel Information
      </h2>

        <select
          name="room_id"
          value={formData.room_id}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Room</option>

          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.room_number} ({room.occupied_beds}/{room.total_beds})
            </option>
          ))}
        </select>
    </div>
  )}

  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition font-medium"
  >
    {buttonText}
  </button>
</form>
    // <form
    //   onSubmit={handleSubmit}
    //   className="bg-white p-6 rounded-xl shadow space-y-4"
    // >
    //   <input
    //     type="text"
    //     name="full_name"
    //     placeholder="Full Name"
    //     value={formData.full_name}
    //     onChange={handleChange}
    //     className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //   />

    //   <input
    //     type="email"
    //     name="email"
    //     placeholder="Email"
    //     value={formData.email}
    //     onChange={handleChange}
    //     className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //   />

    //   <input
    //     type="text"
    //     name="phone"
    //     placeholder="Phone"
    //     maxLength={10}
    //     value={formData.phone}
    //     onChange={handleChange}
    //     className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //   />

    //   <input
    //     type="text"
    //     name="address"
    //     placeholder="Address"
    //     value={formData.address}
    //     onChange={handleChange}
    //     className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //   />

    //   <input
    //     type="date"
    //     name="join_date"
    //     value={formData.join_date}
    //     onChange={handleChange}
    //     className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //   />

    //   <select
    //     name="gender"
    //     value={formData.gender}
    //     onChange={handleChange}
    //     className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //   >
    //     <option value="">Select Gender</option>
    //     <option value="Male">Male</option>
    //     <option value="Female">Female</option>
    //   </select>

    //   <input
    //     type="text"
    //     name="guardian_name"
    //     placeholder="Guardian Name"
    //     value={formData.guardian_name}
    //     onChange={handleChange}
    //     className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //   />

    //   <input
    //     type="text"
    //     name="guardian_phone"
    //     placeholder="Guardian Phone"
    //     maxLength={10}
    //     value={formData.guardian_phone}
    //     onChange={handleChange}
    //     className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //   />

    //   {rooms && buttonText === "Add Student" && (
    //     <select
    //       name="room_id"
    //       value={formData.room_id}
    //       onChange={handleChange}
    //       className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //     >
    //       <option value="">Select Room</option>

    //       {rooms.map((room) => (
    //         <option key={room.id} value={room.id}>
    //           {room.room_number} ({room.occupied_beds}/{room.total_beds})
    //         </option>
    //       ))}
    //     </select>
    //   )}

    //   <button
    //     type="submit"
    //     className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition font-medium"
    //   >
    //     {buttonText}
    //   </button>
    // </form>
  );
}
