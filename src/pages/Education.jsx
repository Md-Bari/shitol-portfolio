import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const progressBarsRef = useRef([]);
  const footerRef = useRef(null);

  const education = [
    {
      id: 1,
      degree: "BSc in Computer Science & Engineering",
      institution: "Daffodil International University",
      location: "Dhaka, Bangladesh",
      period: "2022 - 2025",
      CGPA: "3.87",
      description:
        "Graduated with a strong foundation in core computer science concepts including DSA, OOP, and full-stack web development, with a focus on building scalable applications.",
      gradient: "from-teal-400 via-[#14B8A6] to-emerald-500",
      gradientStyle: "linear-gradient(to right, #2dd4bf, #14B8A6, #10b981)",
      icon: "🎓",
    },
    {
      id: 2,
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Engineering University School and College",
      location: "Buet Campus, Dhaka, Bangladesh",
      period: "Passing Year: 2020",
      GPA: "5.00",
      description:
        "Completed secondary education with a strong foundation in Science, developing critical thinking and communication skills.",
      gradient: "from-teal-400 via-[#14B8A6] to-emerald-500",
      gradientStyle: "linear-gradient(to right, #2dd4bf, #14B8A6, #10b981)",
      icon: "📚",
    },
    {
      id: 2,
      degree: " Secondary School Certificate (SSC)",
      institution: "Bir Shrestha Munshi Abdur Rouf Public College",
      location: "Peelkhana, Dhaka, Bangladesh",
      period: "Passing Year: 2018",
      GPA: "5.00",
      description:
        "Completed secondary education with a strong foundation in Science, developing critical thinking and communication skills.",
      gradient: "from-teal-400 via-[#14B8A6] to-emerald-500",
      gradientStyle: "linear-gradient(to right, #2dd4bf, #14B8A6, #10b981)",
      icon: "📚",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: badgeRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Title
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Subtitle
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards staggered entrance
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        // Progress bar animation
        const bar = progressBarsRef.current[i];
        if (bar) {
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: "100%",
              duration: 1.5,
              delay: i * 0.15 + 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      // Footer
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gray-950"></div>
      <div className="absolute inset-0" style={{background: 'radial-gradient(circle at 20% 30%, rgba(20, 184, 166, 0.1), transparent 50%), radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1), transparent 50%)'}}></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-6 sm:mb-8"
            style={{ opacity: 0 }}
          >
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400" />
            <span className="text-white/90 font-medium text-sm sm:text-base">
              Educational Journey
            </span>
          </div>

          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4"
            style={{ opacity: 0 }}
          >
            <span className="text-white">Educational </span>
            <span className="bg-linear-to-r from-teal-400 via-[#14B8A6] to-emerald-500 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>

          <p
            ref={subtitleRef}
            className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto px-4"
            style={{ opacity: 0 }}
          >
            My academic path has provided a strong foundation in both technical
            and analytical skills.
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group"
              style={{ opacity: 0 }}
            >
              <div className="relative h-full">
                {/* Glowing Background */}
                <div
                  className={`absolute -inset-1 bg-linear-to-r ${edu.gradient} rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500`}
                ></div>

                {/* Card */}
                <div className="relative h-full bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-xl sm:rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-500 flex flex-col">
                  <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    {/* Icon & Badges */}
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl bg-linear-to-br ${edu.gradient} flex items-center justify-center text-2xl sm:text-3xl shadow-xl hover:scale-110 hover:rotate-6 transition-transform duration-300`}
                      >
                        {edu.icon}
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-teal-500/10 backdrop-blur-md rounded-full border border-teal-500/30">
                        <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-400" />
                        <span className="text-teal-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                          {edu.status}
                        </span>
                      </div>
                    </div>

                    {/* Period */}
                    <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mb-3 sm:mb-4 w-fit">
                      <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-400" />
                      <span className="text-white/90 text-[10px] sm:text-xs font-medium">
                        {edu.period}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1.5 sm:mb-2 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-teal-400 group-hover:via-[#14B8A6] group-hover:to-emerald-500 group-hover:bg-clip-text transition-all duration-300">
                        {edu.degree}
                      </h3>

                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                        <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400" />
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-300">
                          {edu.institution}
                        </h4>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                        <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
                        <p className="text-gray-500 text-[10px] sm:text-xs">
                          {edu.location}
                        </p>
                      </div>

                      <p className="text-gray-400 leading-relaxed text-xs sm:text-sm">
                        {edu.description}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        ref={(el) => (progressBarsRef.current[index] = el)}
                        className="h-full rounded-full"
                        style={{
                          background: edu.gradientStyle,
                          width: "0%",
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Decorative Gradient Border */}
                  <div
                    className="h-1"
                    style={{ background: edu.gradientStyle }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div
          ref={footerRef}
          className="mt-16 text-center"
          style={{ opacity: 0 }}
        >
          <div className="inline-block px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
            <p className="text-gray-400">
              Continuously learning and growing with each milestone 🚀
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
