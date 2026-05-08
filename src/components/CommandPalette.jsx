import { AnimatePresence, motion } from 'framer-motion';
import { Code2, Command, MessageSquare, X } from 'lucide-react';
import { commands } from '../data/portfolioData';

export function CommandPalette({ open, onClose, onAssistant }) {
  const runCommand = (action) => {
    onClose();
    if (action === 'github') window.open('https://github.com/BALAJI-CODE-collab', '_blank', 'noopener,noreferrer');
    if (action === 'linkedin') window.open('https://www.linkedin.com/in/balaji-madhan-574868313/', '_blank', 'noopener,noreferrer');
    if (action === 'projects') document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    if (action === 'contact' || action === 'resume') document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    if (action === 'assistant') onAssistant();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#03070b]/95 shadow-[0_0_120px_rgba(0,255,204,0.18)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <Command className="h-5 w-5 text-cyan-300" />
                <div>
                  <p className="text-xs uppercase tracking-[0.34em] text-cyan-200/70">Command Palette</p>
                  <p className="text-sm text-slate-400">AI infrastructure navigation console</p>
                </div>
              </div>
              <button onClick={onClose} className="icon-button" aria-label="Close command palette">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-3">
              {commands.map(([label, action]) => (
                <button key={label} onClick={() => runCommand(action)} className="command-row group">
                  <span className="font-mono text-sm text-slate-100">&gt; {label}</span>
                  {action === 'github' ? <Code2 className="h-4 w-4" /> : action === 'assistant' ? <MessageSquare className="h-4 w-4" /> : <Command className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
