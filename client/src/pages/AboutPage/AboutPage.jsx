import { useState, useEffect } from "react";
import "./aboutpage.css";
import Navbar from "../../components/Navbar/Navbar";

const images = [
  "/aboutimages/mebennevis.jpg",
  "/aboutimages/cobamayabottom.jpg",
  "/aboutimages/cowholbox.jpg",
  "/aboutimages/cobamayatop.jpg",
];

export default function AboutPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Navbar />

      <div className="about-container">
        <div className="carousel-container">
          <button className="arrow left" onClick={prevSlide}>
            &#10094;
          </button>

          <div className="carousel">
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="carousel-image"
            />
          </div>

          <button className="arrow right" onClick={nextSlide}>
            &#10095;
          </button>
        </div>

        <div className="text-container">
          <h2>About Wonder</h2>
          <p>
            Wonder is a digital scrapbook for adventurers who want to capture
            their travels and experiences in one place. Add your photos, jot
            down memories, and organize your journey exactly the way you want.
          </p>
          <h2>Why I Created Wonder</h2>
          <p>
            Traveling is more than just the places you visit—it's the stories,
            the people, and the moments that make it unforgettable. Wonder
            gives you a platform to cherish every memory and keep your journey
            alive forever. It gives you a place to inspire others with your
            travel tips, make friends, or get ideas for your next adventure.
          </p>
        </div>
      </div>
    </>
  );
}
