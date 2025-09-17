import React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
// Import icons for the new tech stack card
import { SiReact, SiNodedotjs, SiMongodb, SiPython, SiTailwindcss, SiFigma } from "react-icons/si";

// Assuming the useSound hook is in a separate file
const useSound = (url) => {
  const [audio, setAudio] = React.useState(null);
  React.useEffect(() => {
    if (url) {
      const newAudio = new Audio(url);
      setAudio(newAudio);
      return () => {
        newAudio.pause();
        newAudio.src = "";
      };
    }
  }, [url]);
  const play = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch((e) => console.error("Audio playback failed:", e));
    }
  };
  return play;
};

// Data for the new tech stack card
const techStackData = [
  { name: "React", icon: <SiReact size={36} className="text-sky-500" /> },
  { name: "Node.js", icon: <SiNodedotjs size={36} className="text-green-500" /> },
  { name: "MongoDB", icon: <SiMongodb size={36} className="text-emerald-600" /> },
  { name: "Python", icon: <SiPython size={36} className="text-yellow-500" /> },
  { name: "Tailwind", icon: <SiTailwindcss size={36} className="text-cyan-400" /> },
  { name: "Figma", icon: <SiFigma size={36} className="text-pink-500" /> },
];

const About = () => {
  const playClickSound = useSound(`${import.meta.env.BASE_URL}click.mp3`);

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
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-6 font-heading">
          About Me
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Content (remains the same) */}
          <div>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Hello! I'm Nazrul, a dedicated Full-Stack Developer with a passion for building
              scalable applications and innovative AI solutions. My journey in tech began
              with a deep curiosity for how things work, and it quickly evolved into a
              love for creating clean, efficient code that solves real-world problems.
            </p>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              I specialize in the MERN stack, leveraging my skills in React, Node.js, and
              MongoDB to craft seamless user experiences. I'm also deeply interested in
              AI and Machine Learning, constantly exploring how to integrate intelligent
              systems into modern applications.
            </p>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              When I'm not coding, you can find me diving into new tech trends, contributing
              to open-source projects, or simply enjoying a good problem-solving session.
            </p>
            <div className="mt-6">
              <motion.a
                whileTap={{ scale: 0.95 }}
                onClick={playClickSound}
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
              >
                <FileText size={16} /> View My Resume
              </motion.a>
            </div>
          </div>

          {/* Right: NEW Core Technologies Card */}
          <div className="hidden md:flex justify-center items-center h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 bg-slate-100 dark:bg-slate-700/50 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 w-full max-w-sm"
            >
              <h3 className="text-lg font-bold text-center text-slate-700 dark:text-white mb-6 font-heading">
                My Core Technologies
              </h3>
              <div className="grid grid-cols-3 gap-6">
                {techStackData.map((tech) => (
                  <motion.div
                    key={tech.name}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="flex flex-col items-center justify-center gap-2"
                    title={tech.name}
                  >
                    {tech.icon}
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {tech.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;