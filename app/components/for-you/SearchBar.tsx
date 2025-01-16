import React from 'react'
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div className="search__wrapper">
        <div className="search__content">
            <div className="search">
                <div className="search__input--wrapper">
                        <input type='text' placeholder='Search for books' className='search__input' />
                        <div className="search__icon">
                          <IoSearchOutline />
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchBar