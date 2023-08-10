import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import {useFormik} from "formik";


export default function View() {
    const [food, setFood] = useState({});
    const {id} = useParams();
    const [shopsUserId, setShopUserId] = useState("");
    const [shops, setShop] = useState("");
    const [shopsDescription, setShopsDescription] = useState("");
    const [shopsTimeStart, setShopsTimeStart] = useState("");
    const [shopsTimeEnd, setShopsTimeEnd] = useState("");


    const navigate = useNavigate();
    const checkUserID = (value) => {
        let id;
        if (value) {
            id = value.id;
        } else {
            id = 1000;
        }
        return id;

    }
    const user = JSON.parse(localStorage.getItem("user"))
    const idUser = checkUserID(user);
    const [idCart, setIdCart] = useState();
    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/products/${id}`).then((res) => {
            setFood(res.data)
            setShopUserId(res.data.shops.user.id)
            setShop(res.data.shops.name)
            setShopsDescription(res.data.shops.description)
            setShopsTimeStart(res.data.shops.startTime)
            setShopsTimeEnd(res.data.shops.endTime)
        })
        axios.post(`http://localhost:8080/api/carts`, {
            user: {
                id: idUser
            }
        }).then((res) => {
            setIdCart(res.data.id)
        })
        axios.get(`http://localhost:8080/api/vouchers`).then((res) => {
            setVouchers(res.data)
        })
    }, [])

    const deleteFood = (id) => {
        Swal.fire({
            position: 'center',
            title: 'Bạn có muốn xóa sản phẩm ?',
            showDenyButton: true,
            confirmButtonText: 'Xóa',
            denyButtonText: 'Trở lại',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/api/products/${id}`).then(() => {
                    Swal.fire({
                        width: '450px',
                        position: 'center',
                        title: 'Xóa!',
                        icon: 'success'
                    });
                    navigate('/')
                })
            } else if (result.isDenied) {
                Swal.fire({
                    width: '450px',
                    position: 'center',
                    title: 'Hủy',
                    icon: 'info'
                })
            }
        })
    }

    const formik = useFormik({
        initialValues: {
            quantity: "",

        },
        onSubmit: values => {
            console.log(values.quantity)
            // eslint-disable-next-line no-unused-expressions
            values.quantity === "" ? values.quantity = 1 : values.quantity;
            axios.post("http://localhost:8080/api/products-carts", {
                quantity: +values.quantity,
                carts: {
                    id: idCart
                },
                products: {
                    id: id
                }
            }).then(() => {
                Swal.fire('Thêm vào giỏ hàng thành công!', '', 'success')
                navigate('/')
            })

        },

    })



    const decreaseQuantity = () => {
        formik.setFieldValue('quantity', Math.max(formik.values.quantity - 1, 1));
    };

    const increaseQuantity = () => {
        formik.setFieldValue('quantity', Math.min(formik.values.quantity + 1, food.quantity));
    };







    const today = new Date();
    const hour = today.getHours();
    const minu = today.getMinutes();
    const sec = today.getSeconds();
    const time = hour + ":" + minu + ":" + sec;

    const check = (startTime, endTime) => {
        return time >= startTime && time <= endTime;
    };


    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="grid">
                    <div className="grid__row app__content">
                        <div className="grid__column-12">
                            <div className="title-view-container">
                                <h1 className="title_view-food">Chi tiết món ăn</h1>
                            </div>

                            <div className="view_food-container">
                                <div className="grid__column-5">
                                    <div className="view_food-left">
                                        <div className="view_food-left-img">
                                            <img src={food.image}/>
                                        </div>
                                    </div>

                                    <div className="view_food-left">
                                        <div className="view_food-left-img-container">
                                            <img className="view_food-left-img-container-item"
                                                 src={food.image}/>
                                            <img className="view_food-left-img-container-item"
                                                 src={food.image}/>
                                            <img className="view_food-left-img-container-item"
                                                 src={food.image}/>
                                            <img className="view_food-left-img-container-item"
                                                 src={food.image}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid__column-6">
                                    <div className="view_food-right">
                                        <div className="view_food-right-container">
                                            <div className="view_food-right-item-link">
                                                ShopeeFood
                                            </div>
                                            <div className="view_food-right-item-link">
                                                {shops}
                                            </div>
                                        </div>
                                        <div className="view_food-right-container">
                                            <div className="view_food-right-item-like">
                                                <i className="fa fa-thumbs-up"></i>
                                                Yêu thích
                                            </div>
                                            <span>
                                                Món gì cũng có tại
                                        <a style={{textDecoration: `none`, color: `blue`}}> {shops}</a>
                                    </span>
                                        </div>
                                        <div className="view_food-right-container">
                                            <h1 className="view_food-right-item-name">{shops}</h1>
                                        </div>
                                        <div className="view_food-right-container">
                                            <div className="view_food-right-item-address">
                                                {shopsDescription}
                                            </div>
                                        </div>
                                        <div className="view_food-right-container">
                                            <div className="view_food-right-item-rate">
                                                <i className="view_food-right-item-star fa-solid fa-star"
                                                   style={{color: `#ffc107`}}></i>
                                                <i className="view_food-right-item-star fa-solid fa-star"
                                                   style={{color: `#ffc107`}}></i>
                                                <i className="view_food-right-item-star fa-solid fa-star"
                                                   style={{color: `#ffc107`}}></i>
                                                <i className="view_food-right-item-star fa-solid fa-star"
                                                   style={{color: `#ffc107`}}></i>
                                                <i className="view_food-right-item-star fa-solid fa-star"
                                                   style={{color: `#ffc107`}}></i>
                                            </div>
                                            <span className="view_food-right-item-views">999+</span>
                                            đánh giá trên ShopeeFood
                                        </div>
                                        <div className="view_food-right-container">
                                            <div className="view_food-right-more">
                                                <a>Xem thêm lượt đánh giá từ Foody</a>
                                            </div>
                                        </div>
                                        <div className="view_food-right-container">
                                            <div className="view_food-right-status">
                                                <div className="view_food-status-time">
                                                    {check(shopsTimeStart, shopsTimeEnd) ? (
                                                        <span className="view_food-right-status-on">Mở cửa</span>
                                                    ) : (
                                                        <span className="view_food-right-status-off">Đóng cửa</span>
                                                    )}
                                                </div>
                                                <div className="view_food-status-time-now">
                                                    <i className="far fa-clock"></i>
                                                    <span> {shopsTimeStart} - {shopsTimeEnd}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="view_food-right-container">
                                            <div className="view_food-right-item-price">
                                                <i className="fas fa-dollar-sign"></i>
                                                {food.price}
                                            </div>
                                        </div>
                                        <div className="view_food-right-container">
                                            <div className="view_food-right-item-quantity">
                                               Số lượng: {food.quantity}
                                            </div>
                                        </div>
                                        <div className="view_food-right-container">
                                            <div className="view_food-right-line"></div>
                                        </div>
                                        <div className="view_food-right-container">
                                            <div className="view_food-right-add">
                                                <div className="utility-item">
                                                    <div className="utility-title">
                                                        Phí dịch vụ
                                                    </div>
                                                    <div className="utility-content">
                                                <span className="txt-bold-txt-red">
                                                    0.0% Phí phục vụ
                                                </span>
                                                    </div>
                                                    <span className="icon icon-partner-vi">
                                                            <img src="../static/img/partner-vi-removebg-preview.png"
                                                                 className="icon-partner-vi-img"/>
                                                    </span>
                                                </div>

                                                <div className="utility-item">
                                                    <div className="utility-title">
                                                        Dịch vụ bơi
                                                    </div>
                                                    <div className="utility-content">
                                                <span className="txt-bold-txt-red">
                                                    ShoopeeFood
                                                </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="view_food-right-container">
                                            <div className="view_food-right-voucher-container"
                                                 style={{display: `none`}}>
                                                <div className="view_food-right-voucher-title">
                                                    Voucher:
                                                </div>
                                                <select className="view_food-right-voucher-inner">
                                                    {vouchers.map((items, index) =>
                                                        <option className="view_food-right-voucher-item" key={index}>
                                                            {items.name}
                                                        </option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>


                                        <div className="view_food-right-container">

                                                {user.id !== shopsUserId ? (
                                                    <div className="view_food-right-item-container-btn">
                                                            <div className="view_food-right-select-number">
                                                                <div className="view_food-right-select-number-title">
                                                                    Số lượng:
                                                                </div>
                                                                <div className="view_food-right-select-number-container">
                                                                    <div className="view_food-right-select-number-item">
                                                                        <div className="el-input-number">
                                                                            <div className="el-input-number__decrease"
                                                                                 onClick={decreaseQuantity}>
                                                                                <i className="fas fa-minus-circle"></i>
                                                                            </div>
                                                                            <div className="input-selecter-number">
                                                                                <input
                                                                                    onChange={formik.handleChange}
                                                                                    name={"quantity"}
                                                                                    value={formik.values.quantity}
                                                                                    className="el-input__inner no-arrows"
                                                                                    max="999"
                                                                                    min="1"
                                                                                    type="number" step="1"/>
                                                                            </div>
                                                                            <div className="el-input-number__increase"
                                                                                 onClick={increaseQuantity}>
                                                                                <i className="fas fa-plus-circle"></i>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="view_food-right-item-buy">
                                                                <i className="fa-solid fa-cart-plus"></i>
                                                                <button className="view_food-right-item-buy-btn"
                                                                        type={"submit"}>Thêm vào giỏ hàng
                                                                </button>
                                                            </div>
                                                        </div>
                                                ) : (
                                                    <div className="view_food-right-item-container-btn">
                                                        <div className="view_food-right-item-edit">
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                            <Link to={`/update-food/${food.id}`}
                                                                  style={{
                                                                      textDecoration: `none`,
                                                                      color: `white`,
                                                                      padding: `5px`
                                                                  }}>
                                                                Sửa thông tin
                                                            </Link>
                                                        </div>

                                                        <div className="view_food-right-item-buy">
                                                            <i className="fa-solid fa-trash"></i>
                                                            <button className="view_food-right-item-buy-btn"
                                                                    onClick={() => deleteFood(food.id)}
                                                                    type={"submit"}>Xóa sản phẩm
                                                            </button>
                                                        </div>
                                                    </div>
                                                    )}

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
