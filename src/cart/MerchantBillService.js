import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";

import {Link, useNavigate} from "react-router-dom";

async function getOderByUserId(id) {
    return await axios.get(`http://localhost:8080/api/products-carts/merchant-service-all/${id}`)
}
async function getBillsByUserId(id) {
    return await axios.get(`http://localhost:8080/api/bills/bill-dto/${id}`) //api/users/1/bills
}
async function getShopByUserId(id) {
    return await  axios.get(`http://localhost:8080/api/shops/user/${id}`) //api/users/1/shops
}
export default function MerchantBillService() {
    const [list, setList] = useState([]);
    const [listBill, setListBill] = useState([]);
    const [listShop, setListShop] = useState([]);
    const cartMerchant = useSelector(state => state.cartMerchant)
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()
    useEffect(() => {
        Promise.all([getOderByUserId(user.id), getBillsByUserId(user.id), getShopByUserId(user.id)]).then(res => {
            if(res[0].data != null){
                setList(res[0].data)
            }else {
                setList([])
            }
            if(res[1].data != null){
                console.log(res[1].data)
                setListBill(res[1].data)
            }else {
                setListBill([])
            }
            if(res[2].data != null){
                setListShop(res[2].data)
            }else {
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
                        <Link to={'/products-carts-merchant'}>Đơn hàng</Link>
                    </span>
                    <span className={"btn-white borderBill"}>
                       <b>Tổng đơn hàng</b>
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
                                { listShop > 0 && listShop.map((item, index) => (<option key={index} value={item.id}>
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
                                TÊN SHOP
                            </h5></td>
                        <td>
                            <h5 className="table_shop_list-title">
                                TÊN SP
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
                    {listBill.length > 0 && listBill.map((item, index) =>
                        <tr key={item.id}>
                            <td className="table_shop_list-inner">{index + 1}</td>
                            <td className="table_shop_list-inner">{item.username}</td>
                            <td className="table_shop_list-inner">{item.shops.name}</td>
                            <td colSpan={4} className="table_shop_list-inner">
                                <table>
                                    {item.productsCartsList && item.productsCartsList.map((value, index1) => <>
                                        <tr key={value.id}>
                                            <td className="table_shop_list-inner">{value.products.name}</td>
                                            <td className="table_shop_list-inner">{value.products.price}</td>
                                            <td className="table_shop_list-inner">{value.quantity}</td>
                                            <td className="table_shop_list-inner">
                                    <span style={{marginLeft: `5px`}}>
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        }).format(value.products.price * value.quantity)}
                                    </span>
                                            </td>
                                        </tr>
                                        </>
                                    )
                                    }
                                </table>
                            </td>
                            <td className="table_shop_list-inner">
                                    <span style={{marginLeft: `5px`}}>
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        }).format(item.totalPrice)}
                                    </span>
                            </td>
                            {item.status === "0" && <>
                                <td className="table_shop_list-inner">Đã thanh toán</td>
                            </>}
                            {item.status === "1" && <>
                                <td className="table_shop_list-inner">Huỷ thanh toán</td>
                            </>}
                            <td className="table_shop_list-inner">
                                {item.localDateTime}
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