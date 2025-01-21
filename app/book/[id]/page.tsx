"use client";
import Modals from "@/app/components/Modals";
import SearchBar from "@/app/components/SearchBar";
import Sidebar from "@/app/components/Sidebar";
import Skeleton from "@/app/components/Skeleton";
import { auth } from "@/app/firebase/init";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiBookmark, CiClock2 } from "react-icons/ci";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoStarOutline } from "react-icons/io5";
import { MdMenuBook } from "react-icons/md";
import { TiMicrophoneOutline } from "react-icons/ti";

interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

type ModalKeys = "isModalOpen" | "passwordModal" | "signupModal";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Book>(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
        setBook(res.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        return <div>Error fetching book.</div>;
      }
    };

    fetchData();
  }, [id]);

  const [modalState, setModalState] = useState<Record<ModalKeys, boolean>>({
    isModalOpen: false,
    passwordModal: false,
    signupModal: false,
  });

  const toggleModal = (modal: ModalKeys) => {
    setModalState((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const logOut = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);

      if (user && modalState.isModalOpen) {
        toggleModal("isModalOpen");
      }
    });

    return () => logOut();
  }, [modalState, toggleModal]);

  return (
    <>
      <div className="fy__content--wrapper">
        <SearchBar toggleSidebar={toggleSidebar} />
        <Modals toggleModal={toggleModal} modalState={modalState} />
        <Sidebar
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          modalState={modalState}
          toggleModal={toggleModal}
        />
        <div className="row">
          <div className="container">
            <div className="inner__wrapper">
              <div className="inner__book">
                {isLoading ? (
                  <Skeleton width="100%" height="40px" borderRadius="4px" />
                ) : (
                  <div className="inner__book--title">{book?.title}</div>
                )}
                {isLoading ? (
                  <Skeleton width="50%" height="40px" borderRadius="4px" />
                ) : (
                  <div className="inner__book--author">{book?.author}</div>
                )}
                {isLoading ? (
                  <Skeleton width="70%" height="40px" borderRadius="4px" />
                ) : (
                  <div className="inner__book--subtitle">{book?.subTitle}</div>
                )}
                <div className="inner__book--wrapper">
                  <div className="inner__book--desc-wrapper">
                    {isLoading ? (
                      <Skeleton width="50%" height="80px" borderRadius="4px" />
                    ) : (
                      <>
                        <div className="inner__book--desc">
                          <div className="inner__book--icon">
                            <IoStarOutline className="inner__book--icon" />
                          </div>
                          <div className="inner__book--overall-rating">
                            {book?.averageRating}
                          </div>
                          <div className="inner__book--total-rating">
                            ( {book?.totalRating} )
                          </div>
                        </div>
                        <div className="inner__book--desc">
                          <div className="inner__book--icon">
                            <CiClock2 className="inner__book--icon" />
                          </div>
                          <div className="inner__book--duration">03:24</div>
                        </div>
                        <div className="inner__book--desc">
                          <div className="inner__book--icon">
                            <TiMicrophoneOutline className="inner__book--icon" />
                          </div>
                          <div className="inner__book--type">{book?.type}</div>
                        </div>
                        <div className="inner__book--desc">
                          <div className="inner__book--icon">
                            <HiOutlineLightBulb className="inner__book--icon" />
                          </div>
                          <div className="inner__book--key-ideas">
                            {book?.keyIdeas} Key ideas
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {isLoading ? (
                  <Skeleton width="50%" height="20px" borderRadius="4px" />
                ) : (
                  <div className="inner__book--btn-wrapper">
                    {isLoggedIn ? (
                      book?.subscriptionRequired ? (
                        <Link href="/choose-plan">
                          <button className="inner__book--btn">
                            <div className="inner__book--btn-icon">
                              <MdMenuBook className="inner__book--icon" />
                            </div>
                            <div className="inner__book--btn-text">Read</div>
                          </button>
                        </Link>
                      ) : (
                        <Link href={`/player/${book?.id}`}>
                          <button className="inner__book--btn">
                            <div className="inner__book--btn-icon">
                              <MdMenuBook className="inner__book--icon" />
                            </div>
                            <div className="inner__book--btn-text">Read</div>
                          </button>
                        </Link>
                      )
                    ) : (
                      <button
                        onClick={() => toggleModal("isModalOpen")}
                        className="inner__book--btn"
                      >
                        <div className="inner__book--btn-icon">
                          <MdMenuBook className="inner__book--icon" />
                        </div>
                        <div className="inner__book--btn-text">Read</div>
                      </button>
                    )}
                    {isLoggedIn ? (
                      book?.subscriptionRequired ? (
                        <Link href="/choose-plan">
                          <button className="inner__book--btn">
                            <div className="inner__book--btn-icon">
                              <TiMicrophoneOutline className="inner__book--icon" />
                            </div>
                            <div className="inner__book--btn-text">Listen</div>
                          </button>
                        </Link>
                      ) : (
                        <Link href={`/player/${book?.id}`}>
                          <button className="inner__book--btn">
                            <div className="inner__book--btn-icon">
                              <TiMicrophoneOutline className="inner__book--icon" />
                            </div>
                            <div className="inner__book--btn-text">Listen</div>
                          </button>
                        </Link>
                      )
                    ) : (
                      <button
                        onClick={() => toggleModal("isModalOpen")}
                        className="inner__book--btn"
                      >
                        <div className="inner__book--btn-icon">
                          <TiMicrophoneOutline className="inner__book--icon" />
                        </div>
                        <div className="inner__book--btn-text">Listen</div>
                      </button>
                    )}
                  </div>
                )}

                {isLoading ? null : (
                  <div className="inner__book--bookmark">
                    <div className="inner__book--bookmark-icon">
                      <CiBookmark className="bookmark__icon" />
                    </div>
                    <div className="inner__book--bookmark-text not-allowed">
                      Add title to My Library
                    </div>
                  </div>
                )}
                <div className="inner__book--secondary-title">
                  {isLoading ? (
                    <Skeleton width="50%" height="20px" borderRadius="4px" />
                  ) : (
                    <div className="inner__book--secondary-title">
                      What's it about?
                    </div>
                  )}
                </div>
                {isLoading ? (
                  <Skeleton width="100%" height="100%" borderRadius="4px" />
                ) : (
                  <>
                    <div className="inner__book--tags-wrapper">
                      {book?.tags.map((tag, index) => (
                        <div key={index} className="inner__book--tag">
                          {tag}
                        </div>
                      ))}
                    </div>
                    <div className="inner__book--book-desc">
                      {book?.bookDescription}
                    </div>
                    <div className="inner__book--secondary-title">
                      About the author
                    </div>
                    <div className="inner__book--author-desc">
                      {book?.authorDescription}
                    </div>
                  </>
                )}
              </div>
              <div className="inner__book--img-wrapper">
                <figure className="selected-book__img--wrapper">
                  {isLoading ? (
                    <Skeleton width="100%" height="100%" borderRadius="4px" />
                  ) : (
                    <img
                      className="selected-book__img"
                      src={book?.imageLink}
                    ></img>
                  )}
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
