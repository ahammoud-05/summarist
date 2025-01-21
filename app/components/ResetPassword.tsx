"use client"
import React, { FormEvent, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/init';

type ModalKeys = "signupModal" | "isModalOpen" | "passwordModal";

const ResetPassword = ({ toggleModal, modalState } :{
  toggleModal: (modal: ModalKeys) => void;
  modalState: Record<ModalKeys, boolean>;
}) => {

      const [email, setEmail] = useState<string>('');
      const [message, setMessage] = useState<string | null>(null);
      const [error, setError] = useState<string | null>(null)


      const handleResetPassword = async (event: FormEvent) => {
        event.preventDefault();
        setMessage(null)
        setError(null)

        if (!email) {
          setError("Please enter an email address.")
          return;
        }

        try {
          await sendPasswordResetEmail(auth, email);
          setMessage("Please check your inbox for a password reset link.")
        } catch (error: any) {
          console.log("error to send email", error)
          switch (error.code) {
            case "auth/invalid-email":
              setError("Invalid email.")
              break;

            case "auth/user-not-found":
              setError("No user found.");
              break;

            default:
              setError("An error occured.")
          }
        }
      }

  return (
    <div className={`modal__password ${modalState.passwordModal ? "open" : "closed"}`}>
    <div className='modal__close--wrapper'>
      <button onClick={() => toggleModal("passwordModal")} className='modal__close--btn'>
        <figure className='modal__close--btn-icon-wrapper'>
          <IoClose className='modal__close--btn-icon' />
        </figure>
      </button>
    </div>

    <div className='modal__content--password'>
      <h3 className="modal__title--password">Reset your password</h3>
      {message && <div className="success__message">{message}</div>}
      {error && <div className="error__message">{error}</div>}
      <form onSubmit={handleResetPassword} className='modal__form--password'>
        <input 
        className='modal__input' 
        placeholder='Email address'
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
        <button type='submit' className='modal__btn'>Send reset password link</button>
      </form>
      <button
        onClick={() => {
          toggleModal("passwordModal");
          toggleModal("isModalOpen");
        }}
        className='modal__btn--password-back'
      >
        Go to login
      </button>
    </div>
  </div>
  )
}

export default ResetPassword