import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {useDispatch, useSelector} from "react-redux";
import {addCartBuy, confirmOrderBuy} from "../features/cart/cartBuy";
import BillsDetail from "../features/cart/BillsDetail";

export default function Oder(){
    const [list,setList] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const cartBuy = useSelector(state => state.cartBuy);
    const dispatch = useDispatch()
    const [showBills, setShowBills] = useState(false);
    const handleCloseBills = () => setShowBills(false);
    const handleShowBills = () => setShowBills(true);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/bills/bill-dto-user/${user.id}`).then((res) => {
            // console.log(res.data)
            if (res.data !== null) {
                dispatch(addCartBuy(res.data))
                setList(res.data)
            } else {
                dispatch(addCartBuy([]))
                setList([])
            }
        })
    }, [])
    const deleteOder = (id)=>{
        Swal.fire({
            position: 'center',
            title: 'Bạn muốn huỷ đơn hàng ?',
            showDenyButton: true,
            confirmButtonText: 'Xác nhận',
            denyButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/api/products-carts/merchant/${id}`).then(() => {
                    Swal.fire({
                        width: '450px', position: 'center', title: 'Huỷ thành công!', icon: 'success'
                    });
                })
            } else if (result.isDenied) {
                Swal.fire({
                    width: '450px', position: 'center', title: 'Hủy!', icon: 'info'
                })
            }
        })
    }
    const deleteCart = (id, index, item) => {
        Swal.fire({
            position: 'center',
            title: 'Bạn muốn huỷ đơn hàng ?',
            showDenyButton: true,
            confirmButtonText: 'Xác nhận',
            denyButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(confirmOrderBuy({
                    index: index, item: item
                }))
                axios.delete(`http://localhost:8080/api/products-carts/merchant/${id}`).then(() => {
                    Swal.fire({
                        width: '450px', position: 'center', title: 'Huỷ thành công!', icon: 'success'
                    });

                })
            } else if (result.isDenied) {
                Swal.fire({
                    width: '450px', position: 'center', title: 'Hủy!', icon: 'info'
                })
            }
        })
    }
    return(
        <>

        </>
    )
}