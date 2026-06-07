import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Document, Page, pdfjs } from "react-pdf";
import { motion, AnimatePresence } from "framer-motion";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  BookOpen,
  ExternalLink,
  Download,
  Calendar,
  Users,
  Tag,
  Building2,
  FileText,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Configure pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   RESEARCH DATA — edit this to add your paper
───────────────────────────────────────────── */
const researchPapers = [
  {
    id: 1,
    title: "Your Research Paper Title Goes Here",
    subtitle: "A Deep Dive Into the Subject Matter",
    authors: ["Rofiqul Bari", "Co-Author Name", "Supervisor Name"],
    publisher: "Journal / Conference Name",
    year: "2024",
    doi: "https://doi.org/10.xxxx/xxxxxxx",
    abstract:
      "This is a placeholder abstract. Replace this with your actual research abstract. This section should summarize the background, objectives, methodology, key findings, and conclusions of your research paper in 150–250 words.",
    keywords: ["Machine Learning", "Deep Learning", "Computer Vision", "Neural Networks", "AI"],
    pdfPath: null, // 👈 Set your PDF path here, e.g. "/research/my-paper.pdf"
    status: "Published",                           // Published | Under Review | Preprint
    pages: "1–12",
    volume: "Vol. 1",
    accent: "#8b5cf6",
    gradient: "linear-gradient(135deg, #8b5cf6, #6366f1, #38bdf8)",
  },
  {
    id: 2,
    title: "Deep Learning-Based Visual Odometry for Autonomous Underwater Vehicles",
    subtitle: "Addressing Low-Light and Turbid Underwater Environments",
    authors: ["Rofiqul Bari", "Dr. Jane Smith", "Prof. Alan Turing"],
    publisher: "IEEE International Conference on Robotics and Automation (ICRA)",
    year: "2025",
    doi: "https://doi.org/10.1109/ICRA.2025.01234",
    abstract:
      "Autonomous Underwater Vehicles (AUVs) face severe challenges in navigation and mapping due to low-light conditions, floating particles, and water turbidity. This research presents a novel visual odometry framework that combines a deep convolutional neural network for image enhancement with a robust feature-matching transformer. By learning domain-invariant representations, our model significantly reduces drift errors in degraded underwater sequences. Experimental results on public datasets and real-world sea trials demonstrate an improvement of 15% in trajectory estimation accuracy compared to state-of-the-art traditional and learning-based visual odometry systems.",
    keywords: ["Underwater Robotics", "Visual Odometry", "Feature Matching", "Transformers", "Image Enhancement"],
    pdfPath: null,
    status: "Published",
    pages: "145–152",
    volume: "Vol. 6",
    accent: "#06b6d4",
    gradient: "linear-gradient(135deg, #06b6d4, #0ea5e9, #3b82f6)",
  },
  {
    id: 3,
    title: "Attention-Guided Multi-Scale Fusion for Real-Time Semantic Segmentation",
    subtitle: "Enhancing Autonomous Vehicle Perception on Edge Platforms",
    authors: ["Rofiqul Bari", "Sarah Jenkins", "Dr. Richard Feynman"],
    publisher: "ACM Transactions on Intelligent Systems and Technology",
    year: "2026",
    doi: "https://doi.org/10.1145/36789.012345",
    abstract:
      "Semantic segmentation is a critical component for autonomous vehicles, requiring both high accuracy and real-time execution speeds. This paper proposes an attention-guided multi-scale fusion network (AMF-Net) optimized for embedded edge platforms. We introduce a lightweight dual-attention module that dynamically weights spatial and contextual features, alongside a multi-scale decoder that restores high-resolution details with minimal computational overhead. AMF-Net achieves a Mean Intersection over Union (mIoU) of 78.4% on the Cityscapes dataset at 45 Frames Per Second (FPS) on a standard edge device, striking an optimal balance between latency and accuracy.",
    keywords: ["Semantic Segmentation", "Real-Time Systems", "Autonomous Vehicles", "Attention Mechanism", "Edge Computing"],
    pdfPath: null,
    status: "Under Review",
    pages: "1–10",
    volume: "Vol. 12",
    accent: "#10b981",
    gradient: "linear-gradient(135deg, #10b981, #059669, #34d399)",
  },
];

/* ─────────────────────────────────────────────
   PDF Preview Card
───────────────────────────────────────────── */
function PdfPreview({ pdfPath, accent }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!pdfPath || error) {
    return (
      <div
        className="research-pdf-placeholder"
        style={{ borderColor: `${accent}40` }}
      >
        <div className="pdf-placeholder-inner">
          <FileText size={48} style={{ color: `${accent}80` }} />
          <p className="pdf-placeholder-label">PDF Preview</p>
          <p className="pdf-placeholder-sub">
            {!pdfPath
              ? "Drop your PDF into public/ and set pdfPath"
              : "Could not load PDF"}
          </p>
        </div>
        {/* Decorative lines mimicking a document */}
        <div className="pdf-lines">
          {[100, 90, 95, 70, 85, 60, 80].map((w, i) => (
            <div
              key={i}
              className="pdf-line"
              style={{ width: `${w}%`, background: `${accent}20` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="research-pdf-preview" style={{ borderColor: `${accent}40` }}>
      {!loaded && (
        <div className="pdf-loading">
          <div className="pdf-spinner" style={{ borderTopColor: accent }} />
        </div>
      )}
      <Document
        file={pdfPath}
        onLoadSuccess={() => setLoaded(true)}
        onLoadError={() => setError(true)}
        loading=""
      >
        <Page
          pageNumber={1}
          width={320}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
      {loaded && (
        <div className="pdf-overlay">
          <span className="pdf-badge" style={{ background: accent }}>
            Page 1 Preview
          </span>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Single Research Card
───────────────────────────────────────────── */
function ResearchCard({ paper, index }) {
  const [expanded, setExpanded] = useState(false);

  const statusColor =
    paper.status === "Published"
      ? "#10b981"
      : paper.status === "Under Review"
      ? "#f59e0b"
      : "#8b5cf6";

  return (
    <div className="research-card">
      {/* Top gradient bar */}
      <div className="research-card-bar" style={{ background: paper.gradient }} />

      <div className="research-card-body">
        {/* ── LEFT: PDF Preview ── */}
        <div className="research-left">
          <PdfPreview pdfPath={paper.pdfPath} accent={paper.accent} />

          {/* Action buttons */}
          <div className="research-actions">
            {paper.pdfPath && (
              <>
                <a
                  href={paper.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="research-btn research-btn-primary"
                  style={{ background: paper.gradient }}
                >
                  <ExternalLink size={14} />
                  View PDF
                </a>
                <a
                  href={paper.pdfPath}
                  download
                  className="research-btn research-btn-secondary"
                  style={{ borderColor: `${paper.accent}50`, color: paper.accent }}
                >
                  <Download size={14} />
                  Download
                </a>
              </>
            )}
            {paper.doi && (
              <a
                href={paper.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="research-btn research-btn-secondary"
                style={{ borderColor: `${paper.accent}50`, color: paper.accent }}
              >
                <ExternalLink size={14} />
                DOI / Link
              </a>
            )}
          </div>
        </div>

        {/* ── RIGHT: Metadata ── */}
        <div className="research-right">
          {/* Status badge */}
          <div className="research-status-row">
            <span
              className="research-status-badge"
              style={{ background: `${statusColor}20`, color: statusColor, borderColor: `${statusColor}40` }}
            >
              <span className="status-dot" style={{ background: statusColor }} />
              {paper.status}
            </span>
            <span className="research-year" style={{ color: paper.accent }}>
              <Calendar size={13} />
              {paper.year}
            </span>
          </div>

          {/* Title */}
          <h3 className="research-title">{paper.title}</h3>
          {paper.subtitle && (
            <p className="research-subtitle" style={{ color: paper.accent }}>
              {paper.subtitle}
            </p>
          )}

          {/* Divider */}
          <div className="research-divider" style={{ background: paper.gradient }} />

          {/* Meta rows */}
          <div className="research-meta">
            <div className="research-meta-row">
              <Users size={14} className="research-meta-icon" />
              <div>
                <span className="research-meta-label">Authors</span>
                <span className="research-meta-value">
                  {paper.authors.join(" · ")}
                </span>
              </div>
            </div>

            <div className="research-meta-row">
              <Building2 size={14} className="research-meta-icon" />
              <div>
                <span className="research-meta-label">Publisher</span>
                <span className="research-meta-value">{paper.publisher}</span>
              </div>
            </div>

            {paper.volume && (
              <div className="research-meta-row">
                <BookOpen size={14} className="research-meta-icon" />
                <div>
                  <span className="research-meta-label">Volume / Pages</span>
                  <span className="research-meta-value">
                    {paper.volume} · pp. {paper.pages}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Keywords */}
          <div className="research-keywords">
            <Tag size={12} className="research-tag-icon" style={{ color: paper.accent }} />
            <div className="research-keyword-chips">
              {paper.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="research-keyword"
                  style={{
                    color: paper.accent,
                    borderColor: `${paper.accent}35`,
                    background: `${paper.accent}10`,
                  }}
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Abstract (collapsible) */}
          <div className="research-abstract-wrap">
            <button
              className="research-abstract-toggle"
              onClick={() => setExpanded(!expanded)}
              style={{ color: paper.accent }}
            >
              <FileText size={13} />
              Abstract
              {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
            <div className={`research-abstract-body ${expanded ? "expanded" : ""}`}>
              <p className="research-abstract-text">{paper.abstract}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Research Section
───────────────────────────────────────────── */
const Research = () => {
  const sectionRef = useRef(null);
  const badgeRef   = useRef(null);
  const titleRef   = useRef(null);
  const subRef     = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  const handleNext = () => {
    if (currentIndex < researchPapers.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-15%",
      scale: dir > 0 ? 1 : 0.95,
      opacity: dir > 0 ? 0.5 : 0.3,
      zIndex: dir > 0 ? 10 : 1,
    }),
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      zIndex: 5,
    },
    exit: (dir) => ({
      x: dir > 0 ? "-15%" : "100%",
      scale: dir > 0 ? 0.95 : 1,
      opacity: dir > 0 ? 0.3 : 0.5,
      zIndex: dir > 0 ? 1 : 10,
    }),
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)",
          scrollTrigger: { trigger: badgeRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(titleRef.current, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
      gsap.fromTo(subRef.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: subRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        /* ─── Section ─── */
        .research-section {
          padding: 80px 1.5rem;
          position: relative;
          overflow: hidden;
        }
        .research-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #030308;
        }
        .research-bg-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }
        .research-bg-glow-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%);
          top: -100px; left: -100px;
        }
        .research-bg-glow-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%);
          bottom: 0; right: 0;
        }

        /* ─── Section header ─── */
        .research-header {
          text-align: center;
          margin-bottom: 4rem;
          position: relative;
          z-index: 1;
        }
        .research-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 20px;
          background: rgba(139,92,246,0.1);
          border: 1px solid rgba(139,92,246,0.3);
          border-radius: 999px;
          margin-bottom: 1.5rem;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a78bfa;
        }
        .research-section-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          color: #fff;
          margin: 0 0 1rem;
        }
        .research-section-title span {
          background: linear-gradient(135deg, #a78bfa, #38bdf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .research-section-sub {
          color: rgba(255,255,255,0.45);
          font-size: 1rem;
          max-width: 500px;
          margin: 0 auto;
        }

        /* ─── Card ─── */
        .research-card {
          position: relative;
          background: rgba(10,10,25,0.7);
          border: 1px solid rgba(139,92,246,0.2);
          border-radius: 20px;
          overflow: hidden;
          backdrop-filter: blur(20px);
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          max-width: 1100px;
          margin: 0 auto;
        }
        .research-card:hover {
          border-color: rgba(139,92,246,0.45);
          box-shadow: 0 20px 60px rgba(139,92,246,0.15);
          transform: translateY(-3px);
        }
        .research-card-bar {
          height: 3px;
          width: 100%;
        }
        .research-card-body {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 2.5rem;
          padding: 2rem;
        }
        @media (max-width: 900px) {
          .research-card-body {
            grid-template-columns: 1fr;
          }
        }

        /* ─── PDF Preview ─── */
        .research-left {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .research-pdf-preview,
        .research-pdf-placeholder {
          border-radius: 12px;
          border: 1px solid;
          overflow: hidden;
          position: relative;
          background: rgba(255,255,255,0.02);
          min-height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .research-pdf-preview .react-pdf__Document,
        .research-pdf-preview .react-pdf__Page {
          width: 100% !important;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .research-pdf-preview .react-pdf__Page canvas {
          width: 100% !important;
          height: auto !important;
          border-radius: 8px;
        }
        .pdf-overlay {
          position: absolute;
          bottom: 10px;
          right: 10px;
        }
        .pdf-badge {
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.05em;
        }
        .pdf-loading {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pdf-spinner {
          width: 32px; height: 32px;
          border: 3px solid rgba(255,255,255,0.08);
          border-top-color: #8b5cf6;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Placeholder */
        .pdf-placeholder-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 2rem;
        }
        .pdf-placeholder-label {
          font-size: 1rem;
          font-weight: 600;
          color: rgba(255,255,255,0.4);
          margin: 0;
        }
        .pdf-placeholder-sub {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.25);
          margin: 0;
          max-width: 200px;
        }
        .pdf-lines {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          right: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .pdf-line {
          height: 6px;
          border-radius: 999px;
        }

        /* ─── Action buttons ─── */
        .research-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .research-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          border: 1px solid transparent;
        }
        .research-btn:hover { opacity: 0.85; transform: translateY(-2px); }
        .research-btn-primary { color: #fff; border-color: transparent; }
        .research-btn-secondary { background: rgba(255,255,255,0.04); }

        /* ─── Right metadata ─── */
        .research-right {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 0.25rem 0;
        }
        .research-status-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .research-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          border: 1px solid;
          letter-spacing: 0.05em;
        }
        .status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          animation: statusPulse 2s ease-in-out infinite;
        }
        @keyframes statusPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.6; transform: scale(1.4); }
        }
        .research-year {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .research-title {
          font-size: clamp(1.3rem, 2.5vw, 1.75rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.3;
          margin: 0;
        }
        .research-subtitle {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          margin: -4px 0 0;
        }

        .research-divider {
          height: 2px;
          width: 50px;
          border-radius: 999px;
        }

        /* Meta rows */
        .research-meta {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .research-meta-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .research-meta-icon {
          color: rgba(255,255,255,0.3);
          flex-shrink: 0;
          margin-top: 3px;
        }
        .research-meta-label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.35);
          margin-bottom: 2px;
        }
        .research-meta-value {
          display: block;
          font-size: 0.88rem;
          color: rgba(255,255,255,0.8);
          font-weight: 500;
        }

        /* Keywords */
        .research-keywords {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          flex-wrap: wrap;
        }
        .research-tag-icon { flex-shrink: 0; margin-top: 4px; }
        .research-keyword-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .research-keyword {
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 0.73rem;
          font-weight: 600;
          border: 1px solid;
          letter-spacing: 0.04em;
        }

        /* Abstract */
        .research-abstract-wrap {
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          overflow: hidden;
          background: rgba(255,255,255,0.02);
        }
        .research-abstract-toggle {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 10px 14px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-align: left;
          transition: background 0.2s;
          font-family: inherit;
        }
        .research-abstract-toggle:hover { background: rgba(255,255,255,0.04); }
        .research-abstract-toggle span { flex: 1; }
        .research-abstract-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      padding 0.3s ease;
        }
        .research-abstract-body.expanded {
          max-height: 400px;
          padding-bottom: 12px;
        }
        .research-abstract-text {
          padding: 0 14px;
          font-size: 0.85rem;
          line-height: 1.75;
          color: rgba(255,255,255,0.55);
          margin: 0;
        }

        /* ─── Page Slider ─── */
        .research-slider-container {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          padding-bottom: 2rem;
        }
        .research-book-stack {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .research-page-layer {
          position: absolute;
          inset: 0;
          background: rgba(10, 10, 25, 0.5);
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.6s;
        }
        .layer-1 {
          transform: translateY(8px) scale(0.98);
          opacity: 0.8;
          z-index: 1;
        }
        .layer-2 {
          transform: translateY(16px) scale(0.96);
          opacity: 0.6;
          z-index: 0;
        }
        .research-active-page-wrapper {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
        }
        .research-active-card-container {
          grid-area: 1 / 1 / 2 / 2;
          width: 100%;
        }
        .research-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 15px;
          background: linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.2) 100%);
          border-right: 1px solid rgba(255,255,255,0.1);
          z-index: 10;
        }
        .research-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 2.5rem;
          position: relative;
          z-index: 3;
        }
        .research-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          border: 1px solid transparent;
          font-family: inherit;
        }
        .research-nav-btn.prev {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
        }
        .research-nav-btn.prev:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(-4px);
        }
        .research-nav-btn.next {
          color: #fff;
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
        }
        .research-nav-btn.next:hover:not(:disabled) {
          transform: translateX(4px);
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.5);
        }
        .research-nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }
        .research-page-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 1.1rem;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.03);
          padding: 8px 20px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(5px);
        }
        .research-page-indicator .divider {
          color: rgba(255, 255, 255, 0.15);
        }
        @media (max-width: 600px) {
          .layer-1 {
            transform: translateY(6px) scale(0.98);
          }
          .layer-2 {
            transform: translateY(12px) scale(0.96);
          }
          .research-controls {
            flex-direction: column;
            gap: 1rem;
            align-items: center;
          }
          .research-nav-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <section id="research" ref={sectionRef} className="research-section">
        {/* BG glows */}
        <div className="research-bg-glow research-bg-glow-1" />
        <div className="research-bg-glow research-bg-glow-2" />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Section Header */}
          <div className="research-header">
            <div ref={badgeRef} className="research-badge" style={{ opacity: 0 }}>
              <BookOpen size={14} />
              Academic Research
            </div>
            <h2 ref={titleRef} className="research-section-title" style={{ opacity: 0 }}>
              Research & <span>Publications</span>
            </h2>
            <p ref={subRef} className="research-section-sub" style={{ opacity: 0 }}>
              Peer-reviewed work, conference papers, and academic contributions
            </p>
          </div>

          {/* Card stack container */}
          <div className="research-slider-container">
            {/* Background book layers to look like pages */}
            <div className="research-book-stack">
              <div className="research-page-layer layer-1"></div>
              <div className="research-page-layer layer-2"></div>
            </div>

            {/* Main active page with motion */}
            <div className="research-active-page-wrapper">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.35 },
                    scale: { duration: 0.35 }
                  }}
                  className="research-active-card-container"
                >
                  <ResearchCard paper={researchPapers[currentIndex]} index={currentIndex} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider controls */}
            <div className="research-controls">
              <button 
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="research-nav-btn prev"
                style={{ borderColor: `${researchPapers[currentIndex].accent}50`, color: researchPapers[currentIndex].accent }}
              >
                <ChevronLeft size={20} />
                <span>Prev Paper</span>
              </button>
              
              <div className="research-page-indicator">
                <span style={{ color: researchPapers[currentIndex].accent }}>
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
                <span className="divider">/</span>
                <span>{String(researchPapers.length).padStart(2, '0')}</span>
              </div>

              <button 
                onClick={handleNext}
                disabled={currentIndex === researchPapers.length - 1}
                className="research-nav-btn next"
                style={{ background: researchPapers[currentIndex].gradient }}
              >
                <span>Next Paper</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Research;
