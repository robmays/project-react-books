import React from 'react'
import './App.css'
import BookShelfChanger from './BookShelfChanger.js' 

class Book extends React.Component {
   
  render() {
    const {book, books, changeShelf} = this.props;
    
    return (

      <li key={book.id}>
        <div className="book">
          <div className="book-top">
		            <div 	className="book-cover" 
				style={{ width: 128, 
      					 height: 193, 
      					 backgroundImage: 
      						`url(${ !(book.imageLinks === undefined) 
									? book.imageLinks.smallThumbnail 
									: 'icons/add.svg'})` }}
			>
          </div>
          <BookShelfChanger book={book} books={books} changeShelf={changeShelf} /> 
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{!(book.authors === undefined) 
									? book.authors.join(', ') 
									: 'No Author'}</div>
        </div>
      </li>                  
    )
  }
  
}

export default Book