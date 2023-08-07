import {useFormik} from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import Register from "./Register";
import * as Yup from "yup";

export default function Login({showLogin, handleClose}) {
    const [showRegister, setRegister] = useState(false);
    const validation = Yup.object().shape({
        username: Yup.string().required("Tên không để trống").matches(/^[a-z0-9_-]{3,16}$/, 'Chưa đúng định dạng'),
        // password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        //     "Chưa đúng định dạng").required("Mật khẩu rỗng"),
    });
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: validation,
        onSubmit: values => {
            axios.post('http://localhost:8080/api/auth/login', values).then((res) => {

                if (res.data.username !== undefined) {
                    console.log(res)
                    localStorage.setItem("user", JSON.stringify(res.data))
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Xin ...Chào...${res.data.username}`,
                        confirmButtonText: "OK",
                        showConfirmButton: false,
                        text: 'Đăng nhập thành công',
                        timer: 1500
                    });
                    handleClose()
                } else {
                    Swal.fire({
                        title: "Lỗi rồi!",
                        text: "Tài khoản chưa kích hoạt",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                }
            }).catch(error => {
                Swal.fire({
                    title: "Lỗi rồi!",
                    text: "Tên đăng nhập và mật khẩu không đúng",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            })
        },
    });

    return (
        <>
            <Modal show={showLogin} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title>Đăng nhập tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-bod8y">
                        <div className="auth-form">
                            {!showRegister ? (
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="auth-form__container">
                                        <div className="auth-form__header modal-header ">
                                            <h3 className="auth-form__heading">Đăng nhập</h3>
                                            <span className="auth-form__switch-btn" onClick={() => setRegister(true)}>Đăng kí
                                            </span>
                                        </div>
                                        <div className="auth-form__form">
                                            <div className="auth-form__group">
                                                <input name={'username'} onChange={formik.handleChange}
                                                       type={'text'} className={'auth-form__input'}
                                                       id={'your_name'}
                                                       placeholder={'Tài Khoản của bạn'}>
                                                </input>
                                                {<span className={"text-danger"}>{formik.errors.username}</span>}
                                            </div>
                                            <div className="auth-form__group">
                                                <input name={'password'} onChange={formik.handleChange}
                                                       type={'password'} className={'auth-form__input'}
                                                       id={'your_pass'}
                                                       placeholder={'Mật khẩu của bạn'}>
                                                </input>
                                                {<span className={"text-danger"}>{formik.errors.password}</span>}

                                            </div>
                                        </div>

                                        <div className="auth-form__aside">
                                            <div className="auth-form__help">
                                                <a className="auth-form__help-link auth-form__help-forgot">Quên
                                                    mật
                                                    khẩu</a>
                                                <span className="auth-form__help-separate"></span>
                                                <a className="auth-form__help-link">Cần trợ giúp</a>
                                            </div>
                                        </div>

                                        <div className="auth-form__controls">
                                            <button type="button" className="btn btn--normal auth-form__control-back"
                                                    data-bs-dismiss="modal" onClick={handleClose}>Trở lại
                                            </button>
                                            <button className="btn btn--primary" type="submit">Đăng nhập
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <Register setRegister={() => setRegister(false)} handleCloseRegister={handleClose}/>
                            )}
                            <div className="auth-form__socials">
                                <a
                                    className="btn btn--size-s auth-form__socials-icon auth-form__socials-fb btn--with-icon">
                                    <i className="fab fa-facebook-square"></i>
                                    <span
                                        className="auth-form__socials-title">Đăng nhập Facebook</span>
                                </a>
                                <a
                                    className="btn btn--size-s auth-form__socials-icon auth-form__socials-gg btn--with-icon">
                                    <i className="fab fa-google"></i>
                                    <span
                                        className="auth-form__socials-title">Đăng nhập Google</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}