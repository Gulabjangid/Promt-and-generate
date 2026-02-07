"use client";

import { useState, useRef, useEffect } from "react";

const STYLES = [
  { id: "none", label: "Normal", },
  { id: "cinematic", label: "Cinematic" },
  { id: "photorealistic", label: "Photorealistic" },
  { id: "anime", label: "Anime"},
  { id: "fantasy", label: "4k"},
 
  
];

const ASPECT_RATIOS = [
  { id: "16:9", label: "16:9 (Widescreen)" },
  { id: "9:16", label: "9:16 (Portrait)" },
  { id: "1:1", label: "1:1 (Square)" },
  { id: "4:3", label: "4:3 (Standard)" },
  { id: "21:9", label: "21:9 (Ultrawide)" },
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [provider] = useState<"replicate" | "a4f">("replicate");
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0]);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(ASPECT_RATIOS[0]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAspectRatioDropdownOpen, setIsAspectRatioDropdownOpen] = useState(false);
  const [enhancing, setEnhancing] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const aspectRatioDropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        aspectRatioDropdownRef.current &&
        !aspectRatioDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAspectRatioDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please describe your vision first.");
      return;
    }

    setLoading(true);
    setError("");
    setImageUrl("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          provider,
          style_preset: selectedStyle.id,
          aspect_ratio: selectedAspectRatio.id,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || err.detail || "Backend error");
      }

      const data = await response.json();
      setImageUrl(data.image_url);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEnhance = async () => {
    if (!prompt.trim()) return;
    setEnhancing(true);
    try {
      const res = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          style_preset: selectedStyle.id,
        }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Enhance failed");
      }
      const data = await res.json();
      setPrompt(data.enhanced_prompt);
    } catch (e: any) {
      console.error("Enhance error:", e);
      setError(e.message || "Failed to enhance prompt");
    } finally {
      setEnhancing(false);
    }
  };

  const handleDownload = async () => {
    if (!imageUrl) return;
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `creation-${Date.now()}.png`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#020205] text-gray-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
        {/* background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.95),_#020205_70%)]" />

          {/* floating white dots */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="floating-dot dot-1" />
            <div className="floating-dot dot-2" />
            <div className="floating-dot dot-3" />
            <div className="floating-dot dot-4" />
            <div className="floating-dot dot-5" />
            <div className="floating-dot dot-6" />
            <div className="floating-dot dot-7" />
            <div className="floating-dot dot-8" />
          </div>

          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-soft-light" />
        </div>

        <main className="relative z-10 max-w-5xl mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-[90vh]">
          {/* header */}
          <div className="text-center mb-12 space-y-3">
            <h1 className="heading-slide text-5xl md:text-6xl   leading-[1.2]   font-bold tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              Imagine.
            </h1>
            <div> </div>
            <p className="subheading-fade text-gray-400 text-xs md:text-sm tracking-widest uppercase">
              AI Powered Creative Engine
            </p>
          </div>

          {/* bar */}
          <div className="w-full relative group">
            <div
              className={`
                relative w-full bg-[#030614]/80 backdrop-blur-2xl 
                border border-slate-900 rounded-[36px] px-6 py-5
                shadow-[0_0_80px_-30px_rgba(15,23,42,1)]
                flex flex-col md:flex-row items-stretch gap-4
                transition-all duration-300
                group-hover:border-blue-500/70 group-hover:bg-[#040818]/95
              `}
            >
               {/* INPUT – single box with 3D hover and glow */}
               <div className="flex-1 flex items-stretch input-3d-container perspective">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your imagination..."
                  className="input-3d-glow w-full min-h-[130px] md:min-h-[100px] bg-[#020824] text-base md:text-lg text-white placeholder-gray-500/80 rounded-2xl px-6 py-4 border border-[#0b1536] focus:outline-none resize-none scrollbar-hide font-medium transition-all duration-300 focus:border-blue-500/50"
                  disabled={loading}
                />
               </div>

              {/* RIGHT SIDE – buttons in row, generate button below */}
              <div className="flex flex-col w-full md:w-auto gap-3" ref={dropdownRef}>
                {/* style and aspect ratio buttons in a row */}
                <div className="flex gap-3 w-full md:w-[260px]">
                  {/* style button */}
                  <div className="relative flex-1">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen((v) => !v)}
                      className="w-full h-11 flex items-center justify-between gap-2 px-4 rounded-2xl bg-[#05091e] hover:bg-[#070d27] border border-[#151b3b] text-xs transition-colors duration-200"
                    >
                      <span className="flex items-center gap-2">
                        
                        <span className="truncate text-left bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                          {selectedStyle.label}
                        </span>
                      </span>
                      <svg
                        className={`w-3 h-3 text-gray-400 transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute left-0 right-0 mt-2 bg-[#020617] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-64 overflow-y-auto">
                        <div className="p-1">
                          <div className="px-3 py-2 text-[10px] uppercase text-gray-500 font-bold tracking-wider">
                            Select Style
                          </div>
                          {STYLES.map((style) => (
                            <button
                              key={style.id}
                              onClick={() => {
                                setSelectedStyle(style);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-xl text-sm flex items-center gap-3 transition-colors ${
                                selectedStyle.id === style.id
                                  ? "bg-slate-800 text-white"
                                  : "text-gray-400 hover:bg-slate-800/60 hover:text-gray-100"
                              }`}
                            >
                             
                              {style.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* aspect ratio button */}
                  <div className="relative flex-1" ref={aspectRatioDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsAspectRatioDropdownOpen((v) => !v)}
                      className="w-full h-11 flex items-center justify-between gap-2 px-4 rounded-2xl bg-[#05091e] hover:bg-[#070d27] border border-[#151b3b] text-xs transition-colors duration-200"
                    >
                      <span className="flex items-center gap-2">
                        <span className="truncate text-left bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                          {selectedAspectRatio.label}
                        </span>
                      </span>
                      <svg
                        className={`w-3 h-3 text-gray-400 transition-transform ${
                          isAspectRatioDropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {isAspectRatioDropdownOpen && (
                      <div className="absolute left-0 right-0 mt-2 bg-[#020617] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-64 overflow-y-auto">
                        <div className="p-1">
                          <div className="px-3 py-2 text-[10px] uppercase text-gray-500 font-bold tracking-wider">
                            Select Aspect Ratio
                          </div>
                          {ASPECT_RATIOS.map((ratio) => (
                            <button
                              key={ratio.id}
                              onClick={() => {
                                setSelectedAspectRatio(ratio);
                                setIsAspectRatioDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-xl text-sm flex items-center gap-3 transition-colors ${
                                selectedAspectRatio.id === ratio.id
                                  ? "bg-slate-800 text-white"
                                  : "text-gray-400 hover:bg-slate-800/60 hover:text-gray-100"
                              }`}
                            >
                              {ratio.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* enhance and generate row */}
                <div className="flex gap-2 w-full">
                  {/* enhance button with sparkling star */}
                  <button
                    onClick={handleEnhance}
                    disabled={loading || enhancing || !prompt.trim()}
                    title="Enhance your prompt with AI"
                    className="h-11 px-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 bg-[#05091e] hover:bg-[#02050a] border border-[#151b3b] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-5 h-5 animate-pulse"
                      fill="url(#headingGradient)"
                      viewBox="0 0 24 24"
                    >
                      <defs>
                        <linearGradient id="headingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{ stopColor: "white", stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: "white", stopOpacity: 0.4 }} />
                        </linearGradient>
                      </defs>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <svg
                      className="w-2 h-2 absolute animate-bounce"
                      style={{ top: "8px", left: "18px" }}
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </button>
                  {/* generate button */}
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="flex-1 h-11 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 bg-[#05091e] hover:bg-[#070d27] border border-[#151b3b] transition-colors duration-200"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">Creating...</span>
                      </>
                    ) : (
                      <>
                        <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">Generate</span>
                        <svg
                          className="w-4 h-4"
                          fill="url(#headingGradient2)"
                          viewBox="0 0 24 24"
                          stroke="none"
                        >
                          <defs>
                            <linearGradient id="headingGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" style={{ stopColor: "white", stopOpacity: 1 }} />
                              <stop offset="100%" style={{ stopColor: "white", stopOpacity: 0.4 }} />
                            </linearGradient>
                          </defs>
                          <path
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="absolute -bottom-6 left-8 text-red-300 text-xs flex items-center gap-2 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  {error}
                </div>
              )}
            </div>

            {/* glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-black via-[#020617] to-black rounded-[40px] blur opacity-30 group-hover:opacity-50 transition-opacity duration-700 -z-10"></div>
          </div>

          {imageUrl && (
            <div className="mt-16 w-full animate-emerge perspective-container">
              <div className="card-3d group relative w-full aspect-video bg-[#050505] rounded-3xl border border-white/10 shadow-2xl overflow-hidden cursor-default">
                <img
                  src={imageUrl}
                  alt="AI Generated"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-medium text-lg mb-1">
                      {selectedStyle.label}
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-1 mb-4 opacity-80">
                      {prompt}
                    </p>
                    <button
                      onClick={handleDownload}
                      className="px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-sm text-white font-medium transition-colors flex items-center gap-2 w-fit"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download Asset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <style jsx global>{`
        @keyframes emerge {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(40px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-emerge {
          animation: emerge 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        @keyframes slideText {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }
          40% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .heading-slide {
          opacity: 0;
          animation: slideText 1s ease-out forwards;
        }
        .subheading-fade {
          opacity: 0;
          animation: slideText 0.8s ease-out 0.4s forwards;
        }

        .perspective-container {
          perspective: 1000px;
        }
        .card-3d {
          transition: transform 0.1s;
          transform-style: preserve-3d;
        }
        .card-3d:hover {
          transform: rotateX(2deg) rotateY(0deg) scale(1.01);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        /* Floating dots animation */
        @keyframes floatDot {
          0% {
            transform: translate3d(0, 0, 0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate3d(15px, -25px, 0);
          }
          100% {
            transform: translate3d(0, -50px, 0);
            opacity: 0;
          }
        }

        .floating-dot {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.7);
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
          animation: floatDot 10s ease-in-out infinite;
        }

        .floating-dot.dot-1 { top: 10%; left: 15%; opacity: 0.4; animation-duration: 12s; animation-delay: 0s; }
        .floating-dot.dot-2 { top: 25%; left: 70%; opacity: 0.5; animation-duration: 14s; animation-delay: 1s; }
        .floating-dot.dot-3 { top: 60%; left: 30%; opacity: 0.35; animation-duration: 16s; animation-delay: 2s; }
        .floating-dot.dot-4 { top: 80%; left: 80%; opacity: 0.45; animation-duration: 18s; animation-delay: 3s; }
        .floating-dot.dot-5 { top: 40%; left: 50%; opacity: 0.25; animation-duration: 20s; animation-delay: 1.5s; }
        .floating-dot.dot-6 { top: 15%; left: 85%; opacity: 0.3; animation-duration: 13s; animation-delay: 2.5s; }
        .floating-dot.dot-7 { top: 75%; left: 20%; opacity: 0.35; animation-duration: 17s; animation-delay: 0.8s; }
        .floating-dot.dot-8 { top: 50%; left: 10%; opacity: 0.3; animation-duration: 19s; animation-delay: 2.2s; }

        /* 3D Input Glow Animation */
        @keyframes inputGlow {
          0% {
            box-shadow: 0 0 20px rgba(37, 99, 235, 0.3), inset 0 0 20px rgba(37, 99, 235, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(37, 99, 235, 0.6), inset 0 0 30px rgba(37, 99, 235, 0.2);
          }
          100% {
            box-shadow: 0 0 20px rgba(37, 99, 235, 0.3), inset 0 0 20px rgba(37, 99, 235, 0.1);
          }
        }

        @keyframes float3d {
          0%, 100% {
            transform: translateY(0px) rotateX(0deg);
          }
          50% {
            transform: translateY(-4px) rotateX(1deg);
          }
        }

        .input-3d-container {
          perspective: 1200px;
        }

        .input-3d-glow {
          animation: inputGlow 3s ease-in-out infinite, float3d 4s ease-in-out infinite;
          transform-style: preserve-3d;
          will-change: transform, box-shadow;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
