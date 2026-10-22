import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Activity,
  ArrowUpRight,
  Award,
  BrainCircuit,
  Code2,
  Cpu,
  Database,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  Menu,
  Network,
  Phone,
  ServerCog,
  ShieldCheck,
  Trophy,
  Workflow,
  X,
} from 'lucide-react';
import { AIAssistant } from './components/AIAssistant';
import { CommandPalette } from './components/CommandPalette';
import { ArchitectureBackdrop, LivingGrid } from './components/LivingGrid';
import { architecture, focusItems, metrics, roles, statusItems } from './data/portfolioData';
import { projects } from './data/projects';
import { skillGroups, achievements } from './data/skills';
import { experience } from './data/experience';
import { education } from './data/education';
import { certifications } from './data/certifications';
import { socialProfiles } from './data/socials';

function useTyping(words) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!deleting && text.length < word.length) setText(word.slice(0, text.length + 1));
      else if (!deleting) setDeleting(true);
      else if (text.length > 0) setText(word.slice(0, text.length - 1));
      else {
        setDeleting(false);
        setWordIndex((index) => index + 1);
      }
    }, deleting ? 42 : 82);

    return () => clearTimeout(timeout);
  }, [deleting, text, wordIndex, words]);

  return text;
}

const navigationLinks = [
  { label: 'Architecture', id: 'architecture' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' },
];

function Header({ onPalette, onAssistant }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('projects');

  useEffect(() => {
    const sections = navigationLinks
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-25% 0px -65% 0px' });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed left-3 right-3 top-3 z-40 rounded-2xl border border-white/10 bg-black/85 px-3 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:left-4 sm:right-4 sm:top-4 sm:px-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <a href="#home" className="shrink-0 whitespace-nowrap rounded-lg" aria-label="Balaji Madhan, home">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100">Balaji Madhan</p>
          <p className="hidden text-xs text-slate-500 sm:block">AI infrastructure portfolio</p>
        </a>
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
          {navigationLinks.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? 'location' : undefined}
              className={`nav-link ${activeSection === id ? 'nav-link-active' : ''}`}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <button className="nav-chip hidden sm:inline-flex" onClick={onAssistant}>BALAJI_AI_AGENT</button>
          <button className="nav-chip" onClick={onPalette}>/ Ctrl K</button>
          <button
            className="icon-button xl:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-navigation" className="mt-3 grid gap-1 border-t border-white/10 pt-3 xl:hidden" aria-label="Mobile navigation">
          {navigationLinks.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
              aria-current={activeSection === id ? 'location' : undefined}
              className={`nav-link ${activeSection === id ? 'nav-link-active' : ''}`}
            >
              {label}
            </a>
          ))}
          <button className="nav-link text-left sm:hidden" onClick={() => { setMenuOpen(false); onAssistant(); }}>
            Open AI assistant
          </button>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  const typedRole = useTyping(roles);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      setParallax({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-black">
      <div
        className="ambient-glow absolute left-[10%] top-[-10%] z-[1] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px] animate-pulse"
        style={{ transform: `translate3d(${parallax.x * -18}px, ${parallax.y * -14}px, 0)` }}
      />
      <div
        className="ambient-glow ambient-glow-delay absolute bottom-[-20%] right-[5%] z-[1] h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse"
        style={{ transform: `translate3d(${parallax.x * 22}px, ${parallax.y * 16}px, 0)`, animationDelay: '1.2s' }}
      />
      <div
        className="ambient-glow ambient-glow-slow absolute right-[20%] top-[30%] z-[1] h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-[120px] animate-pulse"
        style={{ transform: `translate3d(${parallax.x * 30}px, ${parallax.y * -20}px, 0)`, animationDelay: '2s' }}
      />
      <LivingGrid style={{ transform: `translate3d(${parallax.x * -10}px, ${parallax.y * -8}px, 0) scale(1.025)` }} />
      <ArchitectureBackdrop style={{ transform: `translate3d(${parallax.x * 18}px, ${parallax.y * 14}px, 0) scale(1.03)` }} />
      <div className="absolute inset-0 z-[4] bg-[radial-gradient(circle_at_center,rgba(0,255,204,0.08),transparent_36%),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.38)_64%,rgba(0,0,0,0.68)_100%)]" />
      <div className="absolute inset-0 z-[6] pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,180,0.03)_50%)] bg-[length:100%_4px] scanline-field" />
      <div className="absolute inset-x-0 bottom-20 z-[6] mx-auto hidden max-w-6xl grid-cols-3 gap-3 px-5 md:grid">
        {['GPU Utilization 92%', 'Kubernetes Nodes Stable', 'Vector Sync Active'].map((metric, index) => (
          <motion.div
            key={metric}
            className="rounded-xl border border-cyan-200/15 bg-black/25 px-4 py-3 font-mono text-xs text-cyan-100 backdrop-blur-[2px]"
            animate={{ opacity: [0.45, 0.9, 0.55], y: [0, -6, 0] }}
            transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
          >
            [RUNTIME] {metric}
          </motion.div>
        ))}
      </div>
      <div className="absolute inset-0 z-[5] cinematic-vignette" />

      <div className="hero-layout relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-24 pt-32 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="hero-copy max-w-3xl hero-content-shell"
        >
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan-100 shadow-[0_0_45px_rgba(0,255,204,0.12)]">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(0,255,65,0.8)]" />
            AI Engineer + Cloud Systems Developer
          </div>
          <h1 className="text-balance text-5xl font-black tracking-[-0.055em] text-white sm:text-7xl lg:text-[5.5rem]">
            Balaji Madhan
          </h1>
          <div className="mt-5 h-9 font-mono text-sm uppercase tracking-[0.2em] text-emerald-200 sm:text-lg">
            {typedRole}<span className="cursor-blink text-cyan-200">_</span>
          </div>
          <p className="mt-7 max-w-3xl text-balance text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[3.4rem]">
            Engineering intelligent systems for the real world.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            IV Year AIML student at SRM Institute of Science and Technology, Trichy, building across AI systems, cloud engineering, computer vision, intelligent automation and realtime infrastructure.
          </p>
          <ResumeActions className="mt-8" />

          <div className="status-strip mt-10 grid max-w-3xl gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {statusItems.map(([label, value]) => (
              <div key={label} className="status-tile rounded-xl border border-cyan-200/15 bg-black/30 p-3 text-left backdrop-blur-[2px]">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
                <p className="mt-2 flex items-center gap-2 font-mono text-sm text-cyan-100">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  {value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.aside
          className="hero-profile mx-auto w-full max-w-md lg:ml-auto"
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          aria-label="Profile and academic summary"
        >
          <div className="hero-profile-frame">
            <img
              src="/profile.jpg"
              alt="Balaji Madhan"
              className="hero-profile-image"
            />
            <div className="hero-profile-overlay" />
            <div className="hero-profile-caption">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-100/75">AI / ML Engineering</span>
              <p className="mt-2 text-lg font-semibold text-white">Learning. Building. Deploying.</p>
            </div>
          </div>
          <div className="hero-academic-card">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">Current cumulative CGPA</p>
              <p className="mt-1 text-sm text-slate-300">SRM Institute of Science and Technology</p>
            </div>
            <p className="shrink-0 text-2xl font-semibold tracking-tight text-white">
              {education.cgpa.toFixed(2)}<span className="ml-1 text-sm font-medium text-slate-400">/ 10</span>
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

function ResumeActions({ className = '' }) {
  return (
    <div className={`resume-actions flex flex-wrap items-center gap-3 ${className}`}>
      <a
        className="resume-button resume-button-primary"
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        View resume
        <ExternalLink className="h-4 w-4" />
      </a>
      <a
        className="resume-button"
        href="/resume.pdf"
        download="Balaji-Madhan-Resume.pdf"
      >
        Download PDF
        <Download className="h-4 w-4" />
      </a>
    </div>
  );
}

function SectionTitle({ eyebrow, title, copy }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300/80">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-3xl font-bold tracking-normal text-white sm:text-5xl">{title}</h2>
      {copy && <p className="mt-5 text-slate-400">{copy}</p>}
    </div>
  );
}

function RuntimeBriefing() {
  const briefing = [
    ['Identity', 'AI/ML engineer building computer vision, prediction systems, cloud workflows and intelligent full stack products.'],
    ['Portfolio Goal', 'Show recruiters and AI teams how projects connect to infrastructure: models, APIs, deployments, logs and dashboards.'],
    ['Operating Mode', 'Every section is presented as a live system surface instead of a normal resume block.'],
  ];

  return (
    <section className="fade-section mx-auto max-w-7xl px-5 pt-24">
      <div className="runtime-briefing">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300/80">Portfolio Runtime Briefing</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-5xl">What this interface is designed to communicate.</h2>
          <p className="mt-5 max-w-3xl text-slate-400">
            This portfolio frames Balaji Madhan as an AI engineer who can think beyond notebooks: designing model workflows, cloud-native systems, realtime dashboards and deployment-ready intelligent products.
          </p>
        </div>
        <div className="mt-8 grid gap-3 lg:grid-cols-3">
          {briefing.map(([label, detail]) => (
            <div key={label} className="rounded-xl border border-cyan-200/15 bg-black/35 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-300">{label}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionContext({ label, children }) {
  return (
    <div className="mb-8 mt-8 rounded-xl border border-cyan-200/15 bg-[#031016]/75 p-4 shadow-[0_0_45px_rgba(0,255,204,0.06)] backdrop-blur">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/80">[PORTFOLIO_SIGNAL] {label}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{children}</p>
    </div>
  );
}

function FocusAndMetrics() {
  return (
    <section className="fade-section mx-auto max-w-7xl px-5 py-24">
      <SectionTitle eyebrow="Current Focus" title="Building like a realtime AI infrastructure platform." />
      <SectionContext label="engineering direction">
        This layer explains the kind of systems Balaji is actively shaping: AI automation, cloud ML infrastructure, computer vision, CUDA workloads and distributed application runtimes.
      </SectionContext>
      <div className="mt-12 grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="glass-panel p-5">
          <div className="grid gap-3">
            {focusItems.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <ArrowUpRight className="h-5 w-5 text-cyan-300" />
                <span className="text-sm text-slate-100">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {metrics.map(([label, value, detail], index) => (
            <motion.div key={label} className="metric-card" whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
                <Activity className="h-4 w-4 text-emerald-300" />
              </div>
              <motion.p
                className="mt-5 text-4xl font-bold text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {value}{index < 5 ? '+' : ''}
              </motion.p>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-slate-800">
                <span className="block h-full rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-[#00ff41]" style={{ width: `${70 + index * 4}%` }} />
              </div>
              <p className="mt-4 text-sm text-slate-400">{detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureStack() {
  const icons = [Workflow, ServerCog, BrainCircuit, Network, Cpu, Network, Activity, ServerCog, Database, BrainCircuit, Activity, Code2];

  return (
    <section id="architecture" className="fade-section mx-auto max-w-7xl px-5 py-24">
      <SectionTitle eyebrow="Architecture Stack" title="A fuller AI infrastructure blueprint." copy="A layered systems diagram for the tools, runtimes and engineering concepts Balaji is developing, deploying and scaling." />
      <div className="relative mt-14 overflow-hidden rounded-2xl border border-cyan-300/15 bg-[#02070c] p-5 sm:p-8">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,204,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(0,255,204,0.06)_1px,transparent_1px)] bg-[size:52px_52px] opacity-30" />
        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {architecture.map(([layer, detail, description], index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div key={layer} className="architecture-node" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <Icon className="h-6 w-6 text-cyan-200" />
                <p className="mt-5 text-sm uppercase tracking-[0.22em] text-slate-500">{layer}</p>
                <p className="mt-2 text-lg font-semibold text-white">{detail}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="fade-section mx-auto max-w-7xl px-5 py-24">
      <SectionTitle eyebrow="Deployed AI Product Systems" title="Projects presented as intelligent runtime platforms." />
      <SectionContext label="project systems">
        Each project is shown like a deployed AI product: a system signal, model or workflow stack, runtime logs, and a direct GitHub route for deeper inspection.
      </SectionContext>
      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <motion.article key={project.title} className="project-card flex h-full flex-col" whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 240, damping: 22 }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-300">{project.signal}</p>
                <h3 className="mt-4 text-2xl font-bold text-white">{project.title}</h3>
              </div>
              <ShieldCheck className="h-6 w-6 shrink-0 text-cyan-300" />
            </div>

            <ProjectImage project={project} />

            <p className="mt-5 leading-7 text-slate-300">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => <span key={tech} className="tech-pill">{tech}</span>)}
            </div>
            <div className="mt-7 space-y-2 font-mono text-xs text-cyan-100/85">
              {project.logs.map((log) => <p key={log} className="rounded-lg border border-white/10 bg-black/35 px-3 py-2">[LIVE] {log}</p>)}
            </div>
            <a className="project-action mt-auto w-fit pt-7" href={project.githubUrl} target="_blank" rel="noreferrer">
              View on GitHub
              <ExternalLink className="h-4 w-4" />
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ProjectImage({ project }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="project-image mt-5 overflow-hidden rounded-xl border border-white/10 bg-black/30">
      {project.imageUrl && !imageFailed ? (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="h-48 w-full object-cover"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="flex h-48 items-center justify-center text-sm text-slate-400">
          Project preview unavailable
        </div>
      )}
    </div>
  );
}


function ProfileNetwork() {
  return (
    <section className="fade-section mx-auto max-w-7xl px-5 py-24">
      <SectionTitle
        eyebrow="Profile Network"
        title="GitHub and LinkedIn viewing surfaces."
        copy="Fast access points for recruiters, engineering teams and collaborators to inspect code, projects, identity and professional background."
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {socialProfiles.map((profile, index) => (
          <motion.a
            key={profile.label}
            href={profile.url}
            target="_blank"
            rel="noreferrer"
            className="social-card group"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.12 }}
            whileHover={{ y: -6 }}
          >
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-emerald-300">{profile.signal}</p>
                <h3 className="mt-4 text-3xl font-bold text-white">{profile.label}</h3>
                <p className="mt-2 font-mono text-sm text-cyan-200">@{profile.handle}</p>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-100 transition group-hover:bg-cyan-300/20">
                {profile.label === 'GitHub' ? <Code2 className="h-6 w-6" /> : <Network className="h-6 w-6" />}
              </span>
            </div>
            <p className="relative mt-6 leading-7 text-slate-400">{profile.description}</p>
            <div className="relative mt-7 space-y-2">
              {profile.stats.map((item) => (
                <p key={item} className="rounded-lg border border-white/10 bg-black/35 px-3 py-2 font-mono text-xs text-cyan-100/85">[PROFILE] {item}</p>
              ))}
            </div>
            <span className="project-action relative mt-7">
              View {profile.label}
              <ExternalLink className="h-4 w-4" />
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

function ExperienceEducationSkills() {
  const listedAchievements = achievements.filter((achievement) => !certifications.includes(achievement));

  return (
    <section id="experience" className="fade-section mx-auto max-w-7xl px-5 py-24">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel p-6 sm:p-7">
          <SectionTitle eyebrow="Experience" title="Internship runtime" />
          <div className="experience-timeline mt-8 space-y-5">
            {experience.map(([company, role, detail]) => (
              <div key={company} className="experience-item rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">{role}</p>
                <p className="mt-2 text-lg font-semibold text-white">{company}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">{detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel p-6 sm:p-7">
          <SectionTitle eyebrow="Skills" title="Systems and tools" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {skillGroups.map(({ category, items }) => (
              <div key={category} className="skill-group rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <h3 className="text-sm font-semibold text-slate-100">{category}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((skill) => <span key={skill} className="skill-capsule">{skill}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-cyan-200/10 bg-black/25 p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-100">
                <Award className="h-4 w-4 text-cyan-300" /> Certifications
              </h3>
              <div className="mt-3 space-y-2">
                {certifications.map((certification) => (
                  <p key={certification} className="achievement-card">{certification}</p>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-cyan-200/10 bg-black/25 p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-100">
                <Trophy className="h-4 w-4 text-emerald-300" /> Achievements
              </h3>
              <div className="mt-3 space-y-2">
                {listedAchievements.map((achievement) => (
                  <p key={achievement} className="achievement-card">{achievement}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="education" className="education-panel glass-panel mt-5 p-6 sm:p-8">
        <div className="grid items-stretch gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-emerald-300/20 bg-emerald-300/10">
                <GraduationCap className="h-6 w-6 text-emerald-300" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">Education</p>
                <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">Academic record</h2>
              </div>
            </div>
            <p className="mt-7 text-xl font-semibold leading-snug text-white">{education.university}</p>
            <p className="mt-3 font-mono text-sm text-cyan-100">{education.degree} — {education.specialization}</p>
            <p className="mt-2 text-sm text-slate-400">{education.currentYear}</p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="cgpa-card col-span-2 rounded-2xl border border-emerald-300/25 bg-emerald-300/[0.07] p-5">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-200">Cumulative CGPA</p>
                <p className="mt-2 text-5xl font-bold tracking-tight text-white">{education.cgpa.toFixed(2)}<span className="ml-2 text-xl font-medium text-slate-400">/ 10</span></p>
                <p className="mt-2 text-sm text-slate-400">Overall cumulative grade point average</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Current year</p>
                <p className="mt-2 font-semibold text-slate-100">{education.currentYear}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">School</p>
                <p className="mt-2 text-sm font-medium leading-snug text-slate-200">{education.school}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-cyan-200/10 bg-[#02090d]/65 p-4 sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300/80">Semester performance</p>
                <h3 className="mt-2 text-xl font-semibold text-white">GPA by semester</h3>
              </div>
              <p className="font-mono text-xs text-slate-400">Scale: 0–10 GPA</p>
            </div>
            <div className="gpa-chart mt-6" role="img" aria-label={`Semester GPA on a 0 to 10 scale: ${education.gpa.map(({ label, score }) => `${label}: ${score.toFixed(2)}`).join(', ')}`}>
              <div className="gpa-axis" aria-hidden="true">
                {[10, 5, 0].map((tick) => <span key={tick}>{tick}</span>)}
              </div>
              <div className="gpa-plot">
                {[0, 50, 100].map((position) => (
                  <span key={position} className="gpa-gridline" style={{ bottom: `${position}%` }} />
                ))}
                <div className="gpa-bars">
                  {education.gpa.map((semester, index) => (
                    <div key={semester.label} className={`gpa-bar-column ${index === education.gpa.length - 1 ? 'gpa-bar-latest' : ''}`} style={{ '--bar-height': `${semester.score * 10}%` }} aria-label={`${semester.label}: ${semester.score.toFixed(2)} GPA`}>
                      <span className="gpa-bar-value">{semester.score.toFixed(2)}</span>
                      <motion.div
                        className="gpa-bar-track"
                        style={{ height: `${semester.score * 10}%` }}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.75, delay: index * 0.08, ease: 'easeOut' }}
                      />
                      <span className="gpa-semester-label">S{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500">Semester GPA values are shown separately from the cumulative CGPA.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="fade-section mx-auto max-w-7xl px-5 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="glass-panel p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300/80">Contact</p>
          <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Connect to the engineering console.</h2>
          <p className="mt-5 text-slate-400">Open to AI internships, cloud engineering work, MLOps projects, hackathons and intelligent systems collaborations.</p>
          <ResumeActions className="mt-7" />
          <p className="mt-3 text-xs text-slate-500">
            If the PDF preview is unavailable, use Download PDF to save the resume.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a className="contact-link" href="mailto:balajimadhan41@gmail.com"><Mail className="h-4 w-4 shrink-0" /> <span>balajimadhan41@gmail.com</span></a>
            <a className="contact-link" href="tel:+918220178957"><Phone className="h-4 w-4 shrink-0" /> <span>+91 8220178957</span></a>
            <a className="contact-link" href="https://github.com/BALAJI-CODE-collab" target="_blank" rel="noreferrer"><Code2 className="h-4 w-4 shrink-0" /> <span>github.com/BALAJI-CODE-collab</span></a>
            <a className="contact-link" href="https://www.linkedin.com/in/balaji-madhan-574868313/" target="_blank" rel="noreferrer"><Network className="h-4 w-4 shrink-0" /> <span>LinkedIn profile</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const memoizedRoles = useMemo(() => roles, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.fade-section').forEach((section) => {
        gsap.fromTo(section, { opacity: 0, y: 42 }, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: { trigger: section, start: 'top 88%', once: true },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === '/' || (event.ctrlKey && event.key.toLowerCase() === 'k')) {
        event.preventDefault();
        setPaletteOpen(true);
      }
      if (event.key === 'Escape') {
        setPaletteOpen(false);
        setAssistantOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="portfolio-root min-h-screen overflow-x-hidden bg-black text-white">
      <Header onPalette={() => setPaletteOpen(true)} onAssistant={() => setAssistantOpen(true)} />
      <Hero roles={memoizedRoles} />
      <main className="relative overflow-hidden bg-black">
        <div className="page-bg-layer absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(0,255,204,0.08),transparent_30%),radial-gradient(circle_at_82%_38%,rgba(56,189,248,0.07),transparent_28%),radial-gradient(circle_at_48%_78%,rgba(124,58,237,0.05),transparent_26%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,204,0.035)_1px,transparent_1px),linear-gradient(0deg,rgba(0,255,204,0.025)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/55 to-black/80" />
        </div>
        <div className="relative z-10">
          <RuntimeBriefing />
          <FocusAndMetrics />
          <ArchitectureStack />
          <Projects />
          <ProfileNetwork />
          <ExperienceEducationSkills />
          <Contact />
        </div>
      </main>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onAssistant={() => setAssistantOpen(true)} />
      <AIAssistant open={assistantOpen} onClose={() => setAssistantOpen(false)} />
    </div>
  );
}
