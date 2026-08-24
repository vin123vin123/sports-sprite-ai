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

    const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Alert our local API route to start crafting the sprite sheet instruction
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sport, style, pose, prompt }),
      });
      
      const prediction = await res.json();
      
      if (prediction.error) throw new Error(prediction.error);

      // Create a temporary processing state slot
      let currentGen: SpriteGeneration = {
        id: prediction.id,
        sport,
        style,
        pose,
        status: 'processing',
        createdAt: new Date().toLocaleTimeString(),
      };
      setActiveGeneration(currentGen);

      // 2. Poll the server every 2 seconds until the AI finishes painting the grid
      const checkStatus = setInterval(async () => {
        const statusRes = await fetch(`https://replicate.com{prediction.id}`, {
          headers: { 'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}` }
        });
        const statusData = await statusRes.json();

        if (statusData.status === 'succeeded') {
          clearInterval(checkStatus);
          
          const completedGen: SpriteGeneration = {
            ...currentGen,
            status: 'completed',
            imageUrl: statusData.output[0], // The real AI image link!
          };

          setActiveGeneration(completedGen);
          setHistory((prev) => [completedGen, ...prev]);
          setLoading(false);
        } else if (statusData.status === 'failed') {
          clearInterval(checkStatus);
          setLoading(false);
          alert("AI Generation failed. Try adjustments.");
        }
      }, 2000);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };


  