import {Button, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {rgbToHex} from "@mui/material";


export default function BillsDetail({bill, showBills, handleClose}) {

    useEffect(() => {
        console.log(bill)
        console.log(setVoucher(bill.productsCartsList))


    }, [])

    function setDay(localDateTime) {
        const date = localDateTime.split("T")[0];
        return date;

    }

    function setTime(localDateTime) {
        const time = localDateTime.split("T")[1];
        const timeAll = time.split(".")[0];
        return timeAll;
    }
    function setVoucher(data) {
       let voucher = 0;
        for (let i = 0; i < data.length; i++) {
            voucher += data[i].products.price*data[i].quantity*(data[i].products.voucher.percent)/100
        }
        return voucher;
    }

    return (<>
        <Modal
            show={showBills}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        >
            <Modal.Header>
                <Modal.Title>Chi tiết đơn hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <>
                    <div className="bill_detail_container">
                        <div className="bill_detail_inner">
                                 <span className="bill_detail_inner-item-header">
                                     {bill.shops.name}
                                </span>
                            <span className="bill_detail_inner-item">
                                    Địa chỉ:&nbsp; {bill.shops.description}
                                </span>
                            <span className="bill_detail_inner-item-p">
                                    HOÁ ĐƠN CHI TIẾT
                                </span>
                            <span className="bill_detail_inner-item">
                                    Số : &nbsp; ###{bill.id}
                                </span>
                        </div>
                        <div className="bill_detail_inner-bill">
                                <span className="bill_detail_inner-item">
                                    Ngày đặt hàng:
                                    &nbsp; {setDay(bill.localDateTime)}
                                    &nbsp; {setTime(bill.localDateTime)}
                                </span>
                            <span className="bill_detail_inner-item">
                                    Người nhận:&nbsp; {bill.username}
                                </span>
                            <span className="bill_detail_inner-item">
                                    Trạng thái đơn: &nbsp; {bill.status === "1" ?( <span className="table_shop_list-inner" style={{color: `red`}}>Huỷ thanh
                                    toán
                                </span>):(
                                <span className="table_shop_list-inner" style={{color: `green`}}>Đã thanh
                                    toán
                                </span>)

                            }
                                </span>
                        </div>
                        <hr/>
                        <div className="bill_detail_inner-products">
                            <div className="bill_detail_inner-containerFood">
                                <span className="bill_detail_inner-item-p">#</span>
                                <span className="bill_detail_inner-item-p">Tên SP</span>
                                <span className="bill_detail_inner-item-p">Số lượng</span>
                                <span className="bill_detail_inner-item-p">Đơn giá</span>
                                <span className="bill_detail_inner-item-p">Tổng tiền</span>
                            </div>
                            <hr/>
                            <div className="bill_detail_inner-containerFood-show">
                                {bill.productsCartsList.length > 0 && bill.productsCartsList.map((item, index) => (<>
                                    <div className="bill_detail_inner-containerFood-showProducts" >
                                        <span className="bill_detail_inner-item">
                                        {index +1}
                                    </span>
                                        <span className="bill_detail_inner-item">
                                        {item.products?.name}
                                    </span>
                                        <span className="bill_detail_inner-item">
                                       {item.quantity}
                                    </span>
                                        <span className="bill_detail_inner-item"
                                              style={{marginLeft: `5px`}}>
                                                            {new Intl.NumberFormat('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            }).format(item.products.price)}
                                                         </span>
                                        <span className="bill_detail_inner-item"
                                              style={{marginLeft: `5px`}}>
                                                            {new Intl.NumberFormat('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            }).format(item.quantity * item.products.price)}
                                                         </span>
                                    </div>

                                    </>))}

                            </div>
                            <hr/>
                            <div className="bill_detail_inner-containerFood-total">
                                <div className="bill_detail_inner-containerFood-total-inner">
                                         <span className="bill_detail_inner-item-p">
                                        Tiền hàng
                                    </span>
                                    <span className="bill_detail_inner-item-p"
                                          style={{marginLeft: `5px`}}>
                                                            {new Intl.NumberFormat('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            }).format(bill.total)}
                                                         </span>
                                </div>

                                <div className="bill_detail_inner-containerFood-total-inner">
                                     <span className="bill_detail_inner-item-p">
                                       Khuyến mại:
                                    </span>
                                    <span className="bill_detail_inner-item-p"
                                          style={{marginLeft: `5px`}}>
                                                            {new Intl.NumberFormat('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            }).format(setVoucher(bill.productsCartsList))}
                                                         </span>
                                </div>

                                <div className="bill_detail_inner-containerFood-total-inner">
                                       <span className="bill_detail_inner-item-p">
                                        Tổng tiền :
                                    </span>
                                    <span className="bill_detail_inner-item-p"
                                          style={{marginLeft: `5px`}}>
                                                            {new Intl.NumberFormat('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            }).format(bill.total)}
                                                         </span>
                                </div>


                            </div>
                            <hr/>
                            <div className="bill_detail_inner-containerFood-p">
                                    <span className="bill_detail_inner-item-p">
                                        Trân trọng cảm ơn và Hẹn gặp lại quý khách !
                                    </span>
                            </div>
                        </div>

                    </div>
                </>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Trở lại
                </Button>
                <Button variant="primary">In hoá đơn</Button>
            </Modal.Footer>
        </Modal>
    </>)
}