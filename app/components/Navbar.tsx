import Image from 'next/image'
import logo from '../assets/logo.png'

type ModalKeys = "isModalOpen" | "passwordModal" | "signupModal";

const Navbar = ({ toggleModal, modalState }: {
  toggleModal: (modal: ModalKeys) => void;
  modalState: Record<ModalKeys, boolean>;
}) => {

  return (
    <>
    <nav className="nav">
    <div className="nav__wrapper">
      <figure className="nav__img--mask">
        <Image className="nav__img" src={logo} alt="logo" />
      </figure>
      <ul className="nav__list--wrapper">
        <li className="nav__list nav__list--login" onClick={() => toggleModal("isModalOpen")}>Login</li>
        <li className="nav__list nav__list--mobile">About</li>
        <li className="nav__list nav__list--mobile">Contact</li>
        <li className="nav__list nav__list--mobile">Help</li>
      </ul>
    </div>
  </nav>
  </>
  )
}

export default Navbar