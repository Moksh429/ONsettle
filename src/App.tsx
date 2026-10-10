import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { HowItWorks } from './components/HowItWorks';
import { TransferSimulator } from './components/TransferSimulator';
import { TechStackRoadmap } from './components/TechStackRoadmap';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const scrollToSimulator = () => {
    const el = document.getElementById('simulation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F2F2EE] text-[#192837] selection:bg-[#7342E2] selection:text-white">
      {/* Navbar */}
      <Navbar onOpenDemo={scrollToSimulator} />

      {/* Hero Section */}
      <main>
        <Hero onCtaClick={scrollToSimulator} />

        {/* Problem & Solution Architecture */}
        <ProblemSolution />

        {/* How It Works & Expected Behavior Table */}
        <HowItWorks />

        {/* Interactive Transfer Hook Simulator */}
        <TransferSimulator />

        {/* Tech Stack, Anchor Quickstart & Roadmap */}
        <TechStackRoadmap />
      </main>

      {/* Footer with Disclaimer & Tagline */}
      <Footer />
    </div>
  );
};

export default App;
