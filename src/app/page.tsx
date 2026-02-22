// pages/index.tsx
'use client'

import { useState, useEffect, FormEvent } from 'react';
import Head from 'next/head';
import { ChevronRight, Play, Users, Brain, Zap, Shield, CheckCircle, Star, ArrowRight, Menu, X, Globe, Headphones, Hand, Mic, UserSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

import DemoContactForm from '@/components/DemoContactForm';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TechStackItem {
  name: string;
  description: string;
  color: string;
}

interface FormData {
  name: string;
  email: string;
  school: string;
  students: string;
  message: string;
}

const HomePage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    school: '',
    students: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Close mobile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit1 = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  const API_ROUTE_URL = "/api/submit-form"; 
  
  try {
    const response = await fetch(API_ROUTE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert('Demo request submitted successfully! We\'ll contact you within 24 hours.');
      setFormData({ name: '', email: '', school: '', students: '', message: '' });
    } else {
      const data = await response.json();
      alert(`Submission failed: ${data.error || 'Please try again.'}`);
    }
  } catch (error) {
    console.error('Client-side error:', error);
    alert('There was a network error connecting to the submission service.');
  } finally {
    setIsSubmitting(false);
  }
};

  const features: FeatureProps[] = [
    {
      icon: <Brain size={24} />,
      title: "AI-Powered Conversations",
      description: "Engage with historical figures through natural language processing and AI-driven responses that adapt to student questions."
    },
    {
      icon: <Globe size={24} />,
      title: "Immersive VR Environment",
      description: "Experience history inside a fully immersive environment and with spatial audio."
    },
    {
      icon: <Hand size={24} />,
      title: "Hand-Tracking Support",
      description: "Natural hand gestures for intuitive UI interaction and enhanced immersion without controllers."
    },
    {
      icon: <Mic size={24} />,
      title: "Voice & Text Interaction",
      description: "Choose your preferred communication method for personalized learning experiences with accessibility support."
    },
    {
      icon: <Zap size={24} />,
      title: "Real-Time Responses",
      description: "Get immediate, historically accurate answers with both text and audio feedback for comprehensive learning."
    },
    {
      icon: <UserSquare size={24} />,
      title: "Realistic Characters",
      description: "Engage with lifelike historical figures, brought to life with realistic detail."
    }
  ];

  const benefits: BenefitProps[] = [
    {
      icon: <Brain size={32} />,
      title: "Multi-Sensory Learning",
      description: "VR engages sight, sound, and interaction simultaneously, improving memory encoding and retention rates significantly."
    },
    {
      icon: <Users size={32} />,
      title: "Increased Engagement",
      description: "Interactive environments make education more captivating and enjoyable, reducing classroom disruptions."
    },
    {
      icon: <Hand size={32} />,
      title: "Active Participation",
      description: "Students learn by doing and interacting, which strengthens understanding and knowledge retention."
    },
    {
      icon: <Star size={32} />,
      title: "Experiential Learning",
      description: "Students experience history firsthand instead of just memorizing facts from traditional textbooks."
    }
  ];

  const techStack: TechStackItem[] = [
    { 
      name: "Unity 3D", 
      description: "Industry-leading game engine powering immersive VR experiences", 
      color: "from-gray-600 to-gray-800" 
    },
    { 
      name: "OpenXR", 
      description: "Cross-platform VR compatibility across all major headsets", 
      color: "from-blue-600 to-blue-800" 
    },
    { 
      name: "Meta SDK", 
      description: "Optimized VR interactions for Meta Quest and other devices", 
      color: "from-indigo-600 to-indigo-800" 
    },
    { 
      name: "OpenAI GPT", 
      description: "Advanced AI for natural, contextual historical conversations", 
      color: "from-green-600 to-green-800" 
    },
    { 
      name: "C# & .NET", 
      description: "Robust, scalable backend architecture for enterprise use", 
      color: "from-purple-600 to-purple-800" 
    },
    { 
      name: "Azure AI", 
      description: "Enterprise-grade Speech-to-Text and Text-to-Speech services", 
      color: "from-cyan-600 to-cyan-800" 
    }
  ];

  const einsteinFeatures: string[] = [
    "Discuss the theory of relativity in simple, student-friendly terms",
    "Learn about his journey as a scientist and his creative process",
    "Understand his perspectives on education, curiosity, and learning",
    "Explore his thoughts on creativity, imagination, and problem-solving"
  ];

  const stats = [
    { number: "75%", label: "Improvement in retention" },
    { number: "90%", label: "Student engagement rate" },
    { number: "60%", label: "Reduction in learning time" },
    { number: "95%", label: "Teacher satisfaction" }
  ];

  return (
    <>
      <Head>
        <title>Connecting With Legends VR - Revolutionary AI-Powered History Education</title>
        <meta name="description" content="Transform history education with immersive VR experiences. Students interact with AI-powered historical figures like Albert Einstein. Request a demo for your school today." />
        <meta name="keywords" content="VR education, virtual reality learning, AI-powered education, immersive history, educational technology, Albert Einstein VR, interactive learning, school VR programs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Connecting With Legends VR - Revolutionary History Education" />
        <meta property="og:description" content="Transform history education with AI-powered VR experiences. Students can interact with historical figures in immersive virtual environments." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://connectingwithlegends.com" />
        <meta property="og:image" content="/og-image.jpg" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Connecting With Legends VR - Revolutionary History Education" />
        <meta name="twitter:description" content="Transform history education with AI-powered VR experiences." />
        <meta name="twitter:image" content="/twitter-image.jpg" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="author" content="History Speaks VR - Daniel Baquero & Matt Crispi" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://connectingwithlegends.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Connecting With Legends VR",
              "description": "AI-powered VR application for immersive history education allowing students to interact with historical figures",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "VR Headsets (Meta Quest, HTC Vive, etc.)",
              "offers": {
                "@type": "Offer",
                "price": "Contact for pricing",
                "priceCurrency": "USD"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Connecting With Legends VR",
                "founder": [
                  {
                    "@type": "Person",
                    "name": "Daniel Baquero",
                    "jobTitle": "CEO & Founder"
                  },
                  {
                    "@type": "Person",
                    "name": "Matt Crispi",
                    "jobTitle": "Director of Research, Marketing, and Pedagogy"
                  }
                ]
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-x-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-md z-50 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="main-logo">
                  <Link href="http://localhost:3000"><Image src="/logo.png" alt="History Speaks VR" width={70} height={70} /></Link>
                </div>
                <span className="text-xl font-bold">History Speaks VR</span>
              </div>
              
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  About Us
                </button>
                <button 
                  onClick={() => scrollToSection('problem')} 
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  Problem
                </button>
                <button 
                  onClick={() => scrollToSection('solution')} 
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  Solution
                </button>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('demo')} 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Request Demo
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/20">
              <div className="px-4 py-4 space-y-4">
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="block w-full text-left py-2 hover:text-cyan-400 transition-colors"
                >
                  About Us
                </button>
                <button 
                  onClick={() => scrollToSection('problem')} 
                  className="block w-full text-left py-2 hover:text-cyan-400 transition-colors"
                >
                  Problem
                </button>
                <button 
                  onClick={() => scrollToSection('solution')} 
                  className="block w-full text-left py-2 hover:text-cyan-400 transition-colors"
                >
                  Solution
                </button>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="block w-full text-left py-2 hover:text-cyan-400 transition-colors"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('demo')} 
                  className="block w-full text-left bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-full mt-4"
                >
                  Request Demo
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center">
              <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
                  Transform History Education Forever
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                  Speak directly with history&apos;s greatest figures &mdash; making lessons unforgettable and boosting student engagement.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <button 
                    onClick={() => scrollToSection('demo')}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-2"
                  >
                    Request Free Demo <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────── */}
        {/* ABOUT US SECTION                                           */}
        {/* ─────────────────────────────────────────────────────────── */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Subtle background accent */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-6xl mx-auto relative">

            {/* Section label */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-10 bg-cyan-400/60"></span>
              <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">The Team Behind the Vision</span>
              <span className="h-px w-10 bg-cyan-400/60"></span>
            </div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* ── LEFT COLUMN: copy ── */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  Built by Educators &amp; Engineers Who{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Believe Learning Should Feel Alive
                  </span>
                </h2>

                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  History Speaks VR was born at the intersection of <strong className="text-white">deep technical innovation</strong> and{' '}
                  <strong className="text-white">research-driven pedagogy</strong> — two disciplines that rarely share the same room, let alone the same product.
                </p>

                <div className="space-y-5 mb-8">
                  {/* Daniel blurb */}
                  <div className="flex gap-4 items-start bg-white/5 border border-white/10 rounded-xl p-5 hover:border-cyan-400/40 transition-all duration-300">
                    <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      DB
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Daniel Baquero — CEO &amp; Founder</p>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Full-stack engineer specializing in Unity and AR/VR development. Daniel transforms immersive storytelling, 
                        AI, and interactive design into meaningful, human-centered learning experiences — ensuring every virtual 
                        world is technically flawless and deeply engaging.
                      </p>
                    </div>
                  </div>

                  {/* Matt blurb */}
                  <div className="flex gap-4 items-start bg-white/5 border border-white/10 rounded-xl p-5 hover:border-cyan-400/40 transition-all duration-300">
                    <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      MC
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Matt Crispi — Director of Research, Marketing &amp; Pedagogy</p>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Educator and learning scientist whose work in cognitive science and games for learning guarantees every 
                        experience is developmentally sound, pedagogically grounded, and truly classroom-ready.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mission statement callout */}
                <blockquote className="border-l-4 border-cyan-400 pl-5 py-1">
                  <p className="text-gray-200 text-base italic leading-relaxed">
                    &ldquo;The future of education should be <strong className="text-cyan-400 not-italic">immersive, ethical, and experiential</strong> &mdash; 
                    designed not just to impress, but to foster curiosity, empathy, and lived understanding.&rdquo;
                  </p>
                  <footer className="text-gray-400 text-sm mt-2">— Daniel &amp; Matt, Co-founders</footer>
                </blockquote>
              </div>

              {/* ── RIGHT COLUMN: team cards ── */}
              <div className="grid grid-cols-2 gap-6">

                {/* Daniel card */}
                <div className="group flex flex-col items-center text-center">
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-2xl border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300 shadow-xl">
                    {/* 
                      ⚠️  Replace "/daniel-baquero.jpg" with the actual image path in your /public folder.
                          Recommended size: 400×400 px or square crop.
                    */}
                    <Image
                      src="/daniel-baquero.jpg"
                      alt="Daniel Baquero, CEO & Founder of History Speaks VR"
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-cyan-400/40 rounded-xl px-4 py-3 w-full transition-all duration-300">
                    <p className="text-white font-semibold text-sm">Daniel Baquero</p>
                    <p className="text-cyan-400 text-xs mt-0.5 font-medium">Founder &amp; CEO</p>
                  </div>
                </div>

                {/* Matt card */}
                <div className="group flex flex-col items-center text-center">
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-2xl border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300 shadow-xl">
                    {/* 
                      ⚠️  Replace "/matt-crispi.jpg" with the actual image path in your /public folder.
                          Recommended size: 400×400 px or square crop.
                    */}
                    <Image
                      src="/matt-crispi.jpg"
                      alt="Matt Crispi, Director of Marketing, Research & Pedagogy at History Speaks VR"
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-cyan-400/40 rounded-xl px-4 py-3 w-full transition-all duration-300">
                    <p className="text-white font-semibold text-sm">Matt Crispi</p>
                    <p className="text-cyan-400 text-xs mt-0.5 font-medium">Director of Marketing</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
        {/* ─────────────────────────────────────────────────────────── */}
        {/* END ABOUT US SECTION                                       */}
        {/* ─────────────────────────────────────────────────────────── */}

        {/* Problem Statement */}
        <section id="problem" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400">
                  The Crisis in History Education
                </h2>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  Traditional history education faces unprecedented challenges. Students are disengaged, 
                  retention rates are plummeting, and educators struggle to make historical events 
                  relevant to digital natives. The passive nature of textbook learning fails to 
                  connect students with the human stories that shaped our world.
                </p>
                <div className="space-y-4">
                  {[
                    "68% of students find history class boring and irrelevant",
                    "Average retention rate of historical facts drops to 20% after one month",
                    "Teachers report difficulty engaging students with traditional methods",
                    "Limited resources for bringing history to life in classrooms"
                  ].map((problem, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-300">{problem}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="flex items-center justify-center overflow-hidden rounded-2xl">
                  <Image src='/students_bored_2.jpg' alt='VR History App' width={688} height={384} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section id="solution" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Our Revolutionary Solution
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                HistorySpeaks VR transforms history education into an active, immersive experience 
                where students can interact with historical figures as if they were truly there. 
                Our AI-powered platform makes learning memorable, engaging, and effective.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <Globe size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4">Immersive Virtual Environment</h3>
                <p className="text-gray-300">
                  In immersive virtual settings, students interact directly with historical figures through natural,
                  real-time dialogue — creating authentic and engaging learning experiences.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <Brain size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4">Advanced AI Interactions</h3>
                <p className="text-gray-300">
                  Cutting-edge AI enables natural conversations with historical figures, providing accurate, 
                  contextual responses based on extensive historical research, personality traits, and speaking patterns.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4">Multi-Modal Learning</h3>
                <p className="text-gray-300">
                  Students can communicate through text or voice, with responses delivered through 
                  realistic voice synthesis, visual feedback, and spatial audio for enhanced accessibility and immersion.
                </p>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-3xl p-8 md:p-12 border border-white/10">
              <h3 className="text-3xl font-bold text-center mb-12 text-cyan-400">How It Works</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                  <h4 className="text-xl font-semibold mb-3">Enter the Virtual World</h4>
                  <p className="text-gray-300">Students put on VR headsets and are transported to an interactive historical environment</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                  <h4 className="text-xl font-semibold mb-3">Choose Historical Figures</h4>
                  <p className="text-gray-300">Select from available historical personalities displayed on an interactive menu.</p>
                  <p className="text-gray-300">* Note: At the moment there&apos;s only 1 character availiable: Albert Einstein</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                  <h4 className="text-xl font-semibold mb-3">Start Conversations</h4>
                  <p className="text-gray-300">Ask questions via voice or text and receive historically accurate, personalized responses</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400">Powerful Features for Modern Education</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-6 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Einstein Feature */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-900/50 to-purple-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-cyan-400">
                  Meet Albert Einstein in VR
                </h2>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  Our initial release features one of history&apos;s most brilliant minds. Students can engage 
                  in deep, meaningful conversations with Albert Einstein, exploring his groundbreaking theories, 
                  scientific discoveries, and unique perspectives on learning and creativity.
                </p>
                <p className="text-lg text-gray-400 mb-8">
                  Experience Einstein&apos;s genius firsthand as he explains complex concepts in simple terms, 
                  shares stories from his life, and inspires students to think differently about science and learning.
                </p>
                <div className="space-y-4">
                  {einsteinFeatures.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-300 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => scrollToSection('demo')}
                  className="mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-full font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Experience Einstein VR Demo
                </button>
              </div>
              <div className="relative">
                <div className="flex justify-center items-center overflow-hidden">
                  <Image src='/Albert_Einstein_Vertical.jpg' alt='History Speaks VR' width={400} height={533} className="rounded-[1%]"  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Request Section */}
        <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400">
                Ready to Transform Your Classroom?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Experience the future of history education firsthand. Request a personalized demo 
                for your school or educational institution. See how VR can revolutionize learning outcomes.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-8">
                <span className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" size={16} />
                  Free 30-minute consultation
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" size={16} />
                  Live Einstein VR demonstration
                </span>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-lg mx-auto">
              
              <DemoContactForm />
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  By submitting, you agree to our privacy policy. We&apos;ll contact you within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-black/40 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="col-span-2">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">VR</span>
                  </div>
                  <span className="text-xl font-bold">HistorySpeaks VR</span>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Revolutionizing history education through immersive VR experiences and AI-powered interactions. 
                  Making learning memorable, engaging, and effective for the next generation of students.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-6 text-cyan-400">Product</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><button onClick={() => scrollToSection('problem')} className="hover:text-white transition-colors duration-200">Problem</button></li>
                  <li><button onClick={() => scrollToSection('solution')} className="hover:text-white transition-colors duration-200">Solution</button></li>
                  <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors duration-200">Features</button></li>
                  <li><button onClick={() => scrollToSection('demo')} className="hover:text-white transition-colors duration-200">Request Demo</button></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-6 text-cyan-400">Company</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors duration-200">About Us</button></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                &copy; 2026 HistorySpeaks VR. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span>Transforming education one classroom at a time</span>
                <span>•</span>
                <span>historyspeaksvr@gmail.com</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;