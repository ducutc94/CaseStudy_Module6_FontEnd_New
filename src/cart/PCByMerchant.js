import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {useDispatch, useSelector} from "react-redux";
import {addCartMerchant, confirmOrder, deleteByMerchant} from "../features/cart/cartMC";
import {Link, useNavigate} from "react-router-dom";
import BillsDetail from "../features/cart/BillsDetail";

export default function PCByMerchant() {
    const cartMerchant = useSelector(state => state.cartMerchant)
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("user"))
    const [list, setList] = useState([]);
    const navigate = useNavigate()
    const [showBillDetail, setBillDetail] = useState(false)
    const handleClose = () => setBillDetail(false);
    const handleShow = () => setBillDetail(true);



    useEffect(() => {
        axios.get(`http://localhost:8080/api/products-carts/merchant-service/${user.id}`).then((res) => {
            if (res.data !== null) {
                dispatch(addCartMerchant(res.data))
            } else {
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
                    if(res.data.statusProductsCarts === "0"){
                        Swal.fire({
                            width: '450px', position: 'center', title: 'Xác thực thành công!', icon: 'success'
                        });
                    }else{
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
        console.log(shopID)
        navigate(`/products-carts-shop/${shopID}`);
    };


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
                                NGƯỜI MUA
                            </h5></td>
                        <td>
                            <h5 className="table_shop_list-title">
                                TÊN CỬA HÀNG
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
                    {(Array.isArray(cartMerchant.items)) ? (<> {cartMerchant.items.map((item, index) => <tr
                            key={item.id}>
                            <td className="table_shop_list-inner">{index + 1}</td>
                            <td className="table_shop_list-inner">{item.bills.user.username}</td>
                            <td className="table_shop_list-inner">{item.products.shops.name}</td>
                            <td className="table_shop_list-inner">
                                <span style={{marginLeft: `5px`}}>
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        }).format(item.totalPrice)}
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
                            {item.statusProductsCarts === "2" ? (<>
                                <td className="table_shop_list-inner">
                                    <button type={"submit"} onClick={() => handleSumbit(item.id, index, item)}>Xác
                                        nhận
                                    </button>
                                </td>
                                <td className="table_shop_list-inner">
                                    <button type={"submit"}
                                            onClick={() => deleteCartMerchant(item.id, index, item)}>Huỷ
                                    </button>
                                </td>
                                <td className="table_shop_list-inner">
                                    <button onClick={handleShow}>Chi tiết</button>
                                    <BillsDetail item = {item} showBills = {showBillDetail} handleClose = {handleClose}/>
                                </td>
                            </>) : (<>
                                <td className="table_shop_list-inner">
                                </td>
                                <td className="table_shop_list-inner">
                                </td>
                                <td className="table_shop_list-inner">

                                </td>
                            </>)}
                        </tr>)}
                        </>) : (<></>)}


                    </tbody>
                </table>
            </div>
        </>)

}