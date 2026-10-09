import React from 'react';
import { Send, Cpu, CheckSquare, ShieldCheck, Check, X } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Send,
    title: 'Initiate Token Transfer',
    description: 'A sender triggers an SPL Token-2022 transfer instruction via wallet, CLI, or smart contract.',
    detail: 'spl_token_2022::instruction::transfer_checked()',
  },
  {
    step: '02',
    icon: Cpu,
    title: 'Token-2022 Invokes Hook',
    description: 'The Token-2022 program detects the TransferHook extension and issues a Cross-Program Invocation (CPI).',
    detail: 'spl_transfer_hook_interface::execute()',
  },
  {
    step: '03',
    icon: CheckSquare,
    title: 'ON SETTLE Validates Attestation',
    description: 'Our program inspects the recipient’s compliance PDA: checking signature validity, timestamp expiration, and revocation status.',
    detail: 'verify_recipient_attestation(ctx, recipient)',
  },
  {
    step: '04',
    icon: ShieldCheck,
    title: 'Atomic Settlement or Revert',
    description: 'If verified, the transfer commits to ledger. If any compliance check fails, the transaction reverts cleanly.',
    detail: 'Ok(()) or Err(ComplianceError)',
  },
];

const matrixData = [
  {
    condition: 'Valid attestation',
    result: 'Allow transfer',
    allowed: true,
    note: 'Active accreditation PDA, valid timestamp, clean blacklist status.',
  },
  {
    condition: 'Missing attestation',
    result: 'Reject transfer',
    allowed: false,
    note: 'Recipient address has no registered attestation PDA.',
  },
  {
    condition: 'Expired or revoked',
    result: 'Reject transfer',
    allowed: false,
    note: 'Current slot timestamp exceeds valid_until or issuer revocation flag is active.',
  },
  {
    condition: 'Invalid attestation data',
    result: 'Reject transfer',
    allowed: false,
    note: 'Malformed signature, invalid registry authority, or schema tampered with.',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="token-2022" className="py-24 bg-[#F2F2EE] border-t border-[#192837]/10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7342E2] bg-[#7342E2]/10 px-3.5 py-1.5 rounded-full">
            Execution Lifecycle
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#192837] tracking-tight mt-4 mb-4">
            How ON SETTLE Operates On-Chain
          </h2>
          <p className="font-body text-[#192837]/80 text-base sm:text-lg">
            Transfer hook enforcement happens inside the Solana virtual machine during the transaction, guaranteeing zero bypassability.
          </p>
        </div>

        {/* 4 Steps Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#192837]/10 shadow-card flex flex-col justify-between relative group hover:border-[#7342E2]/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-heading text-3xl font-extrabold text-[#7342E2]/30 group-hover:text-[#7342E2] transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#7342E2]/10 text-[#7342E2] flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-[#192837] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#192837]/70 font-body leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#192837]/10 font-mono text-[11px] text-[#7342E2] bg-[#7342E2]/5 px-2.5 py-1.5 rounded-lg truncate">
                  {item.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Expected Behavior Matrix Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#192837]/10 shadow-card">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#192837]/10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#7342E2]">
                Specification Matrix
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#192837] mt-1">
                Expected Behavior Table
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#192837]/70 max-w-md">
              Direct verification criteria implemented in the Anchor smart contract program to ensure deterministic compliance.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#192837]/10 text-xs font-bold uppercase tracking-wider text-[#192837]/60">
                  <th className="py-3.5 px-4">Condition</th>
                  <th className="py-3.5 px-4">Result</th>
                  <th className="py-3.5 px-4 hidden sm:table-cell">Protocol Description</th>
                  <th className="py-3.5 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#192837]/5 text-sm">
                {matrixData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-4 font-semibold text-[#192837] flex items-center gap-2.5">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          row.allowed ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                      />
                      {row.condition}
                    </td>
                    <td className="py-4 px-4 font-mono font-medium">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                          row.allowed
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {row.allowed ? <Check size={13} /> : <X size={13} />}
                        {row.result}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs text-[#192837]/70 hidden sm:table-cell">
                      {row.note}
                    </td>
                    <td className="py-4 px-4 text-right font-mono text-xs text-[#192837]/50">
                      {row.allowed ? 'TX: COMMITTED' : 'TX: REVERTED'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
