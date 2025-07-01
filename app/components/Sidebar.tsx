"use client";
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import Image from "next/image";
import { TiHomeOutline } from "react-icons/ti";
import { CiBookmark, CiSettings } from "react-icons/ci";
import { RiBallPenLine, RiFontSize } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { FiHelpCircle } from "react-icons/fi";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { auth } from "../firebase/init";

type ModalKeys = "signupModal" | "isModalOpen" | "passwordModal";


const Sidebar = ({
  toggleModal,
  modalState,
  isSidebarOpen,
  fontSize = 16,
  onFontSizeChange = () => {},
  toggleSidebar,
}: {
  toggleModal: (modal: ModalKeys) => void;
  modalState: Record<ModalKeys, boolean>;
  isSidebarOpen: boolean;
  fontSize?: number;
  onFontSizeChange?: (size: number) => void;
  toggleSidebar: () => void;
}) => {

  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!auth.currentUser);


  useEffect(() => {
    const logOut = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);

      if (user && modalState.isModalOpen) {
        toggleModal("isModalOpen")
      }
    })

    return () => logOut();
  }, [modalState, toggleModal]);

  const handleLogOut = async () => {
        try {
          await auth.signOut();
          console.log("Signed out.")
        } catch(error) {
          console.log("Theres an error")
        }
      }


  return (
    <>
    <div className={`sidebar__container ${ isSidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar__content">
        <div className="sidebar__img--wrapper">
          <Image width={160} height={40} src={logo} alt="logo" />
        </div>
        <div className="sidebar__top">
          <a href="/for-you" className="sidebar__link--wrapper sidebar__hover">
            <div
              className={`sidebar__link--line ${
                pathname === "/for-you" ? "active--tab" : ""
              }`}
            ></div>
            <div className="sidebar__icon--wrapper">
              <TiHomeOutline />
            </div>
            <div className="sidebar__link--text">For You</div>
          </a>
          <a href="" className="sidebar__link--wrapper sidebar__not-allowed">
            <div
              className={`sidebar__link--line ${
                pathname === "/library" ? "active--tab" : ""
              }`}
            ></div>
            <div className="sidebar__icon--wrapper">
              <CiBookmark />
            </div>
            <div className="sidebar__link--text">My Library</div>
          </a>

          <div className="sidebar__link--wrapper sidebar__not-allowed">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <RiBallPenLine />
            </div>
            <div className="sidebar__link--text">Highlights</div>
          </div>
          <div className="sidebar__link--wrapper sidebar__not-allowed">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <IoSearchOutline />
            </div>
            <div className="sidebar__link--text">Search</div>
          </div>
          {pathname.startsWith("/player/") && (
            <div className="sidebar__link--wrapper sidebar__font--size-wrapper">
              {[16, 20, 24, 28].map((size) => (
                <div
                  key={size}
                  className={`sidebar__link--text sidebar__font--size-icon ${
                    fontSize === size ? "sidebar__font--size-icon--active" : ""
                  }`}
                  onClick={() => onFontSizeChange(size)}
                >
                  <RiFontSize size={size} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="sidebar__bottom">
          <a href="/settings" className="sidebar__link--wrapper sidebar__hover">
            <div className={`sidebar__link--line ${
                pathname === "/settings" ? "active--tab" : ""
              }`}></div>
            <div className="sidebar__icon--wrapper">
              <CiSettings className="settings__icon" />
            </div>
            <div className="sidebar__link--text">Settings</div>
          </a>
          <div className="sidebar__link--wrapper sidebar__not-allowed">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <FiHelpCircle />
            </div>
            <div className="sidebar__link--text">Help & Support</div>
          </div>
              {isLoggedIn ? 
              <div onClick={handleLogOut} className="sidebar__link--wrapper sidebar__hover">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <LuLogOut />
            </div>
            <div className="sidebar__link--text">Logout</div>
          </div>
          :
          <div onClick={() => toggleModal("isModalOpen")} className="sidebar__link--wrapper sidebar__hover">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <LuLogIn />
            </div>
            <div className="sidebar__link--text">Login</div>
          </div>
          }
          

        </div>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
