"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sun, Moon, ChevronRight, Menu, X } from "lucide-react";

interface DraggableNavbarProps {
  mounted: boolean;
  theme: string;
  toggleTheme: () => void;
}

export default function DraggableNavbar({ mounted, theme, toggleTheme }: DraggableNavbarProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [draggedIndex, setDraggedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(320); // default for mobile
  const [pillWidth, setPillWidth] = useState(70); // default for mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const scale = useMotionValue(1);
  const x = useMotionValue(0);

  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#calculator", label: "Calculator" },
    { href: "#faq", label: "FAQ" },
  ];

  // Responsive: recalculate container and pill width on resize
  useEffect(() => {
    function handleResize() {
      if (navContainerRef.current) {
        const width = navContainerRef.current.offsetWidth;
        setContainerWidth(width);
        setPillWidth(Math.max(56, Math.floor(width / navItems.length) - 8));
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [navItems.length]);

  const itemWidth = containerWidth / navItems.length;
  const pillX = useTransform(x, (value) => {
    return Math.max(0, Math.min(value, containerWidth - pillWidth));
  });

  const animateToIndex = (index: number) => {
    const targetX = index * itemWidth;
    x.set(targetX);
    setDraggedIndex(index);
  };

  useEffect(() => {
    animateToIndex(activeIndex);
    // eslint-disable-next-line
  }, [activeIndex, containerWidth, pillWidth]);

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Real-time drag logic
  const handleDrag = (event: any, info: PanInfo) => {
    setIsDragging(true);
    scale.set(1.15);
    const dragX = info.point.x;
    const containerRect = navContainerRef.current?.getBoundingClientRect();
    if (containerRect) {
      const relativeX = dragX - containerRect.left;
      const newIndex = Math.round(relativeX / itemWidth);
      const clampedIndex = Math.max(0, Math.min(newIndex, navItems.length - 1));
      setDraggedIndex(clampedIndex);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    scale.set(1);
    setActiveIndex(draggedIndex);
    animateToIndex(draggedIndex);
    scrollToSection(navItems[draggedIndex].href);
  };

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    setDraggedIndex(index);
    scale.set(1.12);
    setTimeout(() => {
      scale.set(1);
    }, 180);
    scrollToSection(navItems[index].href);
    setMobileMenuOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleItemClick(index);
    }
  };

  // Hover/drag effect for pill
  useEffect(() => {
    if (isHovered || isDragging) {
      scale.set(1.15);
    } else {
      scale.set(1);
    }
  }, [isHovered, isDragging, scale]);

  // --- Reset pill to normal when hero section is in view ---
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHovered(false);
          setIsDragging(false);
          scale.set(1);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [scale]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-white/20 dark:border-white/10">
      <div className="w-full px-1 sm:px-2 md:px-4">
        <div className="flex items-center w-full h-14 sm:h-16 md:h-20 gap-1 md:gap-2">
          {/* Brand (far left) */}
          <div className="flex items-center gap-1 min-w-0 max-w-[60vw] sm:max-w-none flex-shrink flex-grow-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-base md:text-lg shrink-0" style={{fontFamily:'inherit'}}>A</div>
            <span className="ml-2 text-black dark:text-white font-bold text-base sm:text-lg md:text-2xl tracking-tight whitespace-nowrap truncate" style={{fontFamily:'inherit'}}>ADmyBRAND</span>
          </div>

          {/* Hamburger for mobile */}
          <div className="flex md:hidden ml-auto">
            <button
              className="rounded-full p-2 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>

          {/* Centered Nav with Glassy Draggable Pill */}
          <div className="flex-1 flex justify-center items-center w-full">
            <div className="mx-auto flex justify-center items-center w-full max-w-full">
              <div
                ref={navContainerRef}
                className="relative bg-white/5 dark:bg-black/10 backdrop-blur-2xl rounded-full px-0.5 py-0.5 border border-white/15 dark:border-white/10 shadow-md w-full max-w-xs sm:max-w-[360px] md:max-w-[420px] lg:max-w-[480px] h-8 sm:h-9 md:h-10 min-w-0 flex mx-auto"
                style={{ minWidth: 0 }}
              >
                {/* Draggable Glassy Floating Pill - covers entire nav area for perfect pointer events */}
                <motion.div
                  className="absolute top-0 left-0 h-full z-20 pointer-events-auto flex items-center"
                  style={{ width: '100%' }}
                  onMouseEnter={() => { setIsHovered(true); scale.set(1.10); }}
                  onMouseLeave={() => { setIsHovered(false); scale.set(1); }}
                >
                  <motion.div
                    className="h-7 sm:h-8 md:h-9 bg-white/8 dark:bg-black/10 backdrop-blur-2xl rounded-full border border-white/20 dark:border-white/15 cursor-grab active:cursor-grabbing shadow-sm overflow-hidden"
                    style={{ 
                      width: pillWidth,
                      x: pillX,
                      scale: scale,
                      boxShadow: '0 1px 8px 0 rgba(0,0,0,0.04), 0 1px 0 0 rgba(255,255,255,0.10) inset',
                      background: 'rgba(255,255,255,0.06)',
                      WebkitBackdropFilter: 'blur(14px)',
                      backdropFilter: 'blur(14px)',
                      transition: 'box-shadow 0.6s cubic-bezier(.4,2,.7,1), background 0.6s cubic-bezier(.4,2,.6,1)'
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: containerWidth - pillWidth }}
                    dragElastic={0.95}
                    dragMomentum={true}
                    dragTransition={{ bounceStiffness: 70, bounceDamping: 20 }}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 1.15 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 70, 
                      damping: 20,
                      mass: 1.2
                    }}
                  >
                    {/* Animated highlight for watery effect, clipped inside pill */}
                    <motion.div
                      className="absolute left-1/2 top-1/2 pointer-events-none"
                      style={{
                        width: '70%',
                        height: 8,
                        x: '-50%',
                        y: '-50%',
                        borderRadius: 9999,
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.10) 0%, rgba(200,220,255,0.06) 100%)',
                        filter: 'blur(5px)',
                        opacity: isHovered ? 0.5 : 0.5,
                        transition: 'opacity 0.6s cubic-bezier(.5,2,.7,1)'
                      }}
                      animate={{
                        opacity: isHovered ? 0.5 : 0.5
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* Static Nav Items (text always visible, above pill) */}
                <div className="relative flex items-center justify-between h-full z-30 pointer-events-none w-full min-w-0 mx-auto">
                  {navItems.map((item, index) => (
                    <button
                      key={item.href}
                      ref={(el) => { navRefs.current[index] = el; }}
                      onClick={() => handleItemClick(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className={`flex-1 flex items-center justify-center h-full rounded-full text-[11px] sm:text-xs md:text-sm font-semibold transition-all duration-300 px-1 sm:px-2 md:px-3 cursor-pointer pointer-events-auto min-w-0 truncate ${
                        (isDragging ? draggedIndex : activeIndex) === index
                          ? "text-blue-600 dark:text-blue-400 font-bold"
                          : "text-black dark:text-white/80 hover:text-black dark:hover:text-white"
                      }`}
                      role="tab"
                      aria-selected={(isDragging ? draggedIndex : activeIndex) === index}
                      tabIndex={0}
                      draggable={false}
                      style={{ outline: 'none', userSelect: 'none', zIndex: 30 }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Right with Glass Effects - hide on mobile */}
          <div className="hidden md:flex items-center gap-2 md:gap-3 min-w-[110px] justify-end flex-shrink-0">
            {/* Glassmorphic Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 p-1 md:p-2 transition-all duration-200 hover:scale-105 shadow-lg"
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            </Button>

            {/* Glassmorphic Sign In */}
            <Link href="/signin">
              <div className="text-xs md:text-sm font-semibold text-black dark:text-gray-200 px-4 py-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-200 hover:scale-105 shadow-lg">
                Sign In
              </div>
            </Link>

            {/* Glassmorphic Get Started Button */}
            <Link href="/get-started">
              <Button
                className="rounded-full bg-white/80 dark:bg-white/20 text-black dark:text-white text-xs md:text-sm font-semibold px-4 h-9 flex items-center backdrop-blur-md border border-white/40 dark:border-white/20 hover:bg-white/90 dark:hover:bg-white/30 transition-all duration-200 hover:scale-105 shadow-lg"
                style={{minWidth:'64px'}}
              >
                Get Started
                <ChevronRight className="ml-1 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sheet */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[999] bg-black/40 flex md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="ml-auto w-64 bg-white dark:bg-black h-full shadow-2xl p-6 flex flex-col gap-6" onClick={e => e.stopPropagation()}>
            <button className="self-end mb-2" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
              <X className="size-6 text-black dark:text-white" />
            </button>
            <nav className="flex flex-col gap-4 mt-4">
              {navItems.map((item, index) => (
                <button
                  key={item.href}
                  onClick={() => handleItemClick(index)}
                  className={`text-base font-semibold text-left px-2 py-2 rounded-lg transition-all ${
                    activeIndex === index
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                      : "text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="flex flex-col gap-3 mt-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 p-2 transition-all duration-200 hover:scale-105 shadow-lg self-start"
                aria-label="Toggle theme"
              >
                {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
              </Button>
              <Link href="/signin" className="w-full">
                <div className="text-sm font-semibold text-black dark:text-gray-200 px-4 py-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-200 hover:scale-105 shadow-lg w-full text-center">
                  Sign In
                </div>
              </Link>
              <Link href="/get-started" className="w-full">
                <Button
                  className="rounded-full bg-white/80 dark:bg-white/20 text-black dark:text-white text-sm font-semibold px-4 h-10 flex items-center backdrop-blur-md border border-white/40 dark:border-white/20 hover:bg-white/90 dark:hover:bg-white/30 transition-all duration-200 hover:scale-105 shadow-lg w-full justify-center"
                  style={{minWidth:'64px'}}
                >
                  Get Started
                  <ChevronRight className="ml-1 size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 