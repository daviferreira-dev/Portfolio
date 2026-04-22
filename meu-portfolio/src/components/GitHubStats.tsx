import { useEffect, useRef, useState } from "react";

// ── CONFIG ──────────────────────────────────────────────────
const GITHUB_USERNAME = "daviferreira-dev"; // ← troque pelo seu username

// ── TYPES ───────────────────────────────────────────────────
interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
}

// ── LANGUAGE COLORS ─────────────────────────────────────────
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Java: "#b07219",
  "C++": "#f34b7d",
  Ruby: "#701516",
};

// ── COUNTER HOOK ─────────────────────────────────────────────
function useCounter(target: number, duration = 1600, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started || target === 0) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, started, duration]);
  return count;
}

// ── STAT CARD ────────────────────────────────────────────────
function StatCard({
  label,
  value,
  delay,
  started,
}: {
  label: string;
  value: number;
  delay: number;
  started: boolean;
}) {
  const count = useCounter(value, 1600, started);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [started, delay]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        background: "#0d0d1a",
        border: "1px solid rgba(168,85,247,0.25)",
        borderRadius: "12px",
        padding: "1.75rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
      }}
    >
      <span
        style={{
          fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
          fontWeight: 900,
          color: "#a855f7",
          lineHeight: 1,
          letterSpacing: "-0.03em",
        }}
      >
        {count.toLocaleString()}
      </span>
      <span
        style={{
          fontSize: "0.75rem",
          fontWeight: 500,
          color: "rgba(168,85,247,0.55)",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ── REPO CARD ────────────────────────────────────────────────
function RepoCard({
  repo,
  index,
  started,
}: {
  repo: GitHubRepo;
  index: number;
  started: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const langColor = repo.language ? (LANG_COLORS[repo.language] ?? "#a855f7") : "#a855f7";

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setVisible(true), 400 + index * 100);
    return () => clearTimeout(t);
  }, [started, index]);

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease, border-color 0.2s, background 0.2s",
        display: "block",
        background: "#0d0d1a",
        border: "1px solid rgba(168,85,247,0.2)",
        borderRadius: "10px",
        padding: "1.25rem",
        textDecoration: "none",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.7)";
        (e.currentTarget as HTMLElement).style.background = "rgba(168,85,247,0.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.2)";
        (e.currentTarget as HTMLElement).style.background = "#0d0d1a";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem", gap: "0.5rem" }}>
        <h3
          style={{
            margin: 0,
            fontFamily: "monospace",
            fontSize: "0.9rem",
            fontWeight: 700,
            color: "#f5f3ff",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {repo.name}
        </h3>
        <span style={{ fontSize: "0.78rem", color: "#a855f7", flexShrink: 0, fontWeight: 600 }}>
          ★ {repo.stargazers_count}
        </span>
      </div>

      {repo.description && (
        <p
          style={{
            margin: "0 0 0.9rem",
            fontSize: "0.78rem",
            color: "rgba(233,213,255,0.45)",
            lineHeight: 1.55,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {repo.description}
        </p>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {repo.language && (
          <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.72rem", color: "rgba(233,213,255,0.5)" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: langColor, flexShrink: 0 }} />
            {repo.language}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span style={{ fontSize: "0.72rem", color: "rgba(168,85,247,0.4)", marginLeft: "auto", fontFamily: "monospace" }}>
            fork {repo.forks_count}
          </span>
        )}
      </div>
    </a>
  );
}

// ── MAIN ─────────────────────────────────────────────────────
export default function GitHubStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const [scanLine, setScanLine] = useState(0);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const headers = { Accept: "application/vnd.github.v3+json" };
    Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }).then((r) => r.json()),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=stars`, { headers }).then((r) => r.json()),
    ]).then(([u, r]: [GitHubUser, GitHubRepo[]]) => {
      setUser(u);
      const sorted = Array.isArray(r)
        ? [...r].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6)
        : [];
      setRepos(sorted);
      setTotalStars(Array.isArray(r) ? r.reduce((s, repo) => s + repo.stargazers_count, 0) : 0);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!inView || loading) return;
    const start = performance.now();
    const dur = 900;
    const run = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setScanLine(p * 100);
      if (p < 1) requestAnimationFrame(run);
      else setScanDone(true);
    };
    requestAnimationFrame(run);
  }, [inView, loading]);

  const stats = user
    ? [
        { label: "Repositórios", value: user.public_repos, delay: 0 },
        { label: "Seguidores", value: user.followers, delay: 100 },
        { label: "Seguindo", value: user.following, delay: 200 },
        { label: "Stars totais", value: totalStars, delay: 300 },
      ]
    : [];

  return (
    <section
      ref={sectionRef}
      id="github"
      style={{
        minHeight: "100vh",
        background: "#0a0a14",
        borderTop: "2px solid #a855f7",
        padding: "5rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* scan line roxa */}
      {inView && !scanDone && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${scanLine}%`,
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #a855f7 30%, #c084fc 50%, #a855f7 70%, transparent)",
            boxShadow: "0 0 20px 6px rgba(168,85,247,0.5)",
            zIndex: 20,
            pointerEvents: "none",
          }}
        />
      )}

      {/* glow de fundo */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "-120px",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 10 }}>

        {/* HEADER */}
        <div
          style={{
            marginBottom: "3.5rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.2rem" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#a855f7",
                boxShadow: "0 0 8px #a855f7",
                animation: "ghpulse 2s infinite",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "0.75rem",
                color: "#a855f7",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
              }}
            >
              github.com/{GITHUB_USERNAME}
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(3rem, 10vw, 7rem)",
              fontWeight: 900,
              lineHeight: 0.9,
              margin: 0,
              color: "#f5f3ff",
              letterSpacing: "-0.04em",
            }}
          >
            CÓDIGO
            <br />
            <span style={{ color: "#a855f7" }}>&amp; DADOS</span>
          </h2>

          {user?.bio && (
            <p
              style={{
                marginTop: "1.2rem",
                color: "rgba(233,213,255,0.45)",
                maxWidth: "480px",
                fontSize: "0.95rem",
                lineHeight: 1.7,
              }}
            >
              {user.bio}
            </p>
          )}
        </div>

        {/* STAT CARDS */}
        {!loading && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "12px",
              marginBottom: "4rem",
            }}
          >
            {stats.map((s) => (
              <StatCard key={s.label} {...s} started={scanDone} />
            ))}
          </div>
        )}

        {/* REPOS LABEL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.2rem",
            opacity: scanDone ? 1 : 0,
            transition: "opacity 0.6s ease 0.3s",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "0.7rem",
              color: "rgba(168,85,247,0.5)",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
            }}
          >
            Top repositórios
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(168,85,247,0.15)" }} />
          <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "rgba(168,85,247,0.3)" }}>
            {repos.length} repos
          </span>
        </div>

        {/* REPO GRID */}
        {!loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "12px",
            }}
          >
            {repos.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} index={i} started={scanDone} />
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: "110px",
                  borderRadius: "10px",
                  background: "#0d0d1a",
                  border: "1px solid rgba(168,85,247,0.1)",
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <div
          style={{
            marginTop: "3rem",
            opacity: scanDone ? 1 : 0,
            transition: "opacity 0.6s ease 1s",
          }}
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "0.75rem 1.75rem",
              border: "1px solid rgba(168,85,247,0.5)",
              borderRadius: "999px",
              color: "#a855f7",
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.05em",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(168,85,247,0.12)";
              (e.currentTarget as HTMLElement).style.borderColor = "#a855f7";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.5)";
            }}
          >
            Ver perfil completo →
          </a>
        </div>
      </div>

      <style>{`
        @keyframes ghpulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #a855f7; }
          50% { opacity: 0.5; box-shadow: 0 0 16px #a855f7; }
        }
      `}</style>
    </section>
  );
}