import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf.js' 

class HomePage extends React.Component {
   
  render() {
   
    const {reading, wants, read, changeShelf} = this.props;
    
    return (

         <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
				<BookShelf title="Currently Reading" books={reading} changeShelf={changeShelf} />
				<BookShelf title="Wants to Read" books={wants} changeShelf={changeShelf} />
				<BookShelf title="Read" books={read} changeShelf={changeShelf} />
            </div>
            <div className="open-search">
            <Link
                  to='/search'
                >Add a book</Link>
            </div>
          </div> 
      
    )
  }
  
}

export default HomePage