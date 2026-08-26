'use client';

import React, { useEffect, useRef } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/Mayorista';

export default function VideoBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay fallback
        });
      }
    }
  }, []);

  return (
    <div className="video-bg-layer fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#020617]">
      {/* Base degradada visible mientras carga el video */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, rgba(8,47,73,.45), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(59,7,100,.35), transparent 60%), #020617",
        }}
      />

      {/* Video nativo en bucle, silenciado y con reproducción inline */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-90"
      >
        <source src={`${BASE_PATH}/videos/background.mp4`} type="video/mp4" />
        <source src="https://cdn.coverr.co/videos/coverr-a-close-up-of-a-server-room-1577/1080p.mp4" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>

      {/* Capa oscura principal: contraste garantizado */}
      <div className="absolute inset-0 bg-black/65 z-[1] pointer-events-none" />

      {/* Viñeteado superior/inferior extra para legibilidad de textos y CTAs */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/75" />
    </div>
  );
}
