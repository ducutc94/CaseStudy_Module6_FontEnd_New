import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ProductsCarts() {
    const [productCart, setProductCart] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"))
    const idUser = user.id;
    useEffect(() => {
        axios.get(`http://localhost:8080/api/products-carts/user/${idUser}`).then((res) => {
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
            title: 'Bạn muốn xóa cửa hàng ?',
            showDenyButton: true,
            confirmButtonText: 'Xóa',
            denyButtonText: 'Hủy',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/api/shops/${id}`).then(() => {
                    Swal.fire({
                        width: '450px',
                        position: 'center',
                        title: 'Xóa!',
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
                <div>
                    <div><Link to={"/create-shop"} className={"btn btn-success"}>
                        <b>GIỎ HÀNG</b>
                    </Link></div>
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
                                TRANG THÁI
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
                                    <td className="table_shop_list-inner">Đã xác thực</td>
                                </>}
                                {item.statusProductsCarts === "1" && <>
                                    <td className="table_shop_list-inner">Đã hủy</td>
                                </>}
                                {item.statusProductsCarts === "2" && <>
                                    <td className="table_shop_list-inner">Đang chờ</td>
                                </>}

                                {item.statusProductsCarts === "2" && <>
                                    <td className="table_shop_list-inner">
                                        <button onClick={() => createBill(item.id)}>Thanh toán</button>
                                    </td>
                                </>}

                                {item.statusProductsCarts === "2" && <>
                                    <td className="table_shop_list-inner">
                                        <button onClick={() => createBill(item.id)}>Huỷ</button>
                                    </td>
                                </>}
                                <td className="table_shop_list-inner">
                                    <button onClick={() => createBill(item.id)}>Chi tiết</button>
                                </td>


                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </>
    )

}