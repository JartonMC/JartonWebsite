"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import { useState } from "react";

import { data } from "../data";

import styles from "../Home.module.css";
import "swiper/css";

const Cards = () => {
  const [cards] = useState([...data.cards, ...data.cards, ...data.cards]);

  return (
    <div className={styles.home_cards}>
      <Swiper
        modules={[Autoplay, A11y]}
        spaceBetween={50}
        centeredSlides={true}
        centeredSlidesBounds={true}
        slidesPerView={"auto"}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={1000}
        className={styles.home_cards_swiper}
        wrapperClass={styles.home_cards_swiper_wrapper}
      >
        {cards.map((card, index) => {
          const isLink = typeof card.link === "string" && card.link.length > 0;

          return (
            <SwiperSlide
              className={`${styles.home_cards_swiper_slide} ${
                isLink ? styles.home_cards_swiper_slide_clickable : ""
              }`}
              key={index}
            >
              {isLink ? (
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.home_cards_swiper_slide_link}
                >
                  <span className={styles.home_cards_swiper_slide_title}>
                    {card.title}
                  </span>

                  <pre className={styles.home_cards_swiper_slide_description}>
                    {card.description}
                  </pre>

                  <span className={styles.home_cards_swiper_slide_cta}>
                    {card.linkText || "View Changelog"}
                  </span>
                </a>
              ) : (
                <>
                  <span className={styles.home_cards_swiper_slide_title}>
                    {card.title}
                  </span>

                  <pre className={styles.home_cards_swiper_slide_description}>
                    {card.description}
                  </pre>
                </>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Cards;
