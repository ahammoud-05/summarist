"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import { auth } from "../firebase/init";
import Modals from "../components/Modals";
import Link from "next/link";
import Image from "next/image";
import login from "../assets/login.png";
import Skeleton from "../components/Skeleton";

type ModalKeys = "isModalOpen" | "passwordModal" | "signupModal";

const Settings = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [modalState, setModalState] = useState<Record<ModalKeys, boolean>>({
    isModalOpen: false,
    passwordModal: false,
    signupModal: false,
  });

  const toggleModal = (modal: keyof typeof modalState) => { setModalState((prev) => ({ ...prev,
    [modal]: !prev[modal] 
    })); };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const loggedIn = auth.onAuthStateChanged((user) => {
      if (user && user.email) {
        setIsLoggedIn(true);
        setUserEmail(user.email);
      } else {
        setIsLoggedIn(false);
        setUserEmail(null);
      }
      setIsLoading(false);
    });
  
    return () => loggedIn();
  }, [modalState, toggleModal]);

  return (
    <>
      <div className="fy__content--wrapper">
      <SearchBar 
      toggleSidebar={toggleSidebar}
      />
        <Sidebar
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          modalState={modalState}
          toggleModal={toggleModal}
        />
        <div className="container">
          <div className="row">
            <div className="section__title page__title">Settings</div>

            {isLoading ? (
              <>
                <div className="setting__content">
                  <Skeleton width="150px" height="20px" borderRadius="4px" />
                  <Skeleton width="100px" height="20px" borderRadius="4px" />
                </div>
                <div className="setting__content">
                  <Skeleton width="150px" height="20px" borderRadius="4px" />
                  <Skeleton width="100px" height="20px" borderRadius="4px" />
                </div>
              </>
            ) : isLoggedIn ? (
              <>
                <div className="setting__content">
                  <div className="settings__subtitle">
                    Your Subscription Plan
                  </div>
                  <div className="settings__text">Basic</div>
                  <Link href="/choose-plan" className="btn settings__upgrade--btn">
                    Upgrade to Premium
                  </Link>
                </div>
                <div className="setting__content">
                  <div className="settings__subtitle">Email</div>
                  <div className="settings__text">
                    {userEmail || "guest@gmail.com"}
                  </div>
                </div>
              </>
            ) : (
              <div className="settings__login--wrapper">
                <Image
                  className="settings__login--img"
                  src={login}
                  alt="login-img"
                />
                <div className="settings__login--text">
                  Log in to your account to see your details.
                </div>
                <div
                  onClick={() => toggleModal("isModalOpen")}
                  className="btn settings__login--btn"
                >
                  Login
                </div>
              </div>
            )}
          </div>
        </div>
        <Modals toggleModal={toggleModal} modalState={modalState} />
      </div>
    </>
  );
};

export default Settings;
