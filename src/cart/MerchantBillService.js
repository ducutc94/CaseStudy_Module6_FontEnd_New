import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {useDispatch, useSelector} from "react-redux";
import { confirmOrder, deleteByMerchant,} from "../features/cart/cartMC";
import {Link, useNavigate} from "react-router-dom";

export default function MerchantBillService() {
    const [list,setList] = useState([]);
    const [listShop,setListShop] = useState([]);
    const cartMerchant = useSelector(state => state.cartMerchant)
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`http://localhost:8080/api/products-carts/merchant-service-all/${user.id}`).then((res) => {
            if (res.data !== null) {
                setList(res.data)
            } else {
                setList([])
            }
        })
        axios.get(`http://localhost:8080/api/shops/user/${user.id}`).then((res) => {
            if (res.data !== null) {
                setListShop(res.data)
            } else {
                setListShop([])
            }
        })

    }, [])
    const deleteCartMerchant = (id, index, item) => {
        Swal.fire({
            position: 'center',
            title: 'Bạn muốn huỷ đơn hàng ?',
            showDenyButton: true,
            confirmButtonText: 'Xác nhận',
            denyButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteByMerchant({
                    index: index,
                    item: item
                }))
                axios.delete(`http://localhost:8080/api/products-carts/merchant/${id}`).then(() => {
                    Swal.fire({
                        width: '450px',
                        position: 'center',
                        title: 'Huỷ thành công!',
                        icon: 'success'
                    });

                })
            } else if (result.isDenied) {
                Swal.fire({
                    width: '450px',
                    position: 'center',
                    title: 'Hủy!',
                    icon: 'info'
                })
            }
        })
    }
    const handleSumbit = (id, index, item) => {
        Swal.fire({
            position: 'center',
            title: 'Bạn muốn thanh toán đơn hàng ?',
            showDenyButton: true,
            confirmButtonText: 'Xác nhận',
            denyButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(confirmOrder({
                    index: index,
                    item: item
                }))
                axios.put(`http://localhost:8080/api/products-carts/merchant-update/${id}`).then((res) => {
                    Swal.fire({
                        width: '450px',
                        position: 'center',
                        title: 'Thanh toán thành công!',
                        icon: 'success'
                    });
                })
            } else if (result.isDenied) {
                Swal.fire({
                    width: '450px',
                    position: 'center',
                    title: 'Hủy!',
                    icon: 'info'
                })
            }
        })
    }
    const handleCityChange = (event) => {
        const shopID = event.target.value;
        navigate(`/products-carts-shop/${shopID}`);
    };

    return (
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
                            {listShop.map((item, index) => (<option key={index} value={item.id}>
                                {item.name}
                            </option>))}
                        </select>

                    </div>
                </div>
                <div>
                    <div><span className={"btn-white"}>
                        <Link to={'/products-carts-merchant'}>Don Hang</Link>
                    </span></div>
                    <div><span className={"btn-white"}>
                       <span>Tong Don Ban</span>
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
                        <td colSpan={3}><h5 className="table_shop_list-title">
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