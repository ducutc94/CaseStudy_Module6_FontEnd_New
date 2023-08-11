import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Filter({filter}) {
    const [selectedFilter, setSelectedFilter] = useState('');
    const handleFilterChange = (event) => {
        const string = event.target.value;
        setSelectedFilter(string);

        axios.get(`http://localhost:8080/api/products/${string}`).then((res) => {
            filter(res.data)
        });

    };

    return (
        <select value={selectedFilter} onChange={handleFilterChange}>
            <option value="sort_price_asc">Sắp xếp giá tăng dần</option>
            <option value="sort_price_desc">Sắp xếp giá giảm dần</option>
            <option value="sort_view_desc">Được quan tâm nhiều nhất</option>
        </select>
    );
}

export default Filter;
