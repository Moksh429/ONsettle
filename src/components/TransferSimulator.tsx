import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';

export type AttestationState = 'valid' | 'missing' | 'expired' | 'revoked' | 'invalid_data';

interface Scenario {
  id: AttestationState;
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  expectedResult: 'Allow transfer' | 'Reject transfer';
  errorCode?: string;
  logMessage: string;
}

const scenarios: Scenario[] = [
  {
    id: 'valid',
    title: 'Valid Attestation',
    badge: 'Compliant',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Active investor KYC/AML accreditation signed by institutional authority. Valid until 2027.',
    expectedResult: 'Allow transfer',
    logMessage: 'Program log: Attestation PDA verified: Valid=true, Expired=false, Revoked=false. Transfer permitted.',
  },
  {
    id: 'missing',
    title: 'Missing Attestation',
    badge: 'No PDA Found',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Recipient wallet has never undergone identity attestation. No PDA exists.',
    expectedResult: 'Reject transfer',
    errorCode: '0x1771 (AttestationNotFound)',
    logMessage: 'Program error: Recipient attestation account does not exist. Hook aborted transfer.',
  },
  {
    id: 'expired',
    title: 'Expired Attestation',
    badge: 'Time Exceeded',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    description: 'Accreditation certificate expired 24 hours ago. Periodic re-verification required.',
    expectedResult: 'Reject transfer',
    errorCode: '0x1772 (AttestationExpired)',
    logMessage: 'Program error: Attestation timestamp 1728518400 < current_slot_time 1728604800. Expired.',
  },
  {
    id: 'revoked',
    title: 'Revoked Attestation',
    badge: 'Sanctioned / Revoked',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Issuer revoked compliance status due to sanctions list update or regulatory requirement.',
    expectedResult: 'Reject transfer',
    errorCode: '0x1773 (AttestationRevoked)',
    logMessage: 'Program error: Recipient revoked by compliance authority public key: 9Rev...Auth. Blocked.',
  },
  {
    id: 'invalid_data',
    title: 'Invalid Attestation Data',
    badge: 'Schema Mismatch',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    description: 'Corrupted payload hash or unauthorized signer key trying to spoof eligibility.',
    expectedResult: 'Reject transfer',
    errorCode: '0x1774 (InvalidAttestationData)',
    logMessage: 'Program error: Attestation signature mismatch against trusted authority registry.',
  },
];

export const TransferSimulator: React.FC = () => {
  const [selectedState, setSelectedState] = useState<AttestationState>('valid');
  const [transferAmount, setTransferAmount] = useState('25,000');
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [simulationResult, setSimulationResult] = useState<{
    status: 'idle' | 'success' | 'failed';
    logs: string[];
    txSignature?: string;
  }>({ status: 'idle', logs: [] });

  const activeScenario = scenarios.find((s) => s.id === selectedState)!;

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setCurrentStep(1);
    setSimulationResult({ status: 'idle', logs: ['Initiating Solana SPL Token-2022 transfer_checked...'] });

    setTimeout(() => {
      setCurrentStep(2);
      setSimulationResult((prev) => ({
        ...prev,
        logs: [
          ...prev.logs,
          'SPL Token-2022: Transfer Hook extension triggered.',
          'Invoking CPI -> ON SETTLE Program [onSet1Le5837qK...]',
        ],
      }));
    }, 800);

    setTimeout(() => {
      setCurrentStep(3);
      setSimulationResult((prev) => ({
        ...prev,
        logs: [
          ...prev.logs,
          `Locating Recipient Attestation PDA [Seeds: ("attestation", recipient_pubkey)]...`,
          activeScenario.logMessage,
        ],
      }));
    }, 1700);

    setTimeout(() => {
      setCurrentStep(4);
      setIsSimulating(false);
      if (activeScenario.expectedResult === 'Allow transfer') {
        setSimulationResult((prev) => ({
          status: 'success',
          logs: [
            ...prev.logs,
            'Success: All on-chain assertions satisfied.',
            'SPL Token-2022 debited sender & credited recipient balance.',
            'Transaction finalized in block #294819401. Status: Confirmed.',
          ],
          txSignature: '5U3a...7kM9wZq',
        }));
      } else {
        setSimulationResult((prev) => ({
          status: 'failed',
          logs: [
            ...prev.logs,
            `Transaction simulation failed with error: ${activeScenario.errorCode}`,
            'Settlement reverted: 0 tokens moved. Zero gas state mutation permitted.',
          ],
        }));
      }
    }, 2500);
  };

  return (
    <section id="simulation" className="relative py-24 bg-[#F2F2EE] border-t border-[#192837]/10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7342E2]/10 text-[#7342E2] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={14} /> Interactive Hook Playground
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#192837] tracking-tight mb-4">
            Test Token-2022 Transfer Hook Enforcement
          </h2>
          <p className="font-body text-[#192837]/80 text-base sm:text-lg">
            Experience how ON SETTLE evaluates recipient attestations directly inside the Solana transaction lifecycle before any token state can change.
          </p>
        </div>

        {/* Playground Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Condition Selector & Transfer Details (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-[#192837]/10 flex flex-col gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#192837]/60 mb-3">
                1. Select Recipient Attestation State
              </label>
              <div className="space-y-2.5">
                {scenarios.map((scenario) => {
                  const isSelected = scenario.id === selectedState;
                  return (
                    <button
                      key={scenario.id}
                      onClick={() => {
                        setSelectedState(scenario.id);
                        setSimulationResult({ status: 'idle', logs: [] });
                        setCurrentStep(0);
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                        isSelected
                          ? 'border-[#7342E2] bg-[#7342E2]/5 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            scenario.expectedResult === 'Allow transfer'
                              ? 'bg-emerald-500'
                              : 'bg-rose-500'
                          }`}
                        />
                        <div>
                          <p className="text-sm font-semibold text-[#192837]">
                            {scenario.title}
                          </p>
                          <p className="text-xs text-[#192837]/60 line-clamp-1">
                            {scenario.description}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${scenario.badgeColor} shrink-0`}
                      >
                        {scenario.expectedResult === 'Allow transfer' ? 'ALLOW' : 'REJECT'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Asset Transfer Config */}
            <div className="pt-4 border-t border-[#192837]/10">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#192837]/60 mb-2">
                2. Simulated Transfer Payload
              </label>
              <div className="p-4 rounded-2xl bg-[#F2F2EE]/70 border border-[#192837]/10 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#192837]/60">Asset:</span>
                  <span className="font-semibold text-[#192837] flex items-center gap-1.5">
                    <Layers size={14} className="text-[#7342E2]" />
                    Tokenized US T-Bill (RWA-2022)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#192837]/60">Amount:</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      className="w-20 text-right px-2 py-0.5 font-bold text-[#192837] bg-white rounded border border-[#192837]/20 focus:outline-none focus:border-[#7342E2]"
                    />
                    <span className="font-semibold text-[#192837]">TBILL</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#192837]/60">Recipient Pubkey:</span>
                  <span className="font-mono text-[#192837] text-[11px] bg-white px-2 py-0.5 rounded border border-[#192837]/10">
                    9qWp...4vLm
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#192837]/60">Transfer Hook Program:</span>
                  <span className="font-mono text-[#7342E2] font-semibold text-[11px] bg-[#7342E2]/10 px-2 py-0.5 rounded">
                    onSet1Le...Hook
                  </span>
                </div>
              </div>
            </div>

            {/* Run Button */}
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="w-full py-3.5 px-6 rounded-full bg-[#7342E2] text-white font-semibold flex items-center justify-center gap-3 shadow-cta hover:bg-[#6232d0] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
            >
              {isSimulating ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Executing Transfer Hook...</span>
                </>
              ) : (
                <>
                  <Cpu size={18} />
                  <span>Execute On-Chain Transfer</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Execution Pipeline & Terminal Logs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* 4-Step Visual Progress Bar */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-[#192837]/10">
              <div className="flex items-center justify-between mb-6">
                <span className="font-heading font-bold text-lg text-[#192837]">
                  On-Chain Hook Pipeline
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-[#192837]/70">
                  Token-2022 CPI
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                {[
                  { step: 1, label: '1. Initiate' },
                  { step: 2, label: '2. Hook Call' },
                  { step: 3, label: '3. Verify PDA' },
                  { step: 4, label: '4. Settle' },
                ].map((item) => {
                  const isActive = currentStep === item.step;
                  const isDone = currentStep > item.step || simulationResult.status !== 'idle';
                  const isFinalFail = item.step === 4 && simulationResult.status === 'failed';

                  return (
                    <div
                      key={item.step}
                      className={`p-3 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-1.5 ${
                        isFinalFail
                          ? 'border-rose-400 bg-rose-50 text-rose-700'
                          : isDone
                          ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                          : isActive
                          ? 'border-[#7342E2] bg-[#7342E2]/10 text-[#7342E2]'
                          : 'border-slate-200 bg-slate-50 text-slate-400'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs bg-white/80 shadow-xs">
                        {isFinalFail ? '✕' : isDone ? '✓' : item.step}
                      </div>
                      <span className="text-[11px] font-semibold">{item.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Status Outcome Banner */}
              <AnimatePresence mode="wait">
                {simulationResult.status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3.5"
                  >
                    <CheckCircle2 size={24} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-heading font-bold text-emerald-900 text-sm">
                        TRANSFER SETTLED SUCCESSFULLY
                      </h4>
                      <p className="text-xs text-emerald-800 mt-1">
                        ON SETTLE verified the recipient's active compliance attestation. Tokens were transferred safely under Token-2022 rules.
                      </p>
                    </div>
                  </motion.div>
                )}

                {simulationResult.status === 'failed' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3.5"
                  >
                    <XCircle size={24} className="text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-heading font-bold text-rose-900 text-sm">
                        TRANSFER BLOCKED AT SETTLEMENT
                      </h4>
                      <p className="text-xs text-rose-800 mt-1">
                        Reason: {activeScenario.title} ({activeScenario.errorCode}). The transfer hook prevented execution. Zero tokens left the sender's account.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Terminal Logs Window */}
            <div className="bg-[#192837] rounded-3xl p-6 shadow-card border border-white/10 text-white flex flex-col font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2 text-white/70">
                  <Terminal size={16} className="text-[#7342E2]" />
                  <span className="font-semibold text-xs tracking-wider">solana-test-validator logs</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
              </div>

              <div className="min-h-[140px] max-h-[220px] overflow-y-auto space-y-2 text-slate-300 pr-2">
                {simulationResult.logs.length === 0 ? (
                  <div className="text-slate-500 italic py-6 text-center">
                    Click "Execute On-Chain Transfer" above to stream simulated CPI logs...
                  </div>
                ) : (
                  simulationResult.logs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-[#7342E2] select-none">&gt;</span>
                      <span
                        className={
                          log.includes('Program error') || log.includes('failed')
                            ? 'text-rose-400 font-semibold'
                            : log.includes('Success') || log.includes('permitted')
                            ? 'text-emerald-400 font-semibold'
                            : 'text-slate-200'
                        }
                      >
                        {log}
                      </span>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
