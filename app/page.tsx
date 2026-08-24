'use client';

import React, { useState } from 'react';

type SportType = 'football' | 'basketball' | 'skateboarding' | 'tennis';
type StyleType = 'pixel-art' | 'retro-arcade' | '3d-render' | 'vector';
type PoseType = 'idle' | 'running' | 'jumping' | 'action-shot';

interface SpriteGeneration {
  id: string;
  sport: SportType;
  style: StyleType;
  pose: PoseType;
  status: 'processing' | 'completed' | 'failed';
  imageUrl?: string;
  createdAt: string;
}

export default function SportsSpriteDashboard() {
  const [sport, setSport] = useState<SportType>('football');
  const [style, setStyle] = useState<StyleType>('pixel-art');
  const [pose, setPose] = useState<PoseType>('idle');
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [activeGeneration, setActiveGeneration] = useState<SpriteGeneration | null>(null);
  const [history, setHistory] = useState<SpriteGeneration[]>([]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newId = Math.random().toString(36).substring(7);
    
    const newGeneration: SpriteGeneration = {
      id: newId,
      sport,
      style,
      pose,
      status: 'processing',
      createdAt: new Date().toLocaleTimeString(),
    };

    setActiveGeneration(newGeneration);

    setTimeout(() => {
      const completedGeneration: SpriteGeneration = {
        ...newGeneration,
        status: 'completed',
        imageUrl: `https://picsum.photos{newId}/600/400`,
      };
      
      setActiveGeneration(completedGeneration);
      setHistory((prev) => [completedGeneration, ...prev]);
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-12">
      <main className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="border-b border-slate-800 pb-6 text-center md:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-indigo-400 sm:text-4xl">
            🏅 Sports Sprite AI Generator
          </h1>
          <p className="mt-2 text-slate-400 text-sm md:text-base">
            Design animated game assets and sprite sheets instantly using AI.
          </p>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Controls Form */}
          <div className="lg:col-span-1 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl h-fit">
            <h2 className="text-xl font-bold mb-4 text-white">Sprite Configuration</h2>
            
            <form onSubmit={handleGenerate} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Select Sport
                </label>
                <select 
                  value={sport} 
                  onChange={(e) => setSport(e.target.value as SportType)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="football">⚽ Football (Soccer)</option>
                  <option value="basketball">🏀 Basketball</option>
                  <option value="skateboarding">🛹 Skateboarding</option>
                  <option value="tennis">🎾 Tennis</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Art Style
                </label>
                <select 
                  value={style} 
                  onChange={(e) => setStyle(e.target.value as StyleType)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="pixel-art">👾 8-Bit / 16-Bit Pixel Art</option>
                  <option value="retro-arcade">🕹️ Retro Arcade Style</option>
                  <option value="3d-render">💎 3D Low-Poly Render</option>
                  <option value="vector">🎨 Flat Vector Character</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Starting Action Pose
                </label>
                <select 
                  value={pose} 
                  onChange={(e) => setPose(e.target.value as PoseType)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="idle">Standing / Idle</option>
                  <option value="running">Sprinting / Running</option>
                  <option value="jumping">Mid-Air Jump</option>
                  <option value="action-shot">Striking / Special Move</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Custom Modifiers (Optional)
                </label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., wearing neon green shorts, flaming shoes, futuristic helmet..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 text-sm h-24 resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-bold text-white transition duration-200 tracking-wide ${
                  loading 
                    ? 'bg-indigo-800 cursor-not-allowed opacity-60' 
                    : 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-md shadow-indigo-900/30'
                }`}
              >
                {loading ? '⚡ Crafting Sprite Grid...' : '✨ Generate Sprite Sheet'}
              </button>
            </form>
          </div>

          {/* Right Column: Canvas Display */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-white">User Canvas</h2>
            
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center min-h-[350px] shadow-xl text-center">
              {loading ? (
                <div className="space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-400 mx-auto"></div>
                  <p className="text-indigo-300 font-medium animate-pulse text-sm">
                    AI engine is baking your sprite grid frames...
                  </p>
                </div>
              ) : activeGeneration?.imageUrl ? (
                <div className="w-full space-y-4">
                  <div className="relative overflow-hidden rounded-lg border-2 border-indigo-500/30 bg-slate-950 p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={activeGeneration.imageUrl} 
                      alt="Generated Sheet" 
                      className="mx-auto rounded max-h-[400px] object-contain shadow-inner"
                    />
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center text-xs">
                    <span className="bg-slate-700 px-3 py-1.5 rounded-full text-slate-300">Sport: <b>{activeGeneration.sport}</b></span>
                    <span className="bg-slate-700 px-3 py-1.5 rounded-full text-slate-300">Style: <b>{activeGeneration.style}</b></span>
                    <span className="bg-slate-700 px-3 py-1.5 rounded-full text-slate-300">Pose: <b>{activeGeneration.pose}</b></span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 max-w-sm">
                  <div className="text-4xl">🕹️</div>
                  <h3 className="text-slate-300 font-semibold text-lg">Canvas Empty</h3>
                  <p className="text-slate-500 text-sm">
                    Configure your athlete on the left and tap generate to witness your automated animation frames sheet.
                  </p>
                </div>
              )}
            </div>

            {/* History Feed */}
            {history.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-300">Previous Canvas Outputs</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {history.map((item) => (
                    <div key={item.id} className="bg-slate-800 border border-slate-700 p-2.5 rounded-lg text-xs space-y-2">
                      {item.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={item.imageUrl} 
                          alt="Thumbnail log history" 
                          className="rounded w-full h-24 object-cover border border-slate-900"
                        />
                      )}
                      <div className="text-slate-400 font-medium truncate capitalize">
                        {item.style} {item.sport}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
