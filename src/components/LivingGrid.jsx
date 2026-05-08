import { motion } from 'framer-motion';
import { logBlocks, terminalTitles } from '../data/portfolioData';

export function LivingGrid({ style, mode = 'hero' }) {
  const terminalCount = mode === 'ambient' ? 8 : 12;
  const terminals = Array.from({ length: terminalCount }, (_, index) => ({
    title: terminalTitles[index % terminalTitles.length],
    lines: logBlocks[index % logBlocks.length],
    delay: index * 0.07,
  }));
  const isAmbient = mode === 'ambient';

  return (
    <div className={`absolute inset-0 z-[2] pointer-events-none select-none will-change-transform ${isAmbient ? 'opacity-[0.28]' : 'opacity-[0.78]'}`} style={style}>
      <div className={`grid h-full min-h-screen grid-cols-2 gap-px bg-[#1a1a1a] md:grid-cols-3 lg:grid-cols-4 ${isAmbient ? 'grid-rows-3' : 'grid-rows-5'}`}>
        {terminals.map((terminal, index) => (
          <motion.div
            key={`${terminal.title}-${index}`}
            initial={{ opacity: 0, y: 18, x: 0 }}
            animate={{
              opacity: [0.68, 1, 0.76],
              y: [0, -10 - (index % 5), 0],
              x: [0, index % 2 === 0 ? 5 : -5, 0],
            }}
            transition={{ duration: (isAmbient ? 8 : 4.8) + (index % 5) * 0.8, delay: terminal.delay, repeat: Infinity, ease: 'easeInOut' }}
            className={`terminal-card flex min-h-[150px] flex-col overflow-hidden border border-cyan-200/10 bg-[#071014] shadow-[0_0_25px_rgba(0,255,200,0.08)] ${isAmbient ? '' : 'backdrop-blur-[2px]'}`}
            style={{ '--delay': `${index * 0.28}s` }}
          >
            <div className="h-7 px-3 flex items-center justify-between border-b border-[#ffffff10]">
              <span className="truncate text-[10px] font-mono tracking-wide text-cyan-300/70">{terminal.title}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_22px_rgba(0,255,65,0.9)]" />
            </div>
            <div className="relative flex-1 overflow-hidden p-3 font-mono text-[9px] leading-relaxed text-emerald-300/90">
              <motion.div
                animate={isAmbient ? undefined : { y: ['0%', '-36%', '0%'] }}
                transition={isAmbient ? undefined : { duration: 9 + (index % 4), delay: index * 0.16, repeat: Infinity, ease: 'easeInOut' }}
              >
                {[...terminal.lines, ...terminal.lines.slice(0, 3)].map((line, lineIndex) => (
                  <motion.p
                    key={`${line}-${lineIndex}`}
                    className={line.startsWith('>') || line.startsWith('[') ? 'text-cyan-200/90' : 'text-emerald-300/90'}
                    animate={isAmbient ? undefined : { opacity: [0.48, 1, 0.62] }}
                    transition={isAmbient ? undefined : { duration: 1.8 + (lineIndex % 3) * 0.45, delay: lineIndex * 0.24 + index * 0.04, repeat: Infinity }}
                  >
                    {line}
                  </motion.p>
                ))}
                <span className="cursor-blink text-cyan-100">_</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ArchitectureBackdrop({ style }) {
  const nodes = [
    [90, 130],
    [250, 75],
    [430, 145],
    [660, 95],
    [840, 185],
    [1010, 120],
    [180, 390],
    [410, 330],
    [650, 420],
    [900, 355],
  ];

  return (
    <div className="absolute inset-0 z-[3] pointer-events-none opacity-75 mix-blend-screen will-change-transform" style={style}>
      <svg className="h-full w-full" viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="infra-line" x1="0" x2="1">
            <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#00ff41" stopOpacity="0.22" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path className="data-path path-a" d="M90 130 C220 40 310 210 430 145 S570 20 660 95 S770 245 840 185 S930 45 1010 120" />
        <path className="data-path path-b" d="M180 390 C290 270 330 450 410 330 S540 505 650 420 S780 255 900 355" />
        <path className="data-path path-c" d="M250 75 C300 235 360 280 410 330 S520 230 660 95 M650 420 C725 325 780 260 840 185" />
        {nodes.map(([cx, cy], index) => (
          <g key={`${cx}-${cy}`} filter="url(#glow)">
            <circle className="node-ring" cx={cx} cy={cy} r="18" style={{ animationDelay: `${index * 0.22}s` }} />
            <circle className="node-core" cx={cx} cy={cy} r="4.5" />
          </g>
        ))}
        {[0, 1, 2, 3, 4].map((item) => (
          <circle key={item} className={`particle particle-${item + 1}`} r="3" fill="#bffff5" />
        ))}
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <circle key={`free-${item}`} className={`free-particle free-particle-${item + 1}`} r="2.5" fill="#00ffcc" />
        ))}
      </svg>
    </div>
  );
}
