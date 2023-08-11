import { Link } from 'react-router-dom';

export default function Filter() {
    return (
        <>
            <select>
                <option value="">Sắp xếp giá tăng dần</option>
                <option value="sort_price_desc"><Link to={`/products/sort_price_desc`}>Sắp xếp giá giảm dần</Link></option>
                <option value="sort_view_desc">Được quan tâm nhiều nhất</option>
            </select>
        </>
    )
}
