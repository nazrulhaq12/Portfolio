import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Square, Minus, X } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import useSound from './hooks/useSound';

// Variant for the main image animation
const mainImageVariants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const Gallery = ({ images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = forward, -1 = backward
  const playClickSound = useSound(`${import.meta.env.BASE_URL}click.mp3`);

  const paginate = (newDirection) => {
    playClickSound();
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + newDirection;
      if (newIndex < 0) {
        return images.length - 1;
      } else if (newIndex >= images.length) {
        return 0;
      }
      return newIndex;
    });
  };

  const codeSnippets = [
    `class Developer extends Human {
  constructor(name, skills) {
    super(name);
    this.skills = skills;
  }
}`,
    `// Fetching project data from API
fetch('https://api.github.com/users/nazrulhaq12/repos')
  .then(response => response.json())
  .then(data => console.log(data));`,
    `function solveProblem(problem) {
  const solution = findSolution(problem);
  return solution.isOptimal ? solution : refactor(solution);
}`,
  ];

  const currentCode = codeSnippets[currentIndex % codeSnippets.length];

  return (
    <div className="relative w-full max-w-4xl mx-auto py-8 text-emerald-400 font-mono">
      {/* Terminal Frame */}
      <div className="bg-slate-950 rounded-lg shadow-xl border border-emerald-500/30 overflow-hidden terminal-frame">
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-2 bg-slate-900 border-b border-emerald-500/30">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm">root@portfolio:~/gallery</span>
          <div className="flex items-center gap-2">
            <Minus size={16} className="text-slate-500" />
            <Square size={16} className="text-slate-500" />
            <X size={16} className="text-slate-500" />
          </div>
        </div>

        {/* Dynamic Text / Status Line */}
        <div className="text-sm p-4 h-6 mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typewriter
                words={[`> ACCESSING PHOTO ${currentIndex + 1}/${images.length}...`]}
                loop={1}
                typeSpeed={20}
                cursor={true}
                cursorStyle="_"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Main Image Container */}
        <div className="relative w-full aspect-video flex items-center justify-center px-8">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 group overflow-hidden rounded-lg shadow-lg border border-emerald-500/30"
              onClick={() => { onImageClick(currentIndex); playClickSound(); }}
            >
              <motion.img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="w-full h-full object-cover glitch-scan"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Previous/Next Buttons inside the frame */}
          <motion.button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full text-white transition-all duration-300 hover:scale-110"
            aria-label="Previous image"
            whileHover={{
              scale: 1.1,
              textShadow: "0 0 8px #6366f1",
            }}
          >
            <ChevronLeft size={36} className="text-indigo-400" />
          </motion.button>
          <motion.button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full text-white transition-all duration-300 hover:scale-110"
            aria-label="Next image"
            whileHover={{
              scale: 1.1,
              textShadow: "0 0 8px #ec4899",
            }}
          >
            <ChevronRight size={36} className="text-pink-400" />
          </motion.button>
        </div>

        {/* Code Block */}
        <div className="mt-8 p-4 bg-slate-900 border-t border-emerald-500/30">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <pre className="text-xs md:text-sm whitespace-pre-wrap">
                <Typewriter
                  words={[currentCode]}
                  loop={1}
                  typeSpeed={10}
                  cursor={true}
                  cursorStyle="_"
                />
              </pre>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Gallery;