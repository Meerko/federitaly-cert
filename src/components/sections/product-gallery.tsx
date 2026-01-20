"use client";

import React, { useMemo } from "react";
import { Autoplay, EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import { cn } from "@/lib/utils";

export type GalleryImage = {
  src: string;
  alt?: string;
};

interface ProductGalleryProps {
  className?: string;
  images?: GalleryImage[];
}

const ProductGallery = ({ className, images }: ProductGalleryProps) => {
  const safeImages = useMemo(() => {
    if (!images?.length) return [];

    // 1) filtra src vuoti
    const cleaned = images
      .filter((i) => typeof i?.src === "string" && i.src.trim().length > 0)
      .map((i) => ({ ...i, src: i.src.trim() }));

    // 2) dedup per src
    const unique = Array.from(new Map(cleaned.map((i) => [i.src, i])).values());

    // 3) limit
    return unique.slice(0, 24);
  }, [images]);

  // ✅ se non c’è niente, non renderizzare
  if (safeImages.length === 0) return null;

  const hasLoop = safeImages.length > 1;

  const css = `
    .mySwiperGallery {
      width: 260px;
      height: 340px;
    }
    .mySwiperGallery .swiper-slide {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 25px;
    }
    .mySwiperGallery .swiper-slide-active {
      overflow: visible !important;
    }
  `;

  return (
    <section className={cn("", className)}>
      <style>{css}</style>

      <div className="container flex flex-col items-center gap-10">
        <div className="relative w-full">
          <Swiper
            effect="cards"
            grabCursor
            modules={[EffectCards, Autoplay]}
            className="mySwiperGallery"
            loop={hasLoop}
            autoplay={
              hasLoop
                ? { delay: 2000, disableOnInteraction: false }
                : false
            }
          >
            {safeImages.map((image, index) => (
              <SwiperSlide key={image.src}>
                <img
                  className="h-full w-full overflow-hidden rounded-3xl object-scale-down border border-input bg-chart-4 shadow-md"
                  src={image.src}
                  alt={image.alt ?? `Immagine ${index + 1}`}
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export { ProductGallery };