// src/App.jsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Calendar,
  Sun,
  Moon,
  ExternalLink,
  Award,
  Menu,
  X,
  ArrowUp,
  Star,
} from "lucide-react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Typewriter } from "react-simple-typewriter";
import Tilt from "react-parallax-tilt";
import emailjs from "@emailjs/browser";

// ------------------ Data ------------------
const skillsData = [
  { name: "JavaScript", level: 85 },
  { name: "React", level: 82 },
  { name: "Node.js", level: 75 },
  { name: "Python", level: 70 },
  { name: "MongoDB", level: 68 },
  { name: "OpenCV", level: 64 },
];

const projectsData = [
  {
    title: "Face Recognition Attendance System",
    tags: ["Python", "OpenCV", "face_recognition"],
    description: `Detects and recognizes faces via webcam to log attendance in real-time.`,
    repoLink: "#",
    liveLink: "#",
  },
  {
    title: "Face BMI",
    tags: ["Python", "Tkinter", "CNN"],
    description: `Predicts BMI from facial features using a pretrained CNN.`,
    repoLink: "#",
    liveLink: "#",
  },
  {
    title: "Fast Pay (MERN)",
    tags: ["MERN", "Recharts", "UPI"],
    description: `Full-stack web app with UPI handling & transaction charts.`,
    repoLink: "https://github.com/nazrulhaq12/fast-pay-main.git",
    liveLink: "#",
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
];

const certificatesData = [
  {
    name: "Web Development Bootcamp",
    issuer: "Udemy",
    link: "https://www.udemy.com/certificate/12345",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
  },
  {
    name: "Machine Learning with Python",
    issuer: "Coursera",
    link: "https://www.coursera.org/certificate/67890",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Coursera-Logo-01.svg",
  },
];

// ------------------ Components ------------------
const Section = ({ id, title, children }) => (
  <section id={id} className="py-12 md:py-16 scroll-mt-20">
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-3xl font-extrabold text-slate-800 dark:text-white"
    >
      {title}
    </motion.h2>
    <div className="mt-8">{children}</div>
  </section>
);

const ProjectCard = ({ title, tags = [], description, repoLink, liveLink }) => (
  <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8}>
    <motion.article
      whileHover={{ y: -6, boxShadow: "0px 10px 15px rgba(0,0,0,0.1)" }}
      className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md transition-all duration-300"
    >
      <h4 className="font-semibold text-slate-800 dark:text-white">{title}</h4>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        {description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <a
          href={repoLink}
          className="text-sm text-sky-600 hover:underline dark:text-sky-400 flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={16} /> View repo
        </a>
        {liveLink !== "#" && (
          <a
            href={liveLink}
            className="text-sm text-slate-500 hover:underline dark:text-slate-400 flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={16} /> Live demo
          </a>
        )}
      </div>
    </motion.article>
  </Tilt>
);

const ExperienceCard = ({ role, org, period, bullets = [] }) => (
  <motion.div
    whileHover={{ x: 6 }}
    className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md transition-all duration-300"
  >
    <div className="flex items-start justify-between">
      <div>
        <div className="text-sm font-semibold text-slate-800 dark:text-white">
          {role}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">{org}</div>
      </div>
      <div className="text-xs text-slate-400 min-w-[70px] text-right">
        {period}
      </div>
    </div>
    <ul className="mt-4 text-sm text-slate-600 dark:text-slate-400 list-disc list-inside space-y-2">
      {bullets.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  </motion.div>
);

const CertificateCard = ({ name, issuer, link, logo }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -4 }}
    className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow transition-all duration-300 flex items-center gap-4 cursor-pointer"
  >
    {logo ? (
      <img
        src={logo}
        alt={`${issuer} logo`}
        loading="lazy"
        className="w-8 h-8 flex-shrink-0"
      />
    ) : (
      <Award
        size={24}
        className="text-amber-500 dark:text-amber-300 flex-shrink-0"
      />
    )}
    <div>
      <h4 className="font-semibold text-slate-800 dark:text-white">{name}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-400">{issuer}</p>
    </div>
  </motion.a>
);

// ------------------ Main App ------------------
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_id", "template_id", e.target, "user_api_key")
      .then(() => alert("Message sent!"))
      .catch(() => alert("Failed to send message."));
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>MD Nazrul Haq | Full-Stack Developer</title>
        <meta
          name="description"
          content="Portfolio of MD Nazrul Haq, Full-Stack Developer & AI/ML enthusiast."
        />
        <meta
          name="keywords"
          content="portfolio, MERN, React, Node.js, Tailwind, developer, Nazrul"
        />
      </Helmet>

      <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="font-bold">NH</h1>
            <nav className="hidden md:flex gap-4 text-sm">
              <a href="#projects">Projects</a>
              <a href="#experience">Experience</a>
              <a href="#skills">Skills</a>
              <a href="#certificates">Certificates</a>
              <a href="#contact">Contact</a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-1 bg-indigo-600 text-white px-3 py-1 rounded-md"
              >
                <FileText size={14} /> Resume
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-slate-200 dark:bg-slate-700"
              >
                {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
              </button>
              <button
                className="md:hidden p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="md:hidden bg-white dark:bg-slate-900 px-6 py-4">
              <a href="#projects" className="block py-2">Projects</a>
              <a href="#experience" className="block py-2">Experience</a>
              <a href="#skills" className="block py-2">Skills</a>
              <a href="#certificates" className="block py-2">Certificates</a>
              <a href="#contact" className="block py-2">Contact</a>
            </div>
          )}
        </header>

        {/* Hero */}
        <section className="text-center py-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient text-white">
          <h2 className="text-4xl font-extrabold">
            Hi, I'm Nazrul —{" "}
            <Typewriter
              words={["Full-Stack Developer", "ML Enthusiast", "Problem Solver"]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h2>
        </section>

        {/* Main Sections */}
        <main className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section id="projects" title="Selected Projects">
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {projectsData.map((p, i) => (
                <ProjectCard key={i} {...p} />
              ))}
            </div>
          </Section>

          <Section id="experience" title="Experience">
            {experienceData.map((exp, i) => (
              <ExperienceCard key={i} {...exp} />
            ))}
          </Section>

          <Section id="certificates" title="Certificates">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {certificatesData.map((c, i) => (
                <CertificateCard key={i} {...c} />
              ))}
            </div>
          </Section>

          <Section id="skills" title="Skills">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={skillsData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="level" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Section>

          {/* Testimonials */}
          <Section id="testimonials" title="Testimonials">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
              <p className="italic">"Nazrul is an outstanding developer with strong problem-solving skills!"</p>
              <div className="mt-2 flex items-center gap-2">
                <Star className="text-yellow-500" /> Happy Client
              </div>
            </div>
          </Section>

          {/* Contact */}
          <Section id="contact" title="Get in Touch">
            <form onSubmit={sendEmail} className="space-y-4 max-w-lg mx-auto">
              <input name="user_name" placeholder="Your Name" required className="w-full p-3 border rounded" />
              <input name="user_email" type="email" placeholder="Your Email" required className="w-full p-3 border rounded" />
              <textarea name="message" placeholder="Message" required className="w-full p-3 border rounded h-28" />
              <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-lg">
                Send Message
              </button>
            </form>
          </Section>
        </main>

        {/* Back to Top */}
        {showTopBtn && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-indigo-600 text-white shadow-lg"
          >
            <ArrowUp />
          </button>
        )}

        {/* Footer */}
        <footer className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} MD Nazrul Haq — Built with React, Tailwind, Framer Motion.
        </footer>
      </div>
    </HelmetProvider>
  );
}
