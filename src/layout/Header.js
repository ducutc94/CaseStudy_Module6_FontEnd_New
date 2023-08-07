import {Link, useNavigate} from "react-router-dom";
import Login from "../user/formlogin/Login";
import {useEffect, useState} from "react";
import axios from "axios";


export default function Header() {

    const [showLogin, setShowLogin] = useState(false)
    const user = JSON.parse(localStorage.getItem("user"))
    const [city,setCity] = useState([])

    const navigate = useNavigate()


    const handleClose = () => setShowLogin(false);
    const handleShow = () => setShowLogin(true);

    // logout
    const removeDataFromLocalStorage = () => {
        localStorage.removeItem('user');
        navigate('/')
    };

    //Get city
    useEffect(() => {
        axios.get("http://localhost:8080/api/city").then(res => {
            setCity(res.data)
        },)
    },[])





    return (<>
        <header id="header">
            <div className="grid">
                <div className="header-with-search">
                    <div className="header__logo">
                        <Link to={"/"} className="header__logo-link">
                            <div className="header__logo-img">
                                <img src="../static/img/shopeefoodvn.jpg" style={{maxWidth: `100%`}} alt={""}/>
                            </div>
                        </Link>
                    </div>



                    {/*đoạn này để fill-search trường dữ liệu của thành phố */}
                    <div className="header__select">

                        <div className="header__select--address">

                            <div className="header__select--address-inner">

                                <select name="" id="" className="header__select--address--btn">
                                    {city.map((items, index) =>
                                        <option key={index}>{items.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="header__select--category">
                            <button className="header__select--category--btn">Đồ ăn</button>
                            <button className="header__select--category--btn">Thực phẩm</button>
                            <button className="header__select--category--btn">Bia</button>
                            <button className="header__select--category--btn">Hoa</button>
                            <button className="header__select--category--btn">Siêu thị</button>
                            <button className="header__select--category--btn">Thú cưng</button>
                        </div>
                    </div>

                    {/*search here! */}
                    <div className="header__search">
                        <div className="header__search-input-wrap">
                            <input type="text" id="name-search" className="header__search-input"
                                   placeholder="Nhập để tìm kiếm"/>
                        </div>
                        <button className="header__search-btn">
                            <i className="fas fa-search header__search-btn-icon"></i>
                        </button>
                    </div>

                    {/*header__Cart*/}
                    <div className="header__cart">
                        <div className="header__cart-wrap">
                            <i className="fas fa-shopping-cart header__cart-icon"></i>
                            <span className="header__cart-notice">3</span>

                            {/* no item cart: lúc ko có gì trong giỏ thì nó hiện */}
                            <div className="header__Cart-list ">
                                <div className="header__Cart-list-inner">
                                    <img src="../static/img/footer/no-cart.png" alt=""
                                         className="header__Cart-no-cart-img"/>
                                    <span className="header__Cart-no-cart-msg">Chưa có sản phẩm</span>
                                </div>



                                {/*have item into cart: lúc có sản phẩm trong giỏ */}
                                <div className="header__Cart-list-content">
                                    <h4 className="header__Cart-heading">Sản phẩm đã thêm</h4>
                                    <ul className="header__Cart-list-item">

                                        <li className="header__Cart-item">
                                            <img src="../static/img/product/iphone12.jpg" alt=""
                                                 className="header__Cart-img"/>
                                            <div className="header__Cart-item-info">
                                                <div className="header__Cart-item-head">
                                                    <h5 className="header__Cart-item-name">Apple iPhone 12
                                                        64GB</h5>
                                                    <div className="header__cart-item-price-wrap">
                                                                <span
                                                                    className="header__Cart-item-price">₫25.200.000</span>
                                                        <span className="header__Cart-item-muntifly">x</span>
                                                        <span className="header__Cart-item-quantity">1</span>
                                                    </div>
                                                </div>
                                                <div className="header__Cart-item-body">
                                                    <span className="header__Cart-item-description">Phân loại: Purple</span>
                                                    <span className="header__Cart-item-remove">xóa</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <button className="header__cart-view btn btn--primary">Xem giỏ hàng</button>
                                </div>



                            </div>
                        </div>
                    </div>


                    {/*Login here*/}
                    {user == undefined && <>
                        <div className="header__login">
                            <div className="header__login--btn"  onClick={handleShow}>
                                Đăng nhập
                            </div>
                            <Login showLogin={showLogin} handleClose={handleClose}/>
                        </div>
                    </>}



                    {/*Account*/}
                    {user != undefined && <>
                        <div className="header__login--user" >
                            <div className="header__navbar-item header__navbar-user">
                                <img className="header__navbar-user-img" src={user.image} alt=""/>
                                <span className="header__navbar-user-name">{user.name}</span>
                                <i className="header__navbar-user-icon fas fa-caret-down"></i>

                                <ul className="header__navbar-user-menu">
                                    <li className="header__navbar-user-item">
                                        <a href="src/layout" className="">Tài khoản của tôi</a>
                                    </li>
                                    <li className="header__navbar-user-item">
                                        <a href="src/layout" className="">Đơn mua</a>
                                    </li>
                                    {user.authorities[0].authority === "ROLE_MERCHANT" && <>
                                        <li className="header__navbar-user-item">
                                            <Link to={"/shop"} className="">Quản lý cửa hàng</Link>
                                        </li>
                                    </>}
                                    <li className="header__navbar-user-item header__navbar-user-item--sparate">
                                        <a className="" onClick={() => removeDataFromLocalStorage()}>
                                            Đăng xuất
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>}


                </div>
            </div>
        </header>

    </>)

}
