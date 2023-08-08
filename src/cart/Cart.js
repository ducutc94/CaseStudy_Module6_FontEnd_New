
import {useEffect, useState} from "react";
import axios from "axios";

export default function Cart(){
    const [productCart, setProductCart] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/api/products-carts').then((res) => {
            if(res.data !== null){
                setProductCart(res.data)

            }else {
                setProductCart([])
            }

        })
    }, [])



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
                                           <img src="../static/img/product/iphone12.jpg" alt=""
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
                                                   <span className="header__Cart-item-remove">xóa</span>
                                               </div>
                                           </div>
                                       </li>
                                   )}
                               </ul>
                               <button className="header__cart-view btn btn--primary">Xem giỏ hàng</button>
                           </div>
                       </>}


                   </div>
               </div>

           </>
        )
}