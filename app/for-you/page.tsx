"use client"
import React, { useState } from 'react'
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import FeaturedBook from '../components/FeaturedBook';
import Recommended from '../components/Recommended';
import Suggested from '../components/Suggested';
import Modals from '../components/Modals';

type ModalKeys = "signupModal" | "isModalOpen" | "passwordModal";
const ForYou = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const [modalState, setModalState] = useState({ 
      isModalOpen: false, 
      passwordModal: false, 
      signupModal: false, 
      });
  
      const toggleModal = (modal: ModalKeys) => {
        setModalState((prev) => ({ ...prev, [modal]: !prev[modal] }));
      };

        const toggleSidebar = () => {
          setIsSidebarOpen(!isSidebarOpen);
        };

  return (
    <div className="fy__content--wrapper">
    <SearchBar 
    toggleSidebar={toggleSidebar}
      />
        <Sidebar
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          modalState={modalState}
          toggleModal={toggleModal}
        />
    
    <div className="row">
      <div className="container">
        <FeaturedBook />
        <div className="fy__title">Recommended For You</div>
        <div className="fy__subtitle">We think you'll like these</div>
        <Recommended />
        <div className="fy__title">Suggested Books</div>
        <div className="fy__subtitle">Browse those books</div>
        <Suggested />
      </div>
    </div>
    <Modals 
    toggleModal={toggleModal} 
    modalState={modalState}
    />
    </div>
  )
}

export default ForYou;