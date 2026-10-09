import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  CheckCircle2, 
  Circle, 
  Flame 
} from 'lucide-react';

const techItems = [
  {
    name: 'Solana',
    role: 'High-Throughput L1',
    description: '400ms block times with sub-cent transaction costs for high-frequency institutional asset settlements.',
  },
  {
    name: 'SPL Token-2022',
    role: 'Native Token Extensions',
    description: 'Utilizes first-party TransferHook extensions to enforce smart logic on every transfer instruction.',
  },
  {
    name: 'Transfer Hooks',
    role: 'CPI Hook Interface',
    description: 'Enforces external program calls dynamically during instruction evaluation before any ledger state commits.',
  },
  {
    name: 'Rust / Anchor',
    role: 'Smart Contract Framework',
    description: 'Type-safe PDAs, deterministic account deserialization, and rigorous math verification on-chain.',
  },
];

const roadmapItems = [
  {
    title: 'Implement Transfer Hook Core',
    desc: 'Token-2022 transfer hook interface instruction handlers and CPI router.',
    status: 'completed',
    badge: 'Completed',
  },
  {
    title: 'Add Attestation Validation & Revocation',
    desc: 'PDA storage for accreditation certificates, valid_until epoch checks, and instant revocation authorities.',
    status: 'completed',
    badge: 'Completed',
  },
  {
    title: 'Test Compliance Enforcement',
    desc: 'Unit tests covering all 4 failure permutations and valid transfer execution via anchor test suite.',
    status: 'in-progress',
    badge: 'In Progress',
  },
  {
    title: 'Deploy to Solana Devnet',
    desc: 'Deploy compiled Anchor program to Solana Devnet cluster with demo mint and test authority.',
    status: 'in-progress',
    badge: 'Active Sprint',
  },
  {
    title: 'Publish Program ID & Web Demo',
    desc: 'Open-source verifiable build, public explorer links, and interactive transfer verification web app.',
    status: 'upcoming',
    badge: 'Upcoming',
  },
];

export const TechStackRoadmap: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const codeSnippet = `git clone https://github.com/Moksh429/ONsettle.git
cd on-settle
anchor build
anchor test`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="roadmap" className="py-24 bg-white border-t border-[#192837]/10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Tech Stack Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7342E2] bg-[#7342E2]/10 px-3.5 py-1.5 rounded-full">
            Developer Infrastructure
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#192837] tracking-tight mt-4 mb-4">
            Built on Solana Token Extensions
          </h2>
          <p className="font-body text-[#192837]/80 text-base sm:text-lg">
            Harnessing the native power of SPL Token-2022 to deliver zero-overhead, tamper-resistant compliance hooks.
          </p>
        </div>

        {/* Tech Stack Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {techItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#F2F2EE]/50 border border-[#192837]/10 hover:border-[#7342E2]/30 transition-all duration-300 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-heading font-bold text-lg text-[#192837]">
                  {item.name}
                </h4>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#7342E2]/10 text-[#7342E2]">
                  {item.role}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#192837]/75 font-body leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Getting Started & Roadmap 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Quickstart Terminal Box (5 cols) */}
          <div className="lg:col-span-5 bg-[#192837] rounded-3xl p-6 sm:p-8 text-white shadow-card border border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2.5">
                <Terminal size={18} className="text-[#7342E2]" />
                <span className="font-mono text-sm font-semibold tracking-wide">
                  Getting Started
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
                title="Copy commands"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed font-body">
              Clone the Anchor repository, compile the transfer hook program, and run the automated test suite locally:
            </p>

            <pre className="bg-black/40 p-4 rounded-2xl font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed border border-white/5">
              <code>{codeSnippet}</code>
            </pre>

            <div className="mt-6 pt-5 border-t border-white/10 space-y-2 text-xs text-slate-400 font-body">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Anchor CLI &gt;= 0.29.0
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Solana CLI &gt;= 1.18.0
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> SPL Token-2022 compatibility
              </div>
            </div>
          </div>

          {/* Right: Hackathon Roadmap Tracker (7 cols) */}
          <div className="lg:col-span-7 bg-[#F2F2EE]/40 rounded-3xl p-6 sm:p-8 border border-[#192837]/10 shadow-card">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#192837]/10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#7342E2]">
                  Milestones
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#192837] mt-1">
                  Solana Hackathon Roadmap
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#10B981] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                <Flame size={14} /> Active Hackathon Build
              </div>
            </div>

            <div className="space-y-4">
              {roadmapItems.map((item, idx) => {
                const isCompleted = item.status === 'completed';
                const isInProgress = item.status === 'in-progress';

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                      isCompleted
                        ? 'bg-white border-emerald-200/80 shadow-xs'
                        : isInProgress
                        ? 'bg-white border-[#7342E2]/30 shadow-xs'
                        : 'bg-white/60 border-slate-200 opacity-75'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 size={20} className="text-emerald-600" />
                      ) : isInProgress ? (
                        <div className="w-5 h-5 rounded-full border-2 border-[#7342E2] flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#7342E2] animate-ping" />
                        </div>
                      ) : (
                        <Circle size={20} className="text-slate-400" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-heading text-sm font-bold text-[#192837]">
                          {item.title}
                        </h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800'
                              : isInProgress
                              ? 'bg-[#7342E2]/10 text-[#7342E2]'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#192837]/75 font-body">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
