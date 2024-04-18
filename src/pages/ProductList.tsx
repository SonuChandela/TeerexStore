import React, { useEffect, useState } from 'react';
import '../style/productList.css';
import Layout from '../components/Layout/Layout';
import { IoSearch } from "react-icons/io5";
import { FaPlus, FaMinus, FaFilter } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../Store/store';
import { fetchProducts, setSearchResults, Product } from '../Store/Features/ProductSlice';
import { addToCart, CartItem, subtract } from '../Store/Features/CartSlice';
import SiderBar from '../components/siderBar/SiderBar';
import ProductSkeleton from '../components/skeleton/ProductSkeleton';


interface FilterCriteria {
    colors: string[];
    types: string[];
    gender: string[];
    price: string[];
}


const ProductList: React.FC = () => {
    // sidebar state for show hidden sidebar on mobile view 
    const [sidebar, setSidebar] = useState<boolean>(false);
    // product search state for search product 
    const [productSearch, setProductSearch] = useState<string>('');

    // Filter criteria state for filter product 
    const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
        colors: [],
        types: [],
        gender: [],
        price: []
    });

    // Function to update filter criteria
    const handleFilterChange = (newFilterCriteria: FilterCriteria) => {
        setFilterCriteria(newFilterCriteria);
    };

    // select redux products state 
    const products: Product[] = useSelector((state: RootState) => state.products.products);

    // status of data product data api
    const status: string = useSelector((state: RootState) => state.products.status);

    // select redux search result state 
    const searchResults: Product[] = useSelector((state: RootState) => state.products.searchResults);

    // select redux cart products 
    const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.items);

    // action dispatcher
    const dispatch = useDispatch<AppDispatch>();

    // seach result function search 
    const searchresult = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductSearch(e.target.value.toLowerCase());
        dispatch(setSearchResults(e.target.value.toLowerCase()));
    }

    // handle cart Action according to types dispatch diffrent actions
    const handleCartActions = (item: Product, type: string) => {
        (type === 'add' || type === 'increment') ? dispatch(addToCart(item)) : dispatch(subtract(item.id));
    }

    // show filter and search product data when user searching and typing somthing else show product default data 
    const productsData: Product[] = productSearch !== '' || (filterCriteria.colors.length !== 0 || filterCriteria.types.length !== 0 || filterCriteria.gender.length !== 0 || filterCriteria.price.length !== 0) ? searchResults : products;

    useEffect(() => {
        dispatch(fetchProducts());
    }, [productSearch]);
    return (
        <>
            <Layout>
                <section>
                    <div className="holder">
                        <div className="wrapper">
                            <div className="searchBox-holder">
                                <div className="searchBox">
                                    <div className='search'>
                                        <input type="text" placeholder='Search for products..' value={productSearch} onChange={searchresult} />
                                        <button type="submit"><IoSearch /></button>
                                    </div>
                                    <div className="fliter">
                                        <FaFilter onClick={() => setSidebar(!sidebar)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wrapper">
                            <div className="products-holder">
                                <div className={`bg-curtin ${sidebar ? 'active' : null}`} onClick={() => setSidebar(!sidebar)}></div>
                                {/* sidebar  */}
                                <SiderBar sidebar={sidebar} onFilterChange={handleFilterChange} />
                                {/* sidebar  */}
                                <div className="products-list-holder">
                                    <div className='product-cart-list'>
                                        {
                                            status === "succeeded" ? (
                                                productsData?.map((product) => (
                                                    <div key={product.id} className="product-cart">
                                                        <div className="cart-wrapper">
                                                            <div className='cart-header'>
                                                                <img src={product.imageURL} alt={product.name} />
                                                                <h5 className="product-title">{product.name}</h5>
                                                            </div>
                                                            <div className='cart-footer'>
                                                                <span className="product-price">{`Rs ${product.price}`}</span>
                                                                {
                                                                    cartItems?.some((item: CartItem) => item.id === product.id) ? (
                                                                        <div key={product.id} className="qty-handler">
                                                                            <button onClick={() => handleCartActions(product, 'decrement')} >
                                                                                <FaMinus />
                                                                            </button>
                                                                            <span>{cartItems.find((item: CartItem) => item.id === product.id)?.cartQuantity}</span>
                                                                            <button onClick={() => handleCartActions(product, 'increment')} >
                                                                                <FaPlus />
                                                                            </button>
                                                                        </div>
                                                                    ) : (
                                                                        <button className="cart-action" onClick={() => handleCartActions(product, 'add')}>Add to Cart</button>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))) : (
                                                Array.from({ length: 10 }).map((_, index) => (
                                                    <ProductSkeleton key={index} />
                                                ))
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout >
        </>
    )
}
export default ProductList;