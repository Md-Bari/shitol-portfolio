import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaStar, FaCodeBranch } from "react-icons/fa";
import { Users, BookOpen, TrendingUp, ExternalLink, Code2, GitCommit, Calendar, Flame } from "lucide-react";

const USERNAME = "Md-Bari";

/* ── Language color map ── */
const LANG_COLORS = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  PHP: "#8892be",
  Python: "#3572A5",
  "Jupyter Notebook": "#DA5B0B",
  HTML: "#e44b23",
  CSS: "#563d7c",
  Shell: "#89e051",
  default: "#8b5cf6",
};
const langColor = (l) => LANG_COLORS[l] || LANG_COLORS.default;

/* ── Animated counter ── */
function Counter({ target, duration = 1600 }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setVal(Math.floor(ease * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{val}</span>;
}

/* ── Main ── */
export default function GitHubStats() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [langs, setLangs] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [contribTotal, setContribTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [uRes, rRes, cRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`),
        ]);
        if (!uRes.ok || !rRes.ok) throw new Error("API error");
        const uData = await uRes.json();
        const rData = await rRes.json();
        setUser(uData);

        const own = rData.filter((r) => !r.fork);
        setRepos(own.slice(0, 6));

        const map = {};
        own.forEach((r) => { if (r.language) map[r.language] = (map[r.language] || 0) + 1; });
        const total = Object.values(map).reduce((a, b) => a + b, 0);
        setLangs(
          Object.entries(map)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(([lang, n]) => ({ lang, pct: Math.round((n / total) * 100) }))
        );

        // Contribution calendar
        if (cRes.ok) {
          const cData = await cRes.json();
          setContributions(cData.contributions || []);
          const yr = Object.values(cData.total || {});
          setContribTotal(yr.reduce((a, b) => a + b, 0));
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);

  const timeAgo = (dateStr) => {
    const d = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
    if (d === 0) return "Today";
    if (d === 1) return "Yesterday";
    if (d < 30) return `${d}d ago`;
    if (d < 365) return `${Math.floor(d / 30)}mo ago`;
    return `${Math.floor(d / 365)}y ago`;
  };

  return (
    <section id="github" style={{
      padding: "80px 24px",
      background: "linear-gradient(180deg, #020208 0%, #050510 100%)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* BG glows */}
      <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500,
        background: "radial-gradient(circle, rgba(88,166,255,0.06) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: -100, width: 400, height: 400,
        background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 20px",
            background: "rgba(88,166,255,0.08)",
            border: "1px solid rgba(88,166,255,0.2)",
            borderRadius: 999, marginBottom: 16,
            fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "#58a6ff",
          }}>
            <FaGithub size={13} /> Open Source Activity
          </div>
          <h2 style={{
            fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900,
            letterSpacing: "-0.02em", color: "#fff", margin: "0 0 10px",
          }}>
            GitHub{" "}
            <span style={{
              background: "linear-gradient(135deg,#58a6ff,#8b5cf6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Stats</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", margin: 0 }}>
            Live data pulled directly from my GitHub profile
          </p>
        </div>

        {loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[100, 120, 200, 160].map((h, i) => (
              <div key={i} style={{
                height: h, borderRadius: 14,
                background: "linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.1) 50%,rgba(255,255,255,0.04) 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite",
              }} />
            ))}
          </div>
        )}

        {error && !loading && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(255,255,255,0.4)" }}>
            <FaGithub size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
            <p>Could not load GitHub data. Check your connection.</p>
          </div>
        )}

        {!loading && !error && user && (
          <>
            {/* ── Profile Banner ── */}
            <div style={{
              display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
              background: "rgba(13,17,23,0.9)",
              border: "1px solid rgba(48,54,61,0.9)",
              borderRadius: 16, padding: "20px 24px",
              marginBottom: 24, backdropFilter: "blur(12px)",
            }}>
              <img src={user.avatar_url} alt="avatar" style={{
                width: 64, height: 64, borderRadius: "50%",
                border: "2px solid rgba(88,166,255,0.4)", flexShrink: 0,
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff" }}>
                  {user.name || USERNAME}
                </div>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", margin: "2px 0 6px" }}>
                  @{user.login}
                </div>
                {user.bio && (
                  <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)" }}>{user.bio}</div>
                )}
              </div>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "8px 18px", borderRadius: 10,
                background: "rgba(88,166,255,0.1)", border: "1px solid rgba(88,166,255,0.3)",
                color: "#58a6ff", fontSize: "0.82rem", fontWeight: 600,
                textDecoration: "none", flexShrink: 0,
                transition: "background 0.2s",
              }}>
                <FaGithub size={14} /> View Profile
              </a>
            </div>

            {/* ── Stat Cards ── */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16, marginBottom: 24,
            }}>
              {[
                { icon: BookOpen,   label: "Public Repos",  val: user.public_repos, color: "#58a6ff" },
                { icon: Users,      label: "Followers",     val: user.followers,    color: "#8b5cf6" },
                { icon: TrendingUp, label: "Following",     val: user.following,    color: "#ec4899" },
                { icon: FaStar,     label: "Total Stars",   val: totalStars,        color: "#f59e0b" },
                { icon: FaCodeBranch, label: "Total Forks", val: totalForks,        color: "#10b981" },
                { icon: GitCommit,  label: "Joined",        val: new Date(user.created_at).getFullYear(), color: "#38bdf8", noCount: true },
              ].map(({ icon: Icon, label, val, color, noCount }) => (
                <div key={label} style={{
                  background: "rgba(13,17,23,0.9)",
                  border: `1px solid rgba(48,54,61,0.9)`,
                  borderRadius: 14, padding: "20px 16px",
                  textAlign: "center",
                  backdropFilter: "blur(8px)",
                  transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
                  cursor: "default",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = `${color}55`;
                    e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.4)`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(48,54,61,0.9)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, margin: "0 auto 12px",
                    background: `${color}18`, border: `1px solid ${color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div style={{
                    fontSize: "2rem", fontWeight: 900, color,
                    letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 4,
                  }}>
                    {noCount ? val : <Counter target={val} />}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Languages Used + Contribution Streak ── */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 20, marginBottom: 24,
            }}>
              {/* Language Breakdown */}
              <div style={{
                background: "rgba(13,17,23,0.9)",
                border: "1px solid rgba(48,54,61,0.9)",
                borderRadius: 16, padding: 24,
                backdropFilter: "blur(12px)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <Code2 size={15} style={{ color: "#8b5cf6" }} />
                  <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>
                    Languages Used
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {langs.map(({ lang, pct }, i) => (
                    <LangBar key={lang} lang={lang} pct={pct} color={langColor(lang)} delay={i * 100} />
                  ))}
                </div>
              </div>

              {/* Contribution Streak */}
              <ImgCard
                src={`https://github-readme-streak-stats.herokuapp.com?user=${USERNAME}&theme=github-dark-blue&hide_border=true&background=0d1117&ring=8b5cf6&fire=ec4899&currStreakLabel=58a6ff`}
                alt="Streak Stats"
                label="Contribution Streak"
                icon={<Flame size={14} style={{ color: "#ec4899" }} />}
              />
            </div>

            {/* ── Contribution Activity (Full Row) ── */}
            <div style={{ marginBottom: 24 }}>
              <ContribCalendar contributions={contributions} total={contribTotal} />
            </div>

            {/* ── Top Repos ── */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <BookOpen size={15} style={{ color: "#58a6ff" }} />
                <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>
                  Recent Repositories
                </span>
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 14,
              }}>
                {repos.map((repo) => (
                  <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "flex", flexDirection: "column", gap: 8,
                      background: "rgba(13,17,23,0.9)",
                      border: "1px solid rgba(48,54,61,0.9)",
                      borderRadius: 12, padding: "14px 16px",
                      textDecoration: "none",
                      transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.borderColor = "rgba(88,166,255,0.4)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.4)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "rgba(48,54,61,0.9)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Repo name */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <BookOpen size={13} style={{ color: "#8b5cf6" }} />
                        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#58a6ff" }}>
                          {repo.name}
                        </span>
                      </div>
                      <ExternalLink size={12} style={{ color: "rgba(255,255,255,0.2)" }} />
                    </div>
                    {/* Description */}
                    {repo.description && (
                      <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.5 }}>
                        {repo.description}
                      </p>
                    )}
                    {/* Meta */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
                      {repo.language && (
                        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.75rem", color: "rgba(255,255,255,0.55)" }}>
                          <span style={{ width: 10, height: 10, borderRadius: "50%", background: langColor(repo.language), flexShrink: 0 }} />
                          {repo.language}
                        </span>
                      )}
                      <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>
                        <FaStar size={10} /> {repo.stargazers_count}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>
                        <FaCodeBranch size={10} /> {repo.forks_count}
                      </span>
                      <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.28)", marginLeft: "auto" }}>
                        {timeAgo(repo.updated_at)}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* ── CTA ── */}
            <div style={{ textAlign: "center" }}>
              <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "13px 32px", borderRadius: 999,
                  background: "rgba(13,17,23,0.9)",
                  border: "1px solid rgba(88,166,255,0.3)",
                  color: "#58a6ff", fontSize: "0.9rem", fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.25s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(88,166,255,0.1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(13,17,23,0.9)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <FaGithub size={16} />
                View All Repositories on GitHub
              </a>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes barGrow {
          from { width: 0%; }
          to   { width: var(--target-w); }
        }
      `}</style>
    </section>
  );
}

/* ── Language bar with IntersectionObserver ── */
function LangBar({ lang, pct, color, delay }) {
  const ref = useRef(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", width: 120, flexShrink: 0 }}>
        <span style={{
          display: "inline-block", width: 10, height: 10,
          borderRadius: "50%", background: color, marginRight: 6,
        }} />
        {lang}
      </span>
      <div style={{
        flex: 1, height: 6, borderRadius: 999,
        background: "rgba(255,255,255,0.06)", overflow: "hidden",
      }}>
        <div style={{
          height: "100%", borderRadius: 999,
          background: `linear-gradient(90deg, ${color}aa, ${color})`,
          width: go ? `${pct}%` : "0%",
          transition: `width 1.2s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        }} />
      </div>
      <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", width: 30, textAlign: "right" }}>
        {pct}%
      </span>
    </div>
  );
}

/* ── Image card with loading state ── */
function ImgCard({ src, alt, label, icon }) {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(false);

  return (
    <div style={{
      background: "rgba(13,17,23,0.9)",
      border: "1px solid rgba(48,54,61,0.9)",
      borderRadius: 16, overflow: "hidden",
      backdropFilter: "blur(12px)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "14px 18px 10px",
        borderBottom: "1px solid rgba(48,54,61,0.6)",
      }}>
        {icon}
        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>{label}</span>
      </div>
      <div style={{ padding: 16, position: "relative", minHeight: err ? 0 : 80 }}>
        {!loaded && !err && (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg,rgba(255,255,255,0.03) 25%,rgba(255,255,255,0.07) 50%,rgba(255,255,255,0.03) 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
            borderRadius: 8,
          }} />
        )}
        {!err ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => { setErr(true); setLoaded(true); }}
            style={{
              width: "100%", display: "block", borderRadius: 8,
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
        ) : (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", textAlign: "center", margin: "12px 0" }}>
            Chart unavailable
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Contribution Calendar heatmap ── */
function ContribCalendar({ contributions, total }) {
  const getCellColor = (level) => {
    switch (level) {
      case 0: return "rgba(255, 255, 255, 0.05)";
      case 1: return "#0e4429";
      case 2: return "#006d32";
      case 3: return "#26a641";
      case 4: return "#39d353";
      default: return "transparent";
    }
  };

  // Format weeks
  let weeks = [];
  if (contributions && contributions.length > 0) {
    const firstDateStr = contributions[0].date;
    const [y, m, d] = firstDateStr.split("-").map(Number);
    const firstDayOfWeek = new Date(y, m - 1, d).getDay(); // 0 is Sunday

    const padded = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      padded.push({ date: null, count: 0, level: -1 });
    }
    padded.push(...contributions);

    while (padded.length % 7 !== 0) {
      padded.push({ date: null, count: 0, level: -1 });
    }

    for (let i = 0; i < padded.length; i += 7) {
      weeks.push(padded.slice(i, i + 7));
    }
  }

  // Generate month labels
  let monthLabels = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let currentMonth = -1;
  
  weeks.forEach((week, wIndex) => {
    const validDay = week.find(d => d.date);
    if (validDay) {
      const [y, m, d] = validDay.date.split("-").map(Number);
      const month = new Date(y, m - 1, d).getMonth();
      if (month !== currentMonth) {
        currentMonth = month;
        monthLabels.push({
          text: monthNames[month],
          wIndex,
        });
      }
    }
  });

  // Filter labels to avoid overlap
  let lastWIndex = -99;
  const filteredLabels = [];
  monthLabels.forEach((label) => {
    if (label.wIndex - lastWIndex >= 3) {
      filteredLabels.push(label);
      lastWIndex = label.wIndex;
    }
  });

  return (
    <div style={{
      background: "rgba(13,17,23,0.9)",
      border: "1px solid rgba(48,54,61,0.9)",
      borderRadius: 16, padding: 24,
      backdropFilter: "blur(12px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Calendar size={15} style={{ color: "#38bdf8" }} />
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>
              Contribution Activity
            </span>
          </div>
          <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
            {total} contributions in the last year
          </span>
        </div>

        {weeks.length === 0 ? (
          <div style={{ height: 120, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.3)" }}>
            Loading contribution calendar...
          </div>
        ) : (
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            {/* Day labels column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingBottom: 16, fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", userSelect: "none" }}>
              <div style={{ height: 10, lineHeight: "10px" }} />
              <div style={{ height: 10, lineHeight: "10px" }}>Mon</div>
              <div style={{ height: 10, lineHeight: "10px" }} />
              <div style={{ height: 10, lineHeight: "10px" }}>Wed</div>
              <div style={{ height: 10, lineHeight: "10px" }} />
              <div style={{ height: 10, lineHeight: "10px" }}>Fri</div>
              <div style={{ height: 10, lineHeight: "10px" }} />
            </div>

            {/* Grid and Month row */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              {/* Month labels row */}
              <div style={{ display: "flex", position: "relative", height: 15, fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", userSelect: "none" }}>
                {filteredLabels.map(label => (
                  <span key={label.wIndex} style={{ position: "absolute", left: `${label.wIndex * 13}px` }}>
                    {label.text}
                  </span>
                ))}
              </div>

              {/* Heatmap grid container */}
              <div style={{ display: "flex", gap: 3, overflowX: "auto", paddingBottom: 10 }}>
                {weeks.map((week, wIndex) => (
                  <div key={wIndex} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {week.map((day, dIndex) => (
                      <div
                        key={dIndex}
                        title={day.date ? `${day.count} contributions on ${day.date}` : ""}
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 2,
                          backgroundColor: getCellColor(day.level),
                          transition: "transform 0.1s, opacity 0.2s",
                        }}
                        onMouseEnter={e => {
                          if (day.date) {
                            e.currentTarget.style.transform = "scale(1.2)";
                            e.currentTarget.style.zIndex = 10;
                          }
                        }}
                        onMouseLeave={e => {
                          if (day.date) {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.zIndex = 1;
                          }
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12 }}>
        <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noopener noreferrer" style={{ color: "#58a6ff", textDecoration: "none", fontSize: "0.78rem" }}>
          Learn how we count contributions
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span>Less</span>
          {[0, 1, 2, 3, 4].map(lvl => (
            <div key={lvl} style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: getCellColor(lvl) }} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

