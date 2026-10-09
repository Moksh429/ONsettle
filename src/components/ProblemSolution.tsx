import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  ShieldCheck, 
  Clock, 
  Ban, 
  Terminal, 
  Building2,
  Lock
} from 'lucide-react';

export const ProblemSolution: React.FC = () => {
  return (
    <section id="architecture" className="py-24 bg-white border-t border-[#192837]/10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7342E2] bg-[#7342E2]/10 px-3.5 py-1.5 rounded-full">
            Problem vs Solution
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#192837] tracking-tight mt-4 mb-4">
            Why Frontend Compliance Checks Fail
          </h2>
          <p className="font-body text-[#192837]/80 text-base sm:text-lg">
            Traditional Web3 apps rely on client-side gating or static attestations. In high-stakes institutional finance and tokenized RWAs, this leaves catastrophic security loopholes.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Problem Card */}
          <div className="rounded-3xl p-8 bg-[#FDF2F2] border border-rose-200/80 shadow-card flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700">The Vulnerability</span>
                  <h3 className="font-heading text-2xl font-bold text-[#192837]">
                    Frontend-Only Validation
                  </h3>
                </div>
              </div>

              <p className="text-sm text-[#192837]/80 leading-relaxed mb-6">
                When compliance verification only lives in a React or Next.js app, any malicious or sanction-listed actor can circumvent it completely by broadcasting directly via raw RPC or custom Solana scripts.
              </p>

              <div className="space-y-3.5">
                {[
                  {
                    title: 'Bypassable via Direct RPC',
                    desc: 'Users can construct and sign raw SPL token transfer instructions without ever touching the UI.',
                  },
                  {
                    title: 'Stale & Expired Attestations',
                    desc: 'A recipient verified 6 months ago could be expired or sanctioned today with zero automated re-check.',
                  },
                  {
                    title: 'No Universal Hook Enforcement',
                    desc: 'Secondary transfers between holders bypass the primary issuer’s compliance gating completely.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/70 border border-rose-200/50">
                    <span className="text-rose-500 font-bold text-sm mt-0.5">✕</span>
                    <div>
                      <p className="text-xs font-bold text-rose-900">{item.title}</p>
                      <p className="text-xs text-[#192837]/70 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-200/60 text-xs font-medium text-rose-800">
              Outcome: Regulatory risk, non-compliant transfers, and legal exposure.
            </div>
          </div>

          {/* Solution Card */}
          <div className="rounded-3xl p-8 bg-[#F4F0FD] border border-[#7342E2]/30 shadow-card flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7342E2]/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#7342E2]/15 flex items-center justify-center text-[#7342E2]">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7342E2]">The Solution</span>
                  <h3 className="font-heading text-2xl font-bold text-[#192837]">
                    ON SETTLE Hook Engine
                  </h3>
                </div>
              </div>

              <p className="text-sm text-[#192837]/80 leading-relaxed mb-6">
                ON SETTLE utilizes SPL Token-2022 Transfer Hooks. The Solana runtime itself triggers the verification contract on every single balance change, making enforcement atomic and impossible to skip.
              </p>

              <div className="space-y-3.5">
                {[
                  {
                    title: '100% On-Chain Transfer Validation',
                    desc: 'Enforced directly at settlement. Even CLI, bot, or aggregator calls must pass verification.',
                  },
                  {
                    title: 'Live Expiration & Revocation Checks',
                    desc: 'Checks Unix timestamps and issuer revocation registries during the transfer instruction.',
                  },
                  {
                    title: 'Permissioned Tokenized RWAs',
                    desc: 'Real estate, private credit, and institutional yields comply with regulatory rules automatically.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 border border-[#7342E2]/20">
                    <CheckCircle size={16} className="text-[#7342E2] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-[#192837]">{item.title}</p>
                      <p className="text-xs text-[#192837]/70 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#7342E2]/20 text-xs font-semibold text-[#7342E2]">
              Tagline: Rules enforced when the transfer happens.
            </div>
          </div>
        </div>

        {/* 6 Key Features Grid */}
        <div id="compliance" className="mt-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#192837]">
              Engineered for Institutional Integrity
            </h3>
            <p className="text-sm text-[#192837]/70 mt-2">
              Every feature requested in the protocol architecture to secure compliant tokenized assets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'On-Chain Transfer Validation',
                description: 'Validates recipient eligibility directly at execution, rejecting unapproved transfers on-chain.',
              },
              {
                icon: Clock,
                title: 'Attestation Expiration Checks',
                description: 'Verifies real-time expiration timestamps to ensure KYC / AML credentials remain current.',
              },
              {
                icon: Ban,
                title: 'Instant Revocation Support',
                description: 'Allows compliance authorities to instantly revoke compromised or sanctioned accounts.',
              },
              {
                icon: Terminal,
                title: 'Frontend-Independent',
                description: 'Decoupled from client code. Any RPC call or DEX routing automatically invokes the transfer hook.',
              },
              {
                icon: Building2,
                title: 'Permissioned RWAs & Equities',
                description: 'Designed specifically for real-world assets, private funds, and tokenized corporate securities.',
              },
              {
                icon: Lock,
                title: 'Token-2022 Transfer Hook CPI',
                description: 'Leverages Solana native Cross-Program Invocation hooks with zero custom wrapper tokens.',
              },
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-[#F2F2EE]/60 border border-[#192837]/10 hover:border-[#7342E2]/40 transition-all duration-300 hover:shadow-card group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#7342E2]/10 text-[#7342E2] flex items-center justify-center mb-4 group-hover:bg-[#7342E2] group-hover:text-white transition-colors duration-300">
                    <Icon size={20} />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-[#192837] mb-2">
                    {feat.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#192837]/75 leading-relaxed font-body">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
