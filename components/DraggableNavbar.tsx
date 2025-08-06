"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sun, Moon, ChevronRight } from "lucide-react";

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
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const containerWidth = 420;
  const itemWidth = containerWidth / 4;
  const pillWidth = itemWidth - 8;

  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#calculator", label: "Calculator" },
    { href: "#faq", label: "FAQ" },
  ];

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
  }, [activeIndex]);

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
    scale.set(1.18);
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
    scale.set(1.18);
    setTimeout(() => {
      scale.set(1);
    }, 180);
    scrollToSection(navItems[index].href);
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
      scale.set(1.18);
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
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex items-center w-full h-16 md:h-20 gap-2 md:gap-1">
          {/* Brand (far left) */}
          <div className="flex items-center gap-1 min-w-0 max-w-[60vw] sm:max-w-none flex-shrink flex-grow-0">
            <div className="w-9 h-9 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-base md:text-lg shrink-0" style={{fontFamily:'inherit'}}>A</div>
            <span className="ml-2 text-black dark:text-white font-bold text-lg md:text-2xl tracking-tight whitespace-nowrap truncate" style={{fontFamily:'inherit'}}>ADmyBRAND</span>
          </div>

          {/* Centered Nav with Glassy Draggable Pill */}
          <div className="flex-1">
            <div className="mx-auto flex justify-center items-center" style={{ minWidth: containerWidth }}>
              <div
                ref={navContainerRef}
                className="relative bg-white/10 dark:bg-black/10 backdrop-blur-3xl rounded-full px-2 py-1 border border-white/30 dark:border-white/10 shadow-2xl"
                style={{ width: containerWidth, height: 52 }}
              >
                {/* Draggable Glassy Floating Pill - covers entire nav area for perfect pointer events */}
                <motion.div
                  className="absolute inset-0 flex items-center z-20 pointer-events-auto"
                  style={{ height: '100%' }}
                  onMouseEnter={() => { setIsHovered(true); scale.set(1.12); }}
                  onMouseLeave={() => { setIsHovered(false); scale.set(1); }}
                >
                  <motion.div
                    className="h-12 bg-white/10 dark:bg-black/10 backdrop-blur-3xl rounded-full border border-white/40 dark:border-white/20 ring-2 ring-white/30 dark:ring-white/10 cursor-grab active:cursor-grabbing shadow-2xl overflow-hidden"
                    style={{ 
                      width: pillWidth,
                      x: pillX,
                      scale: scale,
                      // y transform removed for even expansion
                      boxShadow: '0 8px 64px 0 rgba(255,255,255,0.18), 0 1.5px 0 0 rgba(255,255,255,0.25) inset, 0 0 32px 8px rgba(0,180,255,0.08)',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.13) 60%, rgba(200,220,255,0.10) 100%)',
                      WebkitBackdropFilter: 'blur(22px)',
                      backdropFilter: 'blur(22px)',
                      transition: 'box-shadow 0.35s cubic-bezier(.4,2,.6,1), background 0.35s cubic-bezier(.4,2,.6,1)'
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: containerWidth - pillWidth }}
                    dragElastic={0.55}
                    dragMomentum={true}
                    dragTransition={{ bounceStiffness: 90, bounceDamping: 18 }}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 1.16 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 90, 
                      damping: 18,
                      mass: 1.2
                    }}
                  >
                    {/* Animated highlight for watery effect, clipped inside pill */}
                    <motion.div
                      className="absolute left-1/2 top-1/2 pointer-events-none"
                      style={{
                        width: pillWidth * 0.7,
                        height: 18,
                        x: '-50%',
                        y: '-50%',
                        borderRadius: 9999,
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.18) 0%, rgba(200,220,255,0.10) 100%)',
                        filter: 'blur(8px)',
                        opacity: isHovered ? 0.7 : 0.4,
                        transition: 'opacity 0.35s cubic-bezier(.4,2,.6,1)'
                      }}
                      animate={{
                        opacity: isHovered ? 0.7 : 0.7
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* Static Nav Items (text always visible, above pill) */}
                <div className="relative flex items-center justify-between h-full z-30 pointer-events-none">
                  {navItems.map((item, index) => (
                    <button
                      key={item.href}
                      ref={(el) => { navRefs.current[index] = el; }}
                      onClick={() => handleItemClick(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className={`flex-1 flex items-center justify-center h-full rounded-full text-sm md:text-sm font-semibold transition-all duration-200 px-4 cursor-pointer pointer-events-auto ${
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

          {/* Desktop Right with Glass Effects */}
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

          {/* Mobile Nav: Hamburger, Theme, Actions */}
          <div className="flex md:hidden items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full text-gray-500 dark:text-gray-300 p-1 min-w-0 w-8 h-8 flex-shrink-0"
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            </Button>
            <Link href="/signin" className="text-xs font-semibold text-black dark:text-gray-200 px-2 py-2 rounded-full transition-all duration-150 hover:bg-black/10 dark:hover:bg-white/10 min-w-0 whitespace-nowrap flex-shrink-0">Sign In</Link>
            <Link href="/get-started" className="min-w-0 flex-shrink-0">
              <Button
                className="rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-semibold px-3 h-8 flex items-center hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors shadow-none border-0 min-w-0"
                style={{minWidth:'56px'}}>
                Get Started
                <ChevronRight className="ml-1 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 