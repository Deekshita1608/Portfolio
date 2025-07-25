import React, { useState, useEffect, useRef } from 'react';
import Loading from './components/Loading';
import emailjs from '@emailjs/browser';
import { Card } from './components/card';
import { ExperienceCard } from './components/ExperienceCard';
import { Button } from './components/button';
import { motion } from 'framer-motion';
import { FaDownload, FaEnvelope, FaGithub, FaLinkedin, FaBars, FaTimes, FaSun, FaMoon, FaHeart } from 'react-icons/fa';
import { TechBlobs } from './components/TechBlobs';
import { CustomCursor } from './components/CustomCursor';
import './index.css';
const sections = ['Home', 'About', 'Experience', 'Projects', 'Education', 'Contact'];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);
  const totalImages = 1; // Update this with the actual number of images in your app
  const [theme, setTheme] = useState('light');
  const form = useRef();

  const handleImageLoad = () => {
    setLoadedImages(prev => {
      const newCount = prev + 1;
      if (newCount >= totalImages) {
        // Small delay to ensure smooth transition
        setTimeout(() => setIsLoading(false), 300);
      }
      return newCount;
    });
  };

  useEffect(() => {
    // Fallback in case some images don't fire load events
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 second timeout max

    return () => clearTimeout(timer);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_jeu829o', 'template_ecs8yxs', form.current, {
        publicKey: 'v8U7RelvWE21ctfW7',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert('Message sent successfully!');
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('Failed to send message. Please try again later.');
        },
      );
  };

  const [activeSection, setActiveSection] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 100; // 100px offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

    useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => 
        document.getElementById(section.toLowerCase())
      );
      
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans bg-gradient-to-br from-[var(--bg-gradient-start)] via-[var(--bg-gradient-via)] to-[var(--bg-gradient-end)] min-h-screen text-[var(--text-primary)] transition-colors duration-300">
      <CustomCursor />
      {/* Navbar */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-11/12 max-w-7xl bg-[var(--navbar-bg)] backdrop-blur-md z-50 shadow-xl rounded-3xl transition-colors duration-300">
        <div className="mx-auto px-6 flex justify-between items-center py-3">
          <button onClick={() => scrollTo('Home')} className="text-[var(--navbar-text)] text-2xl tracking-wider" style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 'normal' }}>
            &lt;Deekshita Athreya /&gt;
          </button>
          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8">
            {sections.map((section) => (
              <li key={section}>
                <button
                  onClick={() => scrollTo(section)}
                  className={`text-lg font-semibold transition px-4 py-2 rounded-3xl text-[var(--navbar-text)] ${
                    activeSection === section
                      ? 'bg-white/20'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>
          {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4">
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="text-[var(--navbar-text)]">
              {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={24} />}
            </button>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[var(--navbar-text)]">
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col items-center gap-4 py-4">
              {sections.map((section) => (
                <li key={section}>
                  <button
                    onClick={() => {
                      scrollTo(section);
                      setIsMenuOpen(false);
                    }}
                    className={`text-lg font-semibold transition px-4 py-2 rounded-lg text-white w-full text-center ${
                      activeSection === section
                        ? 'bg-white/20'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <main className="pt-32 space-y-32">
        {/* Home Section */}
        <section id="home" className="px-6 md:px-12 lg:px-24">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-12"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Image */}
            <img
              src="/images/me.png"
              alt="Deekshita Illustration"
              className="w-[450px] h-[450px] object-cover rounded-2xl"
            />

            {/* Text Content */}
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-6xl">
                <div className="mb-2">Hi, I am</div>
                <div className="text-[#e48ae6] font-bold">Deekshita Athreya</div>
              </h1><br/>
              <p className="text-lg mb-4 text-[var(--text-secondary)]">
                Equal parts precision and passion, solving problems with code and creativity. ✨
              </p>
              <div className="flex flex-col items-center md:items-start">
                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                  <a
                    href="/Deekshita_Athreya_resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-500 text-white px-6 py-2 rounded-xl shadow hover:bg-pink-600 transition flex items-center gap-2"
                  >
                    <FaDownload />
                    Resume
                  </a>
                  <button
                    onClick={() => scrollTo('Contact')}
                    className="border-2 border-purple-500 text-purple-500 px-6 py-2 rounded-xl shadow hover:bg-purple-100 transition flex items-center gap-2"
                  >
                    <FaEnvelope />
                    Contact Me
                  </button>
                </div>
                <div className="flex justify-center md:justify-start gap-6 mt-6">
                  <a href="https://github.com/Deekshita1608" target="_blank" rel="noopener noreferrer" className="text-[var(--text-primary)] hover:text-pink-500 transition">
                    <FaGithub size={32} />
                  </a>
                  <a href="https://www.linkedin.com/in/deekshitaathreya" target="_blank" rel="noopener noreferrer" className="text-[var(--text-primary)] hover:text-pink-500 transition">
                    <FaLinkedin size={32} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="px-6 md:px-12 lg:px-24">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-16"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Text Content */}
            <div className="md:w-1/2 relative p-4">
              {/* Background Card */}
              <div className="about-me-bg-card"></div>
              
              {/* Foreground Card */}
              <div className="relative bg-[var(--card-bg)] backdrop-blur-md p-8 rounded-2xl shadow-lg">
                <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-8 name text-center md:text-left">About Me</h2>
                <p className="text-lg mb-4 text-[var(--text-secondary)]">
                Hi, I’m Deekshita Athreya, a Computer Science and Engineering undergraduate at the Institute of Technology, Nirma University, with a deep interest in AI, creative problem-solving, and building systems that matter.
                </p>
                <p className="text-lg mb-4 text-[var(--text-secondary)]">
                Whether it’s crafting intuitive user experiences or digging into backend logic, I love connecting the dots between technology and thoughtful design. I’ve interned at Morgan Stanley, where I gained hands-on experience with real-world systems, and currently, I’m exploring the latest trends in AI and machine learning.
                </p>
                <p className="text-lg text-[var(--text-secondary)]">
                I'm known for my diligence, curiosity, and quiet determination. Outside of code, you’ll find me experimenting with creative projects — from sketching to refining portfolio visuals pixel by pixel.
                </p>
              </div>
            </div>
            {/* Tech Blobs */}
            <div className="w-full md:w-1/2 h-[400px] md:h-[500px]">
              <TechBlobs />
            </div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-8 name text-center">Experience</h2>
            <div className="flex justify-center">
              <ExperienceCard
                imageSrc="/images/ms.jpeg"
                title="Morgan Stanley - Summer Technology Analyst"
                description="Enhanced the firm's notification engine to process 5X the current load by modernizing the system with Apache Kafka. Worked on containerization and cloud deployment."
                tags={['Java', 'Spring', 'Apache Kafka', 'Scala', 'Docker']}
              />
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-8 name">Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card
                imageSrc="/images/spotify.png"
                title="Spotify Clone"
                description="Java Swing application that emulates all major features of Spotify with a near identical UI. Features include: Login, Signup, Media controls from scratch using multi-threading, playlists and Live search"
                tags={['Java', 'Swing', 'Multithreading', 'OOP']}
                githubLink="https://github.com/Deekshita1608/Spotify-Clone.git"
              />
              <Card
                imageSrc="/images/delphi.png"
                title="Delphi- Voice based Virtual Assistant"
                description="Developed a website with google assistant like features for resolving general queries with over 90% accuracy. Technologies: HTML, CSS, Javascript and React JS for frontend, Python and Flask for backend, MySQL for
database. Integrates AI lipsyncing technology and Google OAuth Login for immersive experience"
                tags={['React', 'Python', 'Flask', 'MySQL']}
                githubLink="https://github.com/Deekshita1608/Delphi.git"
              />
              <Card
                imageSrc="/images/classvision.png"
                title="ClassVision AI"
                description="Marks attendance of students from surveillance footage. Uses YOLO v8 for face detection and custom Siamese network for identification"
                tags={['Python', 'Tensorflow', 'Siamese Network']}
                githubLink="https://github.com/Deekshita1608/ClassVision-AI.git"
              />
            </div>
          </motion.div>
        </section>

        {/* Education Section */}
        <section id="education" className="px-6">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-12 name">Education</h2>
            <div className="timeline">
              {/* Education 1 */}
              <div className="timeline-item left">
                <div className="timeline-content">
                  <div className="timeline-date">2022 - 2026</div>
                  <h3>B.Tech in Computer Science and Engineering</h3>
                  <p>Nirma University, Ahmedabad</p>
                  <p className="text-sm text-gray-500">CGPA: 9.61/10</p>
                  <div className="timeline-note">
                    <p>Minor in Adaptive AI, Gold medalist in first and second year</p>
                  </div>
                </div>
              </div>

              {/* Education 2 */}
              <div className="timeline-item right">
                <div className="timeline-content">
                  <div className="timeline-date">2021 - 2022</div>
                  <h3>CBSE 12th Science -PCM</h3>
                  <p>Udgam School for Children, Ahmedabad</p>
                  <p className="text-sm text-gray-500">Percentage: 98%</p>
                  <div className="timeline-note">
                    <p>School Topper, Aruna Lal Scholarship (PRL) recipient</p>
                  </div>
                </div>
              </div>

              {/* Education 3 */}
              <div className="timeline-item left">
                <div className="timeline-content">
                  <div className="timeline-date">2020 - 2021</div>
                  <h3>CBSE 10th</h3>
                  <p>Udgam School for Children, Ahmedabad</p>
                  <p className="text-sm text-gray-500">Percentage: 97.6</p>
                  <div className="timeline-note">
                  <p>Ranked fourth among 300+ students</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="px-6 md:px-12 lg:px-24 py-16">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-8 text-center name">Get In Touch</h2>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Form Card */}
              <div className="md:w-3/5 bg-[var(--card-bg)] backdrop-blur-lg rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-pink-500 mb-6">Send a Message</h3>
                <form ref={form} onSubmit={sendEmail}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-[var(--text-secondary)] font-semibold mb-2">Name</label>
                    <input type="text" id="name" name="name" className="w-full px-4 py-2 rounded-lg bg-[var(--input-bg)] border border-[var(--input-border)] focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-ring)]" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-[var(--text-secondary)] font-semibold mb-2">Email</label>
                    <input type="email" id="email" name="email" className="w-full px-4 py-2 rounded-lg bg-[var(--input-bg)] border border-[var(--input-border)] focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-ring)]" required />
                  </div>
                   <div className="mb-4">
                    <label htmlFor="subject" className="block text-[var(--text-secondary)] font-semibold mb-2">Subject</label>
                    <input type="text" id="subject" name="subject" className="w-full px-4 py-2 rounded-lg bg-[var(--input-bg)] border border-[var(--input-border)] focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-ring)]" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-[var(--text-secondary)] font-semibold mb-2">Message</label>
                    <textarea id="message" name="message" rows="5" className="w-full px-4 py-2 rounded-lg bg-[var(--input-bg)] border border-[var(--input-border)] focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-ring)]" required></textarea>
                  </div>
                  <Button type="submit">Send Message</Button>
                </form>
              </div>

              {/* Graphic */}
              <div className="md:w-3/5 flex items-center justify-center p-8">
                <img
                  src="/images/chat.png"
                  alt="A graphic of a girl"
                  className="w-full h-auto max-w-xs"
                  onLoad={handleImageLoad}
                  onError={() => handleImageLoad()} // In case image fails to load
                />
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="text-center py-8 text-[var(--text-secondary)]">
        <p className="flex items-center justify-center gap-2">
          Made with <FaHeart className="text-pink-500" /> by <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: '1.5rem' }}>Deekshita</span>
        </p>
      </footer>
    </div>
  );
}