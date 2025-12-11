import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/authService";
import "./Header.css"

const Header = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
      <nav>
        <Link to="/">Home</Link> 
        <Link to="/about">About</Link> 
        <Link to="/anime-list">Anime List</Link> 
        <Link to="/favorites">Favorites</Link> 
        {!user ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      ) : (
        <>
          <Link to="/profile">Profile</Link>
        </>
      )}
      </nav>
  );
};

export default Header;
