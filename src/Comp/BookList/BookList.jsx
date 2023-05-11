import React from 'react';
import React, { useState, useEffect } from 'react';

function BookList() {
  const [query, setQuery] = useState("Harry");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (query.trim() !== "") {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        .then(response => response.json())
        .then(data => setBooks(data.items))
        .catch(error => console.error(error))
    }
  }, [query]);

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <h1>Search for Books:</h1>
      <input type="text" value={query} onChange={handleInputChange} />
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.volumeInfo.imageLinks && (
              <img src={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
            )}
            <h2>{book.volumeInfo.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
