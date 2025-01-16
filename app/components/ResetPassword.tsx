import React from 'react'
import { IoClose } from 'react-icons/io5';

interface ModalProps {
  modalState: {
    isModalOpen: boolean;
    passwordModal: boolean;
    signupModal: boolean;
  }
  toggleModal: (state: string) => void;
}

const ResetPassword = ({ toggleModal, modalState }: ModalProps) => {
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
      <form className='modal__form--password'>
        <input className='modal__input' placeholder='Email address' />
        <button className='modal__btn'>Send reset password link</button>
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