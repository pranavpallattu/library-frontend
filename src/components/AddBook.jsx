import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { addBookApi } from '../services/allApi';

function AddBook({ setAddBookStatus }) {

  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    imgurl: ""
  })


  console.log(bookDetails);

  const handleAdd = async () => {
    const { title, author, imgurl } = bookDetails

    if (!title || !author || !imgurl) {
      alert("Please fill the form completely")
    }

    else {
      const result = await addBookApi(bookDetails)
      console.log(result);
      if (result.status >= 200 && result.status < 300) {
        setAddBookStatus(result)
        handleClose()
      }
      else {
        alert("something went wrong")
        handleCancel()
      }


    }
  }

  const handleCancel = () => {
    setBookDetails({
      title: "",
      author: "",
      imgurl: ""
    })
  }


  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    handleCancel()
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <button onClick={handleShow} className='btn btn-success'>Add Book</button>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='fw-bold'>ADD BOOK</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" value={bookDetails?.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} placeholder='Title' className='form-control mt-2 border border-dark' />
          <input type="text" value={bookDetails?.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} placeholder='Author' className='form-control mt-3 border border-dark' />
          <input type="text" value={bookDetails?.imgurl} onChange={(e) => setBookDetails({ ...bookDetails, imgurl: e.target.value })} placeholder='Cover page url' className='form-control mt-3 border border-dark' />

        </Modal.Body>
        <Modal.Footer>
          <Button className='text-light' variant="warning" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add Book
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddBook