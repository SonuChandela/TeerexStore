import React, { useState, useEffect } from 'react';
import { setFilteredProduct, FilterPayload } from '../../Store/Features/ProductSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Store/store';

interface SiderBarProps {
    sidebar: boolean,
    onFilterChange: (filterCriteria: FilterPayload) => void;
}

const SiderBar: React.FC<SiderBarProps> = ({ sidebar, onFilterChange }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [colors, setColors] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [gender, setGender] = useState<string[]>([]);
    const [price, setPrice] = useState<string[]>([]);

    // handle color
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setColors(prevState => [...prevState, value]);
        } else {
            setColors(prevState => prevState.filter(c => c !== value));
        }
    }

    // handle gender
    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setGender(prevState => [...prevState, value]);
        } else {
            setGender(prevState => prevState.filter(c => c !== value));
        }
    }
    // handle type
    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setTypes(prevState => [...prevState, value]);
        } else {
            setTypes(prevState => prevState.filter(c => c !== value));
        }
    }

    // handle Price 

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setPrice(prevState => [...prevState, value]);
        } else {
            setPrice(prevState => prevState.filter(c => c !== value));
        }
    }



    const handleFilterChange = () => {
        const filterPayload: FilterPayload = {
            colors,
            types,
            gender,
            price
        };
        dispatch(setFilteredProduct(filterPayload));
        // Callback to update filter criteria in parent component
        onFilterChange(filterPayload);
    };


    useEffect(() => {
        handleFilterChange();
    }, [colors, types, gender, price])

    return (
        <>
            <div className="filter-sidebar" style={sidebar ? { left: '0px' } : {}}>
                {/* color filter */}
                <div className="filter-category">
                    <h3 className="category-tittle">Color</h3>
                    <div className="category-list">
                        <input type="checkbox" name="Red" value="red" id="colorRed" onChange={handleColorChange} />
                        <label htmlFor="colorRed">Red</label>
                    </div>
                    <div className="category-list">
                        <input type="checkbox" name="Blue" value="blue" id="colorBlue" onChange={handleColorChange} />
                        <label htmlFor="colorBlue">Blue</label>
                    </div>
                    <div className="category-list">
                        <input type="checkbox" name="Green" value="green" id="colorGreen" onChange={handleColorChange} />
                        <label htmlFor="colorGreen">Green</label>
                    </div>
                </div>
                {/* gender fliter */}
                <div className="filter-category">
                    <h3 className="category-tittle">Gender</h3>
                    <div className="category-list">
                        <input type="checkbox" id="genderM" name="Men" value="men" onChange={handleGenderChange} />
                        <label htmlFor="genderM">Men</label>
                    </div>
                    <div className="category-list">
                        <input type="checkbox" id="genderFm" name="Women" value="women" onChange={handleGenderChange} />
                        <label htmlFor="genderFm">Women</label>
                    </div>
                </div>
                {/* price filter */}
                <div className="filter-category">
                    <h3 className="category-tittle">Price</h3>
                    <div className="category-list">
                        <input type="checkbox" id="priceOne" value='250' onChange={handlePriceChange} />
                        <label htmlFor="priceOne">0 - 250</label>
                    </div>
                    <div className="category-list">
                        <input type="checkbox" id="priceTwo" value='251' onChange={handlePriceChange} />
                        <label htmlFor="priceTwo">250 - 450</label>
                    </div>
                    <div className="category-list">
                        <input type="checkbox" id="priceThree" value='450' onChange={handlePriceChange} />
                        <label htmlFor="priceThree">450</label>
                    </div>
                </div>
                {/* type category */}
                <div className="filter-category">
                    <h3 className="category-tittle">Type</h3>
                    <div className="category-list">
                        <input type="checkbox" id="TypePolo" name="Polo" value="polo" onChange={handleTypeChange} />
                        <label htmlFor="TypePolo">Polo</label>
                    </div>
                    <div className="category-list">
                        <input type="checkbox" id="TypeHoodie" name="Hoodie" value="hoodie" onChange={handleTypeChange} />
                        <label htmlFor="TypeHoodie">Hoodie</label>
                    </div>
                    <div className="category-list">
                        <input type="checkbox" id="TypeBasic" name="Basic" value="basic" onChange={handleTypeChange} />
                        <label htmlFor="TypeBasic">Basic</label>
                    </div>
                </div>
            </div >
        </>
    )
}

export default SiderBar