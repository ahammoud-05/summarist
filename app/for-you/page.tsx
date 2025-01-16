import React from 'react'
import SearchBar from '../components/for-you/SearchBar';
import Sidebar from '../components/for-you/Sidebar';


const ForYou = () => {
  return (
    <>
    <Sidebar />
    <SearchBar />
    <div className="fy__container">
      <h1 className="hello">
        TEST TEST TEST TEST
      </h1>
      <div className="fy__row">
        <div className="fy__wrapper">
          <div className="fy__title">Selected just for you</div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ForYou;