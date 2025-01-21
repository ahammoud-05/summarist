import React from 'react';
import Login from './Login';
import ResetPassword from './ResetPassword';
import Signup from './Signup';

type ModalKeys = "signupModal" | "isModalOpen" | "passwordModal";

const Modals = ({ toggleModal, modalState }: {
  toggleModal: (modal: ModalKeys) => void;
  modalState: Record<ModalKeys, boolean>;
}) => {

  const isAnyModalOpen = modalState.isModalOpen || modalState.passwordModal || modalState.signupModal;

  return (
    <>
      {/* Modal Overlay */}
      {isAnyModalOpen && (
        <div
          className="modal__overlay--background"
          onClick={() => {
            if (modalState.isModalOpen) toggleModal("isModalOpen")
            if (modalState.passwordModal) toggleModal("passwordModal")
            if (modalState.signupModal) toggleModal("signupModal")
              console.log("modal clicked")
          }}
        ></div>
      )}

      {/* Login Modal */}
      <Login modalState={modalState} toggleModal={toggleModal} />

      {/* Reset Password Modal */}
     <ResetPassword modalState={modalState} toggleModal={toggleModal} />

      {/* Sign Up Modal */}
      <Signup modalState={modalState} toggleModal={toggleModal} />
    </>
  );
};

export default Modals;
