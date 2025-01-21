import React from 'react'
import SearchBar from '../components/SearchBar'
import Sidebar from '../components/Sidebar'



const Library = ({ fontSize, onFontSizeChange }) => {
  return (
    <>
    <SearchBar />
    <Sidebar fontSize={fontSize} onFontSizeChange={onFontSizeChange} />
    <div className="row">
        <div className="container">
            <div className="fy__title">Saved Books</div>
            <div className="fy__subtitle">0 items</div>
            <div className="finished__books--block-wrapper">
                <div className="finished__books--title">Save your favorite books!</div>
                <div className="finished__books--subtitle">When you save a book, it will appear here.</div>
            </div>
            <div className="fy__title">Finished</div>
            <div className="fy__subtitle">0 items</div>
            <div className="finished__books--block-wrapper">
                <div className="finished__books--title">Done and dusted!</div>
                <div className="finished__books--subtitle">When you finish a book, you can find it here later.</div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Library