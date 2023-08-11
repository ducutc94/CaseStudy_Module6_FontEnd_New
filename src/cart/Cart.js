
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Cart(){
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
        axios.get(`http://localhost:8080/api/products-carts/user/${idUser}`).then((res) => {
            if(res.data !== null){
                setProductCart(res.data)

            }else {
                setProductCart([])
            }

        })
    }, [])
    const deleteCart = (id) =>{
        axios.delete(`http://localhost:8080/api/products-carts/${id}`).then((res)=>{
        })

    }



    return(
           <>
               <div className="header__cart-wrap">
                   <i className="fas fa-shopping-cart header__cart-icon"></i>
                   <span className="header__cart-notice">{productCart.length}</span>
                   <div className="header__Cart-list ">
                       {!productCart && <>
                           <div className="header__Cart-list-inner">
                               <img src="../static/img/footer/no-cart.png" alt=""
                                    className="header__Cart-no-cart-img"/>
                               <span className="header__Cart-no-cart-msg">Chưa có sản phẩm</span>
                           </div>
                       </>}
                       {productCart && <>
                           <div className="header__Cart-list-content">
                               <h4 className="header__Cart-heading">Sản phẩm đã thêm</h4>
                               <ul className="header__Cart-list-item">
                                   {productCart.map((items, index) =>
                                       <li className="header__Cart-item" key={index}>
                                           <img src={items.products.image} alt=""
                                                className="header__Cart-img"/>
                                           <div className="header__Cart-item-info">
                                               <div className="header__Cart-item-head">
                                                   <h5 className="header__Cart-item-name">{items.products.name}</h5>
                                                   <div className="header__cart-item-price-wrap">
                                                                <span
                                                                    className="header__Cart-item-price">{items.products.price}</span>
                                                       <span className="header__Cart-item-muntifly">x</span>
                                                       <span className="header__Cart-item-quantity">{items.quantity}   </span>
                                                   </div>
                                               </div>
                                               <div className="header__Cart-item-body">
                                                   <span className="header__Cart-item-description">Phân loại:</span>
                                                   <span onClick={() => deleteCart(items.id)} className="header__Cart-item-remove" >xóa</span>
                                               </div>
                                           </div>
                                       </li>
                                   )}
                               </ul>

                           </div>
                       </>}
                       {user ? ( <Link to={'/products-carts'} className="header__cart-view btn btn--primary">Xem giỏ hàng</Link>):(<></>)}

                   </div>
               </div>

           </>
        )
}