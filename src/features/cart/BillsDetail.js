
import {Button, Modal} from "react-bootstrap";


export default function BillsDetail({item,showBills,handleClose}) {


    return (
        <>
            <Modal
                show={showBills}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal fade" id="orderDetailModal" tabIndex="-1"
                         aria-labelledby="orderDetailModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="orderDetailModalLabel">Chi tiết đơn hàng #12345</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <p>Sản phẩm: Máy tính xách tay</p>
                                    <p>Số lượng: 2</p>
                                    <p>Tổng tiền: $2000</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Trở lại
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}