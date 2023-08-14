import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function FindShopById(){
    const [list,setList] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const {idShop} = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`http://localhost:8080/api/products-carts/products-shop/${user.id}/${idShop}`).then((res) => {
            if (res.data !== null) {
               setList(res.data)
            } else {
                setList([])
            }
        })
    }, [])
    const handleCityChange = (event) => {
        const shopID = event.target.value;
        navigate(`/products-carts-shop/${shopID}`);
    };
    return(
        <>
            <div>
                <div className="title-form-container">
                    <h1 className="title-form">Quản lý đơn hàng</h1>
                </div>
                <div className="header__select--address">

                    <div className="header__select--address-inner">
                        <select
                            name=""
                            id=""
                            className="header__select--address--btn"
                            onChange={handleCityChange}
                        >
                            {list.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>
                <div>
                    <div><span className={"btn-white"}>
                        <b>ĐƠN HÀNG</b>
                    </span></div>
                    <div></div>
                    <div><span className={"btn-white"}>
                      <Link to={'/products-carts-merchant-all'}>Tong don</Link>
                    </span></div>
                </div>

                <table className={"table table_shop_list"}>
                    <thead>
                    <tr>
                        <td className="table_shop_list-header">
                            <h5 className="table_shop_list-title">
                                STT
                            </h5></td>
                        <td>
                            <h5 className="table_shop_list-title">
                                TÊN
                            </h5></td>
                        <td>
                            <h5 className="table_shop_list-title">
                                GIÁ TIỀN

                            </h5></td>
                        <td>
                            <h5 className="table_shop_list-title">
                                SỐ LƯỢNG
                            </h5></td>
                        <td>
                            <h5 className="table_shop_list-title">
                                TỔNG TIỀN
                            </h5></td>
                        <td>
                            <h5 className="table_shop_list-title">
                                TRANG THÁI ĐƠN
                            </h5></td>
                        <td colSpan={5}><h5 className="table_shop_list-title">
                            TUỲ CHỌN
                        </h5></td>
                    </tr>
                    </thead>
                    <tbody>
                    {(Array.isArray(list)) ? (
                        <> {list.map((item, index) =>
                            <tr key={item.id}>
                                <td className="table_shop_list-inner">{index + 1}</td>
                                <td className="table_shop_list-inner">{item.products.name}</td>
                                <td className="table_shop_list-inner">{item.products.price}</td>
                                <td className="table_shop_list-inner">{item.quantity}</td>
                                <td className="table_shop_list-inner">{item.totalPrice}</td>
                                {item.statusProductsCarts === "0" && <>
                                    <td className="table_shop_list-inner">Đã thanh toán</td>
                                </>}
                                {item.statusProductsCarts === "1" && <>
                                    <td className="table_shop_list-inner">Huỷ thanh toán</td>
                                </>}
                                <td className="table_shop_list-inner">
                                    <button>Chi tiết</button>
                                </td>

                            </tr>
                        )
                        }
                        </>
                    ) : (<></>)}

                    </tbody>
                </table>
            </div>
        </>
    )
}