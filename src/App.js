import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from './BookSearch.js' 
import HomePage from './HomePage.js'
 
class BooksApp extends React.Component {

  state = {
    books: [],
    reading: [],
    read: [],
    wants: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: books,
          reading: books.filter((b) => { return b.shelf.includes("currently")}),
          read: books.filter((b) => { return b.shelf.includes("read")}),
          wants: books.filter((b) => { return b.shelf.includes("want")})
        }))
      })
  }  
  
  changeShelf = (book, shelf) => {
    
    BooksAPI.update(book, shelf)
      .then((res) => {
     	const isBookThatChangedShelf = (element) => element.id === book.id;
        const changedIndex = this.state.books.findIndex(isBookThatChangedShelf);
        let updatedBooks = [...this.state.books];
      
      	if (changedIndex === -1){
          //add new book to book collection
          book.shelf = shelf;
          updatedBooks = updatedBooks.concat([book]);
        }
      	else if (shelf === 'none') {
          //if 'none, remove book from books collection
          updatedBooks = updatedBooks.filter((b) => { return b.id !== book.id } );
        }
      	else {
            //update shelf of existing book
        	let updatedBook = {...updatedBooks[changedIndex]};
        	updatedBook.shelf = shelf;
        	updatedBooks[changedIndex] = updatedBook;
      	}
         
        this.setState((prevState) => ({
          books: updatedBooks,
          reading: updatedBooks.filter((b) => { return res.currentlyReading.includes(b.id) } ),
          read: updatedBooks.filter((b) => { return res.read.includes(b.id) } ),
          wants: updatedBooks.filter((b) => { return res.wantToRead.includes(b.id) } )
        }))
      })
  }

  render() {

    const {books, reading, wants, read} = this.state;
    
    return (
      <div className="app">
      
        <Route path='/search' render={({ history }) => (
       		<BookSearch bookshelfBooks={books} changeShelf={this.changeShelf} />
        )} />

         <Route exact path='/' render={() => (
           <HomePage reading={reading} wants={wants} read={read} changeShelf={this.changeShelf} />
        )} />       
      </div> 
    )
  }
}

export default BooksApp