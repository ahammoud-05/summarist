import Image from 'next/image'
import logo from '../assets/logo.png'

interface ModalProps {
  modalState: {
    isModalOpen: boolean;
  }
  toggleModal: (state: string) => void;
}

const Navbar = ({ toggleModal }: ModalProps) => {
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