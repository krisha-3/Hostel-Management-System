import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link
        to="/"
        className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
      >
        Hostel Management System
      </Link>
    </nav>
  );
};

export default Navbar;
