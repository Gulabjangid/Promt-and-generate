'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Sparkles, Zap, Palette, ChevronRight, Star, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePrompt, setActivePrompt] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">Imagine</span>
          </div>
          <div className="hidden md:flex items-center gap-12">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Features</a>
            <a href="#demo" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">How it works</a>
            <a href="#gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Gallery</a>
          </div>
          <Link href="/main">
            <Button className="bg-primary hover:bg-primary/90 transition-all duration-300 rounded-full px-6 font-medium">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Gradient background - optimized */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/30 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div className="flex flex-col gap-8 fade-in-up">
            <div className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-secondary/40 border border-border">
              <Star className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-secondary-foreground">Powered by latest AI models</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold leading-tight tracking-tight">
                <span className="block mb-2">Create Stunning</span>
                <span className="gradient-text text-6xl md:text-7xl font-bold">Images from Text</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg font-light">
                Transform your imagination into reality. Generate unlimited unique artwork in seconds using cutting-edge artificial intelligence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg font-semibold rounded-full px-8 transition-all duration-300">
                Start Creating
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:border-primary/50 hover:bg-primary/5 text-lg font-semibold rounded-full px-8 bg-transparent transition-all duration-300">
                View Demo
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <p className="text-3xl font-bold">500K+</p>
                <p className="text-sm text-muted-foreground font-light">Images Created</p>
              </div>
              <div>
                <p className="text-3xl font-bold">50K+</p>
                <p className="text-sm text-muted-foreground font-light">Active Creators</p>
              </div>
            </div>
          </div>

          {/* Right side - Image showcase */}
          <div className="relative h-96 md:h-[500px] fade-in">
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-border bg-card/50 backdrop-blur-sm p-4 group cursor-pointer">
              <Image
                src={prompts[activePrompt].image || "/placeholder.svg"}
                alt="Generated AI image"
                fill
                className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
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
                    index === activePrompt ? 'bg-primary w-8' : 'bg-muted w-2 hover:bg-muted-foreground'
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
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-foreground">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
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
                  className={`group p-8 rounded-xl border transition-all duration-300 cursor-pointer card-hover ${
                    hoveredFeature === index
                      ? 'border-primary/50 bg-primary/5'
                      : 'border-border bg-card/30'
                  }`}
                >
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
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
      <section id="demo" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
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
              <div key={index} className="relative fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-primary-foreground tracking-tight">{item.step}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-light">{item.description}</p>
                {index < 2 && (
                  <ChevronRight className="hidden md:block absolute -right-8 top-8 w-6 h-6 text-border" />
                )}
              </div>
            ))}
          </div>

          {/* Interactive demo box */}
          <div className="mt-20 p-8 rounded-xl border border-border bg-card/40 glass-effect card-hover">
            <div className="mb-6">
              <label className="block text-base font-semibold mb-4 tracking-tight">Try it now:</label>
              <div className="flex gap-3 flex-col sm:flex-row">
                <input
                  type="text"
                  placeholder="Describe the image you want to create..."
                  className="flex-1 px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 font-light"
                  defaultValue="A serene waterfall in a misty forest"
                />
                <Button className="bg-primary hover:bg-primary/90 transition-all duration-300 rounded-lg font-medium whitespace-nowrap">Generate</Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-light">Your images are generated instantly and ready to use commercially.</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Latest Creations</h2>
            <p className="text-lg text-muted-foreground font-light">Inspiration from our community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {prompts.map((prompt, index) => (
              <div key={index} className="group relative h-72 rounded-xl overflow-hidden cursor-pointer border border-border card-hover fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
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
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto font-light">
            Join thousands of creators, designers, and artists using AI to bring their visions to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg font-semibold rounded-full px-8 transition-all duration-300">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:border-primary/50 hover:bg-primary/5 text-lg font-semibold rounded-full px-8 bg-transparent transition-all duration-300">
              View Pricing
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6 font-light">No credit card required. Start with 5 free generations.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-bold mb-4 tracking-tight">Imagine</h3>
              <p className="text-sm text-muted-foreground font-light">Transform your imagination into stunning visuals with AI.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 tracking-tight">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 font-light">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 font-light">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 font-light">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 tracking-tight">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 font-light">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 font-light">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 font-light">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 tracking-tight">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 font-light">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 font-light">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 font-light">License</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground font-light">© 2025 Imagine. All rights reserved.</p>
            <div className="flex gap-8 mt-6 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 font-light">Twitter</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 font-light">Discord</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 font-light">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
