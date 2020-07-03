import React from 'react'
import './App.css'
import Book from './Book.js' 
 
class BookShelf extends React.Component {
  
  render() {
    
    const {title, books, changeShelf} = this.props;
    
    return (
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.props.books.map( (book) => (
                          <Book key={book.id} book={book} books={books} 
								changeShelf={changeShelf} />
                      ))}      
				    </ol>
                  </div>
                </div>      
    )
  }
  
}


export default BookShelf