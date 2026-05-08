import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Send, X } from 'lucide-react';
import { useState } from 'react';

const answers = [
  'BALAJI_AI_AGENT: The portfolio models Balaji as an AI infrastructure builder: computer vision, predictive ML, cloud-native deployments and automation workflows.',
  'BALAJI_AI_AGENT: The produce grading project runs like a deployed vision product with YOLOv11 inference, CBAM attention, quality assessment and shelf-life prediction.',
  'BALAJI_AI_AGENT: The architecture stack connects React surfaces, runtime APIs, TensorFlow workflows, Docker/Kubernetes systems, Kafka streams and Vertex AI-style cloud services.',
  'BALAJI_AI_AGENT: Current focus areas are autonomous AI systems, CUDA accelerated workloads, full stack platforms and distributed AI runtimes.',
];

export function AIAssistant({ open, onClose }) {
  const [messages, setMessages] = useState([
    'BALAJI_AI_AGENT: Online. Ask about projects, infrastructure, AI systems or deployment workflows.',
  ]);

  const send = () => {
    setMessages((current) => [...current, '> explain portfolio systems', answers[current.length % answers.length]]);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ opacity: 0, y: 26, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 22, scale: 0.98 }}
          className="fixed bottom-5 right-5 z-40 w-[min(92vw,390px)] overflow-hidden rounded-2xl border border-emerald-300/20 bg-[#02080b]/95 shadow-[0_0_90px_rgba(0,255,204,0.18)] backdrop-blur-2xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-200">BALAJI_AI_AGENT</p>
                <p className="text-xs text-slate-500">Portfolio intelligence runtime</p>
              </div>
            </div>
            <button className="icon-button" onClick={onClose} aria-label="Close assistant">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="max-h-72 space-y-3 overflow-y-auto p-4 font-mono text-xs leading-relaxed text-emerald-100/85">
            {messages.map((message, index) => (
              <p key={`${message}-${index}`} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                {message}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-white/10 p-3">
            <button onClick={send} className="flex w-full items-center justify-between rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-left font-mono text-xs text-cyan-100 transition hover:bg-cyan-300/15">
              ask infrastructure agent
              <Send className="h-4 w-4" />
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
