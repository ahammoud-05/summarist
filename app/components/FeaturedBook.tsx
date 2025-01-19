"use client"
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { FaPlayCircle } from 'react-icons/fa';

interface FeaturedBook {
  id: string; 
  title: string;
  subTitle: string; 
  author: string;
  duration: string;
  imageLink: string;
}

const FeaturedBook = () => {

    const [featuredBook, setFeaturedBook] = useState<FeaturedBook[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<FeaturedBook[]>('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected')
        setFeaturedBook(res.data)
      } catch(error) {
        return <div>Error fetching book.</div>
      }
    }

    fetchData();
  }, []);

  return (
    <>
        {featuredBook.map((item) => {
        
                  return (
                    <div key={item.id} className="featured__book--wrapper">
                    <div className="fy__title">Selected just for you</div>
                    <div className="featured__book--container">
                  <a href='/book/f9gy1gpai8' className="featured__book">
                  <div className="featured__book--subtitle">
                    {item.subTitle}
                  </div>
                  <div className="featured__book--line"></div>
                  <div className="featured__book--content">
                    <figure className='book__img--wrapper'>
                        <Image width={140} height={140} src={item.imageLink} alt='logo' />
                    </figure>
                    <div className="featured__book--text">
                      <div className="featured__book--title">
                          {item.title}
                      </div>
                      <div className="featured__book--author">
                          {item.author}
                      </div>
                      <div className="featured__book--duration-wrapper">
                        <div className="featured__book--icon">
                        <FaPlayCircle />
                        </div>
                        <div className="featured__book--duration">
                            3 mins 23 secs
                        </div>
                      </div>
                    </div>
                  </div>
                  </a>
                  </div>
                  </div>
                  )
                })}
    </>
  )
}

export default FeaturedBook