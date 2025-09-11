import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";

// Content to display dynamically
const dynamicContent = [
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "Why do programmers prefer dark mode? Because light attracts bugs!", author: "A classic joke" },
  { text: "The most important single aspect of software development is to get the right functionality and then to get it right.", author: "C.A.R. Hoare" },
  { text: "The function of a programmer is to solve problems, not to write code.", author: "Ray Davis" },
];

const About = () => {
  const [contentIndex, setContentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setContentIndex((prevIndex) =>
        (prevIndex + 1) % dynamicContent.length
      );
    }, 7000); // Change content every 7 seconds

    return () => clearInterval(timer);
  }, []);

  const currentContent = dynamicContent[contentIndex];

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 80, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="py-12 md:py-16 bg-white dark:bg-slate-800"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-6">
          About Me
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Content */}
          <div>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-merriweather">
              Hello! I'm Nazrul, a dedicated Full-Stack Developer with a passion for building
              scalable applications and innovative AI solutions. My journey in tech began
              with a deep curiosity for how things work, and it quickly evolved into a
              love for creating clean, efficient code that solves real-world problems.
            </p>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-merriweather">
              I specialize in the **MERN stack**, leveraging my skills in React, Node.js, and
              MongoDB to craft seamless user experiences. I'm also deeply interested in
              **AI and Machine Learning**, constantly exploring how to integrate intelligent
              systems into modern applications.
            </p>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-merriweather">
              When I'm not coding, you can find me diving into new tech trends, contributing
              to open-source projects, or simply enjoying a good problem-solving session.
            </p>
            <div className="mt-6">
              <motion.a
                whileTap={{ scale: 0.95 }}
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg"
              >
                <FileText size={16} /> View My Resume
              </motion.a>
            </div>
          </div>
          {/* Right: Dynamic Quote/Joke */}
          <div className="hidden md:flex justify-center items-center h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentContent.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="p-8 bg-slate-200 dark:bg-slate-700 rounded-2xl shadow-xl max-w-sm transform-gpu"
              >
                <p className="text-center italic text-slate-600 dark:text-slate-300 font-medium text-lg font-merriweather">
                  "{currentContent.text}"
                </p>
                <p className="mt-4 text-right text-sm text-slate-500 dark:text-slate-400 font-merriweather">
                  — {currentContent.author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;