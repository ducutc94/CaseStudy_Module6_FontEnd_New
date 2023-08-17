import {useEffect, useState} from "react";
import axios from "axios";
import {useFormik} from "formik";
import Swal from "sweetalert2";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import storage from "../../config/FirebaseConfig";


export default function UserProfile() {
    const user = JSON.parse(localStorage.getItem("user"));
    const idUser = user.id;

    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/${idUser}`).then((res) => {
            let data = {...res.data};
            formik.setValues(data);
        });
    }, [idUser]);

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            gender: "",
            birthday: "",
            image: "",
            phone: "",
        },
        onSubmit: async (values) => {
            try {
                Swal.fire({
                    title: "Bạn có muốn cập nhật ?",
                    showDenyButton: true,
                    confirmButtonText: "Lưu",
                    denyButtonText: `Hủy`,
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await axios.put(`http://localhost:8080/api/users/${idUser}`, values);
                        await Swal.fire("Cập nhật thành công!", "", "success");
                    } else if (result.isDenied) {
                        await Swal.fire("Cập nhật thất bại", "", "info");
                    }
                });
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        },
    });

    async function uploadImage() {
        const file = document.getElementById("uploadAvatar").files[0];
        if (file) {
            const storageRef = ref(storage, `files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed",
                () => {
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const imageDTO = {img: downloadURL};
                        user.image = downloadURL;
                        localStorage.setItem("user", JSON.stringify(user));

                        Swal.fire({
                            title: 'Đang tạo sản phẩm...',
                            html: 'Vui lòng đợi trong giây lát...',
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            didOpen: () => {
                                Swal.showLoading();

                                // Đợi 5 giây (hoặc thời gian tùy chọn) và sau đó đóng hộp thông báo
                                const timeout = 2500; // 5 giây
                                setTimeout(() => {
                                    Swal.close();
                                }, timeout);
                            }
                        }).then((result) => {
                            axios.put(`http://localhost:8080/api/users/upload-img/${idUser}`, imageDTO)
                                .then(res => {
                                    Swal.fire("Cập nhật ảnh thành công!", "", "success");
                                    window.location.reload();
                                });
                        })

                        }
                    );
                })
        }
    }

    return (
        <>
            <div className="grid">
                <div className="grid__row app__content">
                    <div className="grid__column-12">
                        <div className="home-user">
                            <div className="grid__column-3">
                                <div className="home-user-left">
                                    <div className="home-user-left-header">
                                        <div className="home-user-left-header-container">
                                            <div className="home-user-left-header-item-avatar">
                                                <img src={user.image}/>
                                            </div>
                                            <div className="home-user-left-header-item-name">
                                                <span className="home-user-left-header-item-name-text">ThaiNguyen</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="home-user-left-content">
                                        <div className="home-user-left-content-item">
                                            <i className="fa-solid fa-user"></i>
                                        </div>
                                        <div className="home-user-left-content-text">
                                            Cập nhật tài khoản
                                        </div>
                                        <div className="home-user-left-content-item">
                                            <i className="fa-solid fa-angle-right"></i>
                                        </div>
                                    </div>
                                    <div className="home-user-left-content">
                                        <div className="home-user-left-content-item">
                                            <i className="fa-solid fa-cart-shopping"></i>
                                        </div>
                                        <div className="home-user-left-content-text">
                                            Thông tin đơn hàng
                                        </div>
                                        <div className="home-user-left-content-item">
                                            <i className="fa-solid fa-angle-right"></i>
                                        </div>
                                    </div>
                                    <div className="home-user-left-content">
                                        <div className="home-user-left-content-item">
                                            <i className="fa-regular fa-credit-card"></i>
                                        </div>
                                        <div className="home-user-left-content-text">
                                            Phương thức thanh toán
                                        </div>
                                        <div className="home-user-left-content-item">
                                            <i className="fa-solid fa-angle-right"></i>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid__column-8">
                                <div className="home-user-right">
                                    <div className="home-user-right-title">
                                        Thông tin người dùng
                                    </div>
                                    <div className="home-user-right-content">
                                        <div className="home-user-right-content-info">
                                            <div className="home-user-title-user">Tải ảnh đại diện</div>
                                                <div className="home-user">
                                                    <div className="grid__column-3">
                                                        <div className="home-user-avatar-image">
                                                            <img src={user.image}/>
                                                        </div>
                                                    </div>
                                                    <div className="grid__column-9">
                                                        <div className="home-user-avatar-form">
                                                            <span>Tải lên từ</span>
                                                            <div className="home-user-file-image">
                                                                <input id="uploadAvatar" type="file" hidden required
                                                                       name={'image'}
                                                                       accept="image/*"
                                                                />
                                                                <label className="label-custom"
                                                                       htmlFor="uploadAvatar">Chọn</label>
                                                                <span style={{fontStyle: `italic`}}>Chấp nhận GIF, JPEG, PNG, BMP với kích thước tối đa 5.0 MB </span>
                                                            </div>
                                                        </div>
                                                        <button  onClick={uploadImage} className="btn-orange">Cập nhật
                                                        </button>
                                                    </div>
                                                </div>
                                        </div>
                                        <div className="home-user-right-content-info">
                                            <form onSubmit={formik.handleSubmit}>
                                                <div className="home-user-title-user">Thay đổi thông tin</div>
                                                <div className="home-user-form">
                                                    <div className="grid__column-3">
                                                        <span className="home-user-form-name">Tên</span>
                                                    </div>
                                                    <div className="grid__column-4">
                                                        <div className="home-user-right-input">
                                                            <input type="text"
                                                                   onChange={formik.handleChange}
                                                                   value={formik.values.username}
                                                                   id={'username'}
                                                                   name={'username'}
                                                                   onBlur={formik.handleBlur}
                                                                   className=""/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="home-user-form">
                                                    <div className="grid__column-3">
                                                        <span className="home-user-form-name">Giới tính</span>
                                                    </div>
                                                    <div className="grid__column-4">
                                                        <div className="home-user-right-input">
                                                            <select name={"gender"}
                                                                    onChange={formik.handleChange}
                                                                    value={formik.values.gender}>
                                                                <option>Chọn giới tính</option>
                                                                <option >Nam</option>
                                                                <option >Nữ</option>
                                                                <option >Khác</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="home-user-form">
                                                    <div className="grid__column-3">
                                                        <span className="home-user-form-name">Email</span>
                                                    </div>
                                                    <div className="grid__column-4">
                                                        <div className="home-user-right-input">
                                                            <input readOnly={true} type="text"
                                                                   name={'email'}
                                                                   onChange={formik.handleChange}
                                                                   value={formik.values.email}
                                                                   id={'email'}
                                                                   onBlur={formik.handleBlur}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="home-user-form">
                                                    <div className="grid__column-3">
                                                        <span className="home-user-form-name">Ngày sinh</span>
                                                    </div>
                                                    <div className="grid__column-4">
                                                        <div className="home-user-right-input">
                                                            <input type="date"
                                                                   name={'birthday'}
                                                                   onChange={formik.handleChange}
                                                                   value={formik.values.birthday}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid__column-3">
                                                    <button  className="btn-orange">Lưu thay đổi</button>
                                                </div>
                                            </form>
                                        </div>
                                        <form onSubmit={formik.handleSubmit}>
                                            <div className="home-user-right-content-info-last">
                                                <div className="home-user-title-user">Quản lý số điện thoại</div>
                                                <div className="home-user-title-user-list-phone">
                                                    <div className="home-user-form">
                                                        <div className="grid__column-3">
                                                            <div className="home-user-right-input">
                                                                <input type="number"
                                                                       name={'phone'}
                                                                       onChange={formik.handleChange}
                                                                       value={formik.values.phone}
                                                                />
                                                            </div>

                                                        </div>
                                                        <div className="grid__column-4">
                                                            <div className="home-user-right-input">
                                                                <i className="fa-solid fa-circle-check"
                                                                   style={{color: `#5bcc0f`}}></i>
                                                            </div>
                                                        </div>
                                                        <div className="grid__column-3">
                                                            <button  className="btn-orange">Lưu thay đổi</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}