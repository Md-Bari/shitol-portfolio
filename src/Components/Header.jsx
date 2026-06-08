import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { gsap } from "gsap";
import profilePhoto from "../assets/Profile-photo.png";
import cyberPhoto from "../assets/cyber-profile.png";
import resumePdf from "../assets/resume.pdf";

const resumeDownloadPath = resumePdf;

const Header = () => {
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const socialRef = useRef(null);
  const imageContainerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Calculate 3D tilt angles (max 15 degrees)
    const tiltX = (y / (rect.height / 2)) * -15;
    const tiltY = (x / (rect.width / 2)) * 15;

    gsap.to(".interactive-profile-frame", {
      rotateX: tiltX,
      rotateY: tiltY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.3,
    });

    // Translate background glow for parallax
    gsap.to(".profile-glow-bg", {
      x: x * 0.15,
      y: y * 0.15,
      ease: "power2.out",
      duration: 0.4,
    });
  };

  const handleMouseEnter = () => {
    gsap.to(".interactive-profile-frame", {
      scale: 1.05,
      boxShadow: "0 25px 50px -12px rgba(20, 184, 166, 0.45)",
      duration: 0.3,
    });
    gsap.to(".rotating-glow-border", {
      scale: 1.12,
      opacity: 1,
      duration: 0.3,
    });
    gsap.to(".cyber-profile-photo", {
      opacity: 1,
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(".interactive-profile-frame", {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      boxShadow: "0 0px 0px 0px rgba(0,0,0,0)",
      ease: "power2.out",
      duration: 0.5,
    });
    gsap.to(".profile-glow-bg", {
      x: 0,
      y: 0,
      ease: "power2.out",
      duration: 0.5,
    });
    gsap.to(".rotating-glow-border", {
      scale: 1,
      opacity: 0.75,
      duration: 0.5,
    });
    gsap.to(".cyber-profile-photo", {
      opacity: 0,
      duration: 0.4,
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Badge pops in
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 }
      )
        // Heading slides up
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.3"
        )
        // Subheading
        .fromTo(
          subheadingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        // Description
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        // CTA button
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5 },
          "-=0.2"
        )
        // Social links stagger
        .fromTo(
          socialRef.current.children,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.2"
        )
        // Profile image from right
        .fromTo(
          imageContainerRef.current,
          { opacity: 0, x: 80, scale: 0.9 },
          { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "power3.out" },
          "-=0.9"
        )
        // Scroll indicator
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      id="header"
      ref={headerRef}
      className="min-h-screen flex items-start justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-2 sm:pt-28 sm:pb-4 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gray-950"></div>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 20%, rgba(20, 184, 166, 0.12), transparent 50%), radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.1), transparent 50%)' }}></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm"
              style={{ opacity: 0 }}
            >
              <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-cyan-400"></span>
              </span>
              <span className="text-xs sm:text-sm text-cyan-300 font-medium">
                AI + Laravel Expert
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3 sm:space-y-4">
              <h1
                ref={headingRef}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                style={{ opacity: 0 }}
              >
                Hi, I'm{" "}
                <span className="bg-linear-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                  Md Rofiqul Bari
                </span>
              </h1>
              <h2
                ref={subheadingRef}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-300"
                style={{ opacity: 0 }}
              >
                AI Engineer || Full Stack Developer
              </h2>
              <p
                ref={descRef}
                className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-xl leading-relaxed mx-auto lg:mx-0"
                style={{ opacity: 0 }}
              >
                I build AI-powered experiences and Laravel full-stack web
                applications with React, PHP, and modern APIs. My focus is
                on clean architecture, responsive design, and interfaces that
                feel fast and polished.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
              style={{ opacity: 0 }}
            >
              <Link
                to="/resume"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-teal-500 via-[#14B8A6] to-teal-600 backdrop-blur-sm border border-teal-400/50 text-white text-sm sm:text-base font-semibold rounded-full hover:from-teal-400 hover:via-teal-500 hover:to-emerald-500 hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                View Resume
              </Link>
              <a
                href={resumeDownloadPath}
                download="md-rofiqul-bari-resume.pdf"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/15 text-white text-sm sm:text-base font-semibold rounded-full hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                Download PDF
              </a>
            </div>

            {/* Social Links */}
            <div
              ref={socialRef}
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-4 justify-center lg:justify-start"
            >
              <span className="text-gray-400 text-xs sm:text-sm" style={{ opacity: 0 }}>
                Connect with me:
              </span>
              <div className="flex gap-2 sm:gap-3" style={{ opacity: 0 }}>
                <a
                  href="https://github.com/Md-Bari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 rounded-full bg-gray-800/80 border border-blue-500/20 text-gray-300 hover:text-white hover:bg-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-110"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rofiqul-bari-shitol-414965274/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 rounded-full bg-gray-800/80 border border-blue-500/20 text-gray-300 hover:text-white hover:bg-indigo-600 hover:border-blue-500 transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="mailto:rofiqulbari01@gmail.com"
                  className="p-2 sm:p-3 rounded-full bg-gray-800/80 border border-blue-500/20 text-gray-300 hover:text-white hover:bg-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-110"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div
            ref={imageContainerRef}
            className="relative flex items-center justify-center lg:justify-end mt-4 lg:mt-0"
            style={{ opacity: 0 }}
          >
            {/* Animated background circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="profile-glow-bg absolute w-48 h-48 sm:w-72 sm:h-72 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="profile-glow-bg absolute w-64 h-64 sm:w-96 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
            </div>

            {/* Image container */}
            <div
              className="relative z-10 cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Rotating border */}
              <div className="rotating-glow-border absolute -inset-3 sm:-inset-4 bg-linear-to-r from-teal-400 via-[#14B8A6] to-emerald-500 rounded-full opacity-75 blur-xl transition-all duration-500 animate-spin-slow"></div>

              {/* Image frame */}
              <div className="interactive-profile-frame relative bg-gray-900 p-1.5 sm:p-2 rounded-full border-2 sm:border-4 border-teal-500/50 transition-all duration-300">
                <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 sm:border-4 border-gray-800 relative">
                  {/* Original Image */}
                  <img
                    src={profilePhoto}
                    alt="Md Rofiqul Bari"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500 absolute inset-0"
                  />
                  {/* Cybernetic AI Avatar Image (Hover State) */}
                  <img
                    src={cyberPhoto}
                    alt="Md Rofiqul Bari Cybernetic"
                    className="cyber-profile-photo w-full h-full object-cover absolute inset-0 opacity-0 pointer-events-none transition-all duration-500 scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        style={{ opacity: 0 }}
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-blue-500/50 rounded-full p-1">
          <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-blue-500 rounded-full mx-auto animate-scroll"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
