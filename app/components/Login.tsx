"use client"
import React, { FormEvent, useState } from 'react'
import { IoClose, IoPersonSharp } from "react-icons/io5";
import google from "../assets/google.png";
import Image from 'next/image';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/init'
import Link from 'next/link';

interface ModalProps {
  modalState: {
    isModalOpen: boolean;
  }
  toggleModal: (state: string) => void;
}

const Login = ( { modalState, toggleModal }: ModalProps) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      try {
        await signInWithEmailAndPassword(auth, email, password)
        console.log("logged in!")
      } catch(error) {
        console.log("Theres an error")
      }
    }

  return (
    <div className={`modal__login ${modalState.isModalOpen ? "open" : "closed"}`}>
        <div className='modal__close--wrapper'>
          <button onClick={() => toggleModal("isModalOpen")} className='modal__close--btn'>
            <figure className='modal__close--btn-icon-wrapper'>
              <IoClose className='modal__close--btn-icon' />
            </figure>
          </button>
        </div>

        <div className='modal__content'>
          <h3 className="modal__title">Login to Summarist</h3>
          <div className='google__login--wrapper'>
            <Link href="/for-you">
            <button className='guest__login--btn'>
              <figure className='guest__login--icon-wrapper'>
                <IoPersonSharp className='guest__login--icon' />
              </figure>
              Login as Guest
            </button>
            </Link>
          </div>
          <div className='modal__seperator'>
            <hr className='line1 line' /> or <hr className='line2 line' />
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
            <hr className='line1 line' /> or <hr className='line2 line' />
          </div>
          <form onSubmit={handleSubmit} className='modal__form'>
            <input onChange={(event) => setEmail(event.target.value)} className='modal__input' type='email' placeholder='Email Address' />
            <input onChange={(event) => setPassword(event.target.value)} className='modal__input' type='password' placeholder='Password' />
            <button type='submit' className='modal__btn'>Login</button>
          </form>
          <div className='modal__links'>
            <button
              onClick={() => {
                toggleModal("isModalOpen")
                toggleModal("passwordModal")
              }}
              className='modal__link modal__link--password'
            >
              Forgot your password?
            </button>
            <button onClick={() => {
                toggleModal("isModalOpen")
                toggleModal("signupModal")
            }} className='modal__link modal__link--signup'>
              Don't have an account?
            </button>
          </div>
        </div>
      </div>
  )
}

export default Login