### File 5: `app/page.tsx`
```typescript
'use client';

import React, { useState } from 'react';
import { Sparkles, Download, Layers, Shield, Zap, HelpCircle } from 'lucide-react';

export default function Home() {
  const [sport, setSport] = useState('football');
  const [style, setStyle] = useState('pixel-art');
  const [pose, setPose] = useState('running');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSprite, setGeneratedSprite] = useState<string | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate API call to AI Sprite Generation backend
    setTimeout(() => {
      // Mocked generated sprite asset image link
      setGeneratedSprite('https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&auto=format&fit=crop&q=60');
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-900">
      {/* Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-teal-500 to-emerald-400 p-2 rounded-lg text-slate-900 font-black tracking-wider text-xl shadow-lg shadow-teal-500/20">
              ⚡
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              SpriteSport.AI
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-teal-400 transition-colors">Features</a>
            <a href="#showcase" className="hover:text-teal-400 transition-colors">Showcase</a>
            <a href="#pricing" className="hover:text-teal-400 transition-colors">Pricing</a>
          </nav>
          <div>
            <button className="bg-slate-800 border border-slate-700 hover:border-teal-500 hover:text-teal-400 px-4 py-2 rounded-lg text-sm font-medium transition-all">
              Connect API
            </button>
          </div>
        </div>
      </header>

      {/* Hero & Generator Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Generate 2D{" "}
            <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Sports Sprites
            </span>{" "}
            with AI
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Instantly create high-quality, transparent sports characters, animations, and icons for your indie games or projects in seconds. Ready to deploy globally.
          </p>
        </div>

        {/* Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-5 bg-slate-800/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-400" /> Sprite Settings
            </h2>
            
            <form onSubmit={handleGenerate} className="space-y-6">
              {/* Select Sport */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Select Sport</label>
                <select 
                  value={sport} 
                  onChange={(e) => setSport(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors text-slate-200"
                >
                  <option value="football">Football / Soccer</option>
                  <option value="basketball">Basketball</option>
                  <option value="tennis">Tennis</option>
                  <option value="baseball">Baseball</option>
                  <option value="skateboarding">Skateboarding</option>
                </select>
              </div>

              {/* Select Art Style */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Art Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'pixel-art', label: '👾 8-Bit Pixel' },
                    { id: 'retro-arcade', label: '🕹️ 16-Bit Arcade' },
                    { id: 'anime-vector', label: '🎨 Vector Anime' },
                    { id: '3d-render', label: '💎 Chibi 3D' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStyle(s.id)}
                      className={`p-3 rounded-xl border text-sm font-medium text-left transition-all ${
                        style === s.id 
                          ? 'border-teal-500 bg-teal-500/10 text-teal-400' 
                          : 'border-slate-700 bg-slate-900 hover:border-slate-600'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Pose */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Action / Pose</label>
                <select 
                  value={pose} 
                  onChange={(e) => setPose(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors text-slate-200"
                >
                  <option value="running">Sprinting / Running</option>
                  <option value="shooting">Shooting / Scoring</option>
                  <option value="celebrating">Victory Celebration</option>
                  <option value="dribbling">Dribbling Control</option>
                  <option value="idle">Idle Standing</option>
                </select>
              </div>

              {/* Text Prompt */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Custom Modifiers (Optional)</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., wearing neon green jersey, cybernetic dynamic flames, motion blur effect..."
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors text-slate-200 resize-none placeholder:text-slate-600"
                />
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 disabled:from-slate-700 disabled:to-slate-700 text-slate-950 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 disabled:shadow-none disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    Generating Assets...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 fill-slate-950" />
                    Generate Sprite Sheet
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Output Display Panel */}
          <div className="lg:col-span-7 flex flex-col h-full justify-between">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex-1 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden group">
              {/* Alpha grid canvas pattern */}
              <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,#fff_25%,transparent_25%),linear-gradient(-45deg,#fff_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#fff_75%),linear-gradient(-45deg,transparent_75%,#fff_75%)] bg-[size:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0]" />
              
              {isGenerating ? (
                <div className="text-center z-10 space-y-3">
                  <div className="p-4 bg-teal-500/10 rounded-full inline-block animate-pulse">
                    <Zap className="w-8 h-8 text-teal-400 animate-bounce" />
                  </div>
                  <p className="text-sm font-medium text-slate-400">AI is stitching character frames together...</p>
                </div>
              ) : generatedSprite ? (
                <div className="z-10 flex flex-col items-center max-w-sm w-full p-4">
                  <div className="border border-slate-800 rounded-xl bg-slate-900/50 p-6 shadow-2xl relative group-hover:scale-[1.02] transition-transform duration-300">
                    <img 
                      src={generatedSprite} 
                      alt="Generated Sports Sprite" 
                      className="w-64 h-64 object-cover rounded-lg mix-blend-screen"
                    />
                    <div className="absolute top-2 right-2 bg-teal-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                      Alpha Ready
                    </div>
                  </div>
                  <div className="mt-6 w-full flex gap-3">
                    <button type="button" className="flex-1 bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all">
                      <HelpCircle className="w-4 h-4" /> Preview Animation
                    </button>
                    <button type="button" className="flex-1 bg-teal-500 hover:bg-teal-400 text-slate-950 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all">
                      <Download className="w-4 h-4" /> Download PNG
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center z-10 max-w-sm px-6">
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl inline-block mb-4">
                    <Shield className="w-8 h-8 text-slate-500" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-300 mb-1">Studio Canvas Clean</h3>
                  <p className="text-xs text-slate-500 leading-normal">
                    Configure your dynamic sports characters on the left control panel and tap generate to launch the AI process.
                  </p>
                </div>
              )}
            </div>

            {/* Micro details bar */}
            <div className="mt-4 flex flex-wrap justify-between items-center text-xs text-slate-500 gap-2 px-2">
              <p>⚡ Powered by Stable Diffusion SpriteEngine-V3</p>
              <p>✓ Automated background alpha removal</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-slate-800 bg-slate-950/40 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-600">
          © 2026 SpriteSport.AI. Built for Vercel edge deployment.
        </div>
      </footer>
    </div>
  );
}
```
