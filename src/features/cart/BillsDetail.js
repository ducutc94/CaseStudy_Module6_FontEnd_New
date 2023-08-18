
import {Button, Modal} from "react-bootstrap";
import {useEffect} from "react";


export default function BillsDetail({bill,showBills,handleClose}) {

    useEffect(()=> {
        console.log(bill)
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

    return (
        <>
            <Modal
                show={showBills}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header >
                    <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <div>
                            <div>
                                Mã đơn hàng: &nbsp; ###{bill.id}
                            </div>
                            <div>
                                Ngày đặt hàng: &nbsp; {setDay(bill.localDateTime)} &nbsp; {setTime(bill.localDateTime)}
                            </div>
                            <div>
                                Mã đơn hàng: &nbsp; {bill.shops.name}
                            </div>

                            <div>

                                <div className="modal-body">
                                    <p>Sản phẩm: Máy tính xách tay</p>
                                    <p>Số lượng: 2</p>
                                    <p>Tổng tiền: $2000</p>
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
        </>
    )
}