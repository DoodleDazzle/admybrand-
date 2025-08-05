"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function HeroSection() {
  // Scroll to top on mount to ensure hero section is visible
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  return (
    <section className="w-full flex-1 min-h-[calc(100vh-56px)] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 px-4 sm:px-6 md:px-12 bg-white dark:bg-black">
      {/* Left: Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex flex-col items-start justify-center max-w-xl mx-auto md:mx-0 text-center md:text-left"
      >
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-[#18181b] bg-clip-text text-transparent"
        >
          Smart Branding Starts Here
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-xs sm:max-w-md md:max-w-lg mx-auto md:mx-0">
          Your AI companion for scalable, intelligent brand building.
        </p>
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 w-full md:w-auto justify-center md:justify-start items-center md:items-center">
          <Link href="/signin">
            <button
              className="rounded-full bg-black dark:bg-white text-white dark:text-black text-sm sm:text-base font-semibold px-6 sm:px-7 h-11 sm:h-12 flex items-center justify-center shadow-md hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors"
            >
              Start Free Trial <ArrowRight className="ml-2 size-5" />
            </button>
          </Link>
          <Link href="https://www.youtube.com/results?search_query=ai+branding+demo" target="_blank" rel="noopener noreferrer">
            <button
              className="rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white text-sm sm:text-base font-semibold px-6 sm:px-7 h-11 sm:h-12 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              Watch Demo
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Right: Image */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="flex-1 flex items-center justify-center w-full md:w-auto mt-6 md:mt-0"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          whileHover={{ scale: 1.07, transition: { duration: 0.18, ease: 'easeOut' } }}
          whileTap={{ scale: 1.09, transition: { duration: 0.32, ease: 'easeOut' } }}
          style={{ cursor: 'pointer' }}
        >
          <Image
            src="/loko5.png"
            alt="AI Robot Illustration"
            width={520}
            height={520}
            className="object-contain rounded-2xl shadow-2xl w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-lg h-auto"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
