'use client'

import { Hero } from '@/src/components/Hero'
import Footer from '../components/Footer'
import { useRef } from 'react'
import { DataSource } from '../components/DataSource'
import { SectionTable } from '../components/SectionTable'

export default function Home() {
  const chartRef = useRef<HTMLElement | null>(null)
  const tableRef = useRef<HTMLElement | null>(null)

  function scrollToChart() {
    chartRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  function scrollToTable() {
    tableRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Hero onClickViewChart={scrollToChart} onClickViewTable={scrollToTable} />
      <main className="container min-h-screen space-y-20 px-4 py-6">
        <SectionTable ref={tableRef} />
        <div className="space-y-4">
          <DataSource />
        </div>
      </main>
      <Footer />
    </>
  )
}
