import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";

import {Link, useNavigate} from "react-router-dom";
import BillsDetail from "../features/cart/BillsDetail";

async function getOderByUserId(id) {
    return await axios.get(`http://localhost:8080/api/products-carts/merchant-service-all/${id}`)
}

async function getBillsByUserId(id) {
    return await axios.get(`http://localhost:8080/api/bills/bill-dto-merchant/${id}`) //api/users/1/bills
}

async function getShopByUserId(id) {
    return await axios.get(`http://localhost:8080/api/shops/user/${id}`) //api/users/1/shops
}

export default function MerchantBillService() {
    const [list, setList] = useState([]);
    const [listBill, setListBill] = useState([]);
    const [listShop, setListShop] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()
    const [showBillDetail, setShowBillDetail] = useState(false)
    const [billDetail, setBillDetail] = useState({})
    const handleClose = () => setShowBillDetail(false);
    const handleShow = (data) => {
        setShowBillDetail(true)
        setBillDetail(data)
    };

    useEffect(() => {
        Promise.all([getOderByUserId(user.id), getBillsByUserId(user.id), getShopByUserId(user.id)]).then(res => {
            if (res[0].data != null) {
                setList(res[0].data)

            } else {
                setList([])
            }
            if (res[1].data != null) {
                console.log(res[1].data)
                setListBill(res[1].data)
                setBillDetail(res[1].data[0])
            } else {
                setListBill([])
            }
            if (res[2].data != null) {
                setListShop(res[2].data)
            } else {
                setListShop([])
            }

        })
    }, [])

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

                <div className="bill_about_title">
                    <span className={"btn-white borderBill"}>
                        <Link to={'/products-carts-merchant'}>Đơn chờ xác nhận</Link>
                    </span>
                    <span className={"btn-white borderBill"}>
                       <b>Tổng đơn hàng</b>
                    </span>
                    <span className={"btn-white borderBill"}>
                        <Link to={'/bill-chartjs'}>Tổng doanh thu</Link>
                    </span>

                    <div className="bill_about--shop">
                        <div className="bill_about--shop-inner">
                            <select
                                name=""
                                id=""
                                className="bill_about--shop-inner--btn"
                                onChange={handleCityChange}
                            >
                                <option value="">---Đơn theo cửa hàng---</option>
                                {listShop.length > 0 && listShop.map((item, index) => (<option key={index} value={item.id}>
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
                        <td className="table_shop_list-header">
                            <h5 className="table_shop_list-title">
                                NGƯỜI MUA
                            </h5></td>
                        <td className="table_shop_list-header">
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
                        <td colSpan={3}><h5 className="table_shop_list-title">
                            TUỲ CHỌN
                        </h5></td>
                    </tr>
                    </thead>
                    <tbody>
                    {listBill.length > 0 && listBill.map((item, index) =>
                        (
                            <tr key={item.id}>
                                <td className="table_shop_list-inner">{index + 1}</td>
                                <td className="table_shop_list-inner">{item.username}</td>
                                <td className="table_shop_list-inner">{item.shops.name}</td>
                                <td className="table_shop_list-inner">
                                    <span style={{marginLeft: `5px`}}>
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        }).format(item.total)}
                                    </span>
                                </td>

                                {item.status === "0" && <>
                                    <td className="table_shop_list-inner" style={{color:`#14c014`}}>Đã thanh
                                        toán
                                    </td>
                                </>}
                                {item.status === "1" && <>
                                    <td  className="table_shop_list-inner" style={{color:`red`}}>Huỷ thanh
                                        toán
                                    </td>
                                </>}
                                <td className="table_shop_list-inner">
                                    <button onClick={()=>handleShow(item)}>Chi tiết</button>
                                    <BillsDetail bill={billDetail} showBills={showBillDetail} handleClose={handleClose}/>
                                </td>
                            </tr>
                        )
                    )
                    }
                    </tbody>
                </table>
            </div>
        </>
    )

}