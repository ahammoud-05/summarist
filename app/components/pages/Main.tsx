"use client";

import React, { useState } from "react";

import Navbar from "../Navbar";

import Landing from "../main/Landing";

import Features from "../main/Features";

import Reviews from "../main/Reviews";

import Numbers from "../main/Numbers";

import Modal from "../Modal";

const Main = () => {

  const [modalState, setModalState] = useState({

    isModalOpen: false,

    passwordModal: false,

    signupModal: false,

  });

  const toggleModal = (modal: keyof typeof modalState) => {

    setModalState((prev) => ({ ...prev, [modal]: !prev[modal] }));

  };

  return (

    <>

      <Navbar modalState={modalState} toggleModal={toggleModal} />

      <Landing modalState={modalState} toggleModal={toggleModal} />

      <Modal modalState={modalState} toggleModal={toggleModal} />

      <Features />

      <Reviews modalState={modalState} toggleModal={toggleModal} />

      <Numbers />

    </>

  );

};

export default Main;