import { useDispatch } from "react-redux"

const SideBar = ({ sidebar, onFilterChange }) => {

    const dispatch = useDispatch();

    // const initialFilters = {
    //     colors: [],
    //     types: [],
    //     genders: [],
    //     priceRange: []
    // }

    // const [filters,setFilters] = useState(initialFilters)

    // const flilterChange = (event) => {
        
    //     const filterName = event.target.name;
    //     const filterValue = event.target.value;

    //     setFilters((prevFilter) => {
    //         const updatedFilters = {
    //             ...prevFilter,
    //             [filterName]: prevFilter[filterName].includes(filterValue)
    //               ? prevFilter[filterName].filter(filterSelectedValue => filterSelectedValue !== filterValue)
    //               : [...prevFilter[filterName], filterValue]
    //           };

    //           dispatch(filteredProduct(updatedFilters));

    //           return updatedFilters;
    //     })

    //   };

    const flilterChange = (event) => {
        onFilterChange(event);
    }

    return (
        <>
            <div className="filter-sidebar" style={sidebar ? { left: '0px' } : {}}>
                {/* color filter */}
                <div className="filter-category">
                    <h3 className="category-tittle">Color</h3>
                    <div className="category-list">
                        <label>
                            <input type="checkbox" name="colors" value="red"  onChange={flilterChange} />
                            Red
                        </label>
                    </div>
                    <div className="category-list">
                        <label>
                            <input type="checkbox" name="colors" value="blue"  onChange={flilterChange} />
                            Blue
                        </label>
                    </div>
                    <div className="category-list">
                        <label>
                            <input type="checkbox" name="colors" value="green"  onChange={flilterChange} />
                            Green</label>
                    </div>
                </div>
                {/* gender fliter */}
                <div className="filter-category">
                    <h3 className="category-tittle">Gender</h3>
                    <div className="category-list">
                        <label>
                            <input type="checkbox" name="genders" value="men"  onChange={flilterChange} />
                            Men</label>
                    </div>
                    <div className="category-list">
                        <label >
                            <input type="checkbox" name="genders" value="women"  onChange={flilterChange} />
                            Women</label>
                    </div>
                </div>
                {/* price filter */}
                <div className="filter-category">
                    <h3 className="category-tittle">Price</h3>
                    <div className="category-list">
                        <label>
                            <input type="checkbox" name="priceRange" value='250'  onChange={flilterChange} />
                            0 - 250
                        </label>
                    </div>
                    <div className="category-list">
                        <label>
                            <input type="checkbox" name="priceRange" value='251'  onChange={flilterChange} />
                            250 - 450
                        </label>
                    </div>
                    <div className="category-list">
                        <label>
                            <input type="checkbox" name="priceRange" value='450'  onChange={flilterChange} />
                            450
                        </label>
                    </div>
                </div>
                {/* type category */}
                <div className="filter-category">
                    <h3 className="category-tittle">Type</h3>
                    <div className="category-list">
                        <label>
                            <input type="checkbox" name="types" value="polo"  onChange={flilterChange} />
                            Polo
                        </label>
                    </div>
                    <div className="category-list">
                        <label>
                            <input type="checkbox"  name="types" value="hoodie"  onChange={flilterChange} />
                            Hoodie
                        </label>
                    </div>
                    <div className="category-list">
                        <label>
                            <input type="checkbox"  name="types" value="basic"  onChange={flilterChange} />
                            Basic
                        </label>
                    </div>
                </div>
            </div >
        </>
    )
}

export default SideBar;