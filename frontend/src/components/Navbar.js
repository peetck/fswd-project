import { Link } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

const Navbar = (props) => {
  const { user, logout } = useAuthContext();

  return (
    <nav className="nav flex flex-wrap items-center justify-between px-4 bg-transparent">
      <Link
        className="flex flex-no-shrink items-center mr-6 py-3 text-grey-darkest"
        to="/"
      >
        <img
          className="h-10 mr-2 w-10"
          src="favicon.webp"
          width="40px"
          height="40px"
          alt="Can't load img"
        />

        <span className="font-semibold text-xl tracking-tight">
          {user && `Welcome: ${user.username}`}
        </span>
      </Link>

      <input className="menu-btn hidden" type="checkbox" id="menu-btn" />
      <label
        className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none"
        htmlFor="menu-btn"
      >
        <span className="icon bg-grey-darkest flex items-center relative"></span>
      </label>

      <ul className="flex menu border-gray-500 border-b justify-end m-0 w-full md:border-none md:w-auto">
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
