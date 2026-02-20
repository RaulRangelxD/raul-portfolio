'use client'
import Description from '@/components/Description'
import Init from '@/components/Init'
import WorkingProgress from '@/components/WorkingProgress'

export default function Home() {
  return (
    <div>
      <Init />
      <Description />
      <WorkingProgress />
    </div>
  )
}
