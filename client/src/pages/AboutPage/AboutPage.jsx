import { useState } from "react";
import "./aboutpage.css";
import Navbar from "../../components/Navbar/Navbar";

//  images array - fill with personal imgs
const images = [
  "/aboutimages/mebennevis.jpg",
  "/aboutimages/cobamayabottom.jpg",
  "/aboutimages/cowholbox.jpg",
  "/aboutimages/cobamayatop.jpg",
];

export default function AboutPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
    <div>
        <Navbar />
    </div>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          tincidunt justo eget ultricies fringilla. Phasellus blandit ipsum
          quis quam ornare mattis.
        </p>
        <p>
          More static text.
        </p>
      </div>
    </div>
    </>
  );
}
