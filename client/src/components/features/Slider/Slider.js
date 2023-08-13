import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from './Slider.module.scss';
import Button from 'react-bootstrap/Button';
import img1 from './1.jpg'
import img2 from './2.jpg'
import img3 from './3.jpg'
import { useState } from 'react';
const Slider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const slideTexts = [
        {
            title: "Moda Streetwear",
            description: "Najnowsze trendy ulicznej mody.",
            actionText: "Sprawdź już teraz!"
        },
        {
            title: "Nowości sezonu",
            description: "Odkryj najnowsze kolekcje.",
            actionText: "Zobacz kolekcję!"
        },
        {
            title: "Przeceny",
            description: "Najlepsze okazje w jednym miejscu.",
            actionText: "Przejrzyj oferty!"
        }
    ];
    return (
        <div className='d-flex justify-space-between bg-warning mt-2'>
        <Carousel className={styles.carousel} activeIndex={activeIndex} onSelect={(index) => setActiveIndex(index)}>
            <Carousel.Item>
                <img
                    className="d-block w-100 "
                    src={img1}
                    alt="T-shirt"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img2}
                    alt="Lenses"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img3}
                    alt="Accessories"
                />
            </Carousel.Item>
        </Carousel>
        <div className={styles.textContainer}>
        <h2 className='mb-5'>{slideTexts[activeIndex].title}</h2>
    <p >{slideTexts[activeIndex].description}</p>
    <span className={styles.actionText}>{slideTexts[activeIndex].actionText}</span>
            </div>
        </div>

    )
}

export default Slider;