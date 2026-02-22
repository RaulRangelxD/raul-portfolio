'use client'
import Description from '@/components/Description'
import Init from '@/components/Init'
import Skills from '@/components/Skills'
import WorkingProgress from '@/components/WorkingProgress'

export default function Home() {
  return (
    <div>
      <Init />
      <Description />
      <Skills />
      <WorkingProgress />
    </div>
  )
}
