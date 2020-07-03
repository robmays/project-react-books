import React from 'react'
import './App.css'

class BookShelfChanger extends React.Component {
  
  handleUpdateShelf = (evnt) => {
    const shelf = evnt.target.value;
    this.props.changeShelf(this.props.book, shelf);
  }

  render() {
    
    const {book, books} = this.props;
    
    //**got the code directly below from Udacity Mentor Forum post
    let currentShelf = 'none';
	for(let item of books){
      if(item.id === book.id){
        currentShelf = item.shelf;
        break;
      }
    }

    return (
			<div className="book-shelf-changer">
              <select onChange={this.handleUpdateShelf} defaultValue={currentShelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>      
    )
  }
  
}

export default BookShelfChanger  