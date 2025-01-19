"use client"
import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import Sidebar from '../components/Sidebar'
import { auth } from '../firebase/init';
import Modals from '../components/Modals';
import Link from 'next/link';
import Image from 'next/image';
import login from "../assets/login.png";

interface SidebarProps {
    fontSize: number;
    onFontSizeChange: (size: number) => void;
    modalState: {
      isModalOpen: boolean;
      passwordModal: boolean;
      signupModal: boolean;
    }
    toggleModal: (modal: keyof SidebarProps['modalState']) => void;
  }

const Settings = ({ fontSize, onFontSizeChange }: SidebarProps) => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const [userEmail, setUserEmail] = useState<string | null>(null);


      const [modalState, setModalState] = useState({ 
          isModalOpen: false, 
          passwordModal: false, 
          signupModal: false, 
          });
      
          const toggleModal = (modal: keyof typeof modalState) => { setModalState((prev) => ({ ...prev,
            [modal]: !prev[modal] 
            })); };

    

    useEffect(() => {
        const loggedIn = auth.onAuthStateChanged((user) => {
          setIsLoggedIn(!!user)
          if (user) {
            setUserEmail(user.email)
        }
        if (user && modalState.isModalOpen) {
          toggleModal("isModalOpen");
        } else {
            setUserEmail(null)
        }  
        })
        

        return () => loggedIn();
    }, [modalState, toggleModal])

  return (
    <>
    <SearchBar />
    <Sidebar fontSize={fontSize} onFontSizeChange={onFontSizeChange} toggleModal={toggleModal} modalState={modalState} />
    <div className="settings__row">
        <div className="row settings__container">
            <div className="section__title page__title">Settings</div>
            { isLoggedIn ? (
              <>
              <div className="setting__content">
                <div className="settings__subtitle">Your Subscription Plan</div>
                <div className="settings__text">Basic</div>
                <Link href="" className="btn settings__upgrade--btn">Upgrade to Premium</Link>
            </div>
            <div className="setting__content">
                <div className="settings__subtitle">Email</div>
                { userEmail ? <div className="settings__text">{userEmail}</div> 
                :
                <div className="settings__text">guest@gmail.com</div>
                }
            </div>
            </>
            ) : (
              <div className="settings__login--wrapper">
              <Image className='settings__login--img' src={login} alt='login-img' />
              <div className="settings__login--text">Log in to your account to see your details.</div>
              <div onClick={() => toggleModal("isModalOpen")} className="btn settings__login--btn">Login</div>
            </div>
            )}
        </div>
    </div>
    <Modals toggleModal={toggleModal} modalState={modalState}/>
    </>
  )
}

export default Settings