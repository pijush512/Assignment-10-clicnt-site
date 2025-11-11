import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Spinner from '../Spinner/Spinner';

const BookDitals = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/books/${id}`)
      .then(res => res.json())
      .then(data => {
        setBook(data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [id])

  if (!book) {
    return <Spinner></Spinner>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        className="mb-4 btn btn-sm btn-neutral"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow">
        <img
          src={book.coverImage || 'https://via.placeholder.com/150'}
          alt={book.title}
          className="w-full md:w-1/3 h-auto rounded-lg object-cover"
        />

        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-600 mb-2">Author: {book.author}</p>
          <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
          <p className="text-gray-600 mb-2">Rating: {book.rating}</p>
          <p className="text-gray-700 mt-4">{book.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDitals;