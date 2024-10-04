import { useDispatch, useSelector } from "react-redux";
import '../style/shopingcart.css';
import Layout from "../components/layout";
import { FaPlus, FaMinus } from "react-icons/fa";
import { totalAmount } from "../store/Features/CartSlice";
import { addToCart,subtract,removeItem } from "../store/Features/CartSlice";

const Cart = () => {

    const {items} = useSelector((state) => state.cart);
    const amount = useSelector(totalAmount);
    const dispatch = useDispatch();

    const handleCartActions = (item, type) => {
        (type === 'increment') ? dispatch(addToCart(item)) : dispatch(subtract(item.id));
    }

    return(
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
                            {items?.map((item) => (
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
                                        <button onClick={() => dispatch(removeItem(item.id))}>Delete</button>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
                <div className="wrapper just-center">
                    <h4>Total amount <span className="fw-normal">{`Rs. ${amount}`}</span></h4>
                </div>
            </div>
        </Layout>
    )
}

export default Cart;