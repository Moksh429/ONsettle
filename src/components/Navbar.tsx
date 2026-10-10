import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenDemo?: () => void;
}

const navLinks = [
  { name: 'Architecture', href: '#architecture' },
  { name: 'Token-2022', href: '#token-2022' },
  { name: 'Compliance', href: '#compliance' },
  { name: 'Simulation', href: '#simulation' },
  { name: 'Roadmap', href: '#roadmap' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="relative z-30 w-full">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
          {/* Left: Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            <div className="transition-transform duration-300 group-hover:scale-105">
              <Logo size={32} fill="#192837" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-[#192837]">
              ON SETTLE
            </span>
          </a>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#192837] opacity-80 hover:opacity-100 transition-opacity duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenDemo}
              className="text-sm font-semibold rounded-full px-5 py-2.5 text-[#192837] bg-[#F2F2EE] border border-[#192837]/10 hover:bg-[#e6e6e0] transition-all duration-200 shadow-sm"
            >
              Sign In
            </button>
            <button
              onClick={onOpenDemo}
              className="text-sm font-semibold text-white rounded-full px-5 py-2.5 bg-[#7342E2] hover:bg-[#6232d0] transition-all duration-200 shadow-cta hover:scale-[1.02] active:scale-[0.98]"
            >
              Start For Free
            </button>
          </div>

          {/* Mobile: Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="md:hidden p-2 rounded-lg text-[#192837] hover:bg-black/5 transition-colors focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-[#192837]/35 backdrop-blur-[4px]"
            />

            {/* Slide-in Sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
              style={{
                width: 'min(88vw, 360px)',
                height: '100dvh',
                backgroundColor: '#CFC8C5',
                boxShadow: '-12px 0 48px rgba(25, 40, 55, 0.18)',
              }}
              className="fixed right-0 top-0 z-50 flex flex-col justify-between p-6 overflow-y-auto"
            >
              <div>
                {/* Sheet Header */}
                <div className="flex items-center justify-between pb-4">
                  <div className="flex items-center gap-2.5">
                    <Logo size={28} fill="#192837" />
                    <span className="font-heading text-lg font-bold text-[#192837]">
                      ON SETTLE
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="p-1.5 rounded-full text-[#192837] hover:bg-[#192837]/10 transition-colors"
                  >
                    <X size={22} />
                  </button>
                </div>

                {/* 1px Divider */}
                <div className="h-[1px] w-full bg-[#192837]/15 my-3" />

                {/* Staggered Nav Links */}
                <div className="flex flex-col gap-3.5 mt-6">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.18 + i * 0.07,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex items-center justify-between py-2 text-base font-semibold text-[#192837] hover:text-[#7342E2] transition-colors"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight size={16} className="opacity-50" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Buttons */}
              <div className="pt-6 border-t border-[#192837]/15 flex flex-col gap-3 mt-6">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDemo?.();
                  }}
                  className="w-full text-center text-sm font-semibold rounded-full py-3 text-[#192837] bg-[#F2F2EE] border border-[#192837]/10 shadow-sm active:scale-95 transition-transform"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDemo?.();
                  }}
                  className="w-full text-center text-sm font-semibold text-white rounded-full py-3 bg-[#7342E2] shadow-cta active:scale-95 transition-transform"
                >
                  Start For Free
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
