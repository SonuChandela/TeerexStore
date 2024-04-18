import React from 'react';
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import "../../style/header.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
import { Product } from '../../Store/Features/ProductSlice';

const Header: React.FC = () => {
    const cartItems: Product[] = useSelector((state: RootState) => state.cart.items);
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
                                    <span className="cart-value">{cartItems.length}</span>
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