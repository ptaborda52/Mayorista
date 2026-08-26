'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Siluetas fotográficas realistas (fondo negro → se funden con el sitio)
const LEFT_HAND_IMG =
  "https://image.qwenlm.ai/public_source/083af497-b72a-4bd1-afcd-503b442119ad/1e6fc290a-94ab-4305-b112-e3f18b6f1754.png";
const RIGHT_HAND_IMG =
  "https://image.qwenlm.ai/public_source/083af497-b72a-4bd1-afcd-503b442119ad/11660909d-dafe-4385-a64f-302f6e11a595.png";

export default function HandshakeScrollEffect() {
  const layerRef = useRef(null);

  // Progreso de scroll sobre toda la sección contenedora
  const { scrollYProgress } = useScroll({
    target: layerRef,
    offset: ["start end", "end end"],
  });

  // --- Traslación horizontal: de fuera de pantalla al punto de agarre ---
  const leftX = useTransform(scrollYProgress, [0, 0.9, 1], ["-58vw", "-14vw", "-13vw"]);
  const rightX = useTransform(scrollYProgress, [0, 0.9, 1], ["58vw", "14vw", "13vw"]);

  // --- Profundidad 3D: rotación en Y que se "aplana" al acercarse ---
  const leftRotY = useTransform(scrollYProgress, [0, 1], [42, 0]);
  const rightRotY = useTransform(scrollYProgress, [0, 1], [-42, 0]);

  // --- Inclinación natural del antebrazo que se nivela al sellar ---
  const leftRotZ = useTransform(scrollYProgress, [0, 1], [-7, 0]);
  const rightRotZ = useTransform(scrollYProgress, [0, 1], [7, 0]);

  // --- Escala: sensación de cámara que se acerca (dolly-in) ---
  const handsScale = useTransform(scrollYProgress, [0, 0.6, 1], [0.82, 0.95, 1.04]);

  // --- Micro-rebote vertical al momento del contacto (apretón firme) ---
  const gripY = useTransform(scrollYProgress, [0, 0.85, 0.93, 1], [60, 0, 6, 0]);

  // --- Opacidad constante y contenida (máx. 20%) ---
  const layerOpacity = 0.2;

  // --- Resplandor que nace exactamente cuando las manos se sellan ---
  const glowOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 0.9]);
  const glowScale = useTransform(scrollYProgress, [0.8, 1], [0.4, 1.6]);

  // --- Anillo de "acuerdo sellado" ---
  const ringScale = useTransform(scrollYProgress, [0.88, 1], [0.2, 2.2]);
  const ringOpacity = useTransform(scrollYProgress, [0.88, 0.96, 1], [0, 0.7, 0]);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      {/* Escena con perspectiva para el efecto tridimensional */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: layerOpacity, perspective: 1200 }}
      >
        {/* Brazo izquierdo (luz cian) */}
        <motion.img
          src={LEFT_HAND_IMG}
          alt=""
          draggable={false}
          className="absolute w-[72vw] md:w-[44vw] max-w-[620px] select-none mix-blend-screen"
          style={{
            x: leftX,
            y: gripY,
            rotateY: leftRotY,
            rotate: leftRotZ,
            scale: handsScale,
            filter: "drop-shadow(0 0 30px rgba(34,211,238,.35))",
          }}
        />

        {/* Brazo derecho (luz violeta) */}
        <motion.img
          src={RIGHT_HAND_IMG}
          alt=""
          draggable={false}
          className="absolute w-[72vw] md:w-[44vw] max-w-[620px] select-none mix-blend-screen"
          style={{
            x: rightX,
            y: gripY,
            rotateY: rightRotY,
            rotate: rightRotZ,
            scale: handsScale,
            filter: "drop-shadow(0 0 30px rgba(168,85,247,.35))",
          }}
        />

        {/* Resplandor central del apretón */}
        <motion.div
          className="absolute w-[26rem] h-[26rem] rounded-full blur-3xl"
          style={{
            opacity: glowOpacity,
            scale: glowScale,
            background:
              "radial-gradient(circle, rgba(34,211,238,.5), rgba(168,85,247,.35) 55%, transparent 75%)",
          }}
        />

        {/* Onda expansiva al sellar el acuerdo */}
        <motion.div
          className="absolute w-72 h-72 rounded-full border border-cyan-300/60"
          style={{ opacity: ringOpacity, scale: ringScale }}
        />
      </div>
    </div>
  );
}
