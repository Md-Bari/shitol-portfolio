import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const navLinks = [
  { path: "/",           label: "Home",       icon: "🏠", isScroll: true,  scrollTo: "header"     },
  { path: "#projects",   label: "Projects",   icon: "💼", isScroll: true,  scrollTo: "projects"   },
  { path: "#research",   label: "Research",   icon: "📖", isScroll: true,  scrollTo: "research"   },
  { path: "#experience", label: "Experience", icon: "🧠", isScroll: true,  scrollTo: "experience" },
  { path: "#skills",     label: "Skills",     icon: "⚡", isScroll: true,  scrollTo: "skills"     },
  { path: "#education",  label: "Education",  icon: "🎓", isScroll: true,  scrollTo: "education"  },
  { path: "#github",     label: "GitHub",     icon: "🐙", isScroll: true,  scrollTo: "github"     },
  { path: "#contact",    label: "Contact",    icon: "📧", isScroll: true,  scrollTo: "contact"    },
  { path: "/resume",     label: "Resume",     icon: "📄", isScroll: false                         },
];

const Navbar = () => {
  const [isOpen,         setIsOpen]         = useState(false);
  const [activeSection,  setActiveSection]  = useState("header");
  const [scrolled,       setScrolled]       = useState(false);
  const [mounted,        setMounted]        = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef  = useRef(null);
  const linkRefs = useRef({});
  const navigate = useNavigate();

  /* ── mount animation ── */
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  /* ── scroll detection (navbar shrink) ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── active section via scroll position ── */
  useEffect(() => {
    const sectionIds = ["header", "projects", "research", "experience", "skills", "education", "github", "contact"];
    const NAVBAR_HEIGHT = 90; // px — offset so section registers after clearing navbar

    const getActive = () => {
      // Walk sections in order; the last one whose top is <= NAVBAR_HEIGHT is active
      let active = "header";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= NAVBAR_HEIGHT) {
          active = id;
        }
      }
      return active;
    };

    const onScroll = () => setActiveSection(getActive());

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  /* ── animated underline indicator ── */
  useEffect(() => {
    const activeLink = navLinks.find(
      (l) => l.isScroll ? l.scrollTo === activeSection : false
    ) || navLinks.find((l) => !l.isScroll);

    const key = activeSection || "header";
    const el  = linkRefs.current[key];
    if (el && navRef.current) {
      const navRect  = navRef.current.getBoundingClientRect();
      const linkRect = el.getBoundingClientRect();
      setIndicatorStyle({
        left:  linkRect.left - navRect.left,
        width: linkRect.width,
      });
    }
  }, [activeSection]);

  const handleNavClick = (e, link) => {
    if (link.isScroll) {
      e.preventDefault();
      setIsOpen(false);
      if (link.scrollTo === "header") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          document.getElementById(link.scrollTo)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      setIsOpen(false);
    }
  };

  const isLinkActive = (link) =>
    link.isScroll ? activeSection === link.scrollTo : false;

  return (
    <>
      <style>{`
        @keyframes navSlideDown {
          from { opacity: 0; transform: translateY(-100%); }
          to   { opacity: 1; transform: translateY(0);     }
        }
        @keyframes logoSpin {
          0%   { transform: rotate(0deg)   scale(1);    }
          50%  { transform: rotate(180deg) scale(1.08); }
          100% { transform: rotate(360deg) scale(1);    }
        }
        @keyframes shimmerMove {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes mobileMenuSlide {
          from { opacity: 0; transform: translateY(-12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }
        @keyframes indicatorSlide {
          from { opacity: 0; transform: scaleX(0.5); }
          to   { opacity: 1; transform: scaleX(1);   }
        }
        @keyframes navLinkIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes borderGlow {
          0%,100% { border-color: rgba(99,102,241,0.3); box-shadow: 0 0 0 rgba(99,102,241,0); }
          50%      { border-color: rgba(139,92,246,0.6); box-shadow: 0 0 20px rgba(139,92,246,0.15); }
        }
        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 9000;
          animation: ${mounted ? "navSlideDown 0.55s cubic-bezier(0.22,1,0.36,1) forwards" : "none"};
        }
        .nav-bar {
          margin: ${scrolled ? "8px 16px" : "0"};
          border-radius: ${scrolled ? "999px" : "0"};
          background: ${scrolled
            ? "rgba(5,5,15,0.85)"
            : "rgba(5,5,15,0.6)"};
          backdrop-filter: blur(24px) saturate(1.5);
          -webkit-backdrop-filter: blur(24px) saturate(1.5);
          border: 1px solid rgba(99,102,241,0.25);
          transition:
            margin 0.4s cubic-bezier(0.22,1,0.36,1),
            border-radius 0.4s cubic-bezier(0.22,1,0.36,1),
            background 0.3s ease,
            box-shadow 0.3s ease;
          box-shadow: ${scrolled
            ? "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(139,92,246,0.12)"
            : "none"};
          animation: borderGlow 4s ease-in-out infinite;
          position: relative;
          overflow: hidden;
        }
        .nav-bar::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.06) 50%, rgba(56,189,248,0.06) 100%);
          background-size: 200% 100%;
          animation: shimmerMove 6s linear infinite;
          pointer-events: none;
        }
        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: ${scrolled ? "60px" : "72px"};
          transition: height 0.3s ease;
          position: relative;
        }
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; flex-shrink: 0;
        }
        .logo-ring {
          position: relative;
          width: ${scrolled ? "40px" : "48px"};
          height: ${scrolled ? "40px" : "48px"};
          transition: width 0.3s ease, height 0.3s ease;
          flex-shrink: 0;
        }
        .logo-ring::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #8b5cf6, #38bdf8, #ec4899, #8b5cf6);
          animation: logoSpin 4s linear infinite;
          z-index: 0;
        }
        .logo-ring::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #8b5cf6, #38bdf8, #ec4899, #8b5cf6);
          animation: logoSpin 4s linear infinite;
          filter: blur(8px);
          opacity: 0.5;
          z-index: 0;
        }
        .logo-img {
          position: relative;
          z-index: 1;
          width: 100%; height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #0a0a14;
          transition: transform 0.3s ease;
        }
        .nav-logo:hover .logo-img { transform: scale(1.08); }
        .logo-name {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #e2e8f0, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          white-space: nowrap;
        }

        /* ── desktop links ── */
        .nav-links-desktop {
          display: flex; align-items: center; gap: 2px;
          position: relative;
        }
        @media (max-width: 767px) { .nav-links-desktop { display: none; } }

        .nav-link-indicator {
          position: absolute;
          bottom: -2px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, #8b5cf6, #38bdf8);
          transition: left 0.35s cubic-bezier(0.22,1,0.36,1), width 0.35s cubic-bezier(0.22,1,0.36,1);
          box-shadow: 0 0 10px rgba(139,92,246,0.7);
        }

        .nav-link-btn {
          position: relative;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          background: transparent;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: flex; align-items: center; gap: 5px;
          transition: color 0.2s ease, background 0.2s ease;
          white-space: nowrap;
          font-family: inherit;
        }
        .nav-link-btn:hover {
          color: #fff;
          background: rgba(139,92,246,0.12);
        }
        .nav-link-btn.active {
          color: #fff;
          background: rgba(139,92,246,0.15);
        }
        .nav-link-btn .link-icon { font-size: 0.8rem; }

        /* ── social pills ── */
        .social-pill {
          display: flex; align-items: center; gap: 4px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          padding: 5px 10px;
        }
        @media (max-width: 767px) { .social-pill { display: none; } }

        .social-icon {
          width: 30px; height: 30px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.55);
          transition: color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s;
          font-size: 0.9rem;
        }
        .social-icon:hover {
          color: #fff;
          transform: translateY(-2px) scale(1.15);
        }
        .social-icon.gh:hover  { background: rgba(255,255,255,0.12); box-shadow: 0 4px 14px rgba(255,255,255,0.15); }
        .social-icon.li:hover  { background: rgba(10,102,194,0.35);  box-shadow: 0 4px 14px rgba(10,102,194,0.4);  }
        .social-icon.wa:hover  { background: rgba(37,211,102,0.25);  box-shadow: 0 4px 14px rgba(37,211,102,0.35); }
        .social-icon.em:hover  { background: rgba(234,179,8,0.2);    box-shadow: 0 4px 14px rgba(234,179,8,0.3);   }

        /* ── mobile hamburger ── */
        .hamburger-btn {
          display: none;
          padding: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: #fff;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .hamburger-btn:hover { background: rgba(139,92,246,0.25); transform: rotate(90deg); }
        @media (max-width: 767px) { .hamburger-btn { display: flex; align-items: center; justify-content: center; } }

        /* ── mobile menu ── */
        .mobile-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 16px; right: 16px;
          background: rgba(8,8,20,0.96);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(139,92,246,0.25);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.1);
          animation: mobileMenuSlide 0.3s cubic-bezier(0.22,1,0.36,1) forwards;
          z-index: 100;
        }
        .mobile-menu-inner { padding: 12px; }
        .mobile-link {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 14px;
          border-radius: 12px;
          font-size: 0.92rem; font-weight: 500;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          transition: color 0.2s, background 0.2s, transform 0.15s;
          margin-bottom: 2px;
          border: 1px solid transparent;
          cursor: pointer;
          width: 100%; background-color: transparent; font-family: inherit;
          text-align: left;
        }
        .mobile-link:hover, .mobile-link.active {
          color: #fff;
          background: rgba(139,92,246,0.18);
          border-color: rgba(139,92,246,0.2);
          transform: translateX(4px);
        }
        .mobile-link-icon { font-size: 1.1rem; }
        .mobile-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 8px 0;
        }
        .mobile-socials {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          padding: 8px 0 4px;
        }
        .mobile-social-btn {
          width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
          font-size: 1rem;
          transition: all 0.2s;
          text-decoration: none;
        }
        .mobile-social-btn:hover { color: #fff; background: rgba(139,92,246,0.3); transform: scale(1.12); }

        /* ── progress bar at very top ── */
        .scroll-progress {
          position: fixed;
          top: 0; left: 0;
          height: 2px;
          background: linear-gradient(90deg, #8b5cf6, #38bdf8, #ec4899);
          z-index: 9001;
          transition: width 0.1s linear;
          box-shadow: 0 0 8px rgba(139,92,246,0.8);
        }
      `}</style>

      {/* Scroll progress bar */}
      <ScrollProgress />

      <nav className="nav-root">
        <div className="nav-bar">
          <div className="nav-inner" ref={navRef}>

            {/* ── Logo ── */}
            <Link to="/" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <div className="logo-ring">
                <img src={logo} alt="Rofiqul Bari Logo" className="logo-img" />
              </div>
              <span className="logo-name">Rofiqul Bari</span>
            </Link>

            {/* ── Desktop nav links ── */}
            <div className="nav-links-desktop">
              {/* Animated indicator */}
              {indicatorStyle.width && (
                <span className="nav-link-indicator" style={indicatorStyle} />
              )}

              {navLinks.map((link, i) =>
                link.isScroll ? (
                  <a
                    key={link.path}
                    href={link.path}
                    ref={(el) => { linkRefs.current[link.scrollTo] = el; }}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`nav-link-btn${isLinkActive(link) ? " active" : ""}`}
                    style={{ animationDelay: `${0.1 + i * 0.06}s` }}
                  >
                    <span className="link-icon">{link.icon}</span>
                    {link.label}
                  </a>
                ) : (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    ref={(el) => { linkRefs.current[link.path] = el; }}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `nav-link-btn${isActive ? " active" : ""}`}
                    style={{ animationDelay: `${0.1 + i * 0.06}s` }}
                  >
                    <span className="link-icon">{link.icon}</span>
                    {link.label}
                  </NavLink>
                )
              )}
            </div>

            {/* ── Social icons ── */}
            <div className="social-pill">
              <a href="https://wa.me/8801738887851" target="_blank" rel="noopener noreferrer" className="social-icon wa" title="WhatsApp">
                <FaWhatsapp />
              </a>
              <a href="https://github.com/Md-Bari" target="_blank" rel="noopener noreferrer" className="social-icon gh" title="GitHub">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/rofiqul-bari-shitol-414965274/" target="_blank" rel="noopener noreferrer" className="social-icon li" title="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="mailto:rofiqulbari01@gmail.com" className="social-icon em" title="Email">
                <HiOutlineMail />
              </a>
            </div>

            {/* ── Mobile hamburger ── */}
            <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* ── Mobile menu ── */}
          {isOpen && (
            <div className="mobile-menu">
              <div className="mobile-menu-inner">
                {navLinks.map((link) =>
                  link.isScroll ? (
                    <button
                      key={link.path}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`mobile-link${isLinkActive(link) ? " active" : ""}`}
                    >
                      <span className="mobile-link-icon">{link.icon}</span>
                      {link.label}
                    </button>
                  ) : (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) => `mobile-link${isActive ? " active" : ""}`}
                    >
                      <span className="mobile-link-icon">{link.icon}</span>
                      {link.label}
                    </NavLink>
                  )
                )}

                <div className="mobile-divider" />

                <div className="mobile-socials">
                  <a href="https://wa.me/8801738887851" target="_blank" rel="noopener noreferrer" className="mobile-social-btn" title="WhatsApp"><FaWhatsapp /></a>
                  <a href="https://github.com/Md-Bari" target="_blank" rel="noopener noreferrer" className="mobile-social-btn" title="GitHub"><FaGithub /></a>
                  <a href="https://www.linkedin.com/in/rofiqul-bari-shitol-414965274/" target="_blank" rel="noopener noreferrer" className="mobile-social-btn" title="LinkedIn"><FaLinkedin /></a>
                  <a href="mailto:rofiqulbari01@gmail.com" className="mobile-social-btn" title="Email"><HiOutlineMail /></a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

/* ── Scroll progress indicator ── */
function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const pct = (window.scrollY / (el.scrollHeight - el.clientHeight)) * 100;
      setWidth(Math.min(pct, 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

export default Navbar;
