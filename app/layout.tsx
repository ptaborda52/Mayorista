import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SpinOff Labs · Unidad Mayorista Inteligente',
  description: 'Propuesta de asociación comercial impulsada por automatización, datos y tecnología propia.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#05070d',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="dark bg-background">
      <body>{children}</body>
    </html>
  )
}
