"use client"
import { useState } from "react";
import Footer from "./components/Footer";
import Modals from "./components/Modals";
import Main from "./main/page";

type ModalKeys = "signupModal" | "isModalOpen" | "passwordModal";

export default function Home() {

const [modalState, setModalState] = useState<Record<ModalKeys, boolean>>({ 
    isModalOpen: false, 
    passwordModal: false, 
    signupModal: false, 
    });

    const toggleModal = (modal: ModalKeys) => {
      setModalState((prev) => ({ ...prev, [modal]: !prev[modal] }));
    };

    
  return (
    <>
    <Main />
    <Footer />
    <Modals modalState={modalState} toggleModal={toggleModal} />
    </>
  );
}
