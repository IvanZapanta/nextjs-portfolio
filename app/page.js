"use client";
import './globals.css'
import Head from "next/head";
import Link from 'next/link';
import {
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";
import { BsFillMoonFill, BsSun, BsMenuDown } from "react-icons/bs";
import { useEffect, useState, useRef } from "react";
import code from "../public/web.png";
import design from "../public/mobile.png";
import consulting from "../public/ai.png";
import Image from "next/image";
import proj1 from "../public/reached.png";
import proj2 from "../public/wellness.png";
import proj3 from "../public/aws.png";
import toast, { Toaster } from 'react-hot-toast';
import { Fade } from "react-awesome-reveal";

export default function Home() {
  // Set initial state variables
  const [darkMode, setDarkMode] = useState(false); // for dark mode
  const [navbarHeight, setNavbarHeight] = useState(0); // for navbar height
  const [displayText, setDisplayText] = useState(""); // for text to be displayed gradually
  const [dropdownOpen, setDropdownOpen] = useState(false); // for dropdown open/close
  const [dropdownHovered, setDropdownHovered] = useState(false); // for dropdown hover state
  const [highlightAbout, setHighlightAbout] = useState(false); // for highlighting the About section in the dropdown
  const [highlightSkills, setHighlightSkills] = useState(false); // for highlighting the Skills section in the dropdown
  const [highlightProjects, setHighlightProjects] = useState(false); // for highlighting the Projects section in the dropdown
  const [prevScrollPos, setPrevScrollPos] = useState(0); // for previous scroll position
  const [visible, setVisible] = useState(true); // for navbar visibility

  // Projects data
  const projects = [
    { image: proj1, description: "REACHED is an Android application designed to streamline attendance reporting and improve communication between teachers and parents in educational institutions. The app helps users efficiently manage daily attendance, reducing the time and resources required for attendance tracking." }
  ];

  // Text to be gradually displayed --Intro
  const text =
    "    Hello, and welcome to my portfolio! I'm an experienced software engineer with a passion for crafting innovative solutions through coding. Feel free to explore my projects, where you'll see my expertise in various programming languages and frameworks. Let's connect!";

  // Typing effect for the introductory text
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex === text.length - 1) {
        clearInterval(typingInterval);
      } else {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        currentIndex++;
      }
    }, 50);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  // Gets the height of the navbar
  const navbarRef = useRef(null);
  useEffect(() => {
    const navbar = navbarRef.current;
    if (navbar) {
      const height = navbar.getBoundingClientRect().height;
      setNavbarHeight(height);
    }
  }, []);

  // Displays a success toast when the resume is downloaded
  const notify = () => toast.success('Resume downloaded successfully!');
  // Handles the download of the resume
  const handleDownloadResume = () => {
    const shouldDownload = window.confirm("Would you like to proceed with downloading my resume?");
    if (shouldDownload) {
      const resumeFileName = "Ivan Zapanta.pdf";
      const downloadLink = document.createElement("a");
      downloadLink.href = `/${resumeFileName}`;
      downloadLink.download = resumeFileName;
      downloadLink.click();
      notify()
    }
  };

  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    const scrollOptions = {
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    };
    section.scrollIntoView(scrollOptions);

    // Toggle the highlighting state variables
    if (sectionId === 'about') {
      setHighlightAbout(true);
      setHighlightSkills(false);
      setHighlightProjects(false);
    } else if (sectionId === 'skills') {
      setHighlightAbout(false);
      setHighlightSkills(true);
      setHighlightProjects(false);
    } else if (sectionId === 'projects') {
      setHighlightAbout(false);
      setHighlightSkills(false);
      setHighlightProjects(true);
    }

    // Prevents dropdown from closing when hovering over it
    if (!dropdownHovered) {
      setDropdownOpen(true); // Close the dropdown after choosing an item
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(visible);
    };

    // Add event listener to handle scroll
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Removes the event listener when the component is unmounted to avoid memory leaks.
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div className={darkMode ? "dark" : ""}>
      {/* Head component */}
      <Head>
        <title>Ivan Zapanta</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main content */}
      <main className="bg-white px-10 dark:bg-gray-900 md:px-20 lg:px-40">
        <section className="min-h-screen">
          <div className="nav-items">

            {/* Navigation */}
            <nav
              ref={navbarRef}
              className={`fixed top-0 left-0 right-0 py-10 px-6 flex justify-end dark:text-white bg-white dark:bg-gray-900 z-10 transition-all ${visible ? "opacity-100" : "opacity-0"
                }`}
              style={{ height: navbarHeight }}>
              <ul className="flex items-center">
                {/* Dropdown menu */}
                <li>
                  <span
                    className={`relative group ${dropdownOpen ? "text-teal-500" : "hover:text-teal-500"}`}>
                    <BsMenuDown className="inline-block text-2xl mr-8 align-middle"
                      onMouseEnter={() => setDropdownOpen(true)} />
                    <ul
                      className={`${(dropdownOpen || dropdownHovered) ? "block" : "hidden"} absolute z-10 bg-white dark:bg-gray-900 py-2 px-4 mt-2 rounded-lg shadow-lg`}
                      onMouseLeave={() => setDropdownOpen(false)}>

                      {/* Menu items */}
                      <li>
                        {/* Link to "About" section */}
                        <Link href="#about" passHref>
                          <div
                            className={`font-mono text-lg cursor-pointer ${highlightAbout ? 'hover:text-teal-500' : darkMode ? 'text-white' : 'text-black'
                              }`}
                            onClick={(e) => handleScrollToSection(e, 'about')}
                          >
                            About
                          </div>
                        </Link>
                      </li>
                      <li>
                        {/* Link to "Skills" section */}
                        <Link href="#skills" passHref>
                          <div
                            className={`font-mono text-lg cursor-pointer ${highlightSkills ? 'hover:text-teal-500' : darkMode ? 'text-white' : 'text-black'
                              }`}
                            onClick={(e) => handleScrollToSection(e, 'skills')}
                          >
                            Skills
                          </div>
                        </Link>
                      </li>
                      <li>
                        {/* Link to "Projects" section */}
                        <Link href="#projects" passHref>
                          <div
                            className={`font-mono text-lg cursor-pointer ${highlightProjects ? 'hover:text-teal-500' : darkMode ? 'text-white' : 'text-black'
                              }`}
                            onClick={(e) => handleScrollToSection(e, 'projects')}
                          >
                            Projects
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </span>
                </li>
                
                <li>
                  {/* Toggle between dark and light mode */}
                  {darkMode ? (
                    <BsFillMoonFill
                      onClick={() => setDarkMode(!darkMode)}
                      className="hover:text-teal-500 mr-6 cursor-pointer text-2xl"
                    />
                  ) : (
                    <BsSun
                      onClick={() => setDarkMode(!darkMode)}
                      className="hover:text-teal-500 mr-6 cursor-pointer text-2xl"
                    />
                  )}
                </li>

                <li>
                  {/* Resume download button */}
                  <a className="btn-slide" href="#" onClick={handleDownloadResume}>
                    <span className="circle">
                      <i className="fa fa-save"></i>
                    </span>
                    <span className="title">Resume</span>
                    <span className="title title-hover">Download Now</span>
                  </a>
                  <Toaster />
                </li>
              </ul>
            </nav>
          </div>

          {/* About section */}
          <Fade delay={300} duration={1000}>
            <section id="about" className="mt-20 mb-80" style={{ paddingTop: navbarHeight }}>
              <div className="text-center p-10 py-10">
                <h2 className="font-mono text-5xl py-2 text-teal-600 font-medium dark:text-teal-400 md:text-6xl">
                  Ivan Joshua Zapanta
                </h2>
                <h3 className="font-mono text-2xl py-2 dark:text-white md:text-3xl">
                  Software Engineer
                </h3>
                <p className="font-mono mt-4 text-lg py-5 leading-8 text-gray-800 dark:text-gray-200 max-w-xl mx-auto md:text-xl text-justify">
                  {displayText}
                </p>
                <div className="social-icons mt-10">

                  {/* LinkedIn */}
                  <a href="https://www.linkedin.com/in/ivan-joshua-zapanta-00a70526a/" target="_blank" rel="noopener noreferrer">
                    <AiFillLinkedin className="icon linkedin-icon mr-12" />
                  </a>
                  
                  {/* GitHub */}
                  <a href="https://github.com/IvanZapanta" target="_blank" rel="noopener noreferrer">
                    <AiFillGithub className="icon github-icon" />
                  </a>
                </div>
              </div>
            </section>
          </Fade>
        </section>

        {/* Skills section */}
        <Fade delay={300} duration={1000}>
          <section id="skills" style={{ paddingTop: navbarHeight }}>
            <div>
              <h3 className="font-mono text-3xl py-1 dark:text-white ">Skills & Interests</h3>
              <p className="font-mono text-lg py-2 leading-8 text-gray-800 dark:text-gray-200">
                As a passionate and dedicated software engineer, I have honed my expertise in various programming languages
                and technologies, enabling me to develop innovative and efficient solutions for complex problems. I am constantly seeking new opportunities
                to broaden my skillset and stay up-to-date with the latest advancements in the ever-evolving world of technology.
              </p>
            </div>
            <div className="lg:flex gap-10">

              {/* Mobile dev */}
              <div className="text-center shadow-lg p-10 rounded-xl my-10  dark:bg-white flex-1">
                <Image src={design} width={150} height={150} />
                <h3 className="font-mono text-lg font-medium pt-8 pb-2  ">
                  <strong>Mobile Applications Development</strong>
                </h3>
                <p className="font-mono py-2">
                  Created mobile app that enhanced user experience and functionality.
                </p>
                <h4 className="font-mono py-4 text-teal-600">Tools and Frameworks</h4>
                <p className="font-mono text-gray-800 py-1">IDE: Android Studio</p>
                <p className="font-mono text-gray-800 py-1">Languages: Java, Kotlin</p>
              </div>

              {/* Web Dev */}
              <div className="text-center shadow-lg p-10 rounded-xl my-10 dark:bg-white flex-1">
                <Image src={code} width={150} height={150} />
                <h3 className="font-mono text-lg font-medium pt-8 pb-2 ">
                  <strong>Web Applications Development</strong>
                </h3>
                <p className="font-mono py-2">
                  Developed responsive and interactive web applications.
                </p>
                <h4 className="font-mono py-4 text-teal-600">Tools and Frameworks</h4>
                <p className="font-mono text-gray-800 py-1">IDEs: Visual Studio Code</p>
                <p className="font-mono text-gray-800 py-1">Languages: HTML, CSS, JavaScript</p>
                <p className="font-mono text-gray-800 py-1">Frameworks: React.js, Angular</p>
                <p className="font-mono text-gray-800 py-1">Back-End: Node.js, Express.js, MongoDB</p>
              </div>

              {/* AI */}
              <div className="text-center shadow-lg p-10 rounded-xl my-10 dark:bg-white flex-1">
                <Image src={consulting} width={150} height={150} />
                <h3 className="font-mono text-lg font-medium pt-8 pb-2 ">
                  <strong>Artificial Intelligence</strong>
                </h3>
                <p className="font-mono py-2">
                  Implemented AI algorithms and models to solve complex problems and automate tasks, improving efficiency and accuracy.
                </p>
                <h4 className="font-mono py-4 text-teal-600">Tools and Frameworks</h4>
                <p className="font-mono text-gray-800 py-1">IDEs: Jupyter Notebook, Spyder</p>
                <p className="font-mono text-gray-800 py-1">Language: Python</p>
                <p className="font-mono text-gray-800 py-1">Libraries/Frameworks: TensorFlow, PyTorch, scikit-learn</p>
                <p className="font-mono text-gray-800 py-1">Computer Vision: OpenCV, Keras</p>
                <p className="font-mono text-gray-800 py-1">Natural Language Processing (NLP)</p>
              </div>
            </div>
          </section>
        </Fade>

        {/* Projects section */}
        <Fade delay={300} duration={1000}>
          <section id="projects" className="py-10" style={{ paddingTop: navbarHeight }}>
            <div>
              <h3 className="font-mono text-3xl py-1 dark:text-white ">Selected Projects</h3>
              <p className="font-mono text-lg py-2 leading-8 text-gray-800 dark:text-gray-200">
                Throughout my journey, I have gained extensive experience in developing diverse applications aimed
                at solving real-world problems. These projects showcase my ability to create valuable and practical
                apps that address various challenges, demonstrating my continuous growth and learning.
              </p>
            </div>
            <div className="flex flex-col gap-10 py-10 lg:flex-row lg:flex-wrap">
              {projects.map((project, index) => (

                <div className="basis-1/3 flex-1 dark:text-white" key={index}>
                  {/* Project 1 */}
                  <Image
                    className="rounded-lg object-cover"
                    width={"100%"}
                    height={"100%"}
                    src={project.image}
                    alt={`Project ${index + 1}`}
                  />
                  <p className="font-mono py-4">{project.description}</p>
                </div>
              ))}

              <div className="basis-1/3 flex-1">
                {/* Project 2 */}
                <Image
                  className="rounded-lg object-cover"
                  width={"100%"}
                  height={"100%"}
                  src={proj2}
                />
              </div>

              <div className="basis-1/3 flex-1">
                {/* Project 3 */}
                <Image
                  className="rounded-lg object-cover"
                  width={"100%"}
                  height={"100%"}
                  src={proj3}
                />
              </div>
            </div>
          </section>
        </Fade>

        {/* Footer */}
        <footer className="py-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Ivan Joshua Zapanta. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
