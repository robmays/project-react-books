import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import Book from './Book.js'
import * as BooksAPI from './BooksAPI'
import { throttle } from 'lodash'
 
class BookSearch extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            searchedBooks: []
        }
        this.updateQuery = throttle(this.updateQuery, 50)
    } 
  
  updateQuery = (qry) => {
    
    const maxResults = 100;
    
    this.setState(() => ({
      query: qry
    }))

    if(qry === '') {
        this.setState(() => ({
            searchedBooks: []
          }))
    }
    else {
        //call API to get search results
        BooksAPI.search(qry, maxResults)
          .then((books) => {
          	if(!books.error && this.state.query !== '') {
              this.setState(() => ({
                searchedBooks: books
              }))
            }
            else {
              this.setState(() => ({
                searchedBooks: []
              })) 
            }
          }).catch(
          	
            this.setState(() => ({
              searchedBooks: []
            }))
        ); 
        } 
    }
    
  render() {
    
    const {searchedBooks = []} = this.state;
	const {bookshelfBooks = []} = this.props;

	//compare searchedBooks to bookshelfBooks and set shelf ('none' if not found on bookshelf books)
	//loop to set searchedBooks shelf value; use bookshelfBooks shelf values to set shelf value
	//OR, set to default value of 'none' if not in bookshelfBooks array
	for(let searched of searchedBooks){
      for(let bookshelf of bookshelfBooks){  
        if(searched.id === bookshelf.id){
          searched.shelf = bookshelf.shelf;
          continue;
        }
      }
      if(!searched.shelf){
      	searched.shelf = 'none'
      }
    }

    return (
          <div className="search-books">
            <div className="search-books-bar">
            <Link
                  to='/'
                  className='close-search'
                >Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" 
					placeholder="Search by title or author"
    				value={this.state.query}
					onChange={ (event) => this.updateQuery(event.target.value) }
				/>
              </div>
            </div>

            <div className="search-books-results">
              	<ol className="books-grid">
                     {searchedBooks.map( (book) => (
                      <Book key={book.id} book={book} 
                      		books={searchedBooks} changeShelf={this.props.changeShelf} />   
                    ))}
				</ol>
            </div>



          </div>             



    )
  }
  
}

export default BookSearch