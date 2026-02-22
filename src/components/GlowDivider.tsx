import { motion } from 'motion/react'

export default function GlowDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      viewport={{ once: true }}
      className='relative w-full h-px'
    >
      {/* Glow */}
      <div className='absolute inset-0 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-cyan-500 blur-sm opacity-70 animate-pulse' />

      {/* Línea base */}
      <div className='absolute inset-0 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-cyan-500 animate-pulse' />
    </motion.div>
  )
}
