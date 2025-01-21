"use client"
import React, { useState } from 'react'
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import FeaturedBook from '../components/FeaturedBook';
import Recommended from '../components/Recommended';
import Suggested from '../components/Suggested';
import Modals from '../components/Modals';


const Page = ({ 
  fontSize, 
  onFontSizeChange,
 }: {
  fontSize: number;
  onFontSizeChange: (size: number) => void;
 }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const [modalState, setModalState] = useState({ 
      isModalOpen: false, 
      passwordModal: false, 
      signupModal: false, 
      });
  
      const toggleModal = (modal: keyof typeof modalState) => { setModalState((prev) => ({ ...prev,
        [modal]: !prev[modal] 
        })); };

        const toggleSidebar = () => {
          setIsSidebarOpen(!isSidebarOpen);
        };

  return (
    <div className="fy__content--wrapper">
    <SearchBar 
    toggleSidebar={toggleSidebar}
    isSidebarOpen={isSidebarOpen} 
    fontSize={fontSize} 
    onFontSizeChange={onFontSizeChange} 
    modalState={modalState}
    toggleModal={toggleModal}  />
      <Sidebar
    toggleSidebar={toggleSidebar}
    isSidebarOpen={isSidebarOpen} 
    fontSize={fontSize} 
    onFontSizeChange={onFontSizeChange} 
    modalState={modalState}
    toggleModal={toggleModal} />
    
    <div className="fy__container">
      <div className="fy__row">
        <FeaturedBook />
        <div className="fy__title">Recommended For You</div>
        <div className="fy__subtitle">We think you'll like these</div>
        <Recommended />
        <div className="fy__title">Suggested Books</div>
        <div className="fy__subtitle">Browse those books</div>
        <Suggested />
      </div>
    </div>
    <Modals toggleModal={toggleModal} modalState={modalState}/>
    </div>
  )
}

export default Page;