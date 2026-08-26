'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, BarChart3, Check, Code2, Gauge, Handshake, LineChart, LockKeyhole, Menu, Radar, Search, ShieldCheck, Sparkles, Store, Target, Truck, Users, X, Zap } from 'lucide-react'
import VideoBackground from '@/components/VideoBackground'
import ComissionExplanation from '@/components/ComissionExplanation'
import HandshakeScrollEffect from '@/components/HandshakeScrollEffect'

const money = (n: number) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)
const cards = [
  { icon: LockKeyhole, title: 'Flexibilidad comercial absoluta', text: 'Creamos un canal paralelo de alta rotación enfocado en captar nuevo volumen, con libertad total para cruzar o integrar productos con tus canales habituales.' },
  { icon: Radar, title: 'Cero riesgo de inventario', text: 'Mi sistema analiza la demanda real, los costos y los márgenes antes de que inviertas un solo dólar en mercadería, asegurando que cada compra tenga salida segura.' },
  { icon: Code2, title: 'Infraestructura liviana y propia', text: 'Docker + PostgreSQL + Directus. Cero licencias mensuales costosas y control total de un entorno tecnológico optimizado y a medida.' }
]
const steps = [
  { icon: Search, title: 'Descubrimiento automático', text: 'Mi algoritmo detecta tendencias masivas en Audio, Herramientas y Belleza.' },
  { icon: Truck, title: 'Costo real en origen', text: 'Extrae precios de CDE y suma automáticamente el 12% de logística.' },
  { icon: BarChart3, title: 'Contraste de plaza local', text: 'Compara en tiempo real contra precios activos de Mercado Libre Argentina.' },
  { icon: Target, title: 'La regla del 30%', text: 'Si no deja mínimo 30% puesto en tu depósito, el sistema lo descarta.' }
]

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const show = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={show ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}>
      {children}
    </motion.div>
  )
}

function Counter({ value, format = money }: { value: number; format?: (value: number) => string }) {
  const mv = useMotionValue(value)
  const spring = useSpring(mv, { stiffness: 120, damping: 25 })
  const [shown, setShown] = useState(value)
  useEffect(() => {
    mv.set(value)
    return spring.on('change', setShown)
  }, [value, mv, spring])
  return <>{format(shown)}</>
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="section-label"><i />{children}</div>
}

function Glass({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`glass-card ${className}`}>{children}</div>
}

function Metric({ label, value, tone = '', format = money }: { label: string; value: number; tone?: string; format?: (value: number) => string }) {
  return (
    <div className={`metric ${tone}`}>
      <small>{label}</small>
      <strong><Counter value={value} format={format} /></strong>
    </div>
  )
}

export default function Page() {
  const [capital, setCapital] = useState(5000000)
  const [b2b, setB2b] = useState(30)
  const [b2c, setB2c] = useState(100)
  const [rotation, setRotation] = useState(4)
  const [open, setOpen] = useState(false)

  const result = useMemo(() => {
    const b2bSales = (capital / 2) * (1 + b2b / 100)
    const b2cSales = (capital / 2) * (1 + b2c / 100)
    const cycleIncome = b2bSales + b2cSales
    const grossCycle = cycleIncome - capital
    const monthlyCapital = capital * rotation
    const total = cycleIncome * rotation
    const commission = monthlyCapital * 0.03 + total * 0.03
    return { total, monthlyCapital, commission, net: grossCycle * rotation - 60000 - commission }
  }, [capital, b2b, b2c, rotation])

  const cycleLabel = (v: number) => {
    const cycles = Math.round(v)
    return `${cycles} ciclo${cycles === 1 ? '' : 's'} · cada ${Math.round(30 / cycles)} días`
  }

  const sliders = [
    { label: 'Capital invertido por lote', value: capital, min: 1000000, max: 50000000, step: 500000, set: setCapital, format: money },
    { label: 'Margen mínimo mayorista B2B', value: b2b, min: 25, max: 50, step: 1, set: setB2b, format: (v: number) => `${v}%` },
    { label: 'Margen minorista B2C', value: b2c, min: 30, max: 100, step: 1, set: setB2c, format: (v: number) => `${v}%` },
    { label: 'Velocidad de Rotación del Capital', value: rotation, min: 1, max: 4, step: 1, set: setRotation, format: cycleLabel }
  ]

  return (
    <main className="site-shell">
      {/* 1. Fondo de Video Cinemático en Bucle */}
      <VideoBackground />

      {/* Barra de Navegación */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#inicio" className="brand">
            <span><Zap fill="currentColor" /></span>
            <b>SPIN<span>OFF</span></b>
            <small>LABS</small>
          </a>
          <div className="nav-links">
            <a href="#modelo">Modelo</a>
            <a href="#pipeline">Tecnología</a>
            <a href="#comisiones">Comisiones</a>
            <a href="#simulador">Simulador</a>
            <a href="#roadmap">Roadmap</a>
          </div>
          <a href="#simulador" className="nav-cta">
            Auditar tus números <ArrowRight />
          </a>
          <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Abrir menú">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="mobile-links">
            <a href="#modelo">Modelo</a>
            <a href="#pipeline">Tecnología</a>
            <a href="#comisiones">Comisiones</a>
            <a href="#simulador">Simulador</a>
            <a href="#roadmap">Roadmap</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="hero section-wrap">
        <Reveal>
          <div className="eyebrow"><i />PROPUESTA DE ASOCIACIÓN ESTRATÉGICA · INICIO INMEDIATO</div>
          <h1>Multipliquemos la <span>rentabilidad</span> de tu estructura <em>sin arriesgar tu operación.</em></h1>
          <p className="hero-lead">
            Te propongo crear una nueva unidad de negocio mayorista y minorista 100% automatizada. Vos ponés la capacidad de tu depósito y el capital; yo pongo inteligencia de mercado, experiencia en compras de alta rotación y estrategia comercial para decidir qué comprar, cómo venderlo y cuándo escalar. La tecnología es la herramienta que construí para no comprar a ciegas.
          </p>
          <div className="hero-actions">
            <a className="button primary button-primary" href="#simulador">Simular tus ganancias <ArrowRight /></a>
            <a className="button ghost button-ghost" href="#pipeline">Ver funcionamiento técnico <ArrowRight /></a>
          </div>
          <div className="hero-proof">
            <b>30% <small>margen mínimo</small></b>
            <b>2 <small>canales paralelos</small></b>
            <b>12% <small>logística medida</small></b>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <Glass className="control-card">
            <div className="card-top">
              <small>CONTROL DE OPORTUNIDAD</small>
              <b>Motor de rentabilidad <span>● Operativo</span></b>
            </div>
            <div className="mini-metrics">
              <div>
                <small>Margen detectado</small>
                <strong className="cyan">+42.8%</strong>
                <div className="progress" />
              </div>
              <div>
                <small>Productos válidos</small>
                <strong>1,284</strong>
                <small className="green">+18.4% esta semana</small>
              </div>
            </div>
            <div className="chart">
              <div className="chart-head">
                <small>PROYECCIÓN DE VENTAS · 90 DÍAS</small>
                <LineChart />
              </div>
              <div className="bars">
                {[30, 45, 35, 58, 51, 69, 65, 82, 74, 94, 86, 100].map((h, i) => (
                  <i key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            <p className="verified"><ShieldCheck /> Tu estructura actual permanece intacta <b>VERIFICADO</b></p>
          </Glass>
        </Reveal>
      </section>

      {/* SECCIÓN 01 */}
      <section id="modelo" className="band section-wrap">
        <Reveal>
          <Label>SECCIÓN 01 · SINERGIA Y CANALES PARALELOS</Label>
          <div className="section-head">
            <h2>Una nueva capa de ingresos sobre <span>lo que ya construiste.</span></h2>
            <p>
              Tu estructura actual no se altera, se potencia. Convertimos tu espacio, tu capital y tu logística en una unidad altamente rentable, dándote total libertad de aprovechar los productos para este nuevo canal o integrarlos donde mejor te convenga.
            </p>
          </div>
        </Reveal>
        <div className="grid three">
          {cards.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <Glass className="info-card">
                <Icon className="card-icon" />
                <small>0{i + 1}</small>
                <h3>{title}</h3>
                <p>{text}</p>
              </Glass>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECCIÓN 02 */}
      <section id="pipeline" className="section-wrap">
        <Reveal>
          <Label>SECCIÓN 02 · EL CEREBRO ALGORÍTMICO</Label>
          <div className="section-head">
            <h2>Del dato a la decisión.</h2>
            <p>
              Mi experiencia comercial y mis herramientas propias eliminan la intuición y priorizan oportunidades con evidencia antes de mover tu capital. Estoy comprometido codo a codo con el éxito del negocio.
            </p>
          </div>
        </Reveal>
        <div className="grid four">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <Glass className="step-card">
                <b>0{i + 1}</b>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </Glass>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 2. Tarjeta Glassmorphism de Explicación de Comisiones */}
      <div id="comisiones">
        <ComissionExplanation />
      </div>

      {/* SECCIÓN 03 · Simulador Financiero */}
      <section id="simulador" className="band section-wrap">
        <Reveal>
          <Label>SECCIÓN 03 · SIMULADOR FINANCIERO</Label>
          <div className="section-head">
            <h2>Auditá <span>tus propios números.</span></h2>
            <p>Mové las variables. La proyección se actualiza con la fórmula acordada y conteo fluido.</p>
          </div>
        </Reveal>
        <div className="sim-grid">
          <Reveal>
            <Glass className="controls">
              <div className="control-title">
                <Gauge />
                <b>Variables de inversión<small>Personalizá tu escenario</small></b>
              </div>
              {sliders.map(s => (
                <label className="slider" key={s.label}>
                  <span>{s.label}<b>{s.format(s.value)}</b></span>
                  <input
                    aria-label={s.label}
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={s.value}
                    onChange={e => s.set(+e.target.value)}
                  />
                  <em>{s.format(s.min)}<i>{s.format(s.max)}</i></em>
                </label>
              ))}
              <div className="formula">
                FÓRMULA ACTIVA<br />
                <b>Capital por lote × ciclos mensuales = capital total operado</b><br />
                <span>Ej: 4 ciclos = la mercadería rota y se reinvierte cada 7 días.</span>
              </div>
            </Glass>
          </Reveal>
          <Reveal delay={0.1}>
            <Glass className="results">
              <div className="results-head">
                <small>PROYECCIÓN DE ESCENARIO</small>
                <b>EN VIVO</b>
              </div>
              <div className="metrics">
                <Metric label="Capital por cada lote · inversión inicial" value={capital} />
                <Metric label="Ciclos de rotación mensuales" value={rotation} tone="cyan" format={cycleLabel} />
                <Metric label="Capital total operado en el mes" value={result.monthlyCapital} />
                <Metric label="Ingreso total generado · mensual" value={result.total} tone="cyan" />
                <Metric label="Tu comisión de gestión · mensual" value={result.commission} tone="violet" />
                <Metric label="TU GANANCIA NETA ESTIMADA · MENSUAL" value={result.net} tone="net" />
              </div>
              <p className="fixed">
                <Check /> Costos fijos operativos contemplados <b>-$60.000 ARS</b>
              </p>
            </Glass>
          </Reveal>
        </div>
      </section>

      {/* 3. Cierre Cinemático con Efecto 3D Scroll Handshake */}
      <div className="relative min-h-[300vh]">
        <HandshakeScrollEffect />
        <div className="relative z-10 flex flex-col justify-between min-h-full">
          {/* SECCIÓN 04 */}
          <section className="section-wrap">
            <Reveal>
              <Label>SECCIÓN 04 · PRECIOS DINÁMICOS</Label>
              <div className="section-head">
                <h2>Un catálogo, <span>dos motores de margen.</span></h2>
                <p>El sistema reconoce el perfil del usuario y muestra la propuesta correcta para cada contexto.</p>
              </div>
            </Reveal>
            <div className="grid two">
              <Reveal>
                <Glass className="profile">
                  <Users />
                  <small>B2B · VOLUMEN</small>
                  <h3>Canal mayorista</h3>
                  <p>Clientes de volumen. El sistema vende con 30% de margen para liquidar stock rápido.</p>
                  <b><Check /> Precio por escala</b>
                </Glass>
              </Reveal>
              <Reveal delay={0.1}>
                <Glass className="profile violet">
                  <Store />
                  <small>B2C · RENTABILIDAD</small>
                  <h3>Canal minorista</h3>
                  <p>Público general y redes sociales. Hasta 100% de margen para maximizar tu ganancia.</p>
                  <b><Check /> Precio inteligente</b>
                </Glass>
              </Reveal>
            </div>
          </section>

          {/* SECCIÓN 05 */}
          <section className="band section-wrap">
            <Reveal>
              <Label>SECCIÓN 05 · DIVISIÓN CLARA</Label>
              <h2>Vos y yo hacemos <span>lo que mejor sabemos hacer.</span></h2>
            </Reveal>
            <div className="grid two roles">
              <Reveal>
                <Glass className="role">
                  <Handshake />
                  <small>VOS</small>
                  <h3>Socio Inversor y Operativo</h3>
                  <ul>
                    {['Aportás el capital para los lotes seleccionados.', 'Ponés el espacio de depósito y recepción física.', 'Cubrirás el servidor de $60.000 ARS/mes.', 'Realizás la entrega o despacho físico.'].map(x => (
                      <li key={x}><Check />{x}</li>
                    ))}
                  </ul>
                </Glass>
              </Reveal>
              <Reveal delay={0.1}>
                <Glass className="role violet">
                  <Code2 />
                  <small>YO</small>
                  <h3>Socio Comercial y de Compras</h3>
                  <ul>
                    {['Estudio el mercado y analizo tendencias continuamente.', 'Selecciono productos de alta rotación con criterio comercial.', 'Uso herramientas propias para filtrar oportunidades y definir precios.', 'Acompaño activamente la venta y captación, con máximo esfuerzo y compromiso.'].map(x => (
                      <li key={x}><Check />{x}</li>
                    ))}
                  </ul>
                </Glass>
              </Reveal>
            </div>
          </section>

          {/* SECCIÓN 06 */}
          <section id="roadmap" className="section-wrap">
            <Reveal>
              <Label>SECCIÓN 06 · ROADMAP DE EJECUCIÓN</Label>
              <div className="section-head">
                <h2>Empezamos <span>desde el Día 1.</span></h2>
                <p>El mercado y las primeras compras se activan de inmediato; los tres meses son para madurar y escalar la infraestructura.</p>
              </div>
            </Reveal>
            <div className="timeline">
              {[
                ['DÍA 1', 'Inicio inmediato', 'Análisis de mercado, filtrado de tendencias y primeras propuestas de compra validadas.'],
                ['MES 1–2', 'Infraestructura que madura', 'Consolidación de la plataforma de gestión, control de stock y refinamiento del catálogo B2B/B2C.'],
                ['MES 3+', 'Escalamiento comercial', 'Optimización de márgenes, automatizaciones y tracción de ventas.']
              ].map(([month, title, text]) => (
                <Reveal key={month}>
                  <div className="timeline-item">
                    <i />
                    <small>{month}</small>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Cierre / Llamado a la Acción */}
          <Reveal>
            <section className="closing">
              <Sparkles />
              <h2>Vos tenés la estructura.<br /><span>Yo tengo el motor.</span></h2>
              <p>Los números y la tecnología están listos. ¿Cuándo nos sentamos a afinar los detalles?</p>
              <a className="button primary button-primary" href="https://wa.me/5493512371190" target="_blank" rel="noopener noreferrer">
                Agendar reunión de inicio <ArrowRight />
              </a>
            </section>
          </Reveal>

          {/* Pie de página */}
          <footer>
            <b>SPINOFF LABS</b>
            <span>PROPUESTA CONFIDENCIAL · 2026</span>
          </footer>
        </div>
      </div>
    </main>
  )
}
