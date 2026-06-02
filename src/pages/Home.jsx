import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Skills from "./Skills";
import Projects from "./Projects";
import Research from "./Research";
import Education from "./Education";
import Experience from "./Experience";
import Contact from "./Contact";
import GitHubStats from "./GitHubStats";
import Footer from "../Components/Footer";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when navigating to home
    if (location.pathname === "/" && !location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div>
      <Header />
      <Projects />
      <Research />
      <Experience />
      <Skills />
      <Education />
      <GitHubStats />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
