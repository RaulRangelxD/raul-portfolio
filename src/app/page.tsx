'use client'
import Description from '@/components/sections/Description'
import Init from '@/components/sections/Init'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import WorkingProgress from '@/components/WorkingProgress'

export default function Home() {
  return (
    <div>
      <Init />
      <Description />
      <Skills />
      <Projects />
      <WorkingProgress />
    </div>
  )
}
