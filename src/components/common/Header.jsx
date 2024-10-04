import { Link } from "react-router-dom";
import "../../style/header.css";
import { useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";


const Header = () => {
    const {items} = useSelector((state) => state.cart);

    return (
        <>
            <header className="navbar">
                <nav className="holder">
                    <div className="wrapper just-space-between">
                        <Link to="/" className="navbar-brand">
                            <h4>TeeRex Store</h4>
                        </Link>
                        <div className="navbar-items">
                            <ul className="navbar-items-list">
                                <li className="navbar-item">
                                    <Link to="/">Products</Link>
                                </li>
                            </ul>
                            <div className="navbar-cart">
                                <Link to="/cart">
                                    <FaCartShopping />
                                    {/* <span className="cart-value">0</span> */}
                                    <span className="cart-value">{items?.length}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;