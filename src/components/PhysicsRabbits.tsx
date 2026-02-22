'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

type Rabbit = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  nextDirectionChange: number
}

export default function PhysicsRabbits() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rabbits = useRef<Rabbit[]>([])
  const animationRef = useRef<number>(0)

  const RABBIT_SIZE = 60
  const RABBIT_COUNT = 2

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
    const now = performance.now()

    const newRabbits: Rabbit[] = []

    for (let i = 0; i < RABBIT_COUNT; i++) {
      const x = Math.random() * (width - RABBIT_SIZE)
      const y = Math.random() * (height - RABBIT_SIZE)

      const angle = Math.random() * Math.PI * 2
      const speed = 1.5

      newRabbits.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: RABBIT_SIZE,
        nextDirectionChange: now + Math.random() * 4000 + 2000,
      })
    }

    rabbits.current = newRabbits
  }, [])

  const updatePhysics = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight
    const now = performance.now()

    const DRAG = 0.995
    const DRIFT = 0.02
    const PUSH_FORCE = 0.05

    rabbits.current.forEach((r, i) => {
      if (now > r.nextDirectionChange) {
        const currentSpeed = Math.sqrt(r.vx * r.vx + r.vy * r.vy)

        const currentAngle = Math.atan2(r.vy, r.vx)
        const randomRotation = (Math.random() - 0.5) * Math.PI
        const newAngle = currentAngle + randomRotation

        const BOOST = 80
        const MAX_SPEED = 2

        const boostedSpeed = currentSpeed + BOOST
        const finalSpeed = Math.min(boostedSpeed, MAX_SPEED)

        r.vx = Math.cos(newAngle) * finalSpeed
        r.vy = Math.sin(newAngle) * finalSpeed

        r.nextDirectionChange = now + Math.random() * 4000 + 2000
      }

      r.vx += (Math.random() - 0.5) * DRIFT
      r.vy += (Math.random() - 0.5) * DRIFT

      r.vx *= DRAG
      r.vy *= DRAG

      r.x += r.vx
      r.y += r.vy

      if (r.x > width) r.x = -r.size
      if (r.x + r.size < 0) r.x = width
      if (r.y > height) r.y = -r.size
      if (r.y + r.size < 0) r.y = height

      rabbits.current.forEach((other, j) => {
        if (i >= j) return

        const dx = r.x - other.x
        const dy = r.y - other.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < r.size) {
          const angle = Math.atan2(dy, dx)
          const forceX = Math.cos(angle) * PUSH_FORCE
          const forceY = Math.sin(angle) * PUSH_FORCE

          r.vx += forceX
          r.vy += forceY
          other.vx -= forceX
          other.vy -= forceY

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
