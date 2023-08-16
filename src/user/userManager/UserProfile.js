export default function UserProfile(){


    return(
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
                                                <img src="../static/img/userDF.jpg" />
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
                                                        <img src="../static/img/userDF.jpg" />
                                                    </div>
                                                </div>
                                                <div className="grid__column-9">
                                                    <div className="home-user-avatar-form">
                                                        <span>Tải lên từ</span>
                                                        <div className="home-user-file-image">
                                                            <input id="uploadAvatar" type="file" hidden required
                                                                   accept="image/*" />
                                                                <label className="label-custom"
                                                                       htmlFor="uploadAvatar">Chọn</label>
                                                                <span style={{fontStyle: `italic`}}>Chấp nhận GIF, JPEG, PNG, BMP với kích thước tối đa 5.0 MB </span>
                                                        </div>
                                                    </div>
                                                    <button className="btn-orange">Cập nhật</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="home-user-right-content-info">
                                            <form>
                                                <div className="home-user-title-user">Thay đổi thông tin</div>
                                                <div className="home-user-form">
                                                    <div className="grid__column-3">
                                                        <span className="home-user-form-name">Tên</span>
                                                    </div>
                                                    <div className="grid__column-4">
                                                        <div className="home-user-right-input">
                                                            <input type="text" placeholder="Tên" className="" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="home-user-form">
                                                    <div className="grid__column-3">
                                                        <span className="home-user-form-name">Giới tính</span>
                                                    </div>
                                                    <div className="grid__column-4">
                                                        <div className="home-user-right-input">
                                                            <input type="text" placeholder="Giới tính" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="home-user-form">
                                                    <div className="grid__column-3">
                                                        <span className="home-user-form-name">Email</span>
                                                    </div>
                                                    <div className="grid__column-4">
                                                        <div className="home-user-right-input">
                                                            <input type="text" placeholder="Email" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="home-user-form">
                                                    <div className="grid__column-3">
                                                        <span className="home-user-form-name">Mật khẩu</span>
                                                    </div>
                                                    <div className="grid__column-4">
                                                        <div className="home-user-right-input">
                                                            <input type="password" placeholder="Mật khẩu" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid__column-3">
                                                    <button className="btn-orange">Lưu thay đổi</button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="home-user-right-content-info-last">
                                            <div className="home-user-title-user">Quản lý số điện thoại</div>
                                            <div className="home-user-title-user-list-phone">
                                                <div className="home-user-form">
                                                    <div className="grid__column-3">
                                                        <span className="home-user-form-name">0379456789</span>
                                                    </div>
                                                    <div className="grid__column-4">
                                                        <div className="home-user-right-input">
                                                            <i className="fa-solid fa-circle-check"
                                                               style={{color: `#5bcc0f`}}></i>
                                                            <span>Số điện thoại đã được xác thực</span>
                                                        </div>
                                                    </div>
                                                    <div className="grid__column-3">
                                                        <button className="btn-orange">Lưu thay đổi</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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