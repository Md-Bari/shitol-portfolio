import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub } from "react-icons/fa";
import { Zap, ArrowUpRight } from "lucide-react";
import bsmsImage from "../assets/bsms.png";
import rmsImage from "../assets/rms.png";
import auraflowImage from "../assets/auraflow.png";
import docutuneImage from "../assets/docutune.png";
import omnisightImage from "../assets/omnisight.png";

gsap.registerPlugin(ScrollTrigger);

/* ─── Main Component ─────────────────────────────────────── */
const Projects = () => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const rowRefs = useRef([]);
  const lineRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "AuraFlow: Multi-Agent RAG Orchestrator",
      subtitle: "(Enterprise Knowledge Retrieval & Action Engine)",
      description:
        "An advanced Multi-Agent system that orchestrates planning, tool execution, and vector-search retrieval to answer complex queries over private knowledge graphs.",
      highlights: [
        "Implemented self-correction loops using LangGraph and function calling to validate factual consistency",
        "Crafted hybrid search (sparse BM25 + dense vector) using Qdrant with custom cross-encoder rerankers",
        "Designed dynamic context-window optimization to reduce token usage by 35% on GPT-4o",
      ],
      tags: ["LangGraph", "Qdrant", "Python", "LlamaIndex", "FastAPI", "OpenAI API"],
      image: auraflowImage,
      github: "https://github.com/Md-Bari",
      live: "https://github.com/Md-Bari",
      accent: "#8B5CF6",
      gradientStyle: "linear-gradient(135deg,#a78bfa,#8B5CF6,#6366f1)",
    },
    {
      id: 2,
      title: "DocuTune-LLM: Domain Fine-Tuning Pipeline",
      subtitle: "(Automated LLM Specialization & Benchmarking Engine)",
      description:
        "An end-to-end MLOps pipeline to fine-tune open-source models (Llama 3, Mistral) on custom proprietary corpuses using parameter-efficient methods.",
      highlights: [
        "Standardized QLoRA fine-tuning utilizing HuggingFace PEFT and DeepSpeed ZeRO-3 for multi-GPU training",
        "Programmed automatic prompt evaluation utilizing LLM-as-a-judge and benchmark harnesses (MMLU, GSM8k)",
        "Reduced model size by 4x using llama.cpp GGUF quantization (4-bit/8-bit) for CPU/edge deployments",
      ],
      tags: ["PyTorch", "HuggingFace", "DeepSpeed", "QLoRA", "MLflow", "CUDA"],
      image: docutuneImage,
      github: "https://github.com/Md-Bari",
      live: "https://github.com/Md-Bari",
      accent: "#EC4899",
      gradientStyle: "linear-gradient(135deg,#f472b6,#EC4899,#db2777)",
    },
    {
      id: 3,
      title: "OmniSight: Multimodal Edge Vision System",
      subtitle: "(Real-Time Object Detection, Segmenting & Captioning Pipeline)",
      description:
        "A real-time vision pipeline that performs semantic object segmentation and generates natural language explanations of video streams on edge hardware.",
      highlights: [
        "Optimized YOLOv8 and Segment Anything Model (SAM) using TensorRT, boosting edge inference from 8 FPS to 65 FPS",
        "Built asynchronous video streaming ingestion using FastAPI WebSockets and Redis Pub/Sub queue",
        "Integrated Whisper & LLaVA for natural language audio alerts based on real-time visual events",
      ],
      tags: ["TensorRT", "YOLOv8", "FastAPI", "Redis", "Docker", "WebSockets"],
      image: omnisightImage,
      github: "https://github.com/Md-Bari",
      live: "https://github.com/Md-Bari",
      accent: "#3B82F6",
      gradientStyle: "linear-gradient(135deg,#60a5fa,#3B82F6,#2563eb)",
    },
    {
      id: 4,
      title: "Building Nad Society Management System (BSMS)",
      subtitle: "(Bills, Maintenance and Security Management Platform)",
      description:
        "A full-stack MERN platform for managing electricity, gas, water, and internet bills with secure payments and real-time tracking.",
      highlights: [
        "Role-based dashboard for users and admin",
        "Online bill payment with transaction history",
        "Real-time bill status updates and due-date tracking",
      ],
      tags: ["React.js", "Tailwind", "Firebase", "Express.js", "MongoDB", "React Router"],
      image: bsmsImage,
      github: "https://github.com/Md-Bari/bsms-project",
      live: "https://bsms-sigma.vercel.app/admin/dashboard",
      accent: "#14B8A6",
      gradientStyle: "linear-gradient(135deg,#2dd4bf,#14B8A6,#10b981)",
    },
    {
      id: 5,
      title: "Restaurent Management System (RMS)",
      subtitle: "(Property Rental and Management Platform)",
      description:
        "An e-commerce platform with cart, checkout, authentication, and admin features built with Next.js and PostgreSQL.",
      highlights: [
        "Product browsing with category-based filtering",
        "Cart and checkout flow with secure authentication",
        "Admin panel for product and order management",
      ],
      tags: ["Next.js", "Laravel", "Tailwind", "Php", "Stripe","Ai", "PostgreSQL"],
      image: rmsImage,
      github: "https://github.com/Md-Bari",
      live: "https://bsms-sigma.vercel.app/admin/dashboard",
      accent: "#14B8A6",
      gradientStyle: "linear-gradient(135deg,#2dd4bf,#14B8A6,#10b981)",
    },
    {
      id: 6,
      title: "SkillSwap",
      subtitle: "(Skill Learning Platform)",
      description:
        "A React-based skill-learning platform connecting learners with expert tutors through an intuitive booking system and AI chatbot.",
      tags: ["React.js", "React Router", "Firebase", "Tailwind CSS", "DaisyUI", "Framer Motion"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=460&fit=crop",
      github: "https://github.com/Md-Bari",
      live: "https://skillswap-d2870.web.app/",
      accent: "#14B8A6",
      gradientStyle: "linear-gradient(135deg,#2dd4bf,#14B8A6,#10b981)",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(badgeRef.current,
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)",
          scrollTrigger: { trigger: badgeRef.current, start: "top 85%", toggleActions: "play none none none" }
        }
      );
      gsap.fromTo(titleRef.current, { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%", toggleActions: "play none none none" }
        }
      );
      gsap.fromTo(subtitleRef.current, { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: subtitleRef.current, start: "top 85%", toggleActions: "play none none none" }
        }
      );

      // Timeline line draw
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1, duration: 1.5, ease: "power2.out",
          scrollTrigger: { trigger: lineRef.current, start: "top 80%", toggleActions: "play none none none" }
        }
      );

      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const isEven = i % 2 === 0;
        const imgEl = row.querySelector(".proj-img");
        const contentEl = row.querySelector(".proj-txt");
        const dot = row.querySelector(".timeline-dot");

        gsap.fromTo(dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)",
            scrollTrigger: { trigger: row, start: "top 75%", toggleActions: "play none none none" }
          }
        );
        gsap.fromTo(imgEl,
          { opacity: 0, x: isEven ? -100 : 100 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 75%", toggleActions: "play none none none" }
          }
        );
        gsap.fromTo(contentEl,
          { opacity: 0, x: isEven ? 100 : -100 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 75%", toggleActions: "play none none none" }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Static BG */}
      <div className="absolute inset-0 bg-gray-950" />
      <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse at top left, rgba(59, 130, 246, 0.12), transparent 55%), radial-gradient(ellipse at bottom right, rgba(168, 85, 247, 0.1), transparent 55%)'}} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-size-[60px_60px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ── Header ── */}
        <div className="text-center mb-16 sm:mb-20">
          <div ref={badgeRef} style={{ opacity: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-7"
          >
            <Zap className="w-4 h-4 text-teal-400" />
            <span className="text-white/90 font-medium text-sm">Portfolio Showcase</span>
          </div>

          <h2 ref={titleRef} style={{ opacity: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4"
          >
            <span className="text-white">Latest </span>
            <span className="bg-linear-to-r from-teal-400 via-[#14B8A6] to-emerald-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>

          <p ref={subtitleRef} style={{ opacity: 0 }}
            className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto"
          >
            Crafting exceptional digital experiences with modern technologies
          </p>
        </div>

        {/* ── Timeline wrapper ── */}
        <div className="relative">
          {/* Center vertical line */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 w-px bg-linear-to-b from-teal-400/60 via-teal-500/30 to-transparent"
            style={{ height: "100%" }}
          />

          <div className="space-y-20 sm:space-y-28">
            {projects.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={project.id}
                  ref={(el) => (rowRefs.current[index] = el)}
                  className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center"
                >
                  {/* Timeline dot (center) */}
                  <div
                    className="timeline-dot hidden lg:flex absolute left-1/2 -translate-x-1/2 z-20 w-4 h-4 rounded-full border-2 items-center justify-center"
                    style={{
                      borderColor: project.accent,
                      backgroundColor: "#0a0a0a",
                      boxShadow: `0 0 12px ${project.accent}80`,
                      opacity: 0,
                    }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: project.accent }} />
                  </div>

                  {/* Image */}
                  <div
                    className={`proj-img group ${!isEven ? "lg:order-2" : ""}`}
                    style={{ opacity: 0 }}
                  >
                    <div className="relative rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-500 shadow-2xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-60 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Hover overlay btn */}
                      <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-400">
                        <a href={project.live} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-teal-500 via-[#14B8A6] to-teal-600 backdrop-blur-md border border-teal-400/50 rounded-full text-white text-sm font-medium hover:from-teal-400 hover:via-teal-500 hover:to-emerald-500 hover:shadow-lg hover:shadow-teal-500/50 transition-all"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                          View Live
                        </a>
                      </div>

                      {/* Connecting line to dot */}
                      <div
                        className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-10 h-px ${isEven ? "-right-10" : "-left-10"}`}
                        style={{ backgroundColor: `${project.accent}60` }}
                      />

                      {/* Bottom bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-1"
                        style={{ background: project.gradientStyle }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`proj-txt ${!isEven ? "lg:order-1 lg:text-right" : ""}`}
                    style={{ opacity: 0 }}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
                      style={{ color: project.accent }}
                    >
                      {project.subtitle}
                    </p>

                    <h3 className="text-3xl sm:text-4xl font-black text-white mb-3">
                      {project.title}
                    </h3>

                    <div
                      className={`h-0.5 w-14 rounded-full mb-4 ${!isEven ? "lg:ml-auto" : ""}`}
                      style={{ background: project.gradientStyle }}
                    />

                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-5">
                      {project.description}
                    </p>
                    {project.highlights?.length > 0 && (
                      <ul className={`text-sm text-gray-300 space-y-2 mb-6 ${!isEven ? "lg:text-right" : ""}`}>
                        {project.highlights.map((item, i) => (
                          <li key={i}>{`• ${item}`}</li>
                        ))}
                      </ul>
                    )}

                    {/* Tags */}
                    <div className={`flex flex-wrap gap-2 mb-7 ${!isEven ? "lg:justify-end" : ""}`}>
                      {project.tags.map((tag, i) => (
                        <span key={i}
                          className="px-3 py-1 text-xs font-semibold rounded-full border"
                          style={{
                            color: project.accent,
                            borderColor: `${project.accent}40`,
                            backgroundColor: `${project.accent}12`,
                          }}
                        >
                          #{tag.toLowerCase().replace(/\s+/g, "")}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className={`flex flex-wrap gap-3 ${!isEven ? "lg:justify-end" : ""}`}>
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-linear-to-r from-teal-500 via-[#14B8A6] to-teal-600 hover:from-teal-400 hover:via-teal-500 hover:to-emerald-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                        Live Demo
                      </a>
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-gray-300 bg-gray-800/80 border border-gray-700 hover:bg-gray-700 hover:text-white hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <FaGithub className="w-4 h-4" />
                        GitHub Repo
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-20 text-center">
          <a href="https://github.com/Md-Bari" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-teal-500 via-[#14B8A6] to-teal-600 backdrop-blur-xl border border-teal-400/50 text-white font-semibold rounded-full hover:from-teal-400 hover:via-teal-500 hover:to-emerald-500 hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 group"
          >
            <FaGithub className="w-5 h-5" />
            View All on GitHub
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
