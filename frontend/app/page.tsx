  // "use client";

  // import { useState } from "react";

  // export default function Home() {
  //   const [prompt, setPrompt] = useState("");
  //   const [imageUrl, setImageUrl] = useState("");
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState("");
  //   const [downloadLoading, setDownloadLoading] = useState(false);

  //   const handleGenerate = async () => {
  //     if (!prompt.trim()) {
  //       setError("Please enter a prompt");
  //       return;
  //     }

  //     setLoading(true);
  //     setError("");
  //     setImageUrl("");

  //     try {
  //       const response = await fetch("http://127.0.0.1:8000/generate-image", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ prompt }),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to generate image");
  //       }

  //       const data = await response.json();
  //       setImageUrl(data.image_url);
  //     } catch (err) {
  //       setError("Something went wrong. Check backend.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const handleDownload = async () => {
  //     if (!imageUrl) return;
  //     setError("");
  //     setDownloadLoading(true);
  //     try {
  //       const res = await fetch(imageUrl);
  //       if (!res.ok) throw new Error("Failed to fetch image");
  //       const blob = await res.blob();
  //       const url = URL.createObjectURL(blob);
  //       const a = document.createElement("a");
  //       a.href = url;
  //       // Try to infer extension from blob type
  //       const ext = blob.type.split("/")[1] || "png";
  //       a.download = `generated.${ext}`;
  //       document.body.appendChild(a);
  //       a.click();
  //       a.remove();
  //       URL.revokeObjectURL(url);
  //     } catch (e) {
  //       setError("Failed to download image");
  //     } finally {
  //       setDownloadLoading(false);
  //     }
  //   };

  //   return (
  //     <>
  //       <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
  //         {/* Background */}
  //         <div className="fixed inset-0 opacity-20">
  //           <div className="absolute inset-0 bg-grid-pattern"></div>
  //           <div className="absolute inset-0 floating-particles"></div>
  //         </div>

  //         <main className="relative z-10 max-w-4xl mx-auto px-6 py-24">
  //           {/* Header */}
  //           <div className="text-center mb-8">
  //             <div className="inline-flex items-center gap-3 mb-2 px-7 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-white/10 rounded-2xl hover:scale-105 transition-all duration-300">
  //               <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
  //               <h1 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
  //                 Think Prompt and Create
  //               </h1>
  //             </div>
  //           </div>

  //           {/* Input Section – immediately under heading */}
  //           <div className="glass-card max-w-2xl mx-auto mb-6">
  //             <div className="p-5 md:p-6">
  //               <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2 tracking-wide">
  //                 Your Creative Vision
  //               </label>
  //               <div className="prompt-shell">
  //                 <textarea
  //                   className="prompt-textarea"
  //                   placeholder="Describe the image you want to create... (e.g., 'A futuristic cityscape at sunset with flying cars and neon lights')"
  //                   value={prompt}
  //                   onChange={(e) => setPrompt(e.target.value)}
  //                 />
  //               </div>
  //               {error && (
  //                 <p className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs md:text-sm">
  //                   {error}
  //                 </p>
  //               )}
  //             </div>
  //           </div>

  //           {/* Generate Button */}
  //           <div className="text-center mt-12">
  //             <button
  //               className={`generate-btn group relative px-10 md:px-12 py-4 md:py-5
  //                           text-base md:text-lg font-semibold rounded-2xl
  //                           transition-all duration-500 transform hover:scale-105
  //                           active:scale-95 ${
  //                             loading
  //                               ? "animate-pulse bg-gradient-to-r from-gray-700 to-gray-600 cursor-not-allowed"
  //                               : "bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 hover:from-purple-700 hover:via-blue-700 hover:to-purple-800 shadow-2xl hover:shadow-purple-glow"
  //                           }`}
  //               onClick={handleGenerate}
  //               disabled={loading}
  //             >
  //               <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 blur opacity-75 group-hover:opacity-100 transition-all duration-500"></span>
  //               <span className="relative flex items-center gap-3 justify-center">
  //                 {loading ? (
  //                   <>
  //                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
  //                     Generating...
  //                   </>
  //                 ) : (
  //                   <>
  //                     <svg
  //                       className="w-5 h-5 md:w-6 md:h-6"
  //                       fill="none"
  //                       stroke="currentColor"
  //                       viewBox="0 0 24 24"
  //                     >
  //                       <path
  //                         strokeLinecap="round"
  //                         strokeLinejoin="round"
  //                         strokeWidth={2}
  //                         d="M12 6v6m0 0v6m0-6h6m-6 0H6"
  //                       />
  //                     </svg>
  //                     Generate Image
  //                   </>
  //                 )}
  //               </span>
  //             </button>
  //           </div>

  //           {/* Generated Image */}
  //           {imageUrl && (
  //             <div className="glass-card max-w-2xl mx-auto mt-10  ">
              
  //                   <div className="relative group">
  //                     <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
  //                     <img
  //                       src={imageUrl}
  //                       alt="Generated"
  //                       className="w-full rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
  //                     />
  //                   </div>

  //                   <div className="flex justify-center mt-6 gap-4">
  //                     <button
  //                       className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 shadow-lg ${
  //                         downloadLoading ? "opacity-60 cursor-not-allowed animate-pulse" : ""
  //                       }`}
  //                       onClick={handleDownload}
  //                       disabled={downloadLoading}
  //                     >
  //                       {downloadLoading ? (
  //                         <>
  //                           <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
  //                           Downloading...
  //                         </>
  //                       ) : (
  //                         <>
  //                           <svg
  //                             xmlns="http://www.w3.org/2000/svg"
  //                             className="h-4 w-4"
  //                             fill="none"
  //                             viewBox="0 0 24 24"
  //                             stroke="currentColor"
  //                             strokeWidth={2}
  //                           >
  //                             <path
  //                               strokeLinecap="round"
  //                               strokeLinejoin="round"
  //                               d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
  //                             />
  //                           </svg>
  //                           Download
  //                         </>
  //                       )}
  //                     </button>
  //                   </div>
  //             </div>
  //           )}
  //         </main>
  //       </div>

  //       {/* GLOBAL STYLES INLINE */}
  //       <style jsx global>{`
  //         @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap");

  //         * {
  //           font-family: "Inter", -apple-system, BlinkMacSystemFont, system-ui,
  //             sans-serif;
  //         }

  //         body {
  //           margin: 0;
  //           font-size: 15px;
  //           line-height: 1.6;
  //           color: #e5e7eb;
  //           background: #000;
  //         }

  //         .glass-card {
  //           background: rgba(255, 255, 255, 0.05);
  //           backdrop-filter: blur(20px);
  //           border: 1px solid rgba(255, 255, 255, 0.1);
  //           border-radius: 24px;
  //           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  //           transition: all 0.3s ease;
  //         }

  //         .glass-card:hover {
  //           transform: translateY(-3px);
  //           box-shadow: 0 35px 60px -16px rgba(0, 0, 0, 0.7);
  //           border-color: rgba(255, 255, 255, 0.18);
  //         }

  //         .prompt-shell {
  //           background: radial-gradient(
  //               circle at top left,
  //               rgba(255, 255, 255, 0.12),
  //               transparent 55%
  //             ),
  //             radial-gradient(
  //               circle at bottom right,
  //               rgba(15, 23, 42, 0.9),
  //               rgba(15, 23, 42, 1)
  //             );
  //           border-radius: 18px;
  //           padding: 2px;
  //           border: 1px solid rgba(148, 163, 184, 0.4);
  //           box-shadow: 0 18px 35px rgba(0, 0, 0, 0.9),
  //             inset 0 1px 0 rgba(255, 255, 255, 0.12),
  //             inset 0 -1px 0 rgba(15, 23, 42, 0.9);
  //         }

  //         .prompt-textarea {
  //           width: 100%;
  //           height: 8.5rem;
  //           border-radius: 16px;
  //           background: radial-gradient(
  //             circle at top left,
  //             rgba(148, 163, 184, 0.18),
  //             rgba(15, 23, 42, 0.95)
  //           );
  //           border: 0;
  //           padding: 1.1rem 1.25rem;
  //           font-size: 0.95rem;
  //           color: #e5e7eb;
  //           resize: none;
  //           outline: none;
  //           box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08),
  //             inset 0 -1px 0 rgba(15, 23, 42, 0.9);
  //           transition: box-shadow 0.2s ease, background 0.2s ease,
  //             transform 0.15s ease;
  //         }

  //         .prompt-textarea::placeholder {
  //           color: rgba(148, 163, 184, 0.85);
  //         }

  //         .prompt-textarea:focus {
  //           background: radial-gradient(
  //             circle at top left,
  //             rgba(168, 85, 247, 0.22),
  //             rgba(15, 23, 42, 0.98)
  //           );
  //           box-shadow: inset 0 0 0 1px rgba(168, 85, 247, 0.7),
  //             0 0 0 1px rgba(15, 23, 42, 0.9),
  //             0 18px 30px rgba(15, 23, 42, 0.9);
  //           transform: translateY(-1px);
  //         }

  //         .generate-btn {
  //           box-shadow: 0 20px 40px -12px rgba(147, 51, 234, 0.4),
  //             0 0 0 1px rgba(255, 255, 255, 0.05),
  //             inset 0 1px 0 rgba(255, 255, 255, 0.12);
  //         }

  //         .generate-btn:hover {
  //           box-shadow: 0 28px 55px -14px rgba(147, 51, 234, 0.7),
  //             0 0 0 1px rgba(255, 255, 255, 0.18),
  //             inset 0 1px 0 rgba(255, 255, 255, 0.18);
  //         }

  //         .bg-grid-pattern {
  //           background-image: linear-gradient(
  //               rgba(255, 255, 255, 0.06) 1px,
  //               transparent 1px
  //             ),
  //             linear-gradient(
  //               90deg,
  //               rgba(255, 255, 255, 0.06) 1px,
  //               transparent 1px
  //             );
  //           background-size: 40px 40px;
  //         }

  //         .floating-particles::before,
  //         .floating-particles::after {
  //           content: "";
  //           position: absolute;
  //           width: 2px;
  //           height: 2px;
  //           border-radius: 9999px;
  //         }

  //         .floating-particles::before {
  //           background: rgba(147, 51, 234, 0.6);
  //           animation: float 22s infinite linear;
  //         }

  //         .floating-particles::after {
  //           background: rgba(59, 130, 246, 0.6);
  //           animation: float 30s infinite linear reverse;
  //           left: 20%;
  //         }

  //         @keyframes float {
  //           0% {
  //             transform: translateY(110vh) rotate(0deg);
  //             opacity: 0;
  //           }
  //           10% {
  //             opacity: 1;
  //           }
  //           90% {
  //             opacity: 1;
  //           }
  //           100% {
  //             transform: translateY(-110vh) rotate(360deg);
  //             opacity: 0;
  //           }
  //         }

  //         @media (max-width: 768px) {
  //           .prompt-textarea {
  //             font-size: 0.9rem;
  //           }
  //         }
  //       `}</style>
  //     </>
  //   );
  // }
  
//   "use client";

// import { useState } from "react";

// export default function Home() {
//   const [prompt, setPrompt] = useState("");
//   const [provider, setProvider] = useState<"replicate" | "a4f">("replicate");
//   const [imageUrl, setImageUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleGenerate = async () => {
//     if (!prompt.trim()) {
//       setError("Please enter a prompt");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setImageUrl("");

//     try {
//       const response = await fetch("http://127.0.0.1:8000/generate-image", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           prompt,
//           provider,          // 🔑 IMPORTANT
//           aspect_ratio: "16:9",
//         }),
//       });

//       if (!response.ok) {
//         const err = await response.json();
//         throw new Error(err.detail || "Backend error");
//       }

//       const data = await response.json();
//       setImageUrl(data.image_url);
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col items-center p-8">
//       <h1 className="text-3xl font-bold mb-6">
//         Image Generator (Replicate / A4F)
//       </h1>

//       {/* Provider Selector */}
//       <div className="w-full max-w-xl mb-4">
//         <label className="block mb-2 text-sm text-gray-300">
//           Select Provider
//         </label>
//         <select
//           value={provider}
//           onChange={(e) =>
//             setProvider(e.target.value as "replicate" | "a4f")
//           }
//           className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white"
//         >
//           <option value="replicate">Replicate (High Quality)</option>
//           <option value="a4f">A4F (Fast)</option>
//         </select>
//       </div>

//       {/* Prompt Input */}
//       <textarea
//         className="w-full max-w-xl p-4 rounded bg-gray-900 border border-gray-700 mb-4"
//         placeholder="Describe the image you want..."
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//       />

//       {error && <p className="text-red-400 mb-4">{error}</p>}

//       {/* Generate Button */}
//       <button
//         onClick={handleGenerate}
//         disabled={loading}
//         className="px-6 py-3 bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-50"
//       >
//         {loading
//           ? `Generating with ${provider}...`
//           : "Generate Image"}
//       </button>

//       {/* Output Image */}
//       {imageUrl && (
//         <div className="mt-8 w-full max-w-xl">
//           <img
//             src={imageUrl}
//             alt="Generated"
//             className="w-full rounded-xl border border-gray-700"
//           />
//         </div>
//       )}
//     </div>
//   );
// }"
"use client";

import { useState } from "react";

export default function Home() {
  // --- STATE MANAGEMENT (Unchanged Functionality) ---
  const [prompt, setPrompt] = useState("");
  const [provider, setProvider] = useState<"replicate" | "a4f">("replicate");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadLoading, setDownloadLoading] = useState(false);

  // --- HANDLERS (Unchanged Functionality) ---
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError("");
    setImageUrl("");

    try {
      const response = await fetch("http://127.0.0.1:8000/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          provider,
          aspect_ratio: "16:9",
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Backend error");
      }

      const data = await response.json();
      setImageUrl(data.image_url);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!imageUrl) return;
    setDownloadLoading(true);
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated-image.png";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    } finally {
      setDownloadLoading(false);
    }
  };

  // --- UI RENDER ---
  return (
    <>
      <div className="min-h-screen relative bg-[#050505] text-gray-200 overflow-x-hidden font-sans selection:bg-purple-500/30">
        
        {/* Background Atmosphere */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#050505] to-[#000000]"></div>
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen animate-blob"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000"></div>
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]"></div>
          <div className="particles-container">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
        </div>

        <main className="relative z-10 max-w-5xl mx-auto px-6 py-20 flex flex-col items-center min-h-screen justify-start">
          
          {/* 1. Header: Pill Shaped & Glowing */}
          <div className="mb-16 animate-fade-in-down">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(124,58,237,0.1)] hover:shadow-[0_0_25px_rgba(124,58,237,0.2)] transition-all duration-500">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-purple-400 to-blue-400"></span>
              </span>
              <h1 className="text-lg font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Think Prompt and Create
              </h1>
            </div>
          </div>

          <div className="w-full max-w-3xl flex flex-col gap-10">
            
            {/* 2. Provider Selection: Toggle Buttons */}
            <div className="flex flex-col items-center gap-3 animate-fade-in-up delay-100">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">Select AI Provider</span>
              <div className="flex p-1.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-inner">
                
                {/* A4F Button */}
                <button
                  onClick={() => setProvider("a4f")}
                  className={`relative px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    provider === "a4f"
                      ? "text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {provider === "a4f" && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-100"></div>
                  )}
                  <div className="relative z-10 flex items-center gap-2">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    A4F (Fast)
                  </div>
                </button>

                {/* Replicate Button */}
                <button
                  onClick={() => setProvider("replicate")}
                  className={`relative px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    provider === "replicate"
                      ? "text-white shadow-[0_0_20px_rgba(147,51,234,0.5)]"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {provider === "replicate" && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-100"></div>
                  )}
                  <div className="relative z-10 flex items-center gap-2">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
                    Replicate (High Quality)
                  </div>
                </button>
              </div>
            </div>

            {/* 3. Prompt Input: Deep Glassmorphism */}
            <div className="relative group animate-fade-in-up delay-200">
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-3 ml-2 font-medium">
                Your Creative Vision
              </label>
              <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-white/10 to-transparent focus-within:from-purple-500/50 focus-within:to-blue-500/50 transition-all duration-500">
                <div className="bg-[#0c0c12]/80 backdrop-blur-2xl rounded-3xl overflow-hidden">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the image you want to create… a cinematic futuristic city at sunset with neon lights"
                    rows={4}
                    className="w-full bg-transparent p-6 text-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-0 resize-none leading-relaxed transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                  />
                  {/* Subtle decorative elements inside input */}
                  <div className="absolute bottom-4 right-4 flex gap-2 pointer-events-none opacity-20">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  </div>
                </div>
              </div>
              {error && (
                <div className="mt-3 text-red-400 text-sm flex items-center gap-2 animate-shake">
                  <span className="block w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  {error}
                </div>
              )}
            </div>

            {/* 4. Action Button: Large Gradient Glow */}
            <div className="flex justify-center animate-fade-in-up delay-300">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className={`group relative w-full md:w-auto md:min-w-[280px] py-4 rounded-2xl font-semibold text-lg transition-all duration-500 ${
                  loading
                    ? "cursor-not-allowed opacity-80"
                    : "hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {/* Button Glow Background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-[length:200%_auto] transition-all duration-500 blur opacity-40 group-hover:opacity-80 group-hover:blur-md ${loading ? 'animate-gradient-x' : ''}`}></div>
                
                {/* Button Face */}
                <div className={`relative h-full px-8 flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#1a103c] to-[#101c3c] border border-white/10 group-hover:border-white/20 transition-all z-10 ${loading ? 'opacity-90' : ''}`}>
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">Generating...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent group-hover:text-white">Generate Image</span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* 5. Output Section: "Emerging" Card */}
            {imageUrl && (
              <div className="mt-8 animate-emerge perspective-1000">
                <div className="glass-card p-2 rounded-[32px] bg-gradient-to-b from-white/10 to-white/5 border border-white/10 shadow-2xl transition-transform hover:scale-[1.01] duration-500 group">
                  <div className="relative rounded-[28px] overflow-hidden bg-black aspect-video">
                    <img
                      src={imageUrl}
                      alt="Generated Art"
                      className="w-full h-full object-cover animate-fade-in"
                    />
                    
                    {/* Hover Overlay with Download */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={handleDownload}
                        disabled={downloadLoading}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all hover:scale-105"
                      >
                         {downloadLoading ? (
                          <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                        ) : (
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        )}
                        <span className="text-white font-medium">Download Asset</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Subtle Glow under image */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-[40px] blur-2xl -z-10 opacity-50 group-hover:opacity-75 transition-opacity"></div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* --- CSS EFFECTS --- */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        body { font-family: 'Inter', sans-serif; }

        /* Animation Keyframes */
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }

        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; }

        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }

        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }

        @keyframes emerge {
          0% { opacity: 0; transform: scale(0.95) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-emerge { animation: emerge 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

        /* Floating Particles */
        .particles-container { position: absolute; inset: 0; overflow: hidden; }
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          animation: float-up 15s infinite linear;
        }
        .particle:nth-child(1) { left: 20%; animation-duration: 20s; opacity: 0.3; }
        .particle:nth-child(2) { left: 70%; animation-duration: 25s; animation-delay: 2s; opacity: 0.2; }
        .particle:nth-child(3) { left: 40%; animation-duration: 18s; animation-delay: 5s; opacity: 0.4; }

        @keyframes float-up {
          0% { transform: translateY(100vh); }
          100% { transform: translateY(-10vh); }
        }

        /* Perspective for 3D tilts */
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </>
  );
}