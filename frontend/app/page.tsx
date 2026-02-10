'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import { Sparkles, Zap, Palette, ChevronRight, Star, ArrowRight, CheckCircle, Mail, Search } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePrompt, setActivePrompt] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [dots, setDots] = useState<Array<{ left: string; top: string; animation: string; delay: string }>>([]);

  const prompts = [
    {
      text: "A serene mountain landscape at sunset with golden orange and purple clouds",
      image: "/sample-1.jpg"
    },
    {
      text: "A futuristic cyberpunk city at night with neon holographic billboards",
      image: "/sample-2.jpg"
    },
    {
      text: "An ethereal magical forest with bioluminescent glowing plants",
      image: "/sample-3.jpg"
    },
    {
      text: "A majestic dragon soaring through storm clouds with lightning",
      image: "/sample-4.jpg"
    }
  ];

  useEffect(() => {
    const generatedDots = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animation: `float ${8 + Math.random() * 6}s ease-in-out infinite`,
      delay: `${Math.random() * 2}s`
    }));
    setDots(generatedDots);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePrompt((prev) => (prev + 1) % prompts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [prompts.length]);

  const features = [
    {
      icon: Sparkles,
      title: "Intelligent Generation",
      description: "Advanced AI models that understand context and create stunning visuals from your imagination"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Generate high-quality images in seconds, iterate rapidly on your creative vision"
    },
    {
      icon: Palette,
      title: "Boundless Styles",
      description: "Photorealistic, abstract, fantasy, anime, and every art style imaginable at your fingertips"
    }
  ];

  const benefits = [
    { text: "No artistic skills required" },
    { text: "Commercial-use rights included" },
    { text: "Unlimited generations" },
    { text: "Advanced editing tools" }
  ];

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Latest Creation', href: '#gallery' },
    { label: 'About', href: '#' }
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSubmitted(true);
      setEmail('');
      setTimeout(() => setEmailSubmitted(false), 3000);
    }
  };

  // Smooth scroll function
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const navHeight = 80; // Adjust based on your nav height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Animated background dots */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="floating-dot absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: dot.left,
              top: dot.top,
              animation: dot.animation,
              animationDelay: dot.delay
            }}
          />
        ))}
      </div>

      {/* Navigation - Aligned with content */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#1a1d24]/95 backdrop-blur-lg shadow-lg' 
          : 'bg-[#1a1d24]'
      }`}>
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Navigation Links - LEFT ALIGNED */}
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[15px] font-medium text-gray-300 hover:text-white transition-colors duration-200 px-5 py-2 rounded-md hover:bg-white/5 whitespace-nowrap cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right side - Login, Sign-up */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Login Button */}
              {/* <button 
                className="text-white font-medium hover:bg-white/5 rounded-md px-6 h-10 text-[15px] border border-[#2a2d35] hover:border-gray-600 transition-all whitespace-nowrap"
              >
                Login
              </button> */}

              {/* Sign-up Button */}
              <Link href="/main">
                {/* <button className="bg-[white] hover:bg-[purple] text-black font-semibold rounded-md px-6 h-10 text-[15px] transition-all duration-200 shadow-lg whitespace-nowrap">
                  Sign-up
                </button> */}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden">
        {/* Gradient background - optimized */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/30 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Left side - Content */}
          <div className="flex flex-col gap-8 fade-in-up">
            <div className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-secondary/40 border border-primary/20 hover:border-primary/50 transition-colors duration-300">
              <Star className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-secondary-foreground">Powered by latest AI models</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                <span className="block mb-2">Create Stunning</span>
                <span className="gradient-text text-5xl md:text-6xl font-bold">Images from Text</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md font-light">
                Transform your imagination into reality. Generate unlimited unique artwork in seconds using cutting-edge artificial intelligence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/main">
                <button className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/40 text-white font-semibold rounded-full px-10 py-3 transition-all duration-300 transform hover:scale-105 active:scale-95 w-full sm:w-auto text-lg flex items-center justify-center gap-2">
                  Start Creating
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <button className="border-primary/30 hover:border-primary/60 hover:bg-primary/10 text-foreground font-semibold rounded-full px-10 py-3 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg border">
                View Demo
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="group cursor-pointer">
                <p className="text-3xl font-bold group-hover:text-primary transition-colors duration-300">500K+</p>
                <p className="text-sm text-muted-foreground font-light">Images Created</p>
              </div>
              <div className="group cursor-pointer">
                <p className="text-3xl font-bold group-hover:text-primary transition-colors duration-300">50K+</p>
                <p className="text-sm text-muted-foreground font-light">Active Creators</p>
              </div>
            </div>
          </div>

          {/* Right side - Image showcase */}
          <div className="relative h-96 md:h-[500px] fade-in">
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-primary/30 bg-card/50 backdrop-blur-sm p-4 group cursor-pointer hover:border-primary/60 transition-all duration-300 shadow-lg hover:shadow-primary/20">
              <Image
                src={prompts[activePrompt].image || "/placeholder.svg"}
                alt="Generated AI image"
                fill
                className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                style={{ aspectRatio: '16/9' }}
                priority
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-background via-transparent to-transparent opacity-40"></div>
            </div>

            {/* Image indicators */}
            <div className="absolute bottom-8 left-8 right-8 flex gap-2 z-20">
              {prompts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActivePrompt(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activePrompt ? 'bg-primary w-8 shadow-lg shadow-primary/50' : 'bg-muted w-2 hover:bg-primary/60'
                  }`}
                  aria-label={`View prompt ${index + 1}`}
                />
              ))}
            </div>

            {/* Prompt text */}
            <div className="absolute -bottom-24 left-0 right-0 text-center">
              <p className="text-sm text-muted-foreground italic font-light">"{prompts[activePrompt].text}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 fade-in-up p-4 rounded-lg hover:bg-primary/5 transition-colors duration-300 border border-transparent hover:border-primary/20 group cursor-pointer" style={{ animationDelay: `${index * 100}ms` }}>
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors duration-300" />
                <span className="text-sm font-medium text-foreground">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
              Everything you need to bring your creative vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className={`group p-8 rounded-xl border transition-all duration-300 cursor-pointer ${
                    hoveredFeature === index
                      ? 'border-primary/60 bg-primary/10 shadow-lg shadow-primary/20 transform scale-105'
                      : 'border-primary/20 bg-card/30 hover:border-primary/40'
                  }`}
                >
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/30">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-light">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-24 px-6 relative scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground font-light">
              Three simple steps to create amazing images
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Enter Your Prompt",
                description: "Describe the image you want to create in your own words"
              },
              {
                step: "02",
                title: "AI Creates Magic",
                description: "Our advanced models generate multiple variations instantly"
              },
              {
                step: "03",
                title: "Refine & Download",
                description: "Upscale, edit, or generate more variations of your favorite"
              }
            ].map((item, index) => (
              <div key={index} className="relative fade-in-up group" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/30">
                    <span className="text-2xl font-bold text-primary-foreground tracking-tight">{item.step}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-light">{item.description}</p>
                {index < 2 && (
                  <ChevronRight className="hidden md:block absolute -right-8 top-8 w-6 h-6 text-primary/40 group-hover:text-primary/70 transition-colors duration-300" />
                )}
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Latest Creations</h2>
            <p className="text-lg text-muted-foreground font-light">Inspiration from our community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {prompts.map((prompt, index) => (
              <div key={index} className="group relative h-72 rounded-xl overflow-hidden cursor-pointer border border-primary/20 hover:border-primary/60 fade-in-up hover:shadow-lg hover:shadow-primary/20 transition-all duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                <Image
                  src={prompt.image || "/placeholder.svg"}
                  alt={prompt.text}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-sm text-foreground line-clamp-2 font-light">{prompt.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-balance">
            Ready to Start Creating?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-light">
            Join thousands of creators, designers, and artists using AI to bring their visions to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/main">
              <button className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/40 text-white font-semibold rounded-full px-8 transition-all duration-300 transform hover:scale-105 active:scale-95 w-full sm:w-auto text-base">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
            <button className="border-primary/30 hover:border-primary/60 hover:bg-primary/10 text-foreground font-semibold rounded-full px-8 transition-all duration-300 transform hover:scale-105 active:scale-95 text-base border">
              View Pricing
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-6 font-light">No credit card required. Start with 5 free generations.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-20 px-6 bg-background/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-lg font-bold mb-4 tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">IMAGINE</h3>
              <p className="text-sm text-muted-foreground font-light">Transform your imagination into stunning visuals with AI.</p>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4 tracking-tight">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#features" onClick={(e) => handleNavClick(e, '#features')} className="hover:text-primary transition-colors duration-300 font-light cursor-pointer">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-300 font-light">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-300 font-light">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4 tracking-tight">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="hover:text-primary transition-colors duration-300 font-light cursor-pointer">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-300 font-light">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-300 font-light">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4 tracking-tight">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors duration-300 font-light">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-300 font-light">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-300 font-light">License</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary/20 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground font-light">© 2025 Imagine. All rights reserved.</p>
            <div className="flex gap-8 mt-6 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-light">Twitter</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-light">Discord</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-light">GitHub</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.4;
          }
        }
        
        .floating-dot {
          animation: float 6s ease-in-out infinite;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
