import React from 'react';
import Layout from '../components/Layout/Layout';
import '../style/shopingcart.css';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../Store/store';
import { addToCart, CartItem, subtract, removeFromCart, selectSubtotal } from '../Store/Features/CartSlice';
import { FaPlus, FaMinus } from "react-icons/fa";
import { Product } from '../Store/Features/ProductSlice';

const ShopingCart: React.FC = () => {
    // select redux cart products 
    const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.items);
    // cart product price total method
    const subtotal = useSelector(selectSubtotal);

    // action dispatcher
    const dispatch = useDispatch<AppDispatch>();

    // Function to update cart items
    const handleCartActions = (item: Product, type: string) => {
        (type === 'increment') ? dispatch(addToCart(item)) : dispatch(subtract(item.id));
    }

    return (
        <>
            <Layout>
                <div className="holder">
                    <div className="wrapper">
                        <h3>Shopping Cart</h3>
                    </div>
                </div>
                <div className="holder cart-items-deatil">
                    <div className='wrapper cart-items'>
                        <div className="cart-item">
                            <div className='cart-item-wrapper'>
                                {cartItems.map((item) => (
                                    <div key={item.id} className='item-details'>
                                        <div className=" item-img">
                                            <img src={item.imageURL} alt={item.name} />
                                        </div>
                                        <div className='item-detail'>
                                            <h3>{item.name}</h3>
                                            <h4>{`Rs ${item.price}`}</h4>
                                        </div>
                                        <div className='item-qty'>
                                            <div className='quty-holder'>
                                                <button onClick={() => handleCartActions(item, 'decrement ')}><FaMinus /></button>
                                                <span className="qty">{item.cartQuantity}</span>
                                                <button onClick={() => handleCartActions(item, 'increment')}><FaPlus /></button>
                                            </div>

                                        </div>
                                        <div className='item-action'>
                                            <button onClick={() => dispatch(removeFromCart(item.id))}>Delete</button>
                                        </div>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="wrapper just-center">
                        <h4>Total amount <span className="fw-normal">{`Rs. ${subtotal}`}</span></h4>
                    </div>
                </div>
            </Layout>
        </>
    )
}
export default ShopingCart;