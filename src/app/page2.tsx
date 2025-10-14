// pages/index.tsx
'use client'

import { useState, useEffect, FormEvent } from 'react';
import Head from 'next/head';
import { ChevronRight, Play, Users, Brain, Zap, Shield, CheckCircle, Star, ArrowRight, Menu, X, Globe, Headphones, Hand, Mic, UserSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

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

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
    
  //   // Simulate form submission - replace with your actual API call
  //   try {
  //     await new Promise(resolve => setTimeout(resolve, 2000));
  //     alert('Demo request submitted successfully! We\'ll contact you within 24 hours.');
  //     setFormData({ name: '', email: '', school: '', students: '', message: '' });
  //   } catch (error) {
  //     alert('There was an error submitting your request. Please try again.');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

const handleSubmit1 = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  // 💡 CALL YOUR INTERNAL API ROUTE 💡
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
// ... (rest of the component) ...

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

  const [state, handleSubmit] = useForm("mvgwgwpk");

  if (state.succeeded) {
    alert('Demo request submitted successfully! We\'ll contact you within 24 hours.')
  }

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
        <meta name="author" content="Connecting With Legends VR" />
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
                "name": "Connecting With Legends VR"
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
                {/* <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">VR</span>
                </div> */}
                {/* <img src={Image} alt='Logo' /> */}
                <div className="main-logo">
                  <Link href="http://localhost:3000"><Image src="/logo.png" alt="History Speaks VR" width={70} height={70} /></Link>
                </div>
                <span className="text-xl font-bold">History Speaks VR</span>
              </div>
              
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
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
                  Speak directly with history’s greatest figures — making lessons unforgettable and boosting student engagement.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <button 
                    onClick={() => scrollToSection('demo')}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-2"
                  >
                    Request Free Demo <ArrowRight size={20} />
                  </button>
                  <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 px-6 py-4">
                    <Play size={20} />
                    Watch 2-Min Overview
                  </button>
                </div>
                
                {/* Stats */}
                {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          </div>
        </section>

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
                {/* <div className="w-full h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center border border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10"></div>
                  <div className="text-center relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <span className="text-3xl">📚</span>
                    </div>
                    <p className="text-gray-400 text-lg font-semibold">Traditional Passive Learning</p>
                    <p className="text-gray-500 text-sm mt-2">Low engagement • Poor retention • Limited interaction</p>
                  </div>
                </div> */}
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
                  <p className="text-gray-300">* Note: At the moment there's only 1 character availiable: Albert Einstein</p>
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

        {/* Benefits for Educators */}
        {/* <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-cyan-400">Why Educators Choose VR Learning</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Virtual Reality transforms education by engaging multiple senses and creating memorable experiences 
                that traditional methods cannot match. See the dramatic improvement in your classroom.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 transform hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div> */}

            {/* Research-backed Results */}
            {/* <div className="mt-16 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-center mb-8 text-cyan-400">Research-Backed Results</h3>
              <div className="grid md:grid-cols-2 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-cyan-400 mb-2">4x</div>
                  <p className="text-gray-300">Higher engagement compared to traditional methods</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-cyan-400 mb-2">75%</div>
                  <p className="text-gray-300">Improvement in information retention rates</p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Einstein Feature */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-900/50 to-purple-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-cyan-400">
                  Meet Albert Einstein in VR
                </h2>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  Our initial release features one of history's most brilliant minds. Students can engage 
                  in deep, meaningful conversations with Albert Einstein, exploring his groundbreaking theories, 
                  scientific discoveries, and unique perspectives on learning and creativity.
                </p>
                <p className="text-lg text-gray-400 mb-8">
                  Experience Einstein's genius firsthand as he explains complex concepts in simple terms, 
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
                {/* <div className="w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center border border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>
                  <div className="text-center relative z-10">
                    <div className="w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <span className="text-5xl">🧠</span>
                    </div>
                    <p className="text-2xl font-semibold text-cyan-400 mb-2">Albert Einstein</p>
                    <p className="text-gray-400">Interactive AI Conversations</p>
                    <p className="text-sm text-gray-500 mt-2">Available Now • Coming Soon: More Legends</p>
                  </div>
                </div> */}
                <div className="flex justify-center items-center overflow-hidden">
                  <Image src='/Albert_Einstein_Vertical.jpg' alt='History Speaks VR' width={400} height={533} className="rounded-[1%]"  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        {/* <section id="technology" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-cyan-400">Built with Enterprise-Grade Technology</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our platform leverages cutting-edge technologies to deliver seamless, scalable, 
                and secure VR experiences that work across all major VR headsets and educational environments.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {techStack.map((tech, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 transform hover:scale-105">
                  <div className={`w-12 h-12 bg-gradient-to-r ${tech.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Shield size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{tech.name}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{tech.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-2xl p-8 border border-white/10">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">Enterprise Security & Compliance</h3>
                <p className="text-gray-300 text-lg mb-6 max-w-3xl mx-auto">
                  Our robust technology stack ensures FERPA compliance, data privacy, scalability, 
                  and seamless integration with existing school systems and learning management platforms.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="text-green-400" size={20} />
                    <span className="text-gray-300">FERPA Compliant</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="text-green-400" size={20} />
                    <span className="text-gray-300">SOC 2 Certified</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="text-green-400" size={20} />
                    <span className="text-gray-300">99.9% Uptime SLA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Testimonials/Social Proof */}
        {/* <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400">Trusted by Educators Worldwide</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "This VR experience has completely transformed how my students engage with history. 
                  They're asking deeper questions and retaining information like never before."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Mitchell</p>
                    <p className="text-gray-400 text-sm">History Teacher, Lincoln High School</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "The Einstein interaction is phenomenal. Students who usually struggle with physics 
                  concepts are now excited to learn. This is the future of education."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">MJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Dr. Michael Johnson</p>
                    <p className="text-gray-400 text-sm">Science Department Head, Riverside Academy</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "Implementation was seamless, and the student engagement metrics speak for themselves. 
                  Test scores improved by 40% in the first semester alone."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">EW</span>
                  </div>
                  <div>
                    <p className="font-semibold">Emily Watson</p>
                    <p className="text-gray-400 text-sm">Principal, Oak Valley Middle School</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

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
                {/* <span className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" size={16} />
                  Custom implementation plan
                </span> */}
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-lg mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    School Email *
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="yourname@school.edu"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="school" className="block text-sm font-medium text-gray-300 mb-2">
                    School/Institution Name *
                  </label>
                  <input 
                    type="text" 
                    id="school"
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    placeholder="Your School Name"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="students" className="block text-sm font-medium text-gray-300 mb-2">
                    Number of Students
                  </label>
                  <select 
                    id="students"
                    name="students"
                    value={formData.students}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  >
                    <option value="">Select range</option>
                    <option value="1-50">1-50 students</option>
                    <option value="51-200">51-200 students</option>
                    <option value="201-500">201-500 students</option>
                    <option value="500+">500+ students</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Tell us about your specific needs or questions..."
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                    isSubmitting 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Request Free Demo
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  By submitting, you agree to our privacy policy. We'll contact you within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {/* <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {[
                {
                  question: "What VR headsets are supported?",
                  answer: "Our platform supports all major VR headsets including Meta Quest 2/3/Pro, HTC Vive, Valve Index, and Windows Mixed Reality devices. We use OpenXR for maximum compatibility."
                },
                {
                  question: "How do I integrate this into my existing curriculum?",
                  answer: "Our education team provides comprehensive curriculum integration support, including lesson plans, learning objectives alignment, and teacher training resources to seamlessly fit into your history program."
                },
                {
                  question: "Is the content historically accurate?",
                  answer: "Absolutely. Our AI responses are based on extensive historical research, peer-reviewed sources, and consultation with history professors to ensure accuracy and educational value."
                },
                {
                  question: "What technical requirements do we need?",
                  answer: "Minimum requirements include VR headsets, computers with Windows 10+ or equivalent, and reliable internet connection. We provide detailed technical specifications and setup support."
                },
                {
                  question: "How much does it cost for schools?",
                  answer: "We offer flexible pricing plans for educational institutions based on number of students and usage. Contact us for a customized quote that fits your budget and needs."
                },
                {
                  question: "Will you add more historical figures?",
                  answer: "Yes! Einstein is just the beginning. We're actively developing interactions with figures like Marie Curie, Leonardo da Vinci, Abraham Lincoln, and many others based on educator feedback."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold mb-3 text-cyan-400">{faq.question}</h3>
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

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
                {/* <div className="flex space-x-6">
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">
                    <span className="sr-only">X</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">
                    <span className="sr-only">YouTube</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div> */}
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
                  <li><a href="#" className="hover:text-white transition-colors duration-200">About Us</a></li>
                  {/* <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li> */}
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                  {/* <li><a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Support</a></li> */}
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                &copy; 2025 HistorySpeaks VR. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span>Made with ❤️ for educators</span>
                <span>•</span>
                <span>Transforming education one classroom at a time</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;