import { useEffect, useState } from "react";
import "./LoadingScreen.css";

const helloWords = [
  { text: "Hello", lang: "English" },
  { text: "হ্যালো", lang: "Bengali" },
  { text: "مرحبا", lang: "Arabic" },
  { text: "Hola", lang: "Spanish" },
  { text: "Bonjour", lang: "French" },
  { text: "Hallo", lang: "German" },
  { text: "Ciao", lang: "Italian" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "你好", lang: "Chinese" },
  { text: "안녕하세요", lang: "Korean" },
];

export default function LoadingScreen({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [visible, setVisible] = useState(true);

  const WORD_DURATION = 120; // ms per hello word
  const WELCOME_DURATION = 2200; // ms to show welcome
  const FADE_DURATION = 700; // ms for fade out

  useEffect(() => {
    if (currentIndex < helloWords.length) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, WORD_DURATION);
      return () => clearTimeout(timer);
    } else {
      // All words shown, show welcome message
      const welcomeTimer = setTimeout(() => {
        setShowWelcome(true);
      }, 100);
      return () => clearTimeout(welcomeTimer);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (showWelcome) {
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
      }, WELCOME_DURATION);
      return () => clearTimeout(fadeTimer);
    }
  }, [showWelcome]);

  useEffect(() => {
    if (fadeOut) {
      const hideTimer = setTimeout(() => {
        setVisible(false);
        onComplete && onComplete();
      }, FADE_DURATION);
      return () => clearTimeout(hideTimer);
    }
  }, [fadeOut, onComplete]);

  if (!visible) return null;

  const current = helloWords[Math.min(currentIndex, helloWords.length - 1)];

  return (
    <div className={`loading-screen ${fadeOut ? "fade-out" : ""}`}>
      {/* Animated background particles */}
      <div className="loading-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className={`particle particle-${i}`} />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Grid overlay */}
      <div className="loading-grid" />

      <div className="loading-content">
        {!showWelcome ? (
          <div className="hello-section">
            {/* Progress bar */}
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${(currentIndex / helloWords.length) * 100}%`,
                }}
              />
            </div>

            {/* Hello word */}
            <div className="hello-word-wrapper" key={currentIndex}>
              <p className="hello-word">{current.text}</p>
              <p className="hello-lang">{current.lang}</p>
            </div>

            {/* Floating mini words */}
            <div className="floating-words">
              {helloWords.slice(Math.max(0, currentIndex - 5), currentIndex).map((w, i) => (
                <span
                  key={`${w.text}-${i}`}
                  className="floating-word"
                  style={{ "--delay": `${i * 0.05}s` }}
                >
                  {w.text}
                </span>
              ))}
            </div>

            <p className="loading-counter">
              {currentIndex} / {helloWords.length}
            </p>
          </div>
        ) : (
          <div className="welcome-section">
            <div className="welcome-badge">✦ Portfolio</div>
            <h1 className="welcome-title">
              <span className="welcome-line-1">Welcome to</span>
              <span className="welcome-name">Rofiqul Bari's</span>
              <span className="welcome-line-2">Portfolio</span>
            </h1>
            <div className="welcome-tagline">
              <span className="tagline-dot" />
              <span>Loading your experience...</span>
              <span className="tagline-dot" />
            </div>
            <div className="welcome-loader">
              <div className="loader-bar" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom branding */}
      <div className="loading-footer">
        <div className="footer-dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
