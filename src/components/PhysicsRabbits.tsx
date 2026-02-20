'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

type Rabbit = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

export default function PhysicsRabbits() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rabbits = useRef<Rabbit[]>([])
  const animationRef = useRef<number>(0)

  const RABBIT_SIZE = 60
  const RABBIT_COUNT = 2

  // 🔥 Crear corazón animado
  const spawnHeart = (x: number, y: number) => {
    const container = containerRef.current
    if (!container) return

    const heart = document.createElement('div')
    heart.innerText = '❤️'
    heart.style.position = 'absolute'
    heart.style.left = `${x}px`
    heart.style.top = `${y}px`
    heart.style.fontSize = '28px'
    heart.style.pointerEvents = 'none'
    heart.style.opacity = '1'
    heart.style.transform = 'scale(0.5)'
    heart.style.transition = 'all 0.6s ease-out'
    heart.style.zIndex = '20'

    container.appendChild(heart)

    requestAnimationFrame(() => {
      heart.style.transform = 'translateY(-40px) scale(1.4)'
      heart.style.opacity = '0'
    })

    setTimeout(() => {
      heart.remove()
    }, 600)
  }

  const initRabbits = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    const newRabbits: Rabbit[] = []

    for (let i = 0; i < RABBIT_COUNT; i++) {
      const x = Math.random() * (width - RABBIT_SIZE)
      const y = Math.random() * (height - RABBIT_SIZE)

      newRabbits.push({
        x,
        y,
        vx: 1.5 * (Math.random() > 0.5 ? 1 : -1),
        vy: 1.5 * (Math.random() > 0.5 ? 1 : -1),
        size: RABBIT_SIZE,
      })
    }

    rabbits.current = newRabbits
  }, [])

  const updatePhysics = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    rabbits.current.forEach((r, i) => {
      r.x += r.vx
      r.y += r.vy

      if (r.x <= 0 || r.x + r.size >= width) r.vx *= -1
      if (r.y <= 0 || r.y + r.size >= height) r.vy *= -1

      rabbits.current.forEach((other, j) => {
        if (i >= j) return

        const dx = r.x - other.x
        const dy = r.y - other.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < r.size) {
          const tempVx = r.vx
          const tempVy = r.vy
          r.vx = other.vx
          r.vy = other.vy
          other.vx = tempVx
          other.vy = tempVy

          // 💖 Corazón en punto medio
          const midX = (r.x + other.x) / 2 + r.size / 2
          const midY = (r.y + other.y) / 2 + r.size / 2
          spawnHeart(midX, midY)
        }
      })
    })

    rabbits.current.forEach((r, i) => {
      const el = container.children[i] as HTMLElement
      el.style.transform = `translate(${r.x}px, ${r.y}px)`
    })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let isRunning = true

    const loop = () => {
      if (!isRunning) return
      updatePhysics()
      animationRef.current = requestAnimationFrame(loop)
    }

    const start = () => {
      cancelAnimationFrame(animationRef.current)
      initRabbits()
      animationRef.current = requestAnimationFrame(loop)
    }

    const timeout = setTimeout(start, 50)
    window.addEventListener('resize', start)

    return () => {
      isRunning = false
      clearTimeout(timeout)
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', start)
    }
  }, [initRabbits, updatePhysics])

  return (
    <div
      ref={containerRef}
      className='absolute inset-0 pointer-events-none z-10 overflow-hidden'
    >
      <Image
        src='/rabbit-astronaut1.png'
        alt='rabbit 1'
        width={RABBIT_SIZE}
        height={RABBIT_SIZE}
        className='absolute opacity-80 select-none drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]'
        draggable={false}
      />
      <Image
        src='/rabbit-astronaut2.png'
        alt='rabbit 2'
        width={RABBIT_SIZE}
        height={RABBIT_SIZE}
        className='absolute opacity-80 select-none drop-shadow-[0_0_20px_rgba(217,70,239,0.6)]'
        draggable={false}
      />
    </div>
  )
}
