import "./index.css";
import { Link } from "react-router-dom"

export default function SideBar() {
  return (
    <div className="icons">
      <Link to="/">
        <img src="/search.svg" alt="Buscar" />
      </Link>
      <Link to="/favorites">
        <img src="/bookshelf.svg" alt="Favoritos" />
      </Link>
      <Link to="/wishlist">
        <img src="/notebook.svg" alt="Wish List" />
      </Link>
    </div>
  );
}
