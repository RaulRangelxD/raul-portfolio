'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function FrontText() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Empieza enorme (cerca de la cámara) y se ajusta
  const scale = useTransform(scrollYProgress, [0, 1], [3, 1])

  // Empieza transparente y aparece
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section ref={containerRef} className='relative h-[200vh]'>
      {/* Overlay sticky */}
      <div className='sticky top-0 h-screen flex items-center justify-center pointer-events-none'>
        <motion.h1
          style={{
            scale,
            opacity,
          }}
          className='text-8xl font-black orbitron text-center tracking-widest'
        >
          Software <br />
          Developer
        </motion.h1>
      </div>
    </section>
  )
}
