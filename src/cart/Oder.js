import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {useDispatch, useSelector} from "react-redux";
import {addCartBuy, confirmOrderBuy} from "../features/cart/cartBuy";
import BillsDetail from "../features/cart/BillsDetail";

export default function Oder(){
    const [list,setList] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const cartBuy = useSelector(state => state.cartBuy);
    const dispatch = useDispatch()
    const [showBills, setShowBills] = useState(false);
    const handleCloseBills = () => setShowBills(false);
    const handleShowBills = () => setShowBills(true);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/products-carts/products-user-id/${user.id}`).then((res) => {
            console.log(res.data)
            if (res.data !== null) {
                dispatch(addCartBuy(res.data))
                setList(res.data)
            } else {
                dispatch(addCartBuy([]))
                setList([])
            }
        })
    }, [])
    const deleteOder = (id)=>{
        Swal.fire({
            position: 'center',
            title: 'Bạn muốn huỷ đơn hàng ?',
            showDenyButton: true,
            confirmButtonText: 'Xác nhận',
            denyButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/api/products-carts/merchant/${id}`).then(() => {
                    Swal.fire({
                        width: '450px', position: 'center', title: 'Huỷ thành công!', icon: 'success'
                    });
                })
            } else if (result.isDenied) {
                Swal.fire({
                    width: '450px', position: 'center', title: 'Hủy!', icon: 'info'
                })
            }
        })
    }
    const deleteCart = (id, index, item) => {
        Swal.fire({
            position: 'center',
            title: 'Bạn muốn huỷ đơn hàng ?',
            showDenyButton: true,
            confirmButtonText: 'Xác nhận',
            denyButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(confirmOrderBuy({
                    index: index, item: item
                }))
                axios.delete(`http://localhost:8080/api/products-carts/merchant/${id}`).then(() => {
                    Swal.fire({
                        width: '450px', position: 'center', title: 'Huỷ thành công!', icon: 'success'
                    });

                })
            } else if (result.isDenied) {
                Swal.fire({
                    width: '450px', position: 'center', title: 'Hủy!', icon: 'info'
                })
            }
        })
    }
    return(
        <>
            <div>
                <div className="title-form-container">
                    <h1 className="title-form">Lịch sử đơn hàng</h1>
                </div>
                <div>
                    <div><span className={"btn-white"}>
                        <b>ĐƠN HÀNG</b>
                    </span></div>
                    <div></div>
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
                    {(Array.isArray(cartBuy.items)) ? (<> {cartBuy.items.map((item, index) => <tr
                        key={item.id}>
                        <td className="table_shop_list-inner">{index + 1}</td>
                        <td className="table_shop_list-inner">{item.products.name}</td>
                        <td className="table_shop_list-inner">
                            <span style={{marginLeft: `5px`}}>
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        }).format(item.products.price)}
                                    </span>
                        </td>
                        <td className="table_shop_list-inner">{item.quantity}</td>
                        <td className="table_shop_list-inner">
                            <span style={{marginLeft: `5px`}}>
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        }).format(item.products.price*item.quantity)}
                                    </span>
                        </td>
                        {item.statusProductsCarts === "0" && <>
                            <td className="table_shop_list-inner">Đã thanh toán</td>
                        </>}
                        {item.statusProductsCarts === "1" && <>
                            <td className="table_shop_list-inner">Huỷ thanh toán</td>
                        </>}
                        {item.statusProductsCarts === "2" && <>
                            <td className="table_shop_list-inner">Đang chờ xác nhận</td>
                        </>}

                        {item.statusProductsCarts === "5" ? (<>

                            <td className="table_shop_list-inner">
                                <button>Chi tiết</button>
                            </td>
                        </>) : (<>
                            <td className="table_shop_list-inner">
                            </td>
                            <td className="table_shop_list-inner">
                            </td>

                        </>)}

                        {item.statusProductsCarts === "2" ? (<>
                            <td className="table_shop_list-inner">
                                <button type={"submit"}
                                        onClick={() => deleteCart(item.id,index,item)}>Huỷ
                                </button>
                            </td>
                            <td className="table_shop_list-inner">
                                <button onClick={handleShowBills}>Chi tiết</button>
                                <BillsDetail idDetail = {item.id} showBills={showBills} handleClose={handleCloseBills} />
                            </td>
                        </>) : (<>

                        </>)}
                    </tr>)}
                    </>) : (<></>)}

                    </tbody>
                </table>
            </div>
        </>
    )
}