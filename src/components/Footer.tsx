import React from 'react';
import { Logo } from './Logo';
import { ShieldCheck, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#192837] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Logo size={32} fill="#FFFFFF" />
                <span className="font-heading text-xl font-bold tracking-tight text-white">
                  ON SETTLE
                </span>
              </div>
              <p className="font-heading text-lg font-semibold text-white/90 mb-3 max-w-sm">
                Rules enforced when the transfer happens.
              </p>
              <p className="text-xs text-white/60 font-body leading-relaxed max-w-md">
                On-chain compliance engine utilizing Solana SPL Token-2022 Transfer Hooks to enforce eligibility, expiration, and revocation directly during transfer settlement.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#7342E2] bg-[#7342E2]/15 px-2.5 py-1 rounded-full border border-[#7342E2]/30">
                Solana Hackathon 2026
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Token-2022 Ready
              </span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-4">
              Architecture
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75 font-body">
              <li>
                <a href="#architecture" className="hover:text-white transition-colors">
                  Frontend vs On-Chain Gating
                </a>
              </li>
              <li>
                <a href="#token-2022" className="hover:text-white transition-colors">
                  Token-2022 Hook Lifecycle
                </a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-white transition-colors">
                  Attestation Expiration
                </a>
              </li>
              <li>
                <a href="#simulation" className="hover:text-white transition-colors">
                  Interactive Simulator
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-white transition-colors">
                  Development Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Disclaimer & Legal (4 cols) */}
          <div className="md:col-span-4 bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-2">
              <ShieldCheck size={16} />
              <span>Project Disclaimer</span>
            </div>
            <p className="text-xs text-white/70 font-body leading-relaxed">
              ON SETTLE is an experimental compliance-enforcement project. Production use requires security audits, reliable attestation issuance, and appropriate legal review.
            </p>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-white/50">Open Source Protocol</span>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1 text-[11px] text-white/70 hover:text-white transition-colors"
              >
                Back to top <ArrowUp size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} ON SETTLE. All rights reserved.</p>
          <p className="font-mono text-[11px] text-white/40">
            Solana SPL Token-2022 Transfer Hook Architecture
          </p>
        </div>
      </div>
    </footer>
  );
};
