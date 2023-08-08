import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import {useFormik} from "formik";



export default function View() {
    const [food, setFood] = useState({})
    const {id} = useParams()
    const [shops, setShop] = useState("")
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    const idUser = user.id;

    useEffect(() => {
        axios.get(`http://localhost:8080/api/products/${id}`).then((res) => {
            setFood(res.data)
            setShop(res.data.shops.name)
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
            axios.post("http://localhost:8080/api/products-carts",{
                quantity:values.quantity,
                carts:{
                    id:3
                },
                products:{
                    id:id
                }
            })

        },

    })

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="grid">
                    <div className="grid__row app__content">

                        <div className="grid__column-10">

                            <div className="home-product">
                                <div className="grid__row">
                                    {/*product-item*/}

                                    <div className="grid__column-2-4">
                                        <a className="home-product-item">
                                            <div className="home-product-item__image"
                                            >
                                                <img className="" src={food.image} alt=""/>
                                            </div>

                                            <h4 className="home-product-item__name">{food.name}</h4>
                                            <div className="home-product-item__price">
                                                <span className="home-product-item__price-old">
                                                    Số lượng: {food.quantity}</span>
                                                <span className="home-product-item__price-current">
                                                    Giá: {food.price}</span>
                                            </div>
                                            <div className="home-product-item__action">
                                            <span className="home-product-item__like home-product-item__like--liked">
                                                {/*<i className="home-product-item__like-icon-empty far fa-heart"></i>*/}
                                                <i className="home-product-item__like-icon-fill fas fa-heart"></i>
                                            </span>

                                                <span className="home-product-item__sold">
                                                Lượt xem: {food.views}
                                            </span>
                                            </div>
                                            <div className="home-product-item__origin">
                                                <span className="home-product-item__brand"></span>
                                                <span className="home-product-item__origin-name">
                                                   Tên của hàng: {shops}</span>
                                            </div>
                                            <div className="home-product-item__origin">
                                                <div>
                                                    <button onClick={() => deleteFood(food.id)}>Xóa</button>
                                                    <button>
                                                        <Link to={`/update-food/${food.id}`}>Sửa</Link>
                                                    </button>
                                                    <button type={"submit"}>Thêm giỏ hàng</button>
                                                    <input onChange={formik.handleChange}
                                                           type="number" name={"quantity"}
                                                    />||  <span>Số lượng</span>
                                                </div>

                                            </div>

                                            <div className="home-product-item__favourite">
                                                <i className="fa fa-thumbs-up"></i>
                                                <span>Yêu thích</span>
                                            </div>

                                            <div className="home-product-item__sale-off">
                                                {/*đây là phần lấy giảm giá ở Voucher*/}
                                                <span className="home-product-item__sale-off-percent">10%</span>
                                                <span className="home-product-item__sale-off-label">Giảm</span>
                                            </div>
                                        </a>
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
