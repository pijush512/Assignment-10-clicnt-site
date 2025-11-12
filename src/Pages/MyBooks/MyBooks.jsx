import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContex';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const MyBooks = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:3000/myBooks/${user.email}`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(error => console.log(error));
  }, [user]);

  // Delete Book
  const handleDelete = (id) => {
    const confirmDlete = window.confirm("Are you sure?");
    if (!confirmDlete) return;
    fetch(`http://localhost:3000/books/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBooks(books.filter(book => book._id !== id));
          toast.success("Book deleted successfully!");
        }
      })
      .catch(error => {
        toast.error("Error deleting book");
        console.log(error)
      })

  }


  return (
    <div className="p-6">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">My Books</h2>

      <table className="table-auto border w-full">
        <thead className="bg-gray-300">
          <tr>
            <th className="border border-gray-400 px-4 py-2">Book Name</th>
            <th className="border border-gray-400 px-4 py-2">Author</th>
            <th className="border border-gray-400 px-4 py-2">Genre</th>
            <th className="border border-gray-400 px-4 py-2">Rating</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td className="border border-gray-300 px-4 py-2">{book.title}</td>
              <td className="border border-gray-300 px-4 py-2">{book.author}</td>
              <td className="border border-gray-300 px-4 py-2">{book.genre}</td>
              <td className="border border-gray-300 px-4 py-2">{book.rating}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => navigate(`/updateBook/${book._id}`)}
                  className="btn btn-warning btn-sm mr-2">Update</button>
                <button onClick={() => handleDelete(book._id)}
                  className="btn btn-error btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBooks;