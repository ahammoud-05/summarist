"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Landing from "../components/Landing";
import Features from "../components/Features";
import Reviews from "../components/Reviews";
import Numbers from "../components/Numbers";
import Modals from "../components/Modals";

type ModalKeys = "isModalOpen" | "passwordModal" | "signupModal";

const Main = () => {

  const [modalState, setModalState] = useState<Record<ModalKeys, boolean>>({
    isModalOpen: false,
    passwordModal: false,
    signupModal: false,
  });

  const toggleModal = (modal: ModalKeys) => { setModalState((prev) => ({ ...prev,
    [modal]: !prev[modal] 
    })); };


  return (

    <>
      <Navbar modalState={modalState} toggleModal={toggleModal} />
      <Landing modalState={modalState} toggleModal={toggleModal} />
      <Modals modalState={modalState} toggleModal={toggleModal} />
      <Features />
      <Reviews modalState={modalState} toggleModal={toggleModal} />
      <Numbers />
    </>

  );

};

export default Main;