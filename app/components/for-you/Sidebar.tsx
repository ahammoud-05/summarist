import React from 'react'
import logo from "../../assets/logo.png"
import Image from 'next/image'
import { TiHomeOutline } from "react-icons/ti";
import { CiBookmark, CiSettings } from "react-icons/ci";
import { RiBallPenLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { FiHelpCircle } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";

const Sidebar = () => {
  return (
    <div className="sidebar__container">
        <div className="sidebar__content">
            <div className="sidebar__img--wrapper">
                <Image width={160} height={40} src={logo} alt='logo' />
            </div>
            <div className="sidebar__top">
                <a href="/for-you" className="sidebar__link--wrapper">
                    <div className="sidebar__link--line active--tab"></div>
                    <div className="sidebar__icon--wrapper">
                        <TiHomeOutline />
                    </div>
                    <div className="sidebar__link--text">
                        For You
                    </div>
                </a>
                <a href="/for-you" className="sidebar__link--wrapper">
                    <div className="sidebar__link--line"></div>
                    <div className="sidebar__icon--wrapper">
                        <CiBookmark />
                    </div>
                    <div className="sidebar__link--text">
                        My Library
                    </div>
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
            
            </div>
            <div className="sidebar__bottom">
                <a href="/for-you" className="sidebar__link--wrapper">
                    <div className="sidebar__link--line"></div>
                    <div className="sidebar__icon--wrapper">
                        <CiSettings className='settings__icon' />
                    </div>
                    <div className="sidebar__link--text">
                        Settings
                    </div>
                </a>
                <div className="sidebar__link--wrapper sidebar__not-allowed">
                <div className="sidebar__link--line"></div>
                <div className="sidebar__icon--wrapper">
                    <FiHelpCircle />
                </div>
                <div className="sidebar__link--text">Help & Support</div>
            </div>
            <div className="sidebar__link--wrapper">
                <div className="sidebar__link--line"></div>
                <div className="sidebar__icon--wrapper">
                    <LuLogOut />
                </div>
                <div className="sidebar__link--text">Logout</div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar