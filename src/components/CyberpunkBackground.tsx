'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

export default function CyberpunkBackground({
  children,
}: {
  children?: React.ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cellSize = 55

  const [grid, setGrid] = useState({ rows: 0, cols: 0 })

  const [snake, setSnake] = useState<number[]>(() => [])
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>(
    'right',
  )
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const update = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    const update = () =>
      setGrid({
        cols: Math.ceil(window.innerWidth / cellSize),
        rows: Math.ceil(window.innerHeight / cellSize),
      })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const updateGrid = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    setGrid({
      cols: Math.ceil(width / cellSize),
      rows: Math.ceil(height / cellSize),
    })
  }, [])

  useEffect(() => {
    updateGrid()
    const ro = new ResizeObserver(updateGrid)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [updateGrid])

  useEffect(() => {
    if (grid.cols && grid.rows && snake.length === 0) {
      const start = Math.floor((grid.rows * grid.cols) / 2)
      setTimeout(() => setSnake([start]), 0)
    }
  }, [grid, snake.length])

  useEffect(() => {
    const interval = setInterval(() => {
      setSnake((prev) => {
        if (prev.length === 0) return prev
        const head = prev[0]
        let row = Math.floor(head / grid.cols)
        let col = head % grid.cols

        switch (direction) {
          case 'up':
            row = row - 1 < 0 ? grid.rows - 1 : row - 1
            break
          case 'down':
            row = (row + 1) % grid.rows
            break
          case 'left':
            col = col - 1 < 0 ? grid.cols - 1 : col - 1
            break
          case 'right':
            col = (col + 1) % grid.cols
            break
        }

        const newHead = row * grid.cols + col
        const newSnake = [newHead, ...prev]
        return newSnake.slice(0, 5)
      })
    }, 200)
    return () => clearInterval(interval)
  }, [direction, grid.rows, grid.cols])

  useEffect(() => {
    const interval = setInterval(() => {
      const dirs: ('up' | 'down' | 'left' | 'right')[] = [
        'up',
        'down',
        'left',
        'right',
      ]

      setDirection((prev) => {
        const allowed = dirs.filter((dir) => {
          return !(
            (prev === 'up' && dir === 'down') ||
            (prev === 'down' && dir === 'up') ||
            (prev === 'left' && dir === 'right') ||
            (prev === 'right' && dir === 'left')
          )
        })
        return allowed[Math.floor(Math.random() * allowed.length)]
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      ref={containerRef}
      className='fixed inset-0 overflow-hidden -z-10'
      style={{
        background:
          'linear-gradient(to bottom, #020208 0%, #070714 50%, #020208 100%)',
      }}
    >
      {/* ELECTRIC GRID */}
      <div className='absolute inset-0 -z-10'>
        {Array.from({ length: grid.rows }).map((_, row) => (
          <div key={row} className='flex'>
            {Array.from({ length: grid.cols }).map((_, col) => {
              const index = row * grid.cols + col
              const isSnake = snake.includes(index)
              return (
                <motion.div
                  key={index}
                  className='shrink-0 border'
                  style={{
                    width: cellSize,
                    height: cellSize,
                    borderColor: 'rgba(255,0,255,0.15)',
                    backgroundColor: isSnake
                      ? 'rgba(0,255,255,0.35)'
                      : 'transparent',
                    boxShadow: isSnake
                      ? '0 0 60px rgba(0,255,255,1), inset 0 0 30px rgba(255,0,255,0.9)'
                      : 'none',
                    transition:
                      'background-color 0.1s linear, box-shadow 0.1s linear',
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>
      {/* INTENSE MOVING BLOBS */}
      <motion.div
        className='absolute w-150 h-150 rounded-full bg-cyan-500/50 blur-[180px] -z-20'
        animate={{
          x: [
            0,
            dimensions.width * 0.25,
            dimensions.width * 0.5,
            dimensions.width * 0.25,
            0,
          ],
          y: [0, -dimensions.width * 0.1, 0, dimensions.width * 0.1, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className='absolute right-0 bottom-0 w-150 h-150 rounded-full bg-fuchsia-500/50 blur-[180px] -z-20'
        animate={{
          x: [
            0,
            -dimensions.width * 0.25,
            -dimensions.width * 0.5,
            -dimensions.width * 0.25,
            0,
          ],
          y: [0, dimensions.width * 0.1, 0, -dimensions.width * 0.1, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      {children && (
        <div className='relative z-10 h-full w-full'>{children}</div>
      )}
      {/* SCANLINES CRT */}
      <motion.div
        className='absolute inset-0 pointer-events-none opacity-40 -z-20'
        style={{
          backgroundSize: '100% 6px',
          backgroundImage: 'linear-gradient(0deg, #020208 2px, #070714 2px)',
        }}
        animate={{
          backgroundImage: [
            'linear-gradient(0deg, rgba(6,182,212,0.15) 2px, rgba(217,70,239,0.15) 2px)',
            'linear-gradient(0deg, rgba(217,70,239,0.15) 2px, rgba(6,182,212,0.15) 2px)',
            'linear-gradient(0deg, rgba(6,182,212,0.15) 2px, rgba(217,70,239,0.15) 2px)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* VIGNETTE */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background:
            'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.9) 100%)',
        }}
      />

      {children && (
        <div className='relative z-10 h-full w-full'>{children}</div>
      )}
    </div>
  )
}
