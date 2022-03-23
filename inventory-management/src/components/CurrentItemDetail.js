import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
function CurrentItemDetail(props) {
    const navigate = useNavigate();
    const currentItem = props.currentItems
    const [quantity, setQuantity] = useState(currentItem.quantity);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const reload = () => window.location.reload();
    const updateQuantity = () => {
        setShow(false)
        const updateData = { id: currentItem.id, quantity: quantity }
        console.log(updateData)
        axios.post('http://localhost:3010/items/updatecurrentitem', updateData)
            .then(function (response) {
                navigate("/", { replace: true });
                return (response);
            })
            .catch(function (error) {
                return (error);
            });
    }
    return <tr>
        <th scope="row">{currentItem.itemDetails.item_name}</th>
        <td>{currentItem.quantity}</td>
        <td>{currentItem.Unit}</td>
        <td>
            {/* <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >Update Quantity</button> */}
            <Button variant="primary" onClick={handleShow}>
                Update Quantity
            </Button>

            <Modal show={show} onHide={handleClose} onExiting={props.fetchData()}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentItem.itemDetails.item_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex">
                        <div className="text-start">
                            <label for="quantity" className="form-label" >Quantity</label>
                            <input type="number" name="quantity" className="form-control" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />
                        </div>
                        <div className="ml-2 text-start">
                            <label for="" className="form-label">Unit</label>
                            <select className="form-select" aria-label="Default select example" name="">
                                <option value="lbs">lbs</option>
                                <option value="grams">grams</option>
                                <option value="quantity">Quantity</option>
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateQuantity}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{currentItem.itemDetails.item_name}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body ">
                            <div className="d-flex">
                                <div className="text-start">
                                    <label for="quantity" className="form-label" >Quantity</label>
                                    <input type="number" name="quantity" className="form-control" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />
                                </div>
                                <div className="ml-2 text-start">
                                    <label for="" className="form-label">Unit</label>
                                    <select className="form-select" aria-label="Default select example" name="">
                                        <option value="lbs">lbs</option>
                                        <option value="grams">grams</option>
                                        <option value="quantity">Quantity</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={updateQuantity}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div> */}

        </td>

    </tr >
}
export default CurrentItemDetail;