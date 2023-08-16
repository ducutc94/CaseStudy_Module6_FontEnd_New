import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {useDispatch, useSelector} from "react-redux";
import {addCart, deleteAll, deleteItem, setCart, setStatus} from "../features/cart/cartSlice";
import formik, {useFormik} from "formik";

export default function ProductsCarts() {
    const [productCart, setProductCart] = useState([JSON.parse(localStorage.getItem("cart"))]);
    const carts = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const idCart = JSON.parse(localStorage.getItem("idCart"));
    const user = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        setProductCart(carts);
        dispatch(setCart())
    }, [])

    const formik = useFormik({
        initialValues: {
            id: "",
            totalMoney: ""
        },
        onSubmit: values => {
            Swal.fire({
                position: 'center',
                title: 'Bạn muốn xác nhận đơn hàng ?',
                showDenyButton: true,
                confirmButtonText: 'Xác nhận',
                denyButtonText: 'Hủy',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios.post(`http://localhost:8080/api/bills/${user.id}/${idCart.id}`,
                        carts.items).then((res) => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Đã gửi yêu cầu đến chủ cửa hàng',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        dispatch(deleteAll())
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

        },
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <div className="title-form-container">
                        <h1 className="title-form">Quản lý giỏ hàng</h1>
                    </div>
                    <div>
                        <div><span className={"btn-white"}>
                        <b>GIỎ HÀNG</b>
                    </span></div>
                    </div>

                    <table className={"table table_shop_list"}>
                        <thead>
                        <tr>

                            <td className="table_shop_list-header">
                                <h5 className="table_shop_list-title">
                                    STT
                                </h5></td>
                            <td className="table_shop_list-header">
                                <h5 className="table_shop_list-title">
                                    ANH
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
                                </h5></td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                        {carts.items ? (
                            <>
                                {carts.items.map((item, index) =>
                                    <tr key={index}>

                                        <td className="table_shop_list-inner">{index + 1}</td>
                                        <td className="table_shop_list-inner"><img src={item.food.image} alt=""
                                                                                   className="header__Cart-img"/></td>
                                        <td className="table_shop_list-inner">{item.food.name}</td>
                                        <td className="table_shop_list-inner">
                                        <span style={{marginLeft: `5px`}}>
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        }).format(item.food.price)}
                                                    </span>
                                        </td>
                                        <td className="table_shop_list-inner">{item.quantity}</td>
                                        <td className="table_shop_list-inner">
                                        <span style={{marginLeft: `5px`}}>
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        }).format(item.money)}
                                                    </span>
                                        </td>
                                        <td className="table_shop_list-inner">
                                            <button type={"button"} onClick={() => dispatch(deleteItem({
                                                index: index,
                                                food: item
                                            }))}>Huỷ
                                            </button>
                                        </td>
                                        <td className="table_shop_list-inner">
                                        </td>
                                    </tr>
                                )
                                }
                            </>
                        ) : (
                            <></>
                        )
                        }
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>

                            {carts.items ? (<>
                                    <td>
                            <span style={{marginLeft: `5px`}}> Tong tien:
                                {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                }).format(carts.totalMoney)}
                                                    </span>
                                    </td>
                                    <td>
                                        <button type={"submit"}>Thanh toan</button>
                                    </td>
                                </>
                               ):(<></>)
                            }
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </form>
        </>
    )

}