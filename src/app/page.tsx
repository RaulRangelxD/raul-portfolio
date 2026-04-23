'use client'
import Contact from '@/components/sections/Contact'
import Description from '@/components/sections/Description'
import Init from '@/components/sections/Init'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'

export default function Home() {
  return (
    <div>
      <Init />
      <Description />
      <Skills />
      <Projects />
      <Contact />
    </div>
  )
}
