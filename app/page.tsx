"use client"
import { useState } from "react";
import Footer from "./components/Footer";
import Modals from "./components/Modals";
import Main from "./main/page";
import ForYou from "./for-you/page";

export default function Home() {

const [modalState, setModalState] = useState({ 
    isModalOpen: false, 
    passwordModal: false, 
    signupModal: false, 
    });

    const toggleModal = (modal: keyof typeof modalState) => { setModalState((prev) => ({ ...prev,
      [modal]: !prev[modal] 
      })); };
    
  return (
    <>
    <Main />
    <ForYou />
    <Footer />
    <Modals modalState={modalState} toggleModal={toggleModal} />
    </>
  );
}
