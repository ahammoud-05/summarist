"use client"
import React, { useState } from 'react'
import { IoClose, IoPersonSharp } from "react-icons/io5";
import google from "../assets/google.png"
import Image from 'next/image';
import Link from 'next/link';
  

const Modal = ({ toggleModal, modalState }) => {

  return (
    <>
    {/* LOGIN MODAL */}
    {(modalState.isModalOpen || modalState.passwordModal || modalState.signupModal) && (
        <div
          className="modal__overlay--background"
          onClick={toggleModal("isModalOpen")}
        ></div>
      )}

    <div className={`modal__login ${modalState.isModalOpen ? "open" : "closed"}`}>
        
        <div className='modal__close--wrapper'>
            <button onClick={toggleModal("isModalOpen")} className='modal__close--btn'>
                <figure className='modal__close--btn-icon-wrapper'>
                    <IoClose className='modal__close--btn-icon' />
                </figure>
            </button>
        </div>
        
        <div className='modal__content'>
        <h3 className="modal__title">
            Login to Summarist
        </h3>

        <div className='google__login--wrapper'>
        <button className='guest__login--btn'>
            <figure className='guest__login--icon-wrapper'>
              <IoPersonSharp className='guest__login--icon' />  
            </figure>
        Login as Guest
        </button> 
        </div>
        <div className='modal__seperator'>
            <hr className='line1 line' /> or  <hr className='line2 line' />
        </div>

        <div className='google__login--wrapper'>
        <button className='google__login--btn'>
            <figure className='google__login--icon-wrapper'>
              <Image src={google} alt='google' className='google__login--icon' />
            </figure>
        Login with Google
        </button> 
        </div>

        <div className='modal__seperator'>
            <hr className='line1 line' /> or  <hr className='line2 line' />
        </div>

        <form className='modal__form'>
            <input className='modal__input' type='email' placeholder='Email Address'>
            
            </input>
            <input className='modal__input' type='password' placeholder='Password'>
            
            </input>
            <button className='modal__login--btn'>
                Login
            </button>
        </form>

        <div className='modal__links'>
        <button onClick={toggleModal("passwordModal")} className='modal__link modal__link--password'>
        Forgot your password?
        </button>
        <button className='modal__link modal__link--signup'>
        Don't have an account?
        </button>
        </div>

        </div>
    </div>

    {/* RESET PASSWORD MODAL */}
    {modalState.passwordModal && <div className='modal__overlay--background' onClick={toggleModal("passwordModal")}></div>}
    <div className={`modal__password ${modalState.passwordModal ? "open" : "closed"}`}>

        <div className='modal__close--wrapper'>
            <button onClick={toggleModal("passwordModal")} className='modal__close--btn'>
                <figure className='modal__close--btn-icon-wrapper'>
                    <IoClose className='modal__close--btn-icon' />
                </figure>
            </button>
        </div>

        <div className='modal__content--password'>
            <h3 className="modal__title--password">
                Reset your password
            </h3>
            <form className='modal__form--password'>
                <input className='modal__input' placeholder='Email address'>
                
                </input>
                <button className='modal__btn--password' >
                    Send reset password link
                </button>
            </form>
            <button onClick={toggleModal("isModalOpen")} className='modal__btn--password-back'>
                Go to login
            </button>
        </div>
    </div>
    </>
  )
}

export default Modal