'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import MeCard from '@/components/MeCard'

export default function Init() {
  const [animate, setAnimate] = useState<number>(0)
  const [isMdUp, setIsMdUp] = useState<boolean>(false)

  useEffect(() => {
    const checkWidth = () => setIsMdUp(window.innerWidth >= 768)
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(1), 1000)
    const timer2 = setTimeout(() => setAnimate(2), 2000)
    const timer3 = setTimeout(() => setAnimate(3), 3000)
    const timer4 = setTimeout(() => setAnimate(4), 4000)
    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])

  const scrollY = useMotionValue(0)
  useEffect(() => {
    const onScroll = () => scrollY.set(window.scrollY)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollY])

  const opacity = useTransform(scrollY, [0, 200], [1, 0])

  return (
    <motion.div
      style={{ opacity }}
      className='relative flex flex-col min-h-100 h-screen justify-center items-center orbitron select-none text-slate-50'
      key={isMdUp ? 'md' : 'sm'}
    >
      <div className='relative flex flex-row md:flex-row items-center justify-center'>
        {/* RAÚL RANGEL */}
        <motion.div
          initial={
            animate >= 4
              ? { x: isMdUp ? -180 : 0, y: !isMdUp ? -140 : -120 }
              : { x: 0, y: 0 }
          }
          animate={
            animate >= 4
              ? {
                  x: isMdUp ? -180 : 0,
                  y: !isMdUp ? [-140, -130] : [-120, -110],
                }
              : animate >= 3
                ? { x: isMdUp ? -180 : 0, y: !isMdUp ? -140 : -120 }
                : animate >= 2
                  ? { x: isMdUp ? -180 : 0, y: !isMdUp ? -100 : -80 }
                  : animate >= 1
                    ? { x: isMdUp ? -180 : 0, y: !isMdUp ? -40 : -0 }
                    : { x: 0, y: 0 }
          }
          transition={{
            duration: animate >= 4 ? 1.2 : 0.8,
            ease: 'easeInOut',
            repeat: animate >= 4 ? Infinity : 0,
            repeatType: 'reverse',
          }}
          className='flex flex-col items-center md:items-start'
        >
          <span className='text-xl md:text-2xl font-bold text-shadow-lg text-shadow-cyan-500'>
            Hola, soy
          </span>
          <span className='text-4xl md:text-6xl font-extrabold text-shadow-lg text-shadow-cyan-500 text-center md:text-left'>
            RAÚL <br /> RANGEL
          </span>
        </motion.div>

        {/* Developer */}
        <motion.h2
          initial={
            animate >= 4
              ? { opacity: 1, x: isMdUp ? 180 : 0, y: !isMdUp ? -60 : -120 }
              : { opacity: 0, x: 0, y: 0 }
          }
          animate={
            animate >= 4
              ? {
                  opacity: 1,
                  x: isMdUp ? 180 : 0,
                  y: !isMdUp ? [-60, -50] : [-120, -100],
                }
              : animate >= 3
                ? {
                    opacity: 1,
                    x: isMdUp ? 180 : 0,
                    y: !isMdUp ? -60 : -120,
                  }
                : animate >= 2
                  ? {
                      opacity: 1,
                      x: isMdUp ? 180 : 0,
                      y: !isMdUp ? -20 : -80,
                    }
                  : animate >= 1
                    ? {
                        opacity: 1,
                        x: isMdUp ? 180 : 0,
                        y: !isMdUp ? 40 : 0,
                      }
                    : { x: 0, y: 0 }
          }
          transition={{
            duration: animate >= 4 ? 1.2 : 0.8,
            ease: 'easeInOut',
            repeat: animate >= 4 ? Infinity : 0,
            repeatType: 'reverse',
          }}
          className='absolute text-4xl md:text-6xl font-extrabold orbitron text-shadow-lg text-shadow-fuchsia-500 text-center md:text-left'
        >
          Developer
        </motion.h2>
      </div>
      {/* Description */}
      <motion.h3
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={
          animate >= 3
            ? { opacity: 1, y: isMdUp ? -20 : -20 }
            : animate >= 2
              ? { opacity: 1, y: isMdUp ? 20 : 20 }
              : { opacity: 0, y: 0 }
        }
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className='absolute min-w-3xs md:min-w-xl text-md md:text-xl text-shadow-lg text-shadow-fuchsia-500 font-bold mt-2 md:mt-1 text-center'
      >
        Fullstack & Game Developer
      </motion.h3>
      <motion.h3
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={
          animate >= 3
            ? { opacity: 1, y: isMdUp ? 20 : 20 }
            : { opacity: 0, y: 0 }
        }
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className='absolute min-w-3xs md:min-w-xl text-md md:text-xl text-shadow-lg text-shadow-cyan-500 font-bold mt-2 md:mt-1 text-center'
      >
        Diseñando mundos digitales y experiencias interactivas
      </motion.h3>
      <motion.div
        className='absolute bottom-2 right-4'
        initial={{ opacity: 0, y: 80, rotate: 0 }}
        animate={
          animate >= 4
            ? { opacity: 1, y: 0, rotate: -3 }
            : { opacity: 0, y: 80, rotate: 0 }
        }
      >
        <MeCard />
      </motion.div>
    </motion.div>
  )
}
