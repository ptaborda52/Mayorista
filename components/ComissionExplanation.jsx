'use client';

import React from "react";
import { motion } from "framer-motion";

export default function ComissionExplanation() {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* Halo neón exterior difuminado (borde brillante sutil) */}
        <div
          className="absolute -inset-1 rounded-[2rem] opacity-60 blur-2xl pointer-events-none"
          style={{
            background:
              "conic-gradient(from 180deg, rgba(34,211,238,.5), rgba(168,85,247,.35), rgba(236,72,153,.4), rgba(34,211,238,.5))",
          }}
        />

        {/* Borde fino degradado (1px) que envuelve el cristal */}
        <div
          className="absolute inset-0 rounded-[2rem] p-px pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(34,211,238,.6), rgba(255,255,255,.12) 40%, rgba(168,85,247,.55))",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* ===== Tarjeta de cristal ===== */}
        <div
          className="relative rounded-[2rem] overflow-hidden px-8 py-10 md:px-14 md:py-14"
          style={{
            backdropFilter: "blur(24px) saturate(140%)",
            WebkitBackdropFilter: "blur(24px) saturate(140%)",
            background:
              "linear-gradient(160deg, rgba(255,255,255,.09), rgba(255,255,255,.03) 55%, rgba(34,211,238,.05))",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,.15), 0 30px 60px -20px rgba(0,0,0,.7)",
          }}
        >
          {/* Reflejo diagonal sutil tipo vidrio */}
          <div
            className="absolute -top-1/2 -left-1/3 w-[70%] h-[140%] rotate-12 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,.06), transparent)",
            }}
          />

          {/* Cabecera */}
          <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-cyan-300/90 bg-cyan-400/10 border border-cyan-400/25 rounded-full px-4 py-1.5 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Modelo de remuneración
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                Mi Comisión de Gestión
              </h2>
              <p className="text-white/55 mt-3 max-w-xl text-sm md:text-base leading-relaxed">
                Sin costos ocultos ni fijos: mi honorario existe únicamente
                cuando el capital se mueve y la mercancía se vende.
              </p>
            </div>

            {/* Fórmula visual */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3">
                <div className="text-2xl font-bold text-cyan-300">3%</div>
                <div className="text-[10px] uppercase tracking-wider text-white/50">Compra</div>
              </div>
              <span className="text-white/40 text-xl font-light">+</span>
              <div className="text-center rounded-2xl border border-purple-400/30 bg-purple-400/10 px-5 py-3">
                <div className="text-2xl font-bold text-purple-300">3%</div>
                <div className="text-[10px] uppercase tracking-wider text-white/50">Venta</div>
              </div>
            </div>
          </div>

          {/* Detalle de ambas comisiones */}
          <div className="relative grid md:grid-cols-2 gap-5 mb-8">
            {/* 3% sobre compra */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:border-cyan-400/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-cyan-400/15 border border-cyan-400/25 flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-white/40">Al invertir</span>
              </div>
              <div className="text-4xl font-bold text-white mb-1">
                3%<span className="text-cyan-300 text-2xl align-top">s/ compra</span>
              </div>
              <p className="text-white/55 text-sm leading-relaxed">
                Calculado sobre el <span className="text-cyan-200 font-medium">capital invertido</span> en
                la adquisición del lote o activo.
              </p>
            </motion.div>

            {/* 3% sobre venta */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:border-purple-400/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-purple-400/15 border border-purple-400/25 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-white/40">Al cerrar</span>
              </div>
              <div className="text-4xl font-bold text-white mb-1">
                3%<span className="text-purple-300 text-2xl align-top">s/ venta</span>
              </div>
              <p className="text-white/55 text-sm leading-relaxed">
                Calculado sobre el <span className="text-purple-200 font-medium">total de la venta generada</span> al
                liquidar la operación.
              </p>
            </motion.div>
          </div>

          {/* Ejemplo numérico realista */}
          <div className="relative rounded-2xl border border-white/10 bg-black/30 p-6 mb-8 overflow-hidden">
            <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-4">
              Ejemplo con un ciclo completo
            </div>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-white/50 mb-1">Capital invertido</div>
                <div className="text-white font-semibold text-lg">$100,000</div>
                <div className="text-cyan-300/80 text-xs mt-1">→ comisión compra: $3,000</div>
              </div>
              <div>
                <div className="text-white/50 mb-1">Venta generada</div>
                <div className="text-white font-semibold text-lg">$150,000</div>
                <div className="text-purple-300/80 text-xs mt-1">→ comisión venta: $4,500</div>
              </div>
              <div className="sm:border-l sm:border-white/10 sm:pl-4">
                <div className="text-white/50 mb-1">Gestión total del ciclo</div>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 font-bold text-lg">
                  $7,500
                </div>
                <div className="text-white/40 text-xs mt-1">Solo si la operación existe y rota.</div>
              </div>
            </div>
          </div>

          {/* Alineación de incentivos */}
          <div className="relative grid sm:grid-cols-3 gap-4">
            {[
              ["Solo gano si tú ganas", "Mi honorario nace del éxito comercial, nunca de tu riesgo."],
              ["Incentivo a la rotación", "Me motiva comprar bien y vender rápido: capital nunca dormido."],
              ["Socio, no intermediario", "Trabajo el activo contigo hasta la última venta cerrada."],
            ].map(([title, desc], idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400/30 to-purple-400/30 border border-cyan-300/30 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">{title}</div>
                  <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
