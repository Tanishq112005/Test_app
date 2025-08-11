
import { useNavigate } from 'react-router';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header__logo">AlgoDojo</div>
      <nav className="header__nav-buttons">
        <button className="btn btn--outline" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="btn btn--primary" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </nav>
    </header>
  );
};

export default Header;