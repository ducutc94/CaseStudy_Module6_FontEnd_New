import {Link, useNavigate} from "react-router-dom";
import Login from "../user/formlogin/Login";
import {useEffect, useState} from "react";
import axios from "axios";
import Cart from "../cart/Cart";


export default function Header() {

    const [showLogin, setShowLogin] = useState(false)
    const user = JSON.parse(localStorage.getItem("user"))
    const [city,setCity] = useState([])

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        navigate(`/search-food/${searchQuery}`);
    };


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
                            <button className="header__select--category--btn"><Link to={`/category/${1}`} className="header__select--category--btn-link">
                                Đồ ăn</Link>
                            </button>
                            <button className="header__select--category--btn"><Link to={`/category/${2}`} className="header__select--category--btn-link">
                                Thực phẩm</Link>
                            </button>
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
                                   placeholder="Nhập để tìm kiếm"
                                   value={searchQuery}
                                   onChange={(e) => setSearchQuery(e.target.value)}/>
                        </div>
                        <button className="header__search-btn" onClick={handleSearch}>
                            <i className="fas fa-search header__search-btn-icon"></i>
                        </button>
                    </div>

                    {/*header__Cart*/}
                    <div className="header__cart">
                      <Cart/>
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
                                        <a href="src/layout" className="header__navbar-user-manager">
                                            <i className="fa-solid fa-user iconManager"></i>
                                            Tài khoản của tôi
                                        </a>
                                    </li>
                                    <li className="header__navbar-user-item">
                                        <a href="src/layout" className="header__navbar-user-manager">
                                            <i className="fa-solid fa-bag-shopping iconManager"></i>
                                            Đơn mua
                                        </a>
                                    </li>
                                    {user.authorities[0].authority === "ROLE_MERCHANT" && <>
                                        <li className="header__navbar-user-item">
                                            <Link to={"/shop"} className="header__navbar-user-manager">
                                                <i className="fa-solid fa-shop iconManager"></i>
                                                Quản lý cửa hàng
                                            </Link>
                                        </li>
                                    </>}
                                    <li className="header__navbar-user-item header__navbar-user-item--sparate">
                                        <a className="header__navbar-user-manager"
                                           onClick={() => removeDataFromLocalStorage()}>
                                            <i className="fa-solid fa-right-from-bracket iconManager"></i>
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
