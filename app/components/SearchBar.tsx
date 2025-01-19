"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiClock2 } from "react-icons/ci";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";

interface Books {
  id: string;
  title: string;
  subTitle: string;
  author: string;
  duration: string;
  imageLink: string;
  audioLink: string;
}

const SearchBar = () => {
  const router = useRouter();
  const { id } = useParams();

  const [books, setBooks] = useState<Books[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [durations, setDurations] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      if (search.trim() === "") {
        setBooks([]);
        return;
      }

      try {
        const res = await axios.get<Books[]>(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`
        );
        setBooks(res.data);
        res.data.forEach((book: Books) => {
          const audio = new Audio(book.audioLink);
          audio.addEventListener("loadedmetadata", () => {
            const duration = formatDuration(audio.duration);
            setDurations((prev) => ({ ...prev, [book.id]: duration }));
          });
        });
      } catch (error) {
        console.log(error);
      }
    };

    const debounce = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(debounce);
  }, [search]);

  const formatDuration = (durationSeconds: number): string => {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleClearSearch = () => {
    setSearch("");
    setBooks([]);
  };

  return (
    <>
      <nav>
        <div className="search__wrapper">
          <div className="search__content">
            <div className="search">
              <div className="search__input--wrapper">
                <input
                  type="text"
                  placeholder="Search for books"
                  className="search__input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div
                  className="search__icon"
                  onClick={search.trim() !== "" ? handleClearSearch : undefined}
                >
                  {search.trim() === "" ? (
                    <IoSearchOutline />
                  ) : (
                    <IoCloseOutline />
                  )}
                </div>
              </div>
            </div>
          </div>
          {search.trim() !== "" && books.length > 0 && (
            <div className="search__books--wrapper">
              {books.map((book) => {
                return (
                  <a href={`/book/${book.id}`} className="search__book--link">
                    <figure className="search__book--img-wrapper">
                      <img
                        src={book.imageLink}
                        alt=""
                        className="search__book--img"
                      />
                    </figure>
                    <div>
                      <div className="search__book--title">{book.title}</div>
                      <div className="search__book--author">{book.author}</div>
                      <div className="search__book--duration">
                        <div className="rb__details">
                          <div className="rb__details--icon">
                            <CiClock2 />
                          </div>
                          <div className="rb__details--text">
                            {durations[book.id] || "Loading..."}
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default SearchBar;