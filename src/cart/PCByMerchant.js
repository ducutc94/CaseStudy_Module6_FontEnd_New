
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function PCByMerchant() {
    const [productCart, setProductCart] = useState([]);
    const checkUserID = (value) =>{
        let id;
        if(value){
            id = value.id;
        }
        else {
            id = 1000;
        }
        return id;
    }
    const user = JSON.parse(localStorage.getItem("user"))
    const idUser = checkUserID(user);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/products-carts/merchant-cart/${idUser}`).then((res) => {
            if (res.data !== null) {
                setProductCart(res.data)

            } else {
                setProductCart([])
            }

        })
    }, [])
    const createBill = (id) => {
        Swal.fire({
            position: 'center',
            title: 'Bạn muốn thanh toán đơn hàng ?',
            showDenyButton: true,
            confirmButtonText: 'Xác nhận',
            denyButtonText: 'Hủy',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.put(`http://localhost:8080/api/products-carts/update/${id}`).then(() => {
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


    return (
        <>
            <div>
                <div className="title-form-container">
                    <h1 className="title-form">Quản lý đơn hàng</h1>
                </div>
                <div>
                    <div><span className={"btn-white"}>
                        <b>ĐƠN HÀNG</b>
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
                        <td colSpan={4}><h5 className="table_shop_list-title">
                            TUỲ CHỌN
                        </h5></td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        productCart.map((item, index) =>
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
                                    <td className="table_shop_list-inner">Huỷ thanh toán </td>
                                </>}
                                {item.statusProductsCarts === "5" && <>
                                    <td className="table_shop_list-inner">Đang chờ xác nhận</td>
                                </>}

                                {item.statusProductsCarts === "5" ? (<> <td className="table_shop_list-inner">
                                    <button onClick={() => createBill(item.id)}>Xác nhận</button>
                                </td>
                                    <td className="table_shop_list-inner">
                                        <button onClick={() => createBill(item.id)}>Huỷ</button>
                                    </td>
                                    <td className="table_shop_list-inner">
                                        <button >Chi tiết</button>
                                    </td>
                                </>):(<><td className="table_shop_list-inner">
                                </td>
                                    <td className="table_shop_list-inner">
                                    </td>
                                    <td className="table_shop_list-inner">
                                        <button >Chi tiết</button>
                                    </td>
                                </>)

                                }

                                {item.statusProductsCarts === "2" && <>
                                    <td className="table_shop_list-inner">
                                        <button onClick={() => createBill(item.id)}>Huỷ</button>
                                    </td>
                                </>}


                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </>
    )

}