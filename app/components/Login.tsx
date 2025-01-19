"use client"
import React, { FormEvent, useState } from 'react'
import { IoClose, IoPersonSharp } from "react-icons/io5";
import google from "../assets/google.png";
import Image from 'next/image';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/init'
import { useRouter } from 'next/navigation';

interface ModalProps {
  modalState: {
    isModalOpen: boolean;
    passwordModal: boolean;
    signupModal: boolean;
  };
  toggleModal: (modal: keyof ModalProps["modalState"]) => void;
}

const Login = ( { modalState, toggleModal }: ModalProps) => {

  const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null)

    const handleGoogleLogin = async () => {
      const provider = new GoogleAuthProvider();

      try {
        await signInWithPopup(auth, provider);
        console.log("logged in w google")
        router.push("/for-you")
      } catch (error) {
        console.log("error", error)
      }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setError(null)

      if (!email || !password) {
        setError("Email and password are required.")
        return;
      }

      if (password.length < 6) {
        setError("Password should be a minimum of 6 characters.")
        return;
      }

      try {
        await signInWithEmailAndPassword(auth, email, password)
        console.log("logged in!")
        router.push("/for-you")
      } catch(error: any) {
        console.log(error)
        
        switch(error.code) {
          case "auth/user-not-found":
            setError("There is no user associated with this email.")
            break;

          case "auth/wrong-password":
            setError("Invalid password.")
            break;

          case "auth/invalid-email": 
            setError("Invalid email.")
            break;

          default:
            setError("An error occured.")
        }
        console.log("Theres an error.")
      }
    }

  return (
    <>
      
      <div className={`modal__wrapper ${modalState.isModalOpen ? "open" : "closed"}`}>
        <div className="modal">
          <div className="modal__content">
            <div className="modal__title">Log in to Summarist</div>
            {error && <div className='error__message'>{error}</div>}
            <button className="btn guest__btn--wrapper">
              <figure className="google__icon--mask guest__icon--mask">
                <IoPersonSharp />
              </figure>
              <div>Login as a Guest</div>
            </button>
            <div className="modal__seperator">
              <span className="modal__seperator--text">or</span>
            </div>
            <button onClick={handleGoogleLogin} className="btn google__btn--wrapper">
              <figure className="google__icon--mask">
                <Image src={google} alt='google-logo' />
              </figure>
              <div>Login with google</div>
            </button>
            <div className="modal__seperator">
              <span className="modal__seperator--text">or</span>
            </div>
            <form onSubmit={handleSubmit} className="modal__login--form">
              <input onChange={(event) => setEmail(event.target.value)} type='email' placeholder='Email address' className="modal__login--input">
              </input>
              <input onChange={(event) => setPassword(event.target.value)} type='password' placeholder='password' className="modal__login--input">
              </input>
              <button type='submit' className="btn">
                <span>Login</span>
              </button>
            </form>
          </div>
          <div onClick={() => {
            toggleModal("passwordModal")
            toggleModal("isModalOpen")
            }} className="modal__forgot--password">Forgot your password?</div>
          <button onClick={() => {
            toggleModal("signupModal")
            toggleModal("isModalOpen")
          }} className="modal__account--btn">Don't have an account?</button>
          <div onClick={() => toggleModal("isModalOpen")} className="modal__close--btn">
            <IoClose />
          </div>
        </div>
      </div>
    </>
  )
}

export default Login