import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContex';

const MyBooks = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:3000/myBooks/${user.email}`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(error => console.log(error));
  }, [user]);



  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Books</h2>

      <table className="table-auto border w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Book Name</th>
            <th className="border px-4 py-2">Author</th>
            <th className="border px-4 py-2">Genre</th>
            <th className="border px-4 py-2">Rating</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td className="border px-4 py-2">{book.title}</td>
              <td className="border px-4 py-2">{book.author}</td>
              <td className="border px-4 py-2">{book.genre}</td>
              <td className="border px-4 py-2">{book.rating}</td>
              <td className="border px-4 py-2">
                <button className="btn btn-warning btn-sm mr-2">Update</button>
                <button className="btn btn-error btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBooks;