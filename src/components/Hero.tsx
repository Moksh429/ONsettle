import React from 'react';
import { motion } from 'framer-motion';
import { Zap, LockKeyhole, Fingerprint, ArrowRightCircle } from 'lucide-react';

interface HeroProps {
  onCtaClick?: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-start overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4"
          type="video/mp4"
        />
      </video>

      {/* Subtle overlay if needed to preserve crisp contrast */}
      <div className="absolute inset-0 bg-[#F2F2EE]/20 pointer-events-none" />

      {/* Hero content container */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-8 flex-1 flex flex-col justify-center pb-16"
        style={{ paddingTop: 'clamp(40px, 8vw, 72px)' }}
      >
        <div style={{ maxWidth: '560px' }} className="w-full">
          {/* Hero Heading */}
          <motion.h1
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.65rem, 5vw, 3rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              color: '#192837',
              marginBottom: '24px',
            }}
            className="font-bold tracking-tight text-[#192837]"
          >
            <Zap
              size={24}
              color="#192837"
              className="inline-block relative align-middle mr-1"
              style={{ top: '-2px' }}
            />
            Lock Down Token Transfers{' '}
            <LockKeyhole
              size={24}
              color="#192837"
              className="inline-block relative align-middle mx-1"
              style={{ top: '-2px' }}
            />
            with Ironclad Compliance{' '}
            <Fingerprint
              size={24}
              color="#192837"
              className="inline-block relative align-middle ml-1"
              style={{ top: '-2px' }}
            />
          </motion.h1>

          {/* Hero Subtext */}
          <motion.p
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              lineHeight: 1.65,
              opacity: 0.8,
              maxWidth: '560px',
              color: '#192837',
            }}
            className="mb-8 font-normal"
          >
            Zero frontend bypass, total settlement control. ON SETTLE enforces compliance rules directly during token transfers using Solana Token-2022 Transfer Hooks for unbreakable storage and permissioned RWAs.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <motion.button
              onClick={onCtaClick}
              whileHover={{ scale: 1.04, filter: 'brightness(1.1)' }}
              whileTap={{ scale: 0.96 }}
              style={{
                backgroundColor: '#7342E2',
                color: '#FFFFFF',
                borderRadius: '50px',
                padding: '17px 24px',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                boxShadow: '0 4px 24px rgba(115, 66, 226, 0.28)',
                minWidth: '210px',
              }}
              className="inline-flex items-center justify-between gap-8 cursor-pointer select-none border-none transition-shadow duration-200"
            >
              <span>Test Transfer Hook</span>
              <ArrowRightCircle size={20} className="shrink-0" />
            </motion.button>
          </motion.div>

          {/* Micro badges below CTA */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-[#192837]/75"
          >
            <div className="flex items-center gap-1.5 bg-[#192837]/5 px-2.5 py-1 rounded-full border border-[#192837]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>SPL Token-2022 Ready</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#192837]/5 px-2.5 py-1 rounded-full border border-[#192837]/10">
              <span>Anchor & Rust Compatible</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#192837]/5 px-2.5 py-1 rounded-full border border-[#192837]/10">
              <span>Zero Frontend Trust</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
