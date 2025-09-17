import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import useSound from "./hooks/useSound";

const Lightbox = ({ images, currentIndex, onClose, onNavigate }) => {
  const image = images[currentIndex];
  const playClickSound = useSound(`${import.meta.env.BASE_URL}click.wav`);

  const handlePrev = (e) => {
    e.stopPropagation();
    playClickSound();
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    playClickSound();
    onNavigate((currentIndex + 1) % images.length);
  };

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-[90%] max-h-[90%]"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking the image
          >
            <img
              src={image.src}
              alt={image.alt}
              className="rounded-lg shadow-2xl max-w-full max-h-full"
            />
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/90 text-sm md:text-base font-light px-4 py-2 bg-black/40 rounded-full">
              {image.alt}
            </p>
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors"
              aria-label="Close image"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={28} />
            </motion.button>
            <motion.button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-indigo-400 transition-colors"
              aria-label="Previous image"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={40} />
            </motion.button>
            <motion.button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-indigo-400 transition-colors"
              aria-label="Next image"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={40} />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;