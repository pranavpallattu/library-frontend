import React, { useEffect, useState } from 'react';
import Headeruser from '../components/Headeruser';
import { Button, Card, Container, Row, Col,Modal } from 'react-bootstrap';
import Borrowform from '../components/Borrowform';
import { getBookDetailsApi, getUserDetailsApi, updateUserBorrowedBooksApi } from '../services/allApi';
import Footer from '../components/Footer';

function Userhome() {
    const [bookDetails, setBookDetails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);


    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const result = await getBookDetailsApi();
            setBookDetails(result.data);
        } catch (error) {
            console.error("Failed to fetch book details:", error);
        }
    };

    const handleConfirmBorrow = async (selectedBook) => {
        try {
            const userId = localStorage.getItem("userId"); // Fetch the logged-in user's ID
            if (!userId) {
                alert("Please log in to borrow books!");
                return;
            }

            // Fetch user details
            const userResponse = await getUserDetailsApi(userId);
            const user = userResponse.data;

            // Prepare borrow details
            const borrowedDate = new Date();
            const returnDate = new Date(borrowedDate);
            returnDate.setDate(borrowedDate.getDate() + 7);

            const borrowedBook = {
                bookId: selectedBook.id,
                title: selectedBook.title,
                author: selectedBook.author,
                borrowedDate: borrowedDate.toISOString(),
                returnDate: returnDate.toISOString(),
            };

            // Add to user's borrowedBooks array
            const updatedUserData = {
                ...user,
                borrowedBooks: [...(user.borrowedBooks || []), borrowedBook],
            };

            // Update user in database
            const response = await updateUserBorrowedBooksApi(userId, updatedUserData);

            if (response.status === 200) {
                alert(`Book "${selectedBook.title}" borrowed successfully! Please meet your Librarian`);
            } else {
                alert("Failed to borrow the book. Please try again.");
            }
        } catch (error) {
            console.error("Error borrowing the book:", error);
            alert("An error occurred. Please try again.");
        }
    };
    const handleViewMore = (book) => {
        setSelectedBook(book);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedBook(null);
    };

    return (
        <div className="userhome-page">
            <Headeruser />
            <Container className="my-5">
                <Row>
                    {bookDetails.map((book, index) => (
                        <Col md={3} key={index} className="mb-4">
                            <Card className="shadow-sm h-100 p-3">
                                <Card.Img
                                    className="mt-3 "
                                    src={book.imgurl || "https://via.placeholder.com/150"}
                                    alt={book.title || "Book Image"}
                                    style={{ height: "250px", objectFit: "contain", width: "100%" }}
                                />
                                <Card.Body>
                                    <Card.Title className='text-center'>{book.title || "Untitled Book"}</Card.Title>
                                    <Card.Text>
                                        <p className='text-center'>{book.author || "Unknown Author"}</p>
                                    </Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <Button className='me-3' variant="info" onClick={() => handleViewMore(book)}>View More</Button>
                                        <Borrowform book={book} onConfirmBorrow={handleConfirmBorrow} />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer />

            {/* Modal for View More */}
            {selectedBook && (
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedBook.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="text-center">
                            <img
                                src={selectedBook.imgurl || "https://via.placeholder.com/150"}
                                alt={selectedBook.title}
                                style={{
                                    maxHeight: "300px",
                                    objectFit: "contain",
                                    width: "100%",
                                    marginBottom: "20px",
                                }}
                            />
                        </div>
                        <p><strong>Author:</strong> {selectedBook.author || "Unknown"}</p>
                        <p><strong>Description:</strong>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos nulla quo, quasi sint eaque hic magni nobis ratione atque ex? Doloremque consequatur sunt dolores exercitationem perferendis repellat repellendus totam explicabo?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>)}
        </div>
    );
}

export default Userhome;
