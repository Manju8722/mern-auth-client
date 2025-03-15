import { Link } from "react-router-dom";
import { uselogout } from "../hooks/uselogout";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { logout } = uselogout();
  const { user } = useContext(AuthContext);
  function handlelogout() {
    logout();
  }
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user && (
            <>
              <span>{user?.email}</span>
              <div>
                <button onClick={handlelogout}>logout</button>
              </div>{" "}
            </>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
