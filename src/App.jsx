import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Activity,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  GraduationCap,
  Hexagon,
  Mail,
  Network,
  Phone,
  ServerCog,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { AIAssistant } from './components/AIAssistant';
import { CommandPalette } from './components/CommandPalette';
import { ArchitectureBackdrop, LivingGrid } from './components/LivingGrid';
import { architecture, focusItems, metrics, roles, statusItems } from './data/portfolioData';
import { projects } from './data/projects';
import { profile, } from './data/profile';
import { skills, achievements } from './data/skills';
import { experience } from './data/experience';
import { education } from './data/education';
import { certifications } from './data/certifications';
import { resume } from './data/resume';
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

function Header({ onPalette, onAssistant }) {
  return (
    <header className="fixed left-4 right-4 top-4 z-40 rounded-2xl border border-white/10 bg-black/80 px-4 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
            <Hexagon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100">Balaji Madhan</p>
            <p className="hidden text-xs text-slate-500 sm:block">AI infrastructure portfolio runtime</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="nav-chip hidden sm:inline-flex" onClick={onAssistant}>BALAJI_AI_AGENT</button>
          <button className="nav-chip" onClick={onPalette}>/ Ctrl K</button>
        </div>
      </div>
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
    <section className="relative min-h-screen overflow-hidden bg-black">
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

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 py-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="mx-auto max-w-5xl text-center hero-content-shell"
        >
          <div className="mx-auto mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.25em] text-cyan-100 shadow-[0_0_45px_rgba(0,255,204,0.12)]">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(0,255,65,0.8)]" />
            AI Engineer + Cloud Systems Developer
          </div>
          <h1 className="text-balance text-5xl font-black tracking-normal text-white sm:text-7xl lg:text-8xl">
            Balaji Madhan
          </h1>
          <div className="mt-5 h-9 font-mono text-base uppercase tracking-[0.22em] text-emerald-200 sm:text-xl">
            {typedRole}<span className="cursor-blink text-cyan-200">_</span>
          </div>
          <p className="mx-auto mt-7 max-w-4xl text-balance text-3xl font-semibold leading-tight text-slate-100 sm:text-5xl">
            Design Intelligent Systems. Deploy Autonomous Infrastructure. Scale AI Architectures.
          </p>
          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            III Year AIML student at SRM Institute of Science and Technology, Trichy, building across AI systems, cloud engineering, computer vision, intelligent automation and realtime infrastructure.
          </p>

          <div className="status-strip mx-auto mt-10 grid max-w-5xl gap-2 sm:grid-cols-2 lg:grid-cols-6">
            {statusItems.map(([label, value]) => (
              <div key={label} className="rounded-xl border border-cyan-200/15 bg-black/30 p-3 text-left backdrop-blur-[2px]">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
                <p className="mt-2 flex items-center gap-2 font-mono text-sm text-cyan-100">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  {value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
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

function Resume() {
  return (
    <section id="resume" className="fade-section mx-auto max-w-7xl px-5 py-24">
      <SectionTitle eyebrow="Resume" title="View & download your resume." />
      <SectionContext label="resume actions">
        Use the view/download options below. View opens the PDF in a new tab.
      </SectionContext>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <div className="glass-panel p-6">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300">Your profile</p>
          <div className="mt-6 flex items-center gap-5">
            <img
              src={profile.imageUrl}
              alt="Balaji Madhan"
              className="h-20 w-20 rounded-full border border-cyan-200/20 bg-cyan-300/10 object-cover"
            />
            <div>
              <p className="text-2xl font-bold text-white">Balaji Madhan</p>
              <p className="mt-1 text-sm text-slate-400">AI/ML + Cloud Systems Engineer</p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300">Resume files</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="project-action mt-0"
              href={resume.viewUrl}
              target="_blank"
              rel="noreferrer"
            >
              View Resume
              <ExternalLink className="h-4 w-4" />
            </a>

            <a className="project-action mt-0" href={resume.downloadUrl} download>
              Download Resume
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
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
          <motion.article key={project.title} className="project-card" whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 240, damping: 22 }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-300">{project.signal}</p>
                <h3 className="mt-4 text-2xl font-bold text-white">{project.title}</h3>
              </div>
              <ShieldCheck className="h-6 w-6 shrink-0 text-cyan-300" />
            </div>

            {project.imageUrl && (
              <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-black/30">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />
              </div>
            )}

            <p className="mt-5 leading-7 text-slate-400">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => <span key={tech} className="tech-pill">{tech}</span>)}
            </div>
            <div className="mt-7 space-y-2 font-mono text-xs text-cyan-100/85">
              {project.logs.map((log) => <p key={log} className="rounded-lg border border-white/10 bg-black/35 px-3 py-2">[LIVE] {log}</p>)}
            </div>
            <a className="project-action mt-7" href={project.githubUrl} target="_blank" rel="noreferrer">
              View on GitHub
              <ExternalLink className="h-4 w-4" />
            </a>
          </motion.article>
        ))}
      </div>
    </section>
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
  return (
    <section className="fade-section mx-auto grid max-w-7xl gap-5 px-5 py-24 lg:grid-cols-3">
      <div className="glass-panel p-6">
        <SectionTitle eyebrow="Experience" title="Internship runtime" />
        <div className="mt-8 space-y-4">
          {experience.map(([company, role, detail]) => (
            <div key={company} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-lg font-semibold text-white">{company}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">{role}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">{detail}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="glass-panel p-6">
        <SectionTitle eyebrow="Education" title="Academic signal" />
        <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <GraduationCap className="h-7 w-7 text-emerald-300" />
          <p className="mt-4 text-lg font-semibold text-white">{education.university}</p>
          <p className="mt-2 text-sm text-slate-400">{education.degree}</p>
          <p className="mt-4 font-mono text-cyan-200">CGPA: {education.cgpa}</p>
          <div className="mt-5 flex h-28 items-end gap-2">
            {education.gpa.map((semester) => (
              <div key={semester.label} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-lg bg-gradient-to-t from-emerald-400 to-cyan-300 shadow-[0_0_22px_rgba(0,255,204,0.2)]" style={{ height: `${semester.score * 10}%` }} />
                <span className="font-mono text-[10px] text-cyan-200">{semester.label}</span>
                <span className="font-mono text-[10px] text-slate-500">{semester.score.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-2 font-mono text-xs text-slate-300">
            {education.gpa.map((semester) => (
              <p key={`${semester.label}-row`} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                {semester.label} GPA: {semester.score.toFixed(2)}
              </p>
            ))}
          </div>
          <p className="mt-5 text-sm text-slate-500">{education.school}</p>
        </div>
      </div>
      <div className="glass-panel p-6">
        <SectionTitle eyebrow="Skills" title="Orbital stack" />
        <div className="mt-8 flex flex-wrap gap-2">
          {skills.map((skill) => <span key={skill} className="skill-capsule">{skill}</span>)}
        </div>
        <div className="mt-8 space-y-2">
          {achievements.map((achievement) => (
            <p key={achievement} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-300">{achievement}</p>
          ))}
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
          <div className="mt-8 grid gap-3">
            <a className="contact-link" href="mailto:balajimadhan41@gmail.com"><Mail className="h-4 w-4" /> balajimadhan41@gmail.com</a>
            <a className="contact-link" href="tel:+918220178957"><Phone className="h-4 w-4" /> +91 8220178957</a>
            <a className="contact-link" href="https://github.com/BALAJI-CODE-collab" target="_blank" rel="noreferrer"><Code2 className="h-4 w-4" /> github.com/BALAJI-CODE-collab</a>
            <a className="contact-link" href="https://www.linkedin.com/in/balaji-madhan-574868313/" target="_blank" rel="noreferrer"><Network className="h-4 w-4" /> linkedin.com/in/balaji-madhan-574868313</a>
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
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
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
          <Resume />
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
