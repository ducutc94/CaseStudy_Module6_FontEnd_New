import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ListShop() {
    let [shops, setShops] = useState([]);
    let [reload, setReload] = useState(false)
    const user = JSON.parse(localStorage.getItem("user"))
    const idUser = user.id;
    useEffect(() => {
        axios.get(`http://localhost:8080/api/shops/user/${idUser}`).then(res => {

            if(res.data !==""){
                setShops(res.data);
            }else {
                setShops([])
            }

        })
    }, [reload]);

    const deleteShop = (id) => {
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
                    setReload(!reload)
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
                        <b>TẠO SHOP</b>
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
                                SỐ ĐIỆN THOẠI
                            </h5></td>
                        <td>
                            <h5 className="table_shop_list-title">
                                EMAIL
                            </h5></td>
                        <td>
                            <h5 className="table_shop_list-title">
                                GIỜ MỞ CỬA
                            </h5></td>
                        <td>
                            <h5 className="table_shop_list-title">
                                GIỜ ĐÓNG CỬA
                            </h5></td>
                        <td>
                            <h5 className="table_shop_list-title">
                                TRẠNG THÁI
                            </h5></td>
                        <td>
                            <h5 className="table_shop_list-title">
                                THÀNH PHỐ
                            </h5></td>
                        <td colSpan={3}><h5 className="table_shop_list-title">
                            TUỲ CHỌN
                        </h5></td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        shops.map((item, index) =>
                            <tr key={item.id}>
                                <td className="table_shop_list-inner">{index + 1}</td>
                                <td  className="table_shop_list-inner">{item.name}</td>
                                <td  className="table_shop_list-inner">{item.phone}</td>
                                <td  className="table_shop_list-inner">{item.email}</td>
                                <td  className="table_shop_list-inner">{item.startTime}</td>
                                <td  className="table_shop_list-inner">{item.endTime}</td>
                                {item.statusShops === "0" && <><td  className="table_shop_list-inner">Đã xác thực</td>
                                </>}
                                {item.statusShops === "1" && <><td  className="table_shop_list-inner">Đã hủy</td>
                                </>}
                                {item.statusShops === "2" && <><td  className="table_shop_list-inner">Chưa xác thực</td>
                                </>}
                                <td  className="table_shop_list-inner">{item.city.name}</td>
                                {item.statusShops === "0" && <><td className="table_shop_list-inner">
                                    <Link to={`/update-shop/${item.id}`} >Sửa</Link></td>
                                    <td className="table_shop_list-inner">
                                        <button onClick={() => deleteShop(item.id)}>Xóa</button>
                                    </td>
                                    <td  className="table_shop_list-inner">
                                        <Link to={`/create-food/${item.id}`} className="btn-shop-2" >Thêm món</Link></td>
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