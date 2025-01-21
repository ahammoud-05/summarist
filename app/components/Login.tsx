"use client"
import React, { FormEvent, useState } from 'react'
import { IoClose, IoPersonSharp } from "react-icons/io5";
import google from "../assets/google.png";
import Image from 'next/image';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/init'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ImSpinner8 } from 'react-icons/im';

type ModalKeys = "signupModal" | "isModalOpen" | "passwordModal";

const Login = ({ modalState, toggleModal }: {
  toggleModal: (modal: ModalKeys | string) => void;
  modalState: Record<ModalKeys, boolean>;
}) => {

  const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
        setIsLoading(true)
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
      } finally {
        setIsLoading(false)
      }
    }

  return (
    <>
    <div className={`modal__login ${modalState.isModalOpen ? "open" : "closed"}`}>
        <div className='modal__close--wrapper'>
          <button onClick={() => toggleModal("isModalOpen")} className='modal__close--btn'>
            <figure className='modal__close--btn-icon-wrapper'>
              <IoClose className='modal__close--btn-icon' />
            </figure>
          </button>
        </div>

        <div className='modal__content'>
          {error && <div className='error__message'>{error}</div>}
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
            <button onClick={handleGoogleLogin} className='google__login--btn'>
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
            <button type='submit' className='modal__btn'>
              {isLoading ? (
                <div className="button__spinner">
                <ImSpinner8 />
                </div>
              ) : "Login"}
            </button>
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
    </>
  )
}

export default Login