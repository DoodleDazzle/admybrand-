"use client";
import HeroSection from "../components/HeroSection";

import { useState, useEffect, useRef, useMemo, useLayoutEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

// --- Pricing Calculator Component ---
function PricingCalculator() {
  const plans = [
    { name: "Starter", base: 49 },
    { name: "Professional", base: 149 },
    { name: "Enterprise", base: 399 },
  ];
  const [selectedPlan, setSelectedPlan] = useState("Professional");
  const [teamSize, setTeamSize] = useState(5);
  const [addOns, setAddOns] = useState({
    analytics: false,
    whiteLabel: false,
    support: false,
  });
  const addOnPrices = { analytics: 29, whiteLabel: 59, support: 99 };
  const total = useMemo(() => {
    const plan = plans.find((p) => p.name === selectedPlan);
    let price = plan ? plan.base : 0;
    price += Math.max(0, teamSize - 5) * 10;
    if (addOns.analytics) price += addOnPrices.analytics;
    if (addOns.whiteLabel) price += addOnPrices.whiteLabel;
    if (addOns.support) price += addOnPrices.support;
    return price;
  }, [selectedPlan, teamSize, addOns]);
  return (
    <form className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <label className="font-medium text-slate-700 dark:text-slate-200">Plan</label>
        <select
          className="rounded-xl border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 px-4 py-2 text-base"
          value={selectedPlan}
          onChange={e => setSelectedPlan(e.target.value)}
        >
          {plans.map((plan) => (
            <option key={plan.name} value={plan.name}>{plan.name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <label className="font-medium text-slate-700 dark:text-slate-200">Team Size</label>
        <input
          type="number"
          min={1}
          max={100}
          value={teamSize}
          onChange={e => setTeamSize(Number(e.target.value))}
          className="rounded-xl border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 px-4 py-2 w-24 text-base"
        />
        <span className="text-sm text-slate-500 dark:text-slate-400">(First 5 included, +$10/user after)</span>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium text-slate-700 dark:text-slate-200 mb-2">Add-ons</label>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={addOns.analytics} onChange={e => setAddOns(a => ({ ...a, analytics: e.target.checked }))} />
            <span className="text-slate-600 dark:text-slate-300">Advanced Analytics (+$29)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={addOns.whiteLabel} onChange={e => setAddOns(a => ({ ...a, whiteLabel: e.target.checked }))} />
            <span className="text-slate-600 dark:text-slate-300">White-label (+$59)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={addOns.support} onChange={e => setAddOns(a => ({ ...a, support: e.target.checked }))} />
            <span className="text-slate-600 dark:text-slate-300">24/7 Support (+$99)</span>
          </label>
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <span className="text-lg font-semibold text-slate-900 dark:text-white">Total</span>
        <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">${total}</span>
      </div>
    </form>
  );
}

// --- Parallax Grid BG Component ---
function ParallaxGridBG() {
  const ref = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const y = window.scrollY;
      ref.current.style.transform = `translateY(${y * 0.15}px)`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      ref={ref}
      className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] transition-transform duration-500 will-change-transform"
      aria-hidden="true"
    ></div>
  );
}
import {
  Check,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  ArrowRight,
  Star,
  Brain,
  Target,
  Sparkles,
  MessageSquare,
  Globe,
  Play,
  Award,
  Rocket,
  Eye,
  PenTool,
  Megaphone,
  BarChart3,
  Lightbulb,
  Palette,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"

import React from "react";

export default function ADmyBrandLandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const features = [
    {
      title: "AI-Powered Brand Strategy",
      description:
        "Create comprehensive brand strategies with our advanced AI that analyzes market trends and competitor insights.",
      icon: <Brain className="size-6" />,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Smart Logo & Design Generator",
      description: "Generate professional logos and brand assets in minutes with our intelligent design AI system.",
      icon: <Palette className="size-6" />,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Content Creation Suite",
      description: "Produce engaging marketing content, social media posts, and campaigns with AI-driven creativity.",
      icon: <PenTool className="size-6" />,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Brand Analytics Dashboard",
      description: "Track brand performance, engagement metrics, and ROI with real-time analytics and insights.",
      icon: <BarChart3 className="size-6" />,
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Multi-Channel Campaign Manager",
      description: "Launch and manage campaigns across all digital platforms from one unified dashboard.",
      icon: <Megaphone className="size-6" />,
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Brand Consistency Monitor",
      description: "Ensure brand consistency across all touchpoints with automated monitoring and alerts.",
      icon: <Eye className="size-6" />,
      gradient: "from-teal-500 to-blue-500",
    },
  ]

  const testimonials = [
    {
      quote:
        "ADmyBRAND AI Suite transformed our marketing strategy completely. We saw a 300% increase in brand engagement within just 3 months.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechFlow Inc.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60&text=SJ",
    },
    {
      quote:
        "The AI-powered content creation is incredible. It's like having a team of creative experts working 24/7 for our brand.",
      author: "Michael Chen",
      role: "Brand Manager",
      company: "InnovateCorp",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60&text=MC",
    },
    {
      quote:
        "From logo design to campaign management, ADmyBRAND AI Suite handles everything. Our ROI improved by 250% in the first quarter.",
      author: "Emily Rodriguez",
      role: "CEO",
      company: "StartupX",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60&text=ER",
    },
    {
      quote:
        "The brand consistency monitoring feature saved us from potential brand disasters. It's an essential tool for any serious business.",
      author: "David Kim",
      role: "Creative Director",
      company: "BrandMasters",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60&text=DK",
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "$49",
      description: "Perfect for small businesses and startups looking to establish their brand.",
      features: [
        "AI Logo Generator",
        "Basic Brand Strategy",
        "5 Content Templates",
        "Social Media Integration",
        "Email Support",
        "Brand Guidelines PDF",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      price: "$149",
      description: "Ideal for growing businesses that need comprehensive brand management.",
      features: [
        "Everything in Starter",
        "Advanced AI Brand Strategy",
        "Unlimited Content Creation",
        "Multi-Channel Campaigns",
        "Analytics Dashboard",
        "Priority Support",
        "Custom Brand Assets",
        "Team Collaboration",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$399",
      description: "For large organizations requiring advanced features and dedicated support.",
      features: [
        "Everything in Professional",
        "Custom AI Training",
        "White-label Solutions",
        "API Access",
        "Dedicated Account Manager",
        "24/7 Phone Support",
        "Advanced Analytics",
        "Custom Integrations",
        "Compliance Features",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  const faqs = [
    {
      question: "What makes ADmyBRAND AI Suite different from other branding tools?",
      answer:
        "Our AI Suite combines advanced machine learning with creative intelligence to provide comprehensive brand solutions. Unlike traditional tools, we offer end-to-end brand management from strategy to execution, all powered by cutting-edge AI technology.",
    },
    {
      question: "How quickly can I see results with ADmyBRAND AI Suite?",
      answer:
        "Most clients see initial results within the first week of implementation. Our AI can generate brand assets and strategies immediately, while comprehensive brand transformation typically shows measurable results within 30-60 days.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes! We offer a 14-day free trial for all our plans. No credit card required. You'll have full access to explore our features and see how ADmyBRAND AI Suite can transform your brand.",
    },
    {
      question: "Can I integrate ADmyBRAND with my existing marketing tools?",
      answer:
        "Our platform integrates with over 100+ popular marketing tools including social media platforms, email marketing services, CRM systems, and analytics tools. We also provide API access for custom integrations.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "We offer comprehensive support including email support for all plans, priority support for Professional users, and dedicated account management for Enterprise clients. We also provide extensive documentation, video tutorials, and webinar training sessions.",
    },
    {
      question: "Is my brand data secure with ADmyBRAND AI Suite?",
      answer:
        "Security is our top priority. We use enterprise-grade encryption, comply with GDPR and CCPA regulations, and undergo regular security audits. Your brand data is stored securely and never shared with third parties.",
    },
  ]

  // Contact form state and handlers
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
  });
  type ContactErrors = {
    firstName?: string;
    lastName?: string;
    email?: string;
    message?: string;
    company?: string;
  };
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});
  const [contactSuccess, setContactSuccess] = useState(false);

  function handleContactChange(e) {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
    setContactErrors((prev) => ({ ...prev, [name]: undefined }));
    setContactSuccess(false);
  }

  function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errors: ContactErrors = {};
    if (!contact.firstName.trim()) errors.firstName = "First name is required.";
    if (!contact.lastName.trim()) errors.lastName = "Last name is required.";
    if (!contact.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!contact.message.trim()) errors.message = "Message is required.";
    setContactErrors(errors);
    if (Object.keys(errors).length === 0) {
      setContactSuccess(true);
      setContact({ firstName: "", lastName: "", email: "", company: "", message: "" });
    } else {
      setContactSuccess(false);
    }
  }

  return (
    <div
      className="flex flex-col min-h-screen bg-white dark:bg-black"
      style={{
        width: '100%',
        minHeight: '100vh',
        overflowX: 'hidden',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Header - Centered, Minimalist, Compact */}
      <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-black/90 backdrop-bl-xl">
        <div className="container mx-auto px-2 md:px-4">
          <div className="flex items-center w-full h-14 md:h-16 gap-2 md:gap-1">
            {/* Brand (far left) */}
            <div className="flex items-center gap-1 min-w-0 max-w-[60vw] sm:max-w-none flex-shrink flex-grow-0">
              <div className="w-7 h-7 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-xs md:text-sm shrink-0" style={{fontFamily:'inherit'}}>A</div>
              <span className="ml-1 text-black dark:text-white font-bold text-base md:text-lg tracking-tight whitespace-nowrap truncate" style={{fontFamily:'inherit'}}>ADmyBRAND</span>
            </div>

            {/* Centered Nav (center, absolute center with flex-1) */}
            <div className="flex-1 flex justify-center">
              <nav className="hidden md:flex gap-3 md:gap-6 ml-8 md:ml-12">
                <Link href="#features" className="text-xs font-medium text-black dark:text-gray-200 px-2 md:px-3 py-1.5 rounded-full transition-all duration-150 hover:bg-black/10 dark:hover:bg-white/10">Features</Link>
                <Link href="#pricing" className="text-xs font-medium text-black dark:text-gray-200 px-2 md:px-3 py-1.5 rounded-full transition-all duration-150 hover:bg-black/10 dark:hover:bg-white/10">Pricing</Link>
                <Link href="#calculator" className="text-xs font-medium text-black dark:text-gray-200 px-2 md:px-3 py-1.5 rounded-full transition-all duration-150 hover:bg-black/10 dark:hover:bg-white/10">Calculator</Link>
                <Link href="#faq" className="text-xs font-medium text-black dark:text-gray-200 px-2 md:px-3 py-1.5 rounded-full transition-all duration-150 hover:bg-black/10 dark:hover:bg-white/10">FAQ</Link>
              </nav>
            </div>

            {/* Desktop Right (far right) */}
            <div className="hidden md:flex items-center gap-2 md:gap-3 min-w-[110px] justify-end flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 p-1 md:p-2"
                aria-label="Toggle theme"
              >
                {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
              </Button>
              <Link href="/signin" className="text-xs md:text-sm font-semibold text-black dark:text-gray-200 px-4 py-2 rounded-full transition-all duration-150 hover:bg-black/10 dark:hover:bg-white/10">Sign In</Link>
              <Link href="/get-started">
                <Button
                  className="rounded-full bg-black dark:bg-white text-white dark:text-black text-xs md:text-sm font-semibold px-4 h-9 flex items-center hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors shadow-none border-2 border-black dark:border-white"
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-500 dark:text-gray-300 p-1 min-w-0 w-8 h-8 flex-shrink-0"
                aria-label="Open menu"
              >
                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 inset-x-0 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700"
          >
            <div className="container py-4 flex flex-col gap-4">
              <Link
                href="#features"
                className="py-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="py-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="py-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#faq"
                className="py-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                <Link
                  href="#"
                  className="py-2 text-base font-semibold flex items-center gap-2 text-gray-500 dark:text-gray-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {/* Theme toggle icon for mobile menu */}
                  <span className="inline-flex items-center justify-center rounded-full border-2 border-gray-400 dark:border-white size-8">
                    {mounted && theme === "dark" ? (
                      <Sun className="size-5 text-white" />
                    ) : (
                      <Moon className="size-5 text-black" />
                    )}
                  </span>
                  Log in
                </Link>
                <Button
                  className="rounded-full h-12 px-8 text-base font-bold transition-colors
                    bg-[#2563eb] text-white
                    dark:bg-white dark:text-black
                    hover:bg-[#1d4ed8] dark:hover:bg-gray-500
                    shadow-xl border-0"
                >
                  Get Started
                  <ChevronRight className="ml-1 size-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />


        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-32 bg-white dark:bg-black">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge className="rounded-full px-6 py-2 text-sm font-medium bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300">
                Features
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Everything You Need to Build a
                <span className="bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  {" "}
                  Powerful Brand
                </span>
              </h2>
              <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Our comprehensive AI suite provides all the tools and intelligence you need to create, manage, and scale
                your brand across all digital channels.
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((feature, i) => (
                <motion.div key={i} variants={item}>
                  <Card className="h-full overflow-hidden border-0 bg-white/80 dark:bg-[#18181b] backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div
                        className={`size-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{feature.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed flex-grow">
                        {feature.description}
                      </p>
                      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <Link
                          href="#"
                          className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                          aria-label={`Learn more about ${feature.title}`}
                        >
                          Learn more →
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-20 md:py-32 bg-white dark:bg-black">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge className="rounded-full px-6 py-2 text-sm font-medium bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300">
                How It Works
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                From Concept to Campaign in
                <span className="bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  {" "}
                  Minutes
                </span>
              </h2>
              <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Our AI-powered workflow makes brand building simple and efficient. Get professional results without the
                complexity.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              {/* Connection Lines */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-600 to-transparent -translate-y-1/2 z-0"></div>

              {[
                {
                  step: "01",
                  title: "Define Your Brand",
                  description:
                    "Tell our AI about your business, target audience, and brand vision. Our intelligent system analyzes your inputs to create a comprehensive brand foundation.",
                  icon: <Target className="size-8" />,
                },
                {
                  step: "02",
                  title: "AI Creates Your Assets",
                  description:
                    "Watch as our AI generates logos, color palettes, typography, and marketing materials tailored to your brand identity and industry best practices.",
                  icon: <Sparkles className="size-8" />,
                },
                {
                  step: "03",
                  title: "Launch & Scale",
                  description:
                    "Deploy your brand across all channels with automated campaigns, consistent messaging, and real-time performance tracking and optimization.",
                  icon: <Rocket className="size-8" />,
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="relative z-10 flex flex-col items-center text-center space-y-6"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 text-white dark:text-black text-2xl font-bold shadow-xl">
                    {step.step}
                  </div>
                  <div className="p-6 rounded-2xl bg-white/70 dark:bg-[#18181b] backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
                    <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#18181b] backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
                      <div className="mb-4 text-purple-600 dark:text-purple-400">{step.icon}</div>
                      <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{step.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-20 md:py-32 bg-white dark:bg-black">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge className="rounded-full px-6 py-2 text-sm font-medium bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300">
                Testimonials
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Loved by Brands
                <span className="bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  {" "}
                  Worldwide
                </span>
              </h2>
              <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                See what our customers have to say about their transformation with ADmyBRAND AI Suite.
              </p>
            </motion.div>

            {/* Testimonials Carousel */}
            <div className="relative max-w-4xl mx-auto">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Card className="border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl shadow-2xl">
                  <CardContent className="p-12 bg-white/80 dark:bg-[#18181b] rounded-2xl">
                    <div className="flex justify-center mb-6">
                      {Array(testimonials[currentTestimonial].rating)
                        .fill(0)
                        .map((_, j) => (
                          <Star key={j} className="size-6 text-yellow-500 fill-yellow-500" />
                        ))}
                    </div>
                    <blockquote className="text-2xl md:text-3xl font-medium text-slate-900 dark:text-white mb-8 leading-relaxed">
                      "{testimonials[currentTestimonial].quote}"
                    </blockquote>
                    <div className="flex items-center justify-center gap-4">
                      <Image
                        src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                        width={60}
                        height={60}
                        alt={testimonials[currentTestimonial].author}
                        className="rounded-full border-2 border-purple-200 dark:border-purple-700"
                      />
                      <div className="text-left">
                        <p className="font-bold text-slate-900 dark:text-white text-lg">
                          {testimonials[currentTestimonial].author}
                        </p>
                        <p className="text-slate-600 dark:text-slate-300">{testimonials[currentTestimonial].role}</p>
                        <p className="text-purple-600 dark:text-purple-400 font-medium">
                          {testimonials[currentTestimonial].company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Testimonial Navigation */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === currentTestimonial
                        ? "bg-purple-600 w-8"
                        : "bg-slate-300 dark:bg-slate-600 hover:bg-purple-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-20 md:py-32 bg-white dark:bg-black">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge className="rounded-full px-6 py-2 text-sm font-medium bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300">
                Pricing
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Choose Your
                <span className="bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  {" "}
                  Brand Journey
                </span>
              </h2>
              <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Start free and scale as you grow. All plans include our core AI features with 14-day free trial.
              </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
              {pricingPlans.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative ${plan.popular ? "lg:scale-105" : ""}`}
                >
                  <Card
                    className={`relative overflow-hidden h-full transition-all duration-300 hover:shadow-2xl ${
                      plan.popular
                        ? "border-2 border-purple-500 shadow-2xl bg-white dark:bg-[#18181b]"
                        : "border-0 bg-white/80 dark:bg-[#18181b] backdrop-blur-xl shadow-xl"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 text-white dark:text-black px-6 py-2 text-sm font-bold rounded-bl-2xl">
                        <Award className="size-4 inline mr-1" />
                        Most Popular
                      </div>
                    )}
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                        <div className="flex items-baseline justify-center mb-4">
                          <span className="text-5xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                          <span className="text-slate-500 dark:text-slate-400 ml-2">/month</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300">{plan.description}</p>
                      </div>

                      <ul className="space-y-4 mb-8 flex-grow">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="flex items-start">
                            <Check className="mr-3 size-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        className={`w-full rounded-full h-12 text-base font-semibold transition-all duration-300 ${
                          plan.popular
                            ? "bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 hover:from-gray-700 hover:to-gray-500 dark:hover:from-gray-300 dark:hover:to-gray-500 shadow-lg hover:shadow-xl"
                            : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100"
                        }`}
                        aria-label={plan.cta}
                      >
                        {plan.cta}
                        {plan.cta === "Start Free Trial" && <ArrowRight className="ml-2 size-4" />}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Feature Comparison Table */}
            <div className="overflow-x-auto mt-16">
              <table className="min-w-full border-collapse rounded-2xl overflow-hidden shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
                <thead>
                  <tr>
                    <th className="py-4 px-6 text-left text-lg font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-900">Features</th>
                    {pricingPlans.map((plan) => (
                      <th key={plan.name} className="py-4 px-6 text-center text-lg font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-900">{plan.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    "AI Logo Generator",
                    "Basic Brand Strategy",
                    "5 Content Templates",
                    "Social Media Integration",
                    "Email Support",
                    "Brand Guidelines PDF",
                    "Advanced AI Brand Strategy",
                    "Unlimited Content Creation",
                    "Multi-Channel Campaigns",
                    "Analytics Dashboard",
                    "Priority Support",
                    "Custom Brand Assets",
                    "Team Collaboration",
                    "Custom AI Training",
                    "White-label Solutions",
                    "API Access",
                    "Dedicated Account Manager",
                    "24/7 Phone Support",
                    "Advanced Analytics",
                    "Custom Integrations",
                    "Compliance Features",
                  ].map((feature) => (
                    <tr key={feature} className="border-t border-slate-200 dark:border-slate-700">
                      <td className="py-3 px-6 text-slate-700 dark:text-slate-300 font-medium">{feature}</td>
                      {pricingPlans.map((plan) => (
                        <td key={plan.name} className="py-3 px-6 text-center">
                          {plan.features.includes(feature) ? (
                            <span className="inline-block w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">✓</span>
                          ) : (
                            <span className="inline-block w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700"></span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Interactive Pricing Calculator */}
            <div id="calculator" className="max-w-2xl mx-auto mt-20 mb-12 p-8 rounded-2xl bg-white/80 dark:bg-[#18181b] shadow-xl backdrop-blur-xl scroll-mt-24">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Interactive Pricing Calculator</h3>
              <div className="bg-white/80 dark:bg-[#18181b] rounded-2xl p-4">
                <PricingCalculator 
                  teamSizeInputClassName="border-2 border-white focus:border-white hover:border-white rounded-full bg-transparent text-white placeholder:text-gray-400 px-6 py-2 text-lg font-semibold outline-none transition-all duration-200"
                />
              </div>
            </div>
            <div className="text-center mt-12">
              <p className="text-slate-600 dark:text-slate-400 mb-4">Need a custom solution? We've got you covered.</p>
              <Button
                variant="outline"
                className="rounded-full border-2 border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 bg-transparent"
              >
                Contact Enterprise Sales
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-20 md:py-32 bg-white dark:bg-black">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge className="rounded-full px-6 py-2 text-sm font-medium bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300">
                FAQ
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Frequently Asked
                <span className="bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  {" "}
                  Questions
                </span>
              </h2>
              <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Everything you need to know about ADmyBRAND AI Suite. Can't find what you're looking for?
                <Link href="#" className="text-purple-600 dark:text-purple-400 hover:underline ml-1">
                  Contact our support team
                </Link>
                .
              </p>
            </motion.div>

            <div className="mx-auto max-w-4xl">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <AccordionItem
                      value={`item-${i}`}
                      className="border-0 bg-white/70 dark:bg-[#18181b] backdrop-blur-xl rounded-2xl px-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <AccordionTrigger className="text-left font-semibold text-slate-900 dark:text-white hover:no-underline py-6 text-lg">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 dark:text-slate-300 pb-6 text-base leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Blog/Resources Section */}
        <section id="blog" className="w-full py-20 md:py-32 bg-white dark:bg-black">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge className="rounded-full px-6 py-2 text-sm font-medium bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300">
                Blog & Resources
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                <span className="bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  Insights & Resources for Modern Marketers
                </span>
              </h2>
              <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Stay ahead with the latest trends, tips, and strategies in AI-powered marketing, branding, and digital transformation.
              </p>
            </motion.div>
            <div className="grid gap-8 md:grid-cols-3">
              {/* Example blog articles based on https://in.admybrand.com/ */}
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8 flex flex-col h-full bg-white/80 dark:bg-[#18181b] rounded-2xl">
                  <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">How AI is Revolutionizing Brand Management</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed flex-grow">
                    Discover how artificial intelligence is transforming the way brands are built, managed, and scaled in the digital era. Learn about automation, personalization, and data-driven strategies for success.
                  </p>
                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <Link href="https://in.admybrand.com/ai-brand-management" target="_blank" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                      Read more →
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 dark:bg-[#18181b] backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">The Ultimate Guide to Omnichannel Marketing</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed flex-grow">
                    Explore best practices for creating seamless customer experiences across all digital channels. This guide covers campaign automation, analytics, and the latest tools for marketers.
                  </p>
                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <Link href="https://in.admybrand.com/omnichannel-marketing" target="_blank" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                      Read more →
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 dark:bg-[#18181b] backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Data-Driven Campaigns: Maximizing ROI with ADmyBRAND</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed flex-grow">
                    Learn how to leverage ADmyBRAND's analytics and AI tools to optimize your marketing spend, track performance, and achieve measurable results for your brand.
                  </p>
                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <Link href="https://in.admybrand.com/data-driven-campaigns" target="_blank" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                      Read more →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="w-full py-20 md:py-32 bg-white dark:bg-black">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge className="rounded-full px-6 py-2 text-sm font-medium bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300">
                Get in Touch
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Ready to Transform
                <span className="bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  {" "}
                  Your Brand?
                </span>
              </h2>
              <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Get started with ADmyBRAND AI Suite today and see the difference AI can make for your brand.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-0 bg-white/70 dark:bg-[#18181b] backdrop-blur-xl shadow-2xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a message</h3>
                    {/* Contact Form with Validation */}
                    <form className="space-y-6" onSubmit={handleContactSubmit} noValidate>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" htmlFor="firstName">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <Input id="firstName" name="firstName" value={contact.firstName} onChange={handleContactChange} className="rounded-xl border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50" aria-required="true" aria-invalid={!!contactErrors.firstName} />
                          {contactErrors.firstName && <p className="text-red-500 text-xs mt-1">{contactErrors.firstName}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" htmlFor="lastName">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <Input id="lastName" name="lastName" value={contact.lastName} onChange={handleContactChange} className="rounded-xl border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50" aria-required="true" aria-invalid={!!contactErrors.lastName} />
                          {contactErrors.lastName && <p className="text-red-500 text-xs mt-1">{contactErrors.lastName}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" htmlFor="email">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input id="email" name="email" type="email" value={contact.email} onChange={handleContactChange} className="rounded-xl border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50" aria-required="true" aria-invalid={!!contactErrors.email} />
                        {contactErrors.email && <p className="text-red-500 text-xs mt-1">{contactErrors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" htmlFor="company">
                          Company
                        </label>
                        <Input id="company" name="company" value={contact.company} onChange={handleContactChange} className="rounded-xl border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" htmlFor="message">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <Textarea id="message" name="message" rows={4} value={contact.message} onChange={handleContactChange} className="rounded-xl border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 resize-none" aria-required="true" aria-invalid={!!contactErrors.message} />
                        {contactErrors.message && <p className="text-red-500 text-xs mt-1">{contactErrors.message}</p>}
                      </div>
                      <Button type="submit" className="w-full rounded-xl h-12 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 hover:from-gray-700 hover:to-gray-500 dark:hover:from-gray-300 dark:hover:to-gray-500 shadow-lg">
                        Send Message
                        <ArrowRight className="ml-2 size-4" />
                      </Button>
                      {contactSuccess && <p className="text-green-600 text-center font-semibold mt-2">Thank you! Your message has been sent.</p>}
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Get in touch</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                    Have questions about ADmyBRAND AI Suite? Our team is here to help you transform your brand with AI.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 flex items-center justify-center text-white dark:text-black">
                      <MessageSquare className="size-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Chat with us</h4>
                      <p className="text-slate-600 dark:text-slate-300">Get instant support from our AI-powered chat</p>
                      <Link href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                        Start chat →
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white">
                      <Globe className="size-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Visit our office</h4>
                      <p className="text-slate-600 dark:text-slate-300">
                        123 AI Street, Tech District
                        <br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center text-white">
                      <Lightbulb className="size-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Book a demo</h4>
                      <p className="text-slate-600 dark:text-slate-300">See ADmyBRAND AI Suite in action</p>
                      <Link href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                        Schedule demo →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center space-y-8 text-center"
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                Ready to Build Your
                <br />
                <span className="text-yellow-300">AI-Powered Brand?</span>
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-white/90 leading-relaxed">
                Join thousands of successful brands using ADmyBRAND AI Suite to create, manage, and scale their brand
                presence. Start your free trial today and see the difference AI can make.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 mt-8">
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full h-14 px-10 text-lg bg-white text-purple-600 hover:bg-white/90 shadow-xl"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 size-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-14 px-10 text-lg bg-transparent border-2 border-white text-white hover:bg-black/10 dark:hover:bg-white/10"
                >
                  <Play className="mr-2 size-5" />
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center justify-center gap-8 text-sm text-white/80 mt-6">
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-green-300" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-green-300" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-green-300" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer - Minimalist, Complete with Links, Social, Contact */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl mt-auto">
        <div className="container flex flex-col gap-12 px-4 py-8 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {/* Brand & Social */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-bold text-lg">
                <div className="size-8 rounded-lg bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-sm">A</div>
                <span className="text-black dark:text-white">ADmyBRAND</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                Transform your brand with AI-powered intelligence. Create, manage, and scale your brand presence with our comprehensive suite.
              </p>
              <div className="flex gap-3 mt-2">
                <a href="https://twitter.com/admybrand" target="_blank" aria-label="Twitter" className="hover:opacity-80">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M22 5.924c-.793.352-1.646.59-2.54.697a4.48 4.48 0 0 0 1.964-2.475 8.93 8.93 0 0 1-2.828 1.08A4.48 4.48 0 0 0 11.03 9.03c0 .352.04.695.116 1.022C7.728 9.89 4.1 8.1 1.67 5.149a4.48 4.48 0 0 0-.607 2.254c0 1.555.792 2.93 2.002 3.736a4.47 4.47 0 0 1-2.03-.561v.057a4.48 4.48 0 0 0 3.6 4.393c-.193.053-.397.08-.607.08-.148 0-.292-.014-.432-.04a4.48 4.48 0 0 0 4.18 3.11A8.98 8.98 0 0 1 2 19.07a12.7 12.7 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.77 0-.195-.004-.39-.013-.583A9.1 9.1 0 0 0 24 4.59a8.98 8.98 0 0 1-2.6.713Z"/></svg>
                </a>
                <a href="https://linkedin.com/company/admybrand" target="_blank" aria-label="LinkedIn" className="hover:opacity-80">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
                </a>
                <a href="mailto:info@admybrand.com" aria-label="Email" className="hover:opacity-80">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm-16 12V8.99l7.88 6.99c.36.32.88.32 1.24 0L20 8.99V18H4z"/></svg>
                </a>
              </div>
            </div>
            {/* Navigation */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:underline text-slate-600 dark:text-slate-300">Features</a></li>
                <li><a href="#pricing" className="hover:underline text-slate-600 dark:text-slate-300">Pricing</a></li>
                <li><a href="#testimonials" className="hover:underline text-slate-600 dark:text-slate-300">Testimonials</a></li>
                <li><a href="#faq" className="hover:underline text-slate-600 dark:text-slate-300">FAQ</a></li>
                <li><a href="#blog" className="hover:underline text-slate-600 dark:text-slate-300">Blog</a></li>
              </ul>
            </div>
            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  <span>123 AI Street, Mumbai, India</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M21 6.5a2.5 2.5 0 0 0-2.5-2.5h-13A2.5 2.5 0 0 0 3 6.5v11A2.5 2.5 0 0 0 5.5 20h13a2.5 2.5 0 0 0 2.5-2.5v-11zm-1.5 0v.01L12 13 4.5 6.51V6.5h15zm-15 11v-8.49l7.88 6.99c.36.32.88.32 1.24 0L20.5 9.01V17.5a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1z"/></svg>
                  <a href="mailto:info@admybrand.com" className="hover:underline">info@admybrand.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2z"/></svg>
                  <a href="tel:+912345678900" className="hover:underline">+91 23456 78900</a>
                </li>
              </ul>
            </div>
            {/* Empty for minimalist grid balance */}
            <div></div>
          </div>
          <div className="text-center text-xs text-slate-400 mt-10">© {new Date().getFullYear()} ADmyBRAND. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}