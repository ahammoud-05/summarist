"use client"
import React, { FormEvent, useState } from 'react'
import { IoClose } from "react-icons/io5";
import google from "../assets/google.png";
import Image from 'next/image';
import { 
  createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/init';
import { useRouter } from 'next/navigation';

interface ModalProps {
  modalState: {
    isModalOpen: boolean;
    signupModal: boolean;
  }
  toggleModal: (state: string) => void;
}

const Signup = ({ toggleModal, modalState }: ModalProps) => {

  const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null)

  const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
  
        try {
          await signInWithPopup(auth, provider);
          router.push("/for-you")
        } catch (error) {
          console.log("error", error)
        }
      }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setError(null)

      if (!email || !password) {
        setError("Email and password are required.");
        return;
      }

      if (password.length < 6) {
        setError("Password should be a minimum of 6 characters.")
        return;
      }

      try {
        await createUserWithEmailAndPassword(auth, email, password)
        console.log("Account Created.")
        router.push("/for-you")
      } catch(error) {
        console.log("Theres an error")

        switch(error.code) {
          case "auth/invalid-email":
            setError("Invalid Email.")
            break;

          case "auth/email-already-in-use":
            setError("There is already an user associated with this email.")
            break;

          default: 
          setError("An error occured.");
          break;
        }
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
          {error && <div className='error__message'>{error}</div>}
          <div className='google__signup--wrapper'>
            <button onClick={handleGoogleLogin} className='google__signup--btn'>
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