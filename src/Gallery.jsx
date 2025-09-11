import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Gallery = ({ images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0 for initial, 1 for next, -1 for prev

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative flex justify-center items-center w-full max-w-lg mx-auto py-8">
      {/* Container for the main image and dimmed previews */}
      <div className="relative w-full aspect-square flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          {/* Main Image */}
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 200 }} // Slide in from current direction
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 200 }} // Slide out in opposite direction
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 group overflow-hidden rounded-lg shadow-lg"
            onClick={() => onImageClick(currentIndex)}
          >
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
              <p className="text-white text-sm text-center">
                {images[currentIndex].alt}
              </p>
            </div>
          </motion.div>

          {/* Dimmed Previous Image Preview */}
          <motion.div
            key={`prev-${currentIndex}`} // Unique key to avoid re-rendering issues
            initial={{ opacity: 0, x: -300 }} // Start further left
            animate={{ opacity: 1, x: -80 }} // Move into visible range
            exit={{ opacity: 0, x: -direction * 100 }} // Exit to the direction of next/prev button
            transition={{ duration: 0.5 }}
            className="absolute left-0 -ml-16 w-1/4 h-1/4 rounded-lg overflow-hidden cursor-pointer z-10" // Increased negative margin
            onClick={handlePrev}
          >
              <img 
                  src={images[(currentIndex - 1 + images.length) % images.length].src}
                  className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60"></div>
          </motion.div>

          {/* Dimmed Next Image Preview */}
          <motion.div
            key={`next-${currentIndex}`} // Unique key
            initial={{ opacity: 0, x: 300 }} // Start further right
            animate={{ opacity: 1, x: 80 }} // Move into visible range
            exit={{ opacity: 0, x: -direction * 100 }} // Exit to the direction of next/prev button
            transition={{ duration: 0.5 }}
            className="absolute right-0 -mr-16 w-1/4 h-1/4 rounded-lg overflow-hidden cursor-pointer z-10" // Increased negative margin
            onClick={handleNext}
          >
              <img 
                  src={images[(currentIndex + 1) % images.length].src}
                  className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Magic Buttons */}
      <motion.button
        onClick={handlePrev}
        className="absolute -left-20 z-20 p-2 rounded-full text-white transition-all duration-300 hover:scale-110" // Adjusted left position
        aria-label="Previous image"
        whileHover={{
            scale: 1.1,
            boxShadow: "0 0 10px #6366f1, 0 0 20px #6366f1, 0 0 30px #6366f1",
            transition: { duration: 0.2, type: "spring", stiffness: 300 }
        }}
        >
        <ChevronLeft size={36} className="text-indigo-400" />
      </motion.button>
      <motion.button
        onClick={handleNext}
        className="absolute -right-20 z-20 p-2 rounded-full text-white transition-all duration-300 hover:scale-110" // Adjusted right position
        aria-label="Next image"
        whileHover={{
            scale: 1.1,
            boxShadow: "0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 30px #ec4899",
            transition: { duration: 0.2, type: "spring", stiffness: 300 }
        }}
        >
        <ChevronRight size={36} className="text-pink-400" />
      </motion.button>
    </div>
  );
};

export default Gallery;