import { useCallback, useEffect, useState } from "react";
import Layout from "../components/layout";
import { IoSearch } from "react-icons/io5";
import { FaPlus, FaMinus, FaFilter } from "react-icons/fa";
import ProductSkeleton from "../components/skeletons/product";
import SideBar from "../components/common/SiderBar";
import '../style/productList.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/Features/ProductSlice";
import { addToCart, subtract } from "../store/Features/CartSlice";


const ProductList = () => {

    const dispatch = useDispatch();

    const { products, status, error } = useSelector((state) => state.products);

    const { items } = useSelector((state) => state.cart);

    const [sidebar, setSidebar] = useState(false);


    const initialFilters = {
        colors: [],
        types: [],
        genders: [],
        priceRange: []
    }

    const [filters, setFilters] = useState(initialFilters);

    const [filteredProducts, setFilteredProducts] = useState(null);

    const [searchText, setSearchText] = useState('');


    const handleSearch = (event) => {
        setSearchText(event.target.value);
    }

    const searchProducts = () => {
        setFilteredProducts(
            products?.filter((item) => {
                const { type, name, color, gender } = item;
                return (
                    name.toLowerCase().includes(searchText) ||
                    type.toLowerCase().includes(searchText) ||
                    color.toLowerCase().includes(searchText) ||
                    gender.toLowerCase().includes(searchText)
                );
            })
        );
    }



    const handleFlilterChange = (event) => {

        const filterName = event.target.name;
        const filterValue = event.target.value;

        setFilters((prevFilter) => {
            return {
                ...prevFilter,

                [filterName]: prevFilter[filterName].includes(filterValue)
                    ? prevFilter[filterName].filter(filterSelectedValue => filterSelectedValue !== filterValue)
                    : [...prevFilter[filterName], filterValue]
            };
        });
    };

    const filterProduct = () => {
        const { colors, types, genders, priceRange } = filters;

        setFilteredProducts(
            products?.filter((item) => {
                const matchColor = colors.includes(item.color.toLowerCase());
                const matchType = types.includes(item.type.toLowerCase());
                const matchGender = genders.includes(item.gender.toLowerCase());
                const matchesPrice = priceRange?.length > 0 &&
                    (priceRange.includes('250') && item.price <= 250) ||
                    (priceRange.includes('251') && item.price > 250 && item.price <= 450) ||
                    (priceRange.includes('450') && item.price > 450);

                return matchesPrice || matchColor || matchType || matchGender;

            })
        )
    }



    // handle cart items 

    const handleCartActions = (item, type) => {
        (type === 'add' || type === 'increment') ? dispatch(addToCart(item)) : dispatch(subtract(item.id));
    }

    const productsData = filteredProducts?.length > 0 ? filteredProducts : products;


    useEffect(() => {
        if (products?.length > 0) {
            filterProduct();
        }
    }, [filters]);


    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    useEffect(() => {
        if (searchText) {
            searchProducts();
        }
    }, [searchText]);

    return (
        <Layout>
            <section>
                <div className="holder">
                    <div className="wrapper">
                        <div className="searchBox-holder">
                            <div className="searchBox">
                                <div className='search'>
                                    <input type="text" placeholder='Search for products..' value={searchText} onInput={handleSearch} />
                                    <button type="submit" className="search-button-container"><IoSearch /></button>
                                </div>
                                <div className="fliter">
                                    <FaFilter onClick={() => setSidebar(!sidebar)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper">
                        <div className="products-holder">
                            <div className={`bg-curtin ${sidebar ? 'active' : ''}`} onClick={() => setSidebar(!sidebar)}></div>
                            {/* sidebar */}
                            <SideBar sidebar={sidebar} onFilterChange={handleFlilterChange} />
                            {/* sidebar */}
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
                                                                items?.some((item) => item.id === product.id) ? (
                                                                    <div key={product.id} className="qty-handler">
                                                                        <button onClick={() => handleCartActions(product, 'decrement')} >
                                                                            <FaMinus />
                                                                        </button>
                                                                        <span>{items.find((item) => item.id === product.id)?.cartQuantity}</span>
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
        </Layout>
    )
}

export default ProductList;