import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const images = [
  "/imagegrid/image1.avif",
  "/imagegrid/image2.avif",
  "/imagegrid/image3.avif",
  "/imagegrid/image4.avif",
  "/imagegrid/image5.avif",
  "/imagegrid/image6.avif",
  "/imagegrid/image7.avif",
  "/imagegrid/image8.avif",
  "/imagegrid/image9.jpg",
];

// Fisher-Yates Shuffle Algorithm
const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const AuthImagePattern = ({ title, subtitle }) => {
  const [gridImages, setGridImages] = useState(images);

  useEffect(() => {
    const interval = setInterval(() => {
      setGridImages((prevImages) => shuffleArray(prevImages));
    }, 2000); // Shuffle every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        {/* Image Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {gridImages.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={`Grid item ${i}`}
              className={`aspect-square rounded-2xl object-cover ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>

        {/* Title and Subtitle */}
        <h2 className="text-3xl font-extrabold text-primary mb-4">{title}</h2>
        <p className="text-lg text-base-content/80">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
