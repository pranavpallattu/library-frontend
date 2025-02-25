import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { deleteBookApi, editBookApi } from "../services/allApi";

function BookCard({ book, setBookDeleteStatus, setBookEditStatus }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [updatedBook, setUpdatedBook] = useState({
    title: book.title,
    author: book.author,
    imgurl: book.imgurl,
  });

  const handleDelete = async (id) => {
    const result = await deleteBookApi(id);
    if (result.status >= 200 && result.status < 300) {
      setBookDeleteStatus(result);
      alert("Book Deleted Successfully");
    }
  };

  const handleEdit = async () => {
    const result = await editBookApi(book.id, updatedBook);
    if (result.status >= 200 && result.status < 300) {
      setBookEditStatus(result);
      setShowEditModal(false);
      alert("Book Updated Successfully");
    } else {
      alert("Failed to update book. Try again.");
    }
  };

  return (
    <>
      <Card className="p-3" key={book.id} style={{ width: "90%" }}>
        <Card.Img variant="top" src={book.imgurl} height="300px" />
        <Card.Body>
          <Card.Title className="text-center">{book.title}</Card.Title>
          <Card.Text>
            <h3 className="text-center">{book.author}</h3>
          </Card.Text>
          <Button className="mb-3" variant="warning" onClick={() => setShowEditModal(true)}>
            Edit
          </Button>
          <Button onClick={() => handleDelete(book.id)} variant="danger">
            Delete
          </Button>
        </Card.Body>
      </Card>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={updatedBook.title}
                onChange={(e) => setUpdatedBook({ ...updatedBook, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={updatedBook.author}
                onChange={(e) => setUpdatedBook({ ...updatedBook, author: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={updatedBook.imgurl}
                onChange={(e) => setUpdatedBook({ ...updatedBook, imgurl: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookCard;
