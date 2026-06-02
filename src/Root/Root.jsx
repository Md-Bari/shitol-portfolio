import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import LottieModule from "lottie-react";
import Navbar from "../Components/Navbar";
import CustomCursor from "../Components/CustomCursor";
import RightSidebar from "../Components/RightSidebar";
import snowAnimation from "../../public/bg_style.json";
import LoadingScreen from "../Components/LoadingScreen";

// Handle CJS/ESM interop: rolldown-vite may wrap the default export in an object
const Lottie = typeof LottieModule === "function" ? LottieModule : LottieModule.default;

const Root = () => {
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const lottieRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate mouse position relative to viewport center
      // Range: -1 to 1 for both x and y
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      {/* Lottie snow background — fixed, full screen, behind everything */}
      <div
        className="fixed inset-0 z-0 pointer-events-none transition-all duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) scale(1.1)`,
          opacity: animationLoaded ? 0.5 : 0,
        }}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={snowAnimation}
          loop={true}
          autoplay={true}
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid slice',
            clearCanvas: true,
            progressiveLoad: true,
            hideOnTransparent: true,
          }}
          onDOMLoaded={() => setAnimationLoaded(true)}
          style={{ 
            width: "100%", 
            height: "100%",
            filter: "hue-rotate(180deg) saturate(1.4) brightness(1.25)",
          }}
        />
        {/* Primary: Blue-500, Secondary: Cyan-500, Accent: Indigo-600 */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-cyan-500/8 to-indigo-600/10"></div>
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <CustomCursor />
        <Navbar />
        <RightSidebar />
        <div className="pt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Root;
