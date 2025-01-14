"use client"
import { useState } from "react";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Main from "./components/pages/Main";

export default function Home() {

const [modalState, setModalState] = useState({ 
    isModalOpen: false, 
    passwordModal: false, 
    signupModal: false, 
    });

    const toggleModal = (modal: keyof typeof modalState) => { setModalState((prev) => ({ ...prev,// Spread operator to copy the existing state
      [modal]: !prev[modal] // Dynamically toggle the specified modal
      })); };
    

  return (
    <>
    <Main />
    <Footer />
    <Modal modalState={modalState} toggleModal={toggleModal} />
    </>
  );
}
