import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  Github,
  ExternalLink,
  FileText,
  Sun,
  Moon,
  ArrowUp,
  Cpu,
  Code2,
  Brain,
  Linkedin,
} from "lucide-react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Typewriter } from "react-simple-typewriter";
import Tilt from "react-parallax-tilt";
import emailjs from "@emailjs/browser";
import { motion, useAnimation, useMotionValue, animate } from "framer-motion";
import AnimatedCursor from "react-animated-cursor";
import useSound from './hooks/useSound';

// Import components (some will be lazy loaded)
import Navbar from "./Navbar";
import Lightbox from "./Lightbox";

// Lazy load components for performance optimization
const LazyAbout = lazy(() => import("./About"));
const LazyGallery = lazy(() => import("./Gallery"));

// ------------------ Reusable Hooks and Components ------------------

const Section = ({ id, title, children, className = "" }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 80, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 1, ease: "easeInOut" }}
    className={`py-12 md:py-16 ${className}`}
  >
    <div className="max-w-6xl mx-auto px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-6 font-heading">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  </motion.section>
);

const SkillCircle = ({ name, level }) => {
  const controls = useAnimation();
  const progress = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  const C = 2 * Math.PI * 40;

  useEffect(() => {
    const unsub = progress.on("change", (v) => setDisplay(Math.round(v)));
    return () => unsub();
  }, [progress]);

  const animateSkill = () => {
    controls.set({ strokeDashoffset: C });
    progress.set(0);
    controls.start({
      strokeDashoffset: C - (C * level) / 100,
      transition: { duration: 1.4, ease: "easeOut" },
    });
    animate(progress, level, { duration: 1.4, ease: "easeOut" });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.06 }}
      onHoverStart={animateSkill}
      className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md cursor-pointer"
    >
      <div className="relative w-24 h-24">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-200 dark:text-slate-700"
            fill="none"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke="url(#g)"
            strokeWidth="8"
            strokeDasharray={C}
            strokeDashoffset={C}
            strokeLinecap="round"
            fill="none"
            animate={controls}
          />
          <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>

        <span className="absolute inset-0 flex items-center justify-center font-semibold text-slate-800 dark:text-white">
          {display}%
        </span>
      </div>

      <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">
        {name}
      </p>
    </motion.div>
  );
};
const ProjectCard = ({ title, tags = [], description, repoLink, liveLink }) => (
  <Tilt
    tiltMaxAngleX={10}
    tiltMaxAngleY={10}
    perspective={1000}
    glareEnable={true}
    glareMaxOpacity={0.18}
    glareColor="white"
    className="rounded-2xl"
  >
    <motion.article
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.995 }}
      className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl shadow-xl h-full flex flex-col justify-between"
    >
      <div>
        <h4 className="font-semibold text-slate-800 dark:text-white font-heading">{title}</h4>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="px-2 py-1 text-xs bg-white/60 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <motion.a whileTap={{ scale: 0.92 }} href={repoLink} className="text-sm text-sky-600 hover:underline dark:text-sky-400 flex items-center gap-2" target="_blank" rel="noopener noreferrer">
          <Github size={16} /> <span>Repo</span>
        </motion.a>
        {liveLink !== "#" && (
          <motion.a whileTap={{ scale: 0.92 }} href={liveLink} className="text-sm text-slate-500 hover:underline dark:text-slate-400 flex items-center gap-2" target="_blank" rel="noopener noreferrer">
            <ExternalLink size={16} /> <span>Live</span>
          </motion.a>
        )}
      </div>
    </motion.article>
  </Tilt>
);

const ExperienceCard = ({ role, org, period, bullets = [] }) => (
  <motion.div whileHover={{ x: 6 }} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md transition-all duration-300">
    <div className="flex items-start justify-between">
      <div>
        <div className="text-sm font-semibold text-slate-800 dark:text-white font-heading">{role}</div>
        <div className="text-xs text-slate-500 dark:text-slate-400">{org}</div>
      </div>
      <div className="text-xs text-slate-400 min-w-[70px] text-right">{period}</div>
    </div>
    <ul className="mt-4 text-sm text-slate-600 dark:text-slate-400 list-disc list-inside space-y-2">
      {bullets.map((b, i) => <li key={i}>{b}</li>)}
    </ul>
  </motion.div>
);

const CertificateCard = ({ name, issuer, img }) => (
  <motion.div whileHover={{ y: -6 }} className="relative group overflow-hidden rounded-lg shadow transition-all duration-300">
    <a href={img} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
      <div className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow">
        <img src={img} alt={name} className="rounded-lg mb-3 w-full h-40 object-cover" />
        <motion.div
          className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4 text-center rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="font-semibold text-white text-lg font-heading">{name}</h4>
          <p className="text-sm text-slate-300 mt-1">{issuer}</p>
          <span className="text-xs text-sky-400 mt-2">Click to View</span>
        </motion.div>
        <h4 className="font-semibold text-slate-800 dark:text-white group-hover:opacity-0 transition-opacity duration-300 font-heading">{name}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:opacity-0 transition-opacity duration-300">{issuer}</p>
      </div>
    </a>
  </motion.div>
);

// ------------------ Data ------------------
const skillsData = [
  { name: "Python", level: 90 },
  { name: "Java", level: 80 },
  { name: "MERN Stack", level: 85 },
  { name: "Azure AI", level: 70 },
  { name: "Cybersecurity", level: 65 },
  { name: "AI & Deep Learning", level: 75 },
  { name: "C Programming", level: 80 },
  { name: "Problem Solving", level: 88 },
];
const galleryData = [
  { src: `${import.meta.env.BASE_URL}gallery/img1.jpg`, alt: "My first project" },
  { src: `${import.meta.env.BASE_URL}gallery/img2.jpg`, alt: "At a tech conference" },
  { src: `${import.meta.env.BASE_URL}gallery/img3.jpeg`, alt: "Coding on a coffee break" },
  { src: `${import.meta.env.BASE_URL}gallery/img4.jpeg`, alt: "My team at a hackathon" },
  { src: `${import.meta.env.BASE_URL}gallery/img5.jpeg`, alt: "Whiteboard brainstorming" },
  { src: `${import.meta.env.BASE_URL}gallery/img6.jpg`, alt: "Late night coding session" },
  { src: `${import.meta.env.BASE_URL}gallery/img7.jpg`, alt: "Presenting a project" },
  { src: `${import.meta.env.BASE_URL}gallery/img8.jpg`, alt: "Office view" },
  { src: `${import.meta.env.BASE_URL}gallery/img9.jpg`, alt: "Team photo" },
  { src: `${import.meta.env.BASE_URL}gallery/img10.jpg`, alt: "AI conference" },
];
const projectsData = [
  {
    title: "Face Recognition Attendance System",
    tags: ["Python", "OpenCV", "face_recognition"],
    description: "Detects and recognizes faces via webcam to log attendance in real-time.",
    repoLink: "https://github.com/nazrulhaq12/FaceRecognition",
    liveLink: "#",
  },
  {
    title: "Face BMI",
    tags: ["Python", "Tkinter", "CNN"],
    description: "Predicts BMI from facial features using a pretrained CNN.",
    repoLink: "https://github.com/nazrulhaq12/BMI",
    liveLink: "#",
  },
  {
    title: "Fast Pay (MERN)",
    tags: ["MERN", "Recharts", "UPI"],
    description: "Full-stack web app with UPI handling & transaction charts.",
    repoLink: "https://github.com/nazrulhaq12/fast-pay-main.git",
    liveLink: "#",
  },
  {
  title: "Personal Portfolio Website",
  tags: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
  description: "My own responsive personal portfolio, built from scratch to showcase my skills, projects, and professional journey.",
  repoLink: "https://github.com/nazrulhaq12/Portfolio",
  liveLink: "https://nazrulhaq12.github.io/Portfolio/",
},
];
const experienceData = [
  {
    role: "Full-Stack Web Developer Intern",
    org: "EY GDS & AICTE",
    period: "Mar 2025 - Apr 2025",
    bullets: [
      "Built modern web applications using MERN stack.",
      "Implemented authentication & visualizations with Recharts.",
      "Worked on scalable API design and frontend state management.",
    ],
  },
  {
    role: "AI & Deep Learning Intern",
    org: "Skillimate Technologies",
    period: "May 2024 - Jun 2024",
    bullets: [
      "Worked on AI & DL models with real datasets.",
      "Gained hands-on experience in training CNN architectures.",
      "Contributed to AI-driven solutions for computer vision tasks.",
    ],
  },
];
const categorizedCertificates = {
  Internships: [
    { name: "AI-DL Intern", issuer: "Skillimate", img: `${import.meta.env.BASE_URL}certificates/Ai-DL intern.jpg` },
    { name: "GDS (EY/GDS?)", issuer: "GDS", img: `${import.meta.env.BASE_URL}certificates/GDS.jpg` },
  ],
  Workshops: [
    { name: "C Programming Workshop", issuer: "MREC", img: `${import.meta.env.BASE_URL}certificates/c.jpg` },
    { name: "IIT Hyderabad Workshop", issuer: "IIT Hyderabad", img: `${import.meta.env.BASE_URL}certificates/iit-hyd.jpg` },
    { name: "Junior Developer Training", issuer: "MREC", img: `${import.meta.env.BASE_URL}certificates/jr-developer.jpg` },
  ],
  Achievements: [
    { name: "Akshara 2K24 Fest", issuer: "MREC", img: `${import.meta.env.BASE_URL}certificates/Akshara.jpg` },
    { name: "Vishesh Hackathon", issuer: "MREC", img: `${import.meta.env.BASE_URL}certificates/Vishesh.jpg` },
  ],
  OnlineCourses: [
    { name: "Cisco Cybersecurity", issuer: "Cisco", img: `${import.meta.env.BASE_URL}certificates/cisco-cybersecurity.png` },
    { name: "Microsoft Azure AI", issuer: "Microsoft", img: `${import.meta.env.BASE_URL}certificates/microsoft-azure-ai.png` },
    { name: "Microsoft Full-Stack Developer", issuer: "Microsoft", img: `${import.meta.env.BASE_URL}certificates/microsoft-fullstack.png` },
    { name: "Skilltimate Python", issuer: "Skilltimate", img: `${import.meta.env.BASE_URL}certificates/skilltimate-python.jpg` },
    { name: "Udemy Java", issuer: "Udemy", img: `${import.meta.env.BASE_URL}certificates/udemy-java.png` },
    { name: "Deloitte Technology Training", issuer: "Deloitte", img: `${import.meta.env.BASE_URL}certificates/deloitte.png` },
  ],
};

// ------------------ Main App ------------------
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const playClickSound = useSound(`${import.meta.env.BASE_URL}click.mp3`);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };
  const handleCloseLightbox = () => {
    setCurrentImageIndex(null);
  };
  const handleNavigate = (newIndex) => {
    setCurrentImageIndex(newIndex);
  };
  const toggleDarkMode = () => {
    setIsDarkMode((s) => !s);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_id", "template_id", e.target, "user_api_key")
      .then(() => alert("Message sent!"))
      .catch(() => alert("Failed to send message."));
  };
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3500);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>MD Nazrul Haq | Full-Stack Developer</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Poppins:wght@300;400;600&family=Merriweather:wght@400;700&family=Fira+Code:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <style>{`html { scroll-behavior: smooth; }`}</style>
      </Helmet>

      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 text-emerald-400 font-mono"
        >
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold">
              <Typewriter
                words={["Connecting to Portfolio...", "Authenticating user...", "Decrypting data...", "Access granted."]}
                loop={1}
                typeSpeed={40}
                deleteSpeed={20}
                delaySpeed={1000}
              />
            </div>
          </div>
        </motion.div>
      )}

      <div className={`min-h-screen transition-colors duration-700 font-body ${isDarkMode ? "dark" : ""}`}>
        <motion.div
          className="fixed inset-0 -z-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 opacity-60 dark:opacity-80"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        />

        <AnimatedCursor
          innerSize={10}
          outerSize={30}
          color="99,102,241"
          outerAlpha={0.18}
          innerScale={0.8}
          outerScale={2.2}
          clickables={["a", "button", ".link", "input", "textarea"]}
        />

        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="starfield">
            {Array.from({ length: 50 }).map((_, i) => <div key={i} />)}
          </div>
          <motion.div
            className="absolute w-72 h-72 bg-indigo-400/25 rounded-full blur-3xl left-10 top-10"
            animate={{ x: [0, 220, 0], y: [0, 80, 0] }}
            transition={{
              duration: 14,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-96 h-96 bg-pink-400/20 rounded-full blur-3xl right-10 top-40"
            animate={{ x: [0, -180, 0], y: [0, -120, 0] }}
            transition={{
              duration: 11,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]"
            animate={{ x: [0, 100, 0], y: [0, -80, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            style={{ top: "40%", left: "40%" }}
          />
          <motion.div
            className="absolute text-indigo-300/20"
            style={{ left: "15%", top: "60%" }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <Cpu size={80} />
          </motion.div>
          <motion.div
            className="absolute text-purple-300/20"
            style={{ right: "20%", top: "30%" }}
            animate={{ y: [0, 25, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
          >
            <Code2 size={70} />
          </motion.div>
          <motion.div
            className="absolute text-pink-300/20"
            style={{ left: "50%", top: "75%" }}
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <Brain size={90} />
          </motion.div>
        </div>

        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <section id="home" className="relative flex items-center justify-center min-h-[68vh] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 lg:px-20">
          <div className="max-w-6xl w-full flex flex-col-reverse md:grid md:grid-cols-2 gap-10 items-center">
            <div className="text-center md:text-left space-y-3">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading">
                Hi, I'm <span className="text-yellow-300">Nazrul</span> —{" "}
                <span style={{ display: "inline-block" }}>
                  <Typewriter
                    words={["Full-Stack Developer", "ML Enthusiast", "Problem Solver"]}
                    loop
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </span>
              </h2>
              <p className="max-w-xl mx-auto md:mx-0 text-base md:text-lg text-white/90 leading-relaxed">
                I’m a passionate Full-Stack Developer and AI enthusiast — building scalable applications, designing ML solutions, and shipping polished products.
              </p>
              <blockquote className="italic text-white/80 text-sm md:text-base font-light">
                "Code with purpose, learn with passion, and build for impact."
              </blockquote>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                <motion.a whileTap={{ scale: 0.95 }} onClick={playClickSound} href="#projects" className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg backdrop-blur">
                  View Projects
                </motion.a>
                <motion.a whileTap={{ scale: 0.95 }} onClick={playClickSound} href={`${import.meta.env.BASE_URL}Resume.pdf`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg">
                  <FileText size={16} /> Resume
                </motion.a>
                <motion.a whileTap={{ scale: 0.95 }} onClick={playClickSound} href="https://github.com/nazrulhaq12" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg">
                  <Github size={16} /> GitHub
                </motion.a>
                <motion.a whileTap={{ scale: 0.95 }} onClick={playClickSound} href="https://www.linkedin.com/in/md-nazrul-haq-408527255/" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg">
                  <Linkedin size={16} /> LinkedIn
                </motion.a>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative hacker-profile-layers"
              >
                <motion.img
                  src={`${import.meta.env.BASE_URL}profile.png`}
                  alt="Nazrul Haq"
                  className="w-56 h-56 md:w-64 md:h-64 object-cover rounded-2xl shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <Suspense fallback={<div className="text-center py-20 text-slate-500 dark:text-slate-400">Loading About section...</div>}>
          <LazyAbout />
        </Suspense>

        <Section id="projects" title="Projects" className="bg-slate-50 dark:bg-slate-900">
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {projectsData.map((p, i) => <ProjectCard key={i} {...p} />)}
          </div>
        </Section>

        <Section id="gallery" title="Gallery" className="bg-slate-50 dark:bg-slate-900">
          <Suspense fallback={<div className="text-center py-20 text-slate-500 dark:text-slate-400">Loading Gallery...</div>}>
            <LazyGallery images={galleryData} onImageClick={handleImageClick} />
          </Suspense>
        </Section>

        <Section id="highlights" title="Highlights" className="bg-white dark:bg-slate-800">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-slate-800 p-6 rounded-xl shadow">
              <h4 className="font-semibold text-indigo-600 font-heading">Top Skills</h4>
              <p className="mt-2 text-slate-600 dark:text-slate-300">MERN Stack, AI/ML, Problem Solving, Azure.</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-white dark:from-slate-900 dark:to-slate-800 p-6 rounded-xl shadow">
              <h4 className="font-semibold text-indigo-600 font-heading">Key Achievements</h4>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Hackathon finalist, internships at EY & Skillimate, published projects.</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-slate-900 dark:to-slate-800 p-6 rounded-xl shadow">
              <h4 className="font-semibold text-indigo-600 font-heading">Strengths</h4>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Quick learner, collaborative, product-minded developer.</p>
            </div>
          </div>
        </Section>

        <Section id="experience" title="Experience" className="bg-slate-50 dark:bg-slate-900">
          <div className="grid gap-6 md:grid-cols-2">
            {experienceData.map((e, i) => <ExperienceCard key={i} {...e} />)}
          </div>
        </Section>

        <Section id="certificates" title="Certificates & Workshops" className="bg-white dark:bg-slate-800">
          {Object.entries(categorizedCertificates).map(([cat, list]) => (
            <div key={cat} className="mb-10">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4 font-heading">{cat}</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((c, idx) => <CertificateCard key={idx} {...c} />)}
              </div>
            </div>
          ))}
        </Section>

        <Section id="skills" title="Skills & Technologies" className="bg-slate-50 dark:bg-slate-900">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skillsData.map((s, i) => <SkillCircle key={i} {...s} />)}
          </div>
        </Section>

        <Section id="contact" title="Get in Touch" className="bg-slate-50 dark:bg-slate-900">
          <div className="flex justify-center items-center space-x-6 mb-8">
            <a href="https://github.com/nazrulhaq12" target="_blank" rel="noopener noreferrer" className="text-slate-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" onClick={playClickSound}>
              <Github size={32} />
            </a>
            <a href="https://www.linkedin.com/in/md-nazrul-haq-408527255/" target="_blank" rel="noopener noreferrer" className="text-slate-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" onClick={playClickSound}>
              <Linkedin size={32} />
            </a>
          </div>
          <form onSubmit={sendEmail} className="space-y-4 max-w-lg mx-auto">
            <input name="user_name" placeholder="Your Name" required className="w-full p-3 border rounded bg-white/60 dark:bg-slate-800" />
            <input name="user_email" type="email" placeholder="Your Email" required className="w-full p-3 border rounded bg-white/60 dark:bg-slate-800" />
            <textarea name="message" placeholder="Message" required className="w-full p-3 border rounded h-28 bg-white/60 dark:bg-slate-800" />
            <motion.button whileTap={{ scale: 0.98 }} onClick={playClickSound} type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-lg">Send Message</motion.button>
          </form>
        </Section>

        {showTopBtn && (
          <button onClick={() => { playClickSound(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="fixed bottom-6 right-6 p-3 rounded-full bg-indigo-600 text-white shadow-lg" aria-label="Back to top">
            <ArrowUp />
          </button>
        )}

        <footer className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} MD Nazrul Haq — Built with React, Tailwind, Framer Motion.
        </footer>
      </div>

      {currentImageIndex !== null && (
        <Lightbox images={galleryData} currentIndex={currentImageIndex} onClose={handleCloseLightbox} onNavigate={handleNavigate} />
      )}
    </HelmetProvider>
  );
}
