import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Borrowform({ book, onConfirmBorrow }) {
    const [show, setShow] = useState(false);
    const [confirmBorrow, setConfirmBorrow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setConfirmBorrow(false);
    };

    const handleShow = () => {
        const username = localStorage.getItem('username');
        if (!username) {
            setShow(true); // Show login/membership modal if not logged in
        } else {
            setConfirmBorrow(true); // Show confirmation modal if logged in
        }
    };

    const handleBorrowConfirm = () => {
        if (onConfirmBorrow && typeof onConfirmBorrow === "function") {
            onConfirmBorrow(book);
        }
        handleClose();
    };

    return (
        <>
            <button onClick={handleShow} className="btn btn-success">Borrow</button>

            {/* Login/Membership Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Borrow</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <p>Are you a Member? <Link to="/login" className="text-decoration-none text-primary">Login</Link></p>
                        <p>Do you want a Membership? <Link to="/register" className="text-decoration-none text-warning">Take Membership</Link></p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Confirm Borrow Modal */}
            <Modal show={confirmBorrow} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Borrow</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to borrow the book "{book?.title}"?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleBorrowConfirm}>Confirm Borrow</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Borrowform;
