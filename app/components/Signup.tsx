"use client"
import React, { FormEvent, useState } from 'react'
import { IoClose } from "react-icons/io5";
import google from "../assets/google.png";
import Image from 'next/image';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/init';

interface ModalProps {
  modalState: {
    isModalOpen: boolean;
    signupModal: boolean;
  }
  toggleModal: (state: string) => void;
}

const Signup = ({ toggleModal, modalState }: ModalProps) => {

  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      try {
        await createUserWithEmailAndPassword(auth, email, password)
        console.log("Account Created.")
      } catch(error) {
        console.log("Theres an error")
      }
    }

  return (
    <div className={`modal__signup ${modalState.signupModal ? "open" : "closed"}`}>
        <div className='modal__close--wrapper'>
          <button onClick={() => toggleModal("signupModal")} className='modal__close--btn'>
            <figure className='modal__close--btn-icon-wrapper'>
              <IoClose className='modal__close--btn-icon' />
            </figure>
          </button>
        </div>

        <div className='modal__content--signup'>
          <h3 className="modal__title--signup">Sign up to Summarist</h3>
          <div className='google__signup--wrapper'>
            <button className='google__signup--btn'>
              <figure className='google__signup--icon-wrapper'>
                <Image src={google} alt='google' className='google__signup--icon' />
              </figure>
              Signup with Google
            </button>
          </div>
          <div className='modal__seperator'>
            <hr className='line1 line' /> or <hr className='line2 line' />
          </div>
          <form onSubmit={handleSubmit} className='modal__form'>
            <input onChange={(event) => setEmail(event.target.value)} className='modal__input' placeholder='Email address' type='email' />
            <input onChange={(event) => setPassword(event.target.value)} className='modal__input' placeholder='Password' type='password' />
            <button type='submit' className='modal__btn'>Sign Up</button>
          </form>
          <button
            onClick={() => {
              toggleModal("signupModal");
              toggleModal("isModalOpen");
            }}
            className='modal__btn--existing-account modal__link'
          >
            Already have an account?
          </button>
        </div>
      </div>
  )
}

export default Signup