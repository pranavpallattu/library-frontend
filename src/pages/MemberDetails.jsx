import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Helper function to format date to dd/mm/yyyy
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if day < 10
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if month < 10
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

function MemberDetails() {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/Users');
      console.log('Fetched Members:', response.data);
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Filter out the admin users
  const filteredMembers = members.filter(member => member.role !== 'admin');

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
        <div className="container-fluid">
          <form className="d-flex">
            <div className="input-group">
              <Link to={'/AdminPage'}>
                <button className="btn btn-warning p-2" type="button">
                  <i className="fas fa-house"></i> Admin Home
                </button>
              </Link>
            </div>
          </form>

          {/* <form className="d-flex">
            <div className="row">
              <div className="col-auto"></div>
              <div className="col-auto">
                <Link to={'/'}>
                  <button className="btn btn-danger p-2" type="button">
                    Log Out <i className="fas fa-power-off"></i>
                  </button>
                </Link>
              </div>
            </div>
          </form> */}
        </div>
      </nav>

      <div className="container mt-2">
        <h2 className="mb-4 text-center">Member Details</h2>

        {filteredMembers.length > 0 ? (
          <table className="table table-hover table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Member ID</th>
                <th>Member Name</th>
                <th>Email ID</th>
                <th>Phone Number</th>
                <th>Books Borrowed</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>{member.username}</td>
                  <td>{member.email || 'N/A'}</td>
                  <td>{member.phone || 'N/A'}</td>
                  <td>
                    {member.borrowedBooks && member.borrowedBooks.length > 0 ? (
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Borrow Date</th>
                            <th>Return Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {member.borrowedBooks.map((book, index) => (
                            <tr key={index}>
                              <td>{book.title}</td>
                              <td>{formatDate(book.borrowedDate)}</td> {/* Format Borrow Date */}
                              <td>{formatDate(book.returnDate)}</td> {/* Format Return Date */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <span>No Books Borrowed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-2">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626.png"
              alt="No Members"
              className="w-50"
            />
            <h5 className="text-white">No Members Found...</h5>
          </div>
        )}
      </div>
    </>
  );
}

export default MemberDetails;
