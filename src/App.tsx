import { useState } from 'react';
import { motion, MotionConfig, useScroll, useSpring } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { EducationSection } from './components/EducationSection';
import { ExperienceSection } from './components/ExperienceSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { PrintableResume } from './components/PrintableResume';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { SkillsSection } from './components/SkillsSection';
import { ThemeProvider } from './context/ThemeProvider';
import { downloadResumePdf } from './utils/generateResumePdf';

const MARQUEE_ITEMS = [
  'Software Engineer · Full-Stack Development',
  'Python · FastAPI · PHP · Laravel · React.js',
  'AI/ML Workflows & Process Automation',
  'IT Service Management (ITSM) & Infrastructure',
  'Softzino Technologies · Dhaka',
  'BSc in CSE · Uttara University',
];

export default function App() {
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  const handleDownloadResume = async () => {
    if (isDownloadingPdf) return;
    setIsDownloadingPdf(true);
    try {
      await downloadResumePdf();
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#080B14] text-[#0F172A] dark:text-[#F8FAFC] transition-colors duration-200">
          {/* Scroll Progress Indicator */}
          <motion.div
            aria-hidden="true"
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7657F6] via-[#00C2D9] to-[#A3F7C5] origin-left z-50 no-print"
          />

          <Navbar
            onDownloadResume={handleDownloadResume}
            isDownloadingResume={isDownloadingPdf}
          />

          <main className="flex-1">
            <div className="no-print">
              <HeroSection
                onExploreWork={() => scrollToSection('projects')}
                onDownloadCv={handleDownloadResume}
                isDownloadingCv={isDownloadingPdf}
                onConnect={() => scrollToSection('contact')}
              />

              {/* Subtle Architectural Marquee Divider */}
              <div
                aria-hidden="true"
                className="border-b border-slate-200 dark:border-[#263247] bg-white/90 dark:bg-[#101827]/90 py-3.5 overflow-hidden"
              >
                <div className="animate-marquee text-xs font-mono text-slate-500 dark:text-[#94A3B8]">
                  {[0, 1].map((dup) => (
                    <div
                      key={dup}
                      className="flex items-center gap-6 px-3 shrink-0"
                    >
                      {MARQUEE_ITEMS.map((item) => (
                        <span
                          key={`${dup}-${item}`}
                          className="flex items-center gap-6 whitespace-nowrap"
                        >
                          <span>{item}</span>
                          <span
                            aria-hidden="true"
                            className="text-slate-300 dark:text-[#263247]"
                          >
                            ·
                          </span>
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <AboutSection />

              <ExperienceSection />

              <SkillsSection />

              <ProjectsSection />

              <ServicesSection />

              <EducationSection />

              <CertificationsSection />

              <ContactSection />
            </div>

            <PrintableResume />
          </main>

          <Footer />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}
