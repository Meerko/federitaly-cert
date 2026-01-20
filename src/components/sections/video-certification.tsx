'use client';

import { Play } from 'lucide-react';
import { useState } from 'react';

import Noise from '@/components/noise';

type VideoCertificationProps = {
  videoUrl?: string;
  posterUrl?: string; // opzionale, se in futuro vuoi usarla
};

export default function VideoCertification({
  videoUrl,
  posterUrl,
}: VideoCertificationProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // ✅ Se il video non esiste, NON renderizziamo il blocco
  if (!videoUrl) return null;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section className="relative">
      <Noise />

      <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-xl border">
        {!isPlaying ? (
          <>
            {/* Background / Poster */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: posterUrl
                  ? `url(${posterUrl})`
                  : 'linear-gradient(to bottom right, #111827, #000)',
              }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Play button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <button
                onClick={handlePlay}
                className="group flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105 lg:h-24 lg:w-24"
                aria-label="Play Video"
              >
                <Play className="ml-1 size-6 fill-black text-black lg:size-7" />
              </button>
              <span className="font-medium text-white">Guarda il video</span>
            </div>
          </>
        ) : (
          <video
            className="h-full w-full object-cover"
            controls
            autoPlay
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
            Il tuo browser non supporta il tag video.
          </video>
        )}
      </div>
    </section>
  );
}