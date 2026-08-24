import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { sport, style, pose, prompt } = await request.json();

    // 1. Construct a powerful instruction prompt specifically engineered for sprites
    const styleModifier = style === 'pixel-art' 
      ? '16-bit retro pixel art game sprite sheet, side-scroller animation frames, grid layout' 
      : '3d low-poly video game character sheet, isolated individual animation asset frames, grid pattern';

    const fullPrompt = `${sport} player engaged in ${pose} action, ${styleModifier}, ${prompt || ''}, crisp details, clean solid white background, game asset pack`;

    // 2. Call the Replicate AI endpoint
    // We use a highly rated, fast Stable Diffusion model
    const response = await fetch('https://replicate.com', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "39ed52f2a78e134af403e8472975110fe77fd37474be9694c658d431366f2249", // SDXL Model
        input: {
          prompt: fullPrompt,
          negative_prompt: "blurry, low quality, deformed anatomy, human photo, text, watermark, signature",
          num_outputs: 1,
          scheduler: "K_EULER_ANCESTRAL",
          guidance_scale: 7.5,
          num_inference_steps: 30,
        },
      }),
    });

    const data = await response.json();

    // 3. Return the processing data block back to your dashboard page
    return NextResponse.json({ id: data.id, status: data.status, urls: data.urls });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to trigger AI generation engine' }, { status: 500 });
  }
}
