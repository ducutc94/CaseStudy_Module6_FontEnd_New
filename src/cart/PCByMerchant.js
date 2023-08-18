import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {useDispatch, useSelector} from "react-redux";
import {addCartMerchant, confirmOrder, deleteByMerchant, setCartMerchant} from "../features/cart/cartMC";
import {Link, useNavigate} from "react-router-dom";

export default function PCByMerchant() {
    const cartMerchant = useSelector(state => state.cartMerchant)
    const dispatch = useDispatch()
    const [listBill, setListBill] = useState([])
    const user = JSON.parse(localStorage.getItem("user"))
    const [list, setList] = useState([]);
    const navigate = useNavigate()


    useEffect(() => {
        axios.get(`http://localhost:8080/api/bills/bill-dto/${user.id}`).then((res) => {
            console.log(res.data)
            if (res.data !== null) {
                setListBill(res.data)
                dispatch(addCartMerchant(res.data))
            } else {
                setListBill([])
                dispatch(addCartMerchant([]))
            }
        })
        axios.get(`http://localhost:8080/api/shops/user/${user.id}`).then((res) => {
            if (res.data !== null) {
                setList(res.data)
            } else {
                setList([])
            }
        })
        dispatch(setCartMerchant())

    }, [])
    const handleSumbit = (id, index, item) => {
        Swal.fire({
            position: 'center',
            title: 'Bạn muốn xác thực đơn hàng ?',
            showDenyButton: true,
            confirmButtonText: 'Xác nhận',
            denyButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(confirmOrder({
                    index: index, item: item
                }))
                axios.put(`http://localhost:8080/api/products-carts/update-confirm/${id}`).then((res) => {
                    if (res.data.status === "0") {
                        Swal.fire({
                            width: '450px', position: 'center', title: 'Xác thực thành công!', icon: 'success'
                        });
                    } else {
                        Swal.fire({
                            width: '450px', position: 'center', title: 'Đơn hàng không đủ!', icon: 'info'
                        });
                    }

                })
            } else if (result.isDenied) {
                Swal.fire({
                    width: '450px', position: 'center', title: 'Hủy!', icon: 'info'
                })
            }
        })
    }
    const handleCityChange = (event) => {
        const shopID = event.target.value;
        navigate(`/products-carts-shop/${shopID}`);
    };


    function deleteSumbit(id, index, item) {
        Swal.fire({
            position: 'center',
            title: 'Bạn muốn huỷ đơn hàng ?',
            showDenyButton: true,
            confirmButtonText: 'Xác nhận',
            denyButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteByMerchant({
                    index: index, item: item
                }))
                axios.put(`http://localhost:8080/api/products-carts/delete-confirm/${id}`).then((res) => {
                    if (res.data.status === "1") {
                        Swal.fire({
                            width: '450px', position: 'center', title: 'Huỷ thành công!', icon: 'success'
                        });
                    }
                })
            } else if (result.isDenied) {
                Swal.fire({
                    width: '450px', position: 'center', title: 'Hủy!', icon: 'info'
                })
            }
        })

    }

    return (<>

        <div>
            <div className="title-form-container">
                <h1 className="title-form">Quản lý đơn hàng</h1>
            </div>
            <div className="bill_about_title">
                    <span className={"btn-white borderBill"}>
                        <b>Đơn chờ xác nhận </b>
                    </span>
                <span className={"btn-white borderBill"}>
                         <Link to={'/products-carts-merchant-all'}>Tổng đơn hàng</Link>
                     </span>
                <div className="bill_about--shop borderBill">
                    <div className="bill_about--shop-inner">
                        <select
                            name=""
                            id=""
                            className="bill_about--shop-inner--btn"
                            onChange={handleCityChange}
                        >
                            <option value="">---Đơn theo cửa hàng---</option>
                            {list.length > 0 && list.map((item, index) => (<option key={index} value={item.id}>
                                {item.name}
                            </option>))}
                        </select>

                    </div>
                </div>
                <span className={"btn-white borderBill"}>
                        <Link to={'/bill-chartjs'}>Tổng doanh thu</Link>
                    </span>
                {/* Duyệt mảng */}
            </div>
            {cartMerchant.items.length > 0 ? (<> {cartMerchant.items.map((item, index) =>

                <div>
                    <div>
                        <div>
                            <span>Ten Khach hang: {item.username}</span><br/>
                            <span>Ten Cua Hang: {item.shops.name}</span>
                        </div>

                        <div>
                            <table>
                                <tr>
                                    <th>Anh</th>
                                    <th>Ten Sp</th>
                                    <th>Gia</th>
                                    <th>So luong</th>
                                    <th>Tong tien</th>
                                </tr>
                                {Array.isArray(item.productsCartsList) ? (<>{item.productsCartsList.map((items, index) =>
                                        <tr>
                                            <td>{items.products.name}</td>
                                            <td>{items.products.name}</td>
                                            <td className="table_shop_list-inner">
                                <span style={{marginLeft: `5px`}}>
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        }).format(items.products.price)}
                                </span>
                                            </td>
                                            <td>{items.quantity}</td>
                                            <td className="table_shop_list-inner">
                                <span style={{marginLeft: `5px`}}>
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        }).format(items.totalPrice)}
                                </span>
                                            </td>
                                        </tr>
                                )}</>) : (<></>)}

                            </table>
                        </div>

                        <div>

                                <span>Trang Thai: Chờ Xác Nhận </span>

                            <span>Tong tien: </span>
                            <div>
                                <button type={"submit"} onClick={() => handleSumbit(item.id, index, item)}>Xác
                                    nhận
                                </button>
                                <button type={"submit"} onClick={() => deleteSumbit(item.id, index, item)}>Huỷ
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
            </>) : (<></>)}

        </div>
    </>)

}